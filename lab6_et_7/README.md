# **🛰 Laboratoire 6 et 7** : ArcGIS Online, Dashboard et Experience Builder – Intégration de données

## **Étape 1**, Ajout des données au FME
ajout des données CSV depuis le liens suivant : https://sitewebbixi.s3.amazonaws.com/uploads/docs/20220107-donnees-ouvertes-8aa623.zip
Beaucoup d'entité non pas de coordonnées renseignées. On les filtre celles qui ont une longitude de -1 pour exclure les points qui n'ont pas de coordonnées et ceux qui en ont mais qui sont eronées.

![alt text](2.JPG)

On calcule la somme des arrivées et des départs par stations 

![alt text](3.JPG)

On nettoie la table

![alt text](5.JPG)

On fait une premiere jointure pour associer les coordonnées à la table des sommes de départ par station

![alt text](6.JPG)

Puis une seconde pour joindre les sommes des arrivées par station (pour avoir la sommes des arrivées et des départ sur la même table).

![alt text](7.JPG)

On ajoute la table résultante à la base de données Postgis

![alt text](arcgisonline1.png)  ![alt text](arcgisonline2.png) 

ATTENTION !!! Le feature service name doit etre unique sur Arcgis Online. Il faut le nommer de facon à ce qu'aucun autre feature service n'est le meme nom.
FME complet : 

![alt text](FME.png)

## **Étape 2,** Arcgis online

- Créer un nouveau dossier dans Arcgis Online (Contenue>dossier>créer un nouveau dossier)

![alt text](10.JPG)

- Sur Arcgis Online, ouvrir notre données dans Map Viewer

![alt text](<Capture d’écran 2025-02-18 215042.png>)

![alt text](11.JPG)

- Dans aggrégation, choisir aggrégation et non regroupement.

![alt text](12.JPG)

- Dans style, ajouter un champ et selectionner srart_total_count et end_total_count puis dans le choix de style sélectionner Comparer A à B. Dans option de style, choisir les étiquettes "Afficher A comme pourcentage de A et B".


![alt text](13.JPG)

![alt text](14.JPG)

![alt text](15.JPG)

- Enregistrer la carte


![alt text](16.JPG)

- Créer un dashboard et sélectionner la carte qu'on vient d'enregisrter


![alt text](17.JPG)

![alt text](18.JPG)

![alt text](19.JPG)

![alt text](20.JPG)

- Ajouter des jauges sur le Dashboard


![alt text](21.JPG)

![alt text](22.JPG)

![alt text](23.JPG)

![alt text](24.JPG)

![alt text](25.JPG)


- Ajouter des indicateurs avec un code js


![alt text](26.JPG)

![alt text](27.JPG)

![alt text](28.JPG)

![alt text](32.JPG)


- Ajouter une légende à la carte

![alt text](33.JPG)

![alt text](34.JPG)

![alt text](35.JPG)

![alt text](36.JPG)

![alt text](37.JPG)

![alt text](38.JPG)

- Ajouter la table de la données

![alt text](43.JPG)

![alt text](44.JPG)

![alt text](45.JPG)

![alt text](46.JPG)

![alt text](47.JPG)

![alt text](48.JPG)

![alt text](50.JPG)

![alt text](51.JPG)