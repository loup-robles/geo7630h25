# **📚 Laboratoire 2**
## **Étape 1, **

on commence ce laboratoire en ajoutant les données au FME. ici deux données sont utilisées : 
- une couche ponctuelle des arbres sur le territoire de la ville de Montréal
- une couche du découpage des quartiers sur l'ile de Montréal

ces données sont ajoutés avec des readers adaptés : l'un vers CSV, l'autre vers GEOJSON et les deux en utilisant l'URL du liens de téléchargement de la donnée.
Pour la couche des arbres la méthodologie de la ville de Montréal indique que les coordonnées X/Y des points ont été renseignée dans le système de coordonnées NAD83 MTM8 dont le code EPSG souvent utilisé est le 32188. J'ai donc utilisé ce système dans le reader de cette données.

Mais lors de l'ajout, après observation des données on remarque que plusieurs points sont en dehors du terroitoire montréalais. Ceci est surement du à des erreurs dans le remplissage des champs lattitude/longitude lors de la création de la donnée. Pour filtrer ces erreurs on utilise successivement deux transformers (AttributeRangeFilter) sur les champs lattitude et longitudes. les valeurs de longitudes éronnées semblent etre celles comprises entre -73,9 et -73,0. Pour les lattitudes ont exclues les valeurs qui ne sont pas comprises entre 45,4 et 45,8.


![1](https://github.com/user-attachments/assets/79ffc078-5180-4842-9100-d268133f629e)


Les deux données (arbres et quartiers) sont ensuite reprojetés vers le système de coordonnées indiqué dans le protocole : EPSG 3857

le transformer PointOnAreaOverlayer permet de faire une jointure spatiale entre la couche ponctuelle et polygonale que sont les arbres et les quartiers. on peut désormais savoir combien d'arbres se trouvent dans chaque quartiers.
