# **📚 Laboratoire 4**
## **Préparation du laboratoire, ajouter les données**

Après avoir téléchargé les données on les drag and drop dans le FME pour ajouter des readers. Les données sont composées de :
- Un raster analytique - Ilots de chaleur
- Une image aérienne - Ville-Marie
- Un MNS - Ville-Marie de résolution 1m


Pour ce laboratoire, le rapport sera divisé en 3 parties, une par donnée. Chaque partie détaillera les opération effectuées sur chaque données. Pour créer un FME ordonné on créer pour chaque reader un bookmark du nom de la donnée.

(insert image)

# 📜 **Parti 1 : intégration de l'image aérienne**

## Étape 1, extraire les propriétés de l'image

On commence par reprojeter la donnée avant d'utiliser le transformer "RasterPropertyExtractor" qui extrait les propriétés géométriques du raster et les transforme en attributs.

## Étape 2, redimensionner l'image

Le transformer "RasterResampler" est utilisé pour redimensionner l'image aérienne. Il est utile pour modifier la résolution spatiale, la taille ou la géométrie de l'image. Pour les paramètres, on divise le nombre de lignes et de colonnes par 10. (insert image)

## Étape 3, créer une série de pyramides raster

RasterPyramider est un transformer qui permet, à partir d'un raster, de créer une série de raster dont la résolution diminue d'image en image. 10 images sont ainsi créees.

## Étape 4, connecter le résultat à Postgis

Le featureWritter est préféré au simple writter ici. Il permet de chainer les actions les unes à la suite des autres. il faut cependant ajouter un "SQLExecutor" pour pouvoir créer une table dans notre base de donnée dans laquelle sera stocké l'image.

📢 **ATTENTION**: il faut faire attention à modifieir  rensiegner son code MS dans la commande SQL et d'ajouter des guillemets.

## Étape 5, visualisation

On peut desormais visualiser notre raster dans QGIS en se connectant à la base de donnée PostGIS.


# **Partie 2 : intégration du raster analytique des ilots de chaleurs**

## Étape 1,