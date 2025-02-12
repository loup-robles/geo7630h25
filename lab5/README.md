# **📚 Laboratoire 5**


## Étape 1, ajout des données

On commence par ajouter les 6 nuages de points au FME. Pour réduire le temps de traitement on utilise un *PointCloudThinner* dont le but est de concerver uniquement un point tous les "n" points présent. ici, n = 30.

insert photo

## ** Étape 2 importation des limites terrestres et découpage des nuages de points**

apres avoir ajouté les limites on les reprojete 

insert photo 

puis on clip les nuages de points selon les limites terrestre

insert photo

## **Étape 3, ajout de raster géoréférencés**

On drag and drop les 4 images directement dans FME. On reprojecte ainsi :

insert reprojector2

Pour fuisionner les 4 images en 1 on créer une mosaique avec le transformer *RasterMosaicker*
On cherche à supprimer la 4ème band de l'image. celle qui stocke les valeur alpha (étape pas réussi mais pas essentielle car la bande qu'on cherche à supprimer est invisible.)

On reprojete les valeurs avec *EsriReprojector*. 

## ** Étape 4, drapper les muages de point avec les couleurs des images sattelite**

Puis, avec *PointCloudOnRasterComponentSetter* On ajoute la couleur prélevé des images sattelites, aux nuages de points.

insert photo

Ensuite : 
- *PointCombiner* Pour combiner le résultat précédant en une donnée
- *PointCloudFilter* Pour supprimer les points dont le raster n'a de valeur
insert photo PointCloudFilter
- *PointCloudToPointCoercer* Pour transformer les nuages de points en points.
Insert photo PointCloudToPointCoercer

## **Étape 5, Ajouter l'empreinte de batiments

- Ajout des données,
- reprojection avec *EsriReprojector*
- *BoundingBoxAccumulator* delimite la zone couverte par la donnée
- on clippe chaque couche avec la BoundingBoxAccumulator
- PolygonCutter
- PointOnAreaOverlayer (insert photo)
- listsummer calcul la somme des surface de toits des batiments

