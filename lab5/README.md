# **📚 Laboratoire 5**, Intégration et visualisation de données 3D Lidar et tuiles 3D Vectorielles


## **Étape 1**, ajout des données

On commence par ajouter les 6 nuages de points au FME. Pour réduire le temps de traitement on utilise un *PointCloudThinner* dont le but est de concerver uniquement un point tous les "n" points présent. ici, n = 30.
![alt text](1.JPG)
![alt text](2.JPG)
![alt text](4.JPG)

## ** Étape 2**, importation des limites terrestres et découpage des nuages de points**

apres avoir ajouté les limites on les reprojete 

![alt text](5.JPG)

puis on clip les nuages de points selon les limites terrestre

![alt text](6.JPG)

## **Étape 3**, ajout de raster géoréférencés**

On drag and drop les 4 images directement dans FME avant de les reprojeter

![alt text](7.JPG)

Pour fuisionner les 4 images, on créer une mosaique avec le transformer *RasterMosaicker*

![alt text](8.JPG)

On cherche à supprimer la 4ème band de l'image. celle qui stocke les valeur alpha (étape pas réussi mais pas essentielle car la bande qu'on cherche à supprimer est invisible.)

![alt text](9.JPG)

On reprojete les valeurs avec *EsriReprojector*.

![alt text](10.JPG) 

## ** Étape 4**, drapper les muages de point avec les couleurs des images sattelite**

Puis, avec *PointCloudOnRasterComponentSetter* On ajoute la couleur prélevé des images sattelites, aux nuages de points.

![alt text](11.JPG)

Ensuite on effectue la séquence de traitements suivant: 
- *PointCombiner* Pour combiner le résultat précédant en une donnée
- *PointCloudFilter* Pour supprimer les points dont le raster n'a de valeur
insert photo PointCloudFilter
- *PointCloudToPointCoercer* Pour transformer les nuages de points en points.

![alt text](13.JPG)

## **Étape 5**, Ajouter l'empreinte de batiments

On ajoute les données, on les reprojettent avec *EsriReprojector*
![alt text](14.JPG)
![alt text](15.JPG)

On ajoute un *BoundingBoxAccumulator* à la fin de notre boite de traitements des images raster. Cette bbox delimite la zone couverte par la donnée

![alt text](image.png)

On clippe chaque couche avec la BoundingBoxAccumulator

![alt text](image-1.png)

*PolygonCutter* 
![alt text](16.JPG)

*PointOnAreaOverlayer* pour faire la jointure entre les points lidar et l'image raster
![alt text](17.JPG)

*listsummer* calcul la somme des surface de toits des batiments 

![alt text](image-2.png)

*AttributeCreator* pour créer un nouveau champ z et lui attribuer une valeur
![alt text](image-3.png)

*AttributeManager* pour nettoyer la table
*ColorConverter* pour mettre les couleur en RGB
![alt text](image-4.png)

## **Étape 6**, visualisation

![alt text](22.JPG)
![alt text](23.JPG)