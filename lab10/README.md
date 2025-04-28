# **Laboratoire 10**, Configuration Geoserver et mise en place de services VTS et WFS


## **Étape 1** : Configuration et lancement d’une instance de Geoserver**

Ouvrir un code space depuis le repertoire du cours

![alt text](image.png)

Copier-coller le fichier .env dans l'Atlas, il nous permet de nous connecter à la base de données PostGIS du cours.

![alt text](image-1.png)

Rentrer les informations

![alt text](image-2.png)

Installer l'exension *Docker*

![alt text](image-3.png)


Aller dans Atlas>docker-compose et cliquer sur "Run all services"


![alt text](image-6.png)

Ouvrir la carte du port8000


![alt text](image-5.png)
![alt text](image-7.png)

## Étape 2**, Ajout de controle de carte


Copier coller les codes suivants dans Atlas > App > app.js à partir de la ligne 9


- Controle de navigation : 

    var nav = new maplibregl.NavigationControl({
        showCompass: true,
        showZoom: true,
        visualizePitch: true
    });
    map.addControl(nav, 'top-right');


- controle de géolocalisation :

var geolocateControl = new maplibregl.GeolocateControl({
    positionOptions: { enableHighAccuracy: true },
    trackUserLocation: true
});
map.addControl(geolocateControl, 'bottom-right');

- Controle d'échelle : 

var scale = new maplibregl.ScaleControl({ unit: 'metric' });
map.addControl(scale);


![alt text](image-8.png)


![alt text](image-9.png)


## **Étape 3**, Chargement de données depuis un serveur de tuiles vectorielles

Aller dans le port8801 et ouvrir le fichier JSON de la table *public.densite_arbres_quartiers*

![alt text](image-11.png)

Copier l'url 

![alt text](image-10.png)

Coller ligne 25 dans "tyle" et vérifier que le "source layer" corresponde à la fin de l'url

![alt text](image-13.png)



## **Étape 4** (deja présente dans le fichier)

Mettre tous les ports en public pour pouvoir visualiser les données 

![alt text](image-14.png)

Apparition des tuiles sur la carte

![alt text](image-15.png)

On peut modifier la symbologie de la carte directement dans le code. On change la transparence


![alt text](image-16.png)

## **Étape 5**, (deja faite dans le code)

## **Étape 6**, Ajout d’une couche WFS

- Télécharger les limites administratives de Montréal depuis le portail des données ouvertes.
- Ouvrir FME et ouvrir la données et ajouter un "writter" PostGIS vers notre base de donnée.
- Nommer la table en sortie "arrondissements"


![alt text](image-17.png)


Ouvrir le port9000 > View the collections
Ouvrir la table arrondissements

 ![alt text](image-18.png)

Augmenter la limite d'entité pour pouvoir voir tous les arrondissements

![alt text](image-19.png)

Aller dans le json du fichier pour récupérer tout en bas, l'url 

![alt text](image-20.png)

On colle l'url dans le json ligne 76, sans oublier d'ajouter une limite pour pouvoir voir toutes les entités 

![alt text](image-21.png)

Ajouter un bouton

Sans le code html on a la carte sans bouton
![alt text](image-22.png)

Apres avoir ajouté le code suivant ligne 119 du code html :
    <div class='map-overlay top' >
    <button type="button" class="btn btn-primary" onclick="loadWFS()">Load WFS Data</button>
</div>

![alt text](image-23.png)

![alt text](image-24.png)

Lorsqu'on appuie sur le bouton, les arrondissements sont ajoutés à la carte.

![alt text](image-25.png) 