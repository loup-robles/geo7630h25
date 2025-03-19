# Laboratoire 10 - GEO7630H25
## Configuration Geoserver et mise en place de services VTS et WFS

### **Étape 1 : Configuration et lancement d’une instance de Geoserver**

ouvrir un code space depuis le repertoire du cours

![alt text](image.png)

copier coller le fichier .env dans l'Atlas

![alt text](image-1.png)

rentrer les informations

![alt text](image-2.png)

installer le Docker 
![alt text](image-3.png)
l'icone devrait apparaitre
![alt text](image-4.png)

Aller dans Atlas>docker-compose et cliquer sur "Run all services"

Le docker devrait etre rempli 
![alt text](image-6.png)

ouvrir la carte du port8000

![alt text](image-5.png)
![alt text](image-7.png)

# Ajout de controle de carte


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


# Étape 4 : Chargement de données depuis un serveur de tuiles vectorielles

aller dans le port8801

ouvrir le json


![alt text](image-11.png)


copier l'url


![alt text](image-10.png)


coller ligne 25 dans "tyle" et vérifier que le "source layer" corresponde à la fin de l'url


![alt text](image-13.png)



# étape 5 (deja présente dans le fichier)

mettre tous les ports en public pour pouvoir visualiser les données 

![alt text](image-14.png)

apparition des tuiles sur la carte

![alt text](image-15.png)

on peut modifier la symbologie de la carte directement dans le code. On change la transparence


![alt text](image-16.png)

# Étape 6 (deja faite dans le code)

# Étape 7 ajout d’une couche WFS

- Dl les limites administrative de montréal depuis le portail des données ouvertes.
- ouvrir FME et ouvrir la données et ajouter un "writter" PostGIS vers notre base de donnée.
- Nommer la table en sortie "arrondissements"


![alt text](image-17.png)


ouvrir le port9000 > View the collections
ouvrir la table arrondissements

 ![alt text](image-18.png)

augmenter la limite d'entité pour pouvoir voir tous les arrondissements

![alt text](image-19.png)

aller dans le json du fichier pour récupérer tout en bas, l'url 

![alt text](image-20.png)

on colle l'url dans le json ligne 76, sans oublier d'ajouter une limite pour pouvoir voir toutes les entités 

![alt text](image-21.png)

Ajouter un bouton

sans le code html on a la carte sans bouton
![alt text](image-22.png)

apres avoir ajouté le code suivant ligne 119 du code html :
    <div class='map-overlay top' >
    <button type="button" class="btn btn-primary" onclick="loadWFS()">Load WFS Data</button>
</div>

![alt text](image-23.png)

![alt text](image-24.png)

si on appuie sur le bouton cela ajoute les arrondissements sont ajoutés à la carte

![alt text](image-25.png)

