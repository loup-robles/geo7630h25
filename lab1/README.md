# **📚 Laboratoire 1**
## **Étape 1, prise en main de GitHub**
la premiere étape consiste à prendre en main l'interface de GitHub. On commence par se creér un compte pour y créer un répertoire (repositorie en anglais) dans lequel on archivera tous les laboratoires et travaux pratiques du cours. Ce répertoire sera le plus organisé possible en y créant des dossiers et les nommant, ainsi que les fichiers, avec une nomanclature logique. On créer le fichier "lab1". Les fichiers README sont crées et rempli pour la traçabilité de la démarche.

## **Étape 2, création d'un workbench FME**
Cette étape propose une prise en main rapide de FME, en observant les potentialités du logiciels que nous utiliseront tout au long de la session (connection à une base de données en ligne, mise à jour de base de données, ect). On utilise ici une base de données disponible en ligne sur le site des données ouvertes de la ville de Montréal et représentant les établissements alimentaires. L'objectif est de prendre les informations de la base de données ; de les transformer pour, à partir des champs lat/long, obtenir les géométries des points avant de les réinjecter dans une autre base de donnée. Cette autre base de données est une base de données postgis hebergée sur un serveur amazon. On pourra ensuite visualiser la donnée.

Le Workbench ressemble à ça :

![FME_workbench](https://github.com/user-attachments/assets/0e7f728b-0044-405b-9052-41d9bd669409)

- La premiere boite est un Reader qui extrait les données CSV à partir de l'URL d'où est la donnée.

![FME_add_reader](https://github.com/user-attachments/assets/716decf3-079b-4147-b9c2-e57ad49c8449)

- Le regroupement de boite suivant est un transformer (VertexCreator) qui ajoute des coordonnées à partir des latitudes longitudes. Ce transformer a rendu 2106 erreurs qui sont des entités dont les valeurs des champs latitudes longitudes etaient nulles. ils sont stocké dans un logger.
- La dernière boite est un Writer qui injecte la données transformée dans notre base de données.

![FME_add_writer](https://github.com/user-attachments/assets/bddf51fc-9314-46ad-a4f0-2a390ce70e9e)

## **Étape 3, visualisation des données sur QGIS**
Pour visualiser la données transformées, on créer une connection Postgis avec notre base de données. 

![QGIS_connection_postgis](https://github.com/user-attachments/assets/702afd87-9d17-444b-87e7-3deba8374444)

Il reste simplement à ajouter la couche ponctuelle des établissements alimentaires et à modifier sa symbologie.

![QGIS_visualisation](https://github.com/user-attachments/assets/dff44ac5-1d68-4038-a1c7-e21aa66077cf)
