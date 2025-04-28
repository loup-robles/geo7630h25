// app.js (inchangé, avec seulement la logique heatmap ajoutée)

// ### Popups & explications ###
const popup = new maplibregl.Popup({
  closeButton: true,
  closeOnClick: true
});
const explanations = {
  "donneesSelect": "Sélectionner une couche de données.",
  "stationnements-layer": "Affiche les cases de stationnements du jeu de données 'Stationnement sur rue' du portail des données ouvertes de la Ville de Montréal.",
  "stationnements-bixi-layer": "Affiche les cases de stationnements qui sont dans un rayon de 50 mètres d'une station BIXI à haute fréquence (stations qui comptabilisent au moins 30 départs par jour, 11 000 par an).",
  "stationnements-bus-layer": "Affiche les cases de stationnement situées dans un rayon de 150 mètres d'un arrêt de bus qui accueille au moins 3 lignes différentes.",
  "stationnements-routes-layer": "Affiche les stationnements situés sur une route principale.",
  "stationnements-icu-layer": "Affiche les stationnements situés dans un îlot de chaleur urbain élevé.",
  "stationnements-cyclables-layer": "Affiche les cases de stationnements qui sont sont dans un rayon de 20 mètres d'une piste cyclable protégée.",
  "pertinence-layer": "Affiche la non-pertinence des stationnements. Cette indice a été calculé à la suite d'une analyse multicritère basée sur 5 indicateurs (qui sont dans la catégories 'Données').",
  "statsBtn": "Afficher le nombre de points visibles.",
  "btn-basemap": "Basculer le fond de carte OpenStreetMap.",
  "btn-pertinence": "Afficher la couche Indice de non-pertinence des cases de stationnements. Cette indice à été calculé à la suite d'une analyse multicritère basée sur 5 indicateurs (qui sont dans la catégories 'Données')",
  "btn-batiment3d": "Afficher/masquer les bâtiments 3D.",
  "btn-histogram": "Afficher l'histogramme de non-pertinence.",
  "btn-heatmap": "Afficher/masquer la heatmap de densité de la couche active."
};

function showExplanation(id) {
  document.getElementById("explain-text").textContent =
    explanations[id] || "";
}

// ### Initialisation de la carte ###
let currentLayer = "stationnements-layer";
let heatmapActive = false;  // <-- état heatmap

const map = new maplibregl.Map({
  container: "map",
  style:
    "https://api.maptiler.com/maps/dataviz/style.json?key=JhO9AmIPH59xnAn5GiSj",
  center: [-73.55, 45.55],
  zoom: 10,
  hash: true
});

map.on("load", () => {
  map.resize();

  // Basemap raster
  map.addSource("osm-raster", {
    type: "raster",
    tiles: ["https://tile.openstreetmap.org/{z}/{x}/{y}.png"],
    tileSize: 256
  });
  map.addLayer({
    id: "osm-raster-layer",
    type: "raster",
    source: "osm-raster",
    layout: { visibility: "none" }
  });

  // Bâtiments 3D
  map.addSource("osm-vector", {
    type: "vector",
    url:
      "https://api.maptiler.com/tiles/v3/tiles.json?key=JhO9AmIPH59xnAn5GiSj"
  });
  map.addLayer({
    id: "batiment3d-layer",
    source: "osm-vector",
    "source-layer": "building",
    type: "fill-extrusion",
    layout: { visibility: "none" },
    paint: {
      "fill-extrusion-color": "#aaa",
      "fill-extrusion-height": [
        "coalesce",
        ["get", "render_height"],
        ["get", "height"],
        0
      ],
      "fill-extrusion-opacity": 0.6
    }
  });

  // Couches données (cercles + heatmap)
  const layers = [
    ["stationnements-layer", "ROBL77290108.TP2_Stationnements", "#1a1717"],
    ["stationnements-bixi-layer", "ROBL77290108.TP2_Stationnements", "#e12f26"],
    ["stationnements-bus-layer", "ROBL77290108.TP2_Stationnements_bus", "#29d4e8"],
    ["stationnements-routes-layer", "ROBL77290108.TP2_Stationnements_Routes_principales", "#FF9800"],
    ["stationnements-icu-layer", "ROBL77290108.TP2_Stationnements_ICU", "#164fe5"],
    ["stationnements-cyclables-layer", "ROBL77290108.TP2_Stationnements_pistes_cyclables_protegees", "#0c9d26"],
    ["pertinence-layer", "ROBL77290108.TP2_Stationnements_indices", "step"]
  ];

  layers.forEach(([id, src, color]) => {
    map.addSource(id, {
      type: "vector",
      tiles: [
        `https://super-duper-capybara-695594xw694j2grw-8801.app.github.dev/${src}/{z}/{x}/{y}.pbf`
      ]
    });

    // couche cercle
    const paint = id === "pertinence-layer"
      ? {
          "circle-color": [
            "step",
            ["get", "Indice_tot"],
            "#d9d9d9",
            0.125,
            "#ffffb2",
            0.375,
            "#fecc5c",
            0.625,
            "#e31a1c"
          ],
          "circle-radius": ["interpolate", ["linear"], ["zoom"], 8, 2, 12, 4, 16, 6],
          "circle-stroke-color": "#ffffff",
          "circle-stroke-width": 1
        }
      : {
          "circle-color": color,
          "circle-radius": ["interpolate", ["linear"], ["zoom"], 8, 2, 12, 4, 16, 6],
          "circle-stroke-color": "#ffffff",
          "circle-stroke-width": 1
        };

    map.addLayer({
      id,
      source: id,
      type: "circle",
      "source-layer": src,
      layout: { visibility: id === currentLayer ? "visible" : "none" },
      paint
    });

    // couche heatmap
    map.addLayer({
      id: `${id}-heatmap`,
      source: id,
      type: "heatmap",
      "source-layer": src,
      layout: { visibility: "none" },
      paint: {
        "heatmap-weight": ["interpolate", ["linear"], ["zoom"], 0, 0, 15, 1],
        "heatmap-intensity": ["interpolate", ["linear"], ["zoom"], 0, 1, 15, 3],
        "heatmap-color": [
          "interpolate", ["linear"], ["heatmap-density"],
          0, "rgba(33,102,172,0)",
          0.2, "rgb(103,169,207)",
          0.4, "rgb(209,229,240)",
          0.6, "rgb(253,219,199)",
          0.8, "rgb(239,138,98)",
          1, "rgb(178,24,43)"
        ],
        "heatmap-radius": ["interpolate", ["linear"], ["zoom"], 0, 2, 15, 20],
        "heatmap-opacity": 0.6
      }
    });

    // popup au clic (couche cercle uniquement)
    map.on("click", id, e => {
      const props = e.features[0].properties;
      const { lng, lat } = e.lngLat;
      let html = `<strong>Longitude:</strong> ${lng.toFixed(5)}<br/>
                  <strong>Latitude:</strong> ${lat.toFixed(5)}<br/>`;
      if (id === "pertinence-layer") {
        const v = +props.Indice_tot;
        const cat = v <= 0.125 ? "Faible" : v <= 0.375 ? "Moyen" : v <= 0.625 ? "Fort" : "Très fort";
        html += `<strong>Catégorie:</strong> ${cat}`;
      } else {
        Object.entries(props).forEach(
          ([k, v]) => (html += `<strong>${k}:</strong> ${v}<br/>`)
        );
      }
      popup.setLngLat(e.lngLat).setHTML(html).addTo(map);
    });
  });

  // fonctions updateLegend, updateStats… (inchangées)
  function updateLegend(layer) {
    const lg = document.getElementById("legend");
    if (layer === "pertinence-layer") {
      lg.innerHTML = `<strong>Indice de pertinence</strong>
        <ul style="list-style:none;padding:0;">
          <li><span style="background:#d9d9d9;width:12px;height:12px;display:inline-block;margin-right:5px;"></span>Faible</li>
          <li><span style="background:#ffffb2;width:12px;height:12px;display:inline-block;margin-right:5px;"></span>Moyen</li>
          <li><span style="background:#fecc5c;width:12px;height:12px;display:inline-block;margin-right:5px;"></span>Fort</li>
          <li><span style="background:#e31a1c;width:12px;height:12px;display:inline-block;margin-right:5px;"></span>Très fort</li>
        </ul>`;
    } else {
      lg.innerHTML = `<strong>Légende – ${layer.replace("-layer", "")}</strong>`;
    }
  }

  function updateStats(layer) {
    const ul = document.querySelector("#stats ul");
    const feats = map.queryRenderedFeatures({ layers: [layer] });
    ul.innerHTML = feats.length ? `<li>Nombre : ${feats.length}</li>` : "<li>Aucun</li>";
    document.getElementById("statsBtn").textContent = `Nombre de points : ${feats.length}`;
  }

  // écouteurs d'événement (inchangés pour données, stats, basemap, pertinence, batiment3d, histogramme…)

  document.getElementById("donneesSelect").addEventListener("change", e => {
    currentLayer = e.target.value;
    // masquer tous les cercles et heatmaps
    ["stationnements-layer","stationnements-bixi-layer","stationnements-bus-layer",
     "stationnements-routes-layer","stationnements-icu-layer","stationnements-cyclables-layer",
     "pertinence-layer"].forEach(id => {
      map.setLayoutProperty(id, "visibility", "none");
      map.setLayoutProperty(`${id}-heatmap`, "visibility", "none");
    });
    // afficher la bonne vue
    if (heatmapActive) {
      map.setLayoutProperty(`${currentLayer}-heatmap`, "visibility", "visible");
    } else {
      map.setLayoutProperty(currentLayer, "visibility", "visible");
    }
    updateLegend(currentLayer);
    updateStats(currentLayer);
    showExplanation("donneesSelect");
    document.getElementById("histogram").style.display = "none";
  });

  // heatmap toggle
  document.getElementById("btn-heatmap").addEventListener("click", function() {
    heatmapActive = !heatmapActive;
    if (heatmapActive) {
      map.setLayoutProperty(currentLayer, "visibility", "none");
      map.setLayoutProperty(`${currentLayer}-heatmap`, "visibility", "visible");
    } else {
      map.setLayoutProperty(`${currentLayer}-heatmap`, "visibility", "none");
      map.setLayoutProperty(currentLayer, "visibility", "visible");
    }
    this.classList.toggle("active-btn", heatmapActive);
    document.getElementById("histogram").style.display = "none";
    showExplanation("btn-heatmap");
  });

    // stats button
    document
    .getElementById("statsBtn")
    .addEventListener("click", () => showExplanation("statsBtn"));

  // basemap toggle
  document.getElementById("btn-basemap").addEventListener("click", function() {
    const v = map.getLayoutProperty("osm-raster-layer", "visibility");
    const nv = v === "visible" ? "none" : "visible";
    map.setLayoutProperty("osm-raster-layer", "visibility", nv);
    this.classList.toggle("active-btn", nv === "visible");
    showExplanation("btn-basemap");
  });

  // indice de non-pertinence
  document
    .getElementById("btn-pertinence")
    .addEventListener("click", () => {
      heatmapActive = false;
      document.getElementById("btn-heatmap").classList.remove("active-btn");
      currentLayer = "pertinence-layer";
      layers.forEach(([id]) => {
        map.setLayoutProperty(id, "visibility", "none");
        map.setLayoutProperty(`${id}-heatmap`, "visibility", "none");
      });
      map.setLayoutProperty("pertinence-layer", "visibility", "visible");
      updateLegend(currentLayer);
      updateStats(currentLayer);
      showExplanation("btn-pertinence");
      document.getElementById("histogram").style.display = "none";
    });

  // bâtiments 3D toggle
  document
    .getElementById("btn-batiment3d")
    .addEventListener("click", function() {
      const v = map.getLayoutProperty("batiment3d-layer", "visibility");
      const nv = v === "visible" ? "none" : "visible";
      map.setLayoutProperty("batiment3d-layer", "visibility", nv);
      this.classList.toggle("active-btn", nv === "visible");
      showExplanation("btn-batiment3d");
    });

  // histogramme setup
  const ctx = document.getElementById("histogram").getContext("2d");
  const histogramChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["Faible", "Moyen", "Fort", "Très fort"],
      datasets: [{ data: [0, 0, 0, 0] }]
    },
    options: { responsive: true, maintainAspectRatio: false }
  });

  // bouton histogramme
  document
    .getElementById("btn-histogram")
    .addEventListener("click", () => {
      if (currentLayer === "pertinence-layer" && !heatmapActive) {
        const feats = map.queryRenderedFeatures({
          layers: ["pertinence-layer"]
        });
        updateHistogram(feats);
        document.getElementById("histogram").style.display = "block";
        showExplanation("btn-histogram");
      }
    });

  // mise à jour de l'histogramme
  function updateHistogram(feats) {
    const counts = [0, 0, 0, 0];
    feats.forEach(f => {
      const v = +f.properties.Indice_tot;
      const idx = v <= 0.125 ? 0 : v <= 0.375 ? 1 : v <= 0.625 ? 2 : 3;
      counts[idx]++;
    });
    histogramChart.data.datasets[0].data = counts;
    histogramChart.update();
  }

  // mise à jour des stats au déplacement
  map.on("moveend", () => {
    if (!heatmapActive) updateStats(currentLayer);
  });

  // initialisation finale
  updateLegend(currentLayer);
  updateStats(currentLayer);
  showExplanation("donneesSelect");
});

