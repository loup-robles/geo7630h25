# **<p align="center">TP 1 : Analyse de la pertinence des stationnements sur l’Île de Montréal.</p>**



### <p align="center">Présenté par :</p>

<p align="center"> Loup Robles</p>
<p align="center"> Ali Tarhini</p>

### <p align="center"> Dans le cadre du cours :</p>

<p align="center"> GEO 7630</p>

### <p align="center"> Présenté par :</p>

<p align="center"> Clément Glogowski</p>

## Orientation générale :  

Le projet que nous voulons porter est un projet prescriptif qui aura pour but de faire une analyse performative des places de stationnements existantes sur l’Île de Montréal. Nous aimerions, à partir d’une analyse de circulation et de la localisation de certaines infrastructures municipales et de transports, voir quelles places de stationnement sont “nécessaires”, lesquelles sont “nécessaires mais mal positionnées sur le territoire”, et lesquelles sont “inutiles”. Cet outil pourra être utilisé pour l’aide à la prise de décision par les dirigeants de l’aménagement de la ville. 

Les données dont nous aurons besoin sont pour la plupart des données vectorielles qualitatives et sont toutes disponibles en données ouvertes :  

- Stationnements gratuits et payants (déneigement) : [Lien vers les données](https://donnees.montreal.ca/dataset/stationnements-deneigement)
- Stationnement municipaux tarifés, sur rue et hors rue : [Lien vers les données](https://donnees.montreal.ca/fr/dataset/stationnements-municipaux-tarifes-sur-rue-et-hors-rue)
- Géobase - réseau routier : [Lien vers les données](https://donnees.montreal.ca/fr/dataset/geobase)
- Feux de circulation – emplacements toutes intersections : [Lien vers les données](https://donnees.montreal.ca/fr/dataset/feux-tous)
- Temps de parcours sur des segments routiers (historique) : [Lien vers les données](https://donnees.montreal.ca/dataset/temps-de-parcours-sur-des-segments-routiers-historique)
- Stationnements gratuits et payants (déneigement) : [Lien vers les données](https://donnees.montreal.ca/dataset/stationnements-deneigement)
- Déplacements MTL Trajet : [Lien vers les données](https://donnees.montreal.ca/dataset/mtl-trajet)
- Bâtiments municipaux : [Lien vers les données](https://donnees.montreal.ca/dataset/batiments-municipaux/resource/1dfeb734-2b5e-47a9-ab3b-fb55e67b99f0)

## Analyses spatiales prévues

Différentes analyses spatiales seront réalisées pour mener à bien ce travail :

1. **Analyse de réseau** liée à une analyse des déplacements pour voir les tronçons les plus achalandés et sujets au trafic.
2. **Analyse de transport** prenant en compte les moyens de transports en commun.
3. **Analyse de la localisation des stationnements** présents et de leur pertinence.
4. Réflexion sur une analyse de la gratuité des stationnements pour mettre en place une offre de stationnement abordable à proximité des lieux publics (écoles, universités, ...).

## Type de visualisation envisagée

Le rendu final de notre travail se présentera sous la forme d’une carte où chaque stationnement sera catégorisé en 3 catégories :

- Stationnement utile
- Stationnement utile mais mal positionné
- Stationnement inutile

une visualisation similaire aux captures d'écran suivantes est envisagée

![image](https://github.com/user-attachments/assets/041b4a79-59be-4b8c-bec7-c284d0f60425)

(image tirée du lien suivant : https://creativemarket.com/mouse_md/4052652-Parking-Map-for-App-Card)

![image](https://github.com/user-attachments/assets/fe85876a-5d65-42a6-aae6-da06e9922ad8)

Cette derniere image provient du site d'esri Canada serait une représentation fidèle de ce à quoi nous voulons que notre projet ressemble. a savoir une carte interactive montrant toutes les entités voulue (dans notre cas, les stationnememts) avec des informations supplémentaires lorsqu'on les selectionnes individuellement.

(https://www.esri.ca/fr-ca/products/geo-enabled-products/arcgis-urban/overview)



## Intérêt du tableau de bord

Ce visuel sera disponible sur un tableau de bord interactif (ArcGIS Online) qui fera apparaître d’autres objets permettant de comprendre le contexte géographique de chaque stationnement et ainsi permettre aux décideurs de prendre les décisions dans les meilleures dispositions.
