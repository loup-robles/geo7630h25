# Résumé du cours 10, Création d'un géoserveur avec Docker

Pour créer un géoserveur avec **Docker** et créer une carte interactive, 4 fichiers sont nécéssaires : 

- Un `docker compose`
- Un `HTML`
- Un `Javascript`
- Un `CSS`

# Rôle de chacun des fichiers


## 1️⃣ Docker Compose

### 📌 Créer une carte avec Docker Compose

#### 🔹 Qu'est-ce que Docker Compose ?
Docker Compose est un fichier de configuration permettant de **déployer un serveur web**.  
Ce fichier ne fait que **"servir" d'autres fichiers** qui correspondent à des **services** (dans notre cas, un fichier HTML).  

Un **Docker** peut contenir plusieurs services, comme :
- Un **serveur web** (ex : Nginx, Apache)
- Une **base de données** (ex : PostgreSQL/PostGIS)
- Un **serveur SIG** (ex : GeoServer, MapServer)

### 🔹 Exemple : Déployer une carte avec Nginx et Leaflet

#### ** Fichier `docker-compose.yml`**
```yaml
version: '3.8'

services:
  web:
    image: nginx:latest
    ports:
      - "8080:80"
    volumes:
      - ./html:/usr/share/nginx/html  # On monte notre dossier contenant la carte
``` 

## 2️⃣ HTML

Le **fichier HTML** sert à **structurer la page web** qui affichera la carte interactive. Il contient la structure de la page, comme l'en-tête, le corps de la page, et où la carte sera affichée.

### Rôle :

Le fichier HTML définit la **structure de la page** où sera rendue la carte (généralement dans une balise `<div>`). Il inclut également les liens vers les autres fichiers (comme le CSS pour les styles et le JavaScript pour l'interactivité de la carte).

```html
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Carte GeoServer</title>
    <link rel="stylesheet" href="style.css"/>
</head>
<body>
    <h1>Carte Interactive avec GeoServer</h1>
    <div id="map"></div>
    <script src="script.js"></script>
</body>
</html>
```

## 3️⃣ JavaScript

le fichier javascript créer des **objets** (via une variable) puis fait répondre ces objets à des **évènements**. 
On créer la variable map qui va créer l'objet "carte" (avec maplibre)

Si je veux ajouter des données à la carte j'ajoute l'évènement ".on" sur ma variable map -> map.on('load',() -> {map.adsource....

```js
var map = L.map('map').setView([45.5017, -73.5673], 12);  // Montréal
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

var geoserverUrl = 'http://localhost:8080/geoserver/ows';
var layer = L.tileLayer.wms(geoserverUrl, {
    layers: 'workspace:layer_name',  // Remplacez 'workspace:layer_name' par le nom de votre couche
    format: 'image/png',
    transparent: true
}).addTo(map);
```
## 4️⃣ CSS

Le fichier CSS définit **les styles visuels** de la page web, notamment la taille de la carte, la disposition des éléments, et tout autre aspect esthétique. Il intéragit avec le fichier `html`. On créer un bouton pour ajouter des données dans le fichier `html`, on stylise le button sur le fichier `CSS`

```css
body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
}

h1 {
    text-align: center;
    margin-top: 20px;
}

#map {
    height: 600px;
    width: 100%;
}
```