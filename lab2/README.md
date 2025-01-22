# **📚 Laboratoire 2**
## **Étape 1, ajouter les données**

on commence ce laboratoire en ajoutant les données au FME. ici deux données sont utilisées : 
- une couche ponctuelle des arbres sur le territoire de la ville de Montréal
- une couche du découpage des quartiers sur l'ile de Montréal

ces données sont ajoutés avec des readers adaptés : l'un vers CSV, l'autre vers GEOJSON et les deux en utilisant l'URL du liens de téléchargement de la donnée.
Pour la couche des arbres la méthodologie de la ville de Montréal indique que les coordonnées X/Y des points ont été renseignée dans le système de coordonnées NAD83 MTM8 dont le code EPSG souvent utilisé est le 32188. J'ai donc utilisé ce système dans le reader de cette données.

## **Étape 2, Filtrer les données**

Mais lors de l'ajout, après observation des données on remarque que plusieurs points sont en dehors du terroitoire montréalais. Ceci est surement du à des erreurs dans le remplissage des champs lattitude/longitude lors de la création de la donnée. 

![1](https://github.com/user-attachments/assets/79ffc078-5180-4842-9100-d268133f629e)


Pour filtrer ces erreurs on utilise successivement deux transformers (AttributeRangeFilter) sur les champs lattitude et longitudes. les valeurs de longitudes éronnées semblent etre celles comprises entre -73,9 et -73,0. Pour les lattitudes ont exclues les valeurs qui ne sont pas comprises entre 45,4 et 45,8. Pour filtrer j'ai utilisé deux transformer "AttributeRangeFilter", l'un pour la lattitude, l'autre pour la longitude. les points dont les coordonnées sont éronnée sont stockés dans des loggers.

![2](https://github.com/user-attachments/assets/99a17d33-2ba7-49a0-81db-f1f389b1bae0)


Les deux données (arbres et quartiers) sont ensuite reprojetés vers le système de coordonnées indiqué dans le protocole : EPSG 3857

## **Étape 3, faire la jointure spatiale**

le transformer "PointOnAreaOverlayer" permet de faire une jointure spatiale entre la couche ponctuelle et polygonale que sont les arbres et les quartiers. on peut désormais savoir combien d'arbres se trouvent dans chaque quartiers.

![3](https://github.com/user-attachments/assets/adc77fcb-260e-41c2-9b96-f6a615500145)
![4](https://github.com/user-attachments/assets/7d54ff39-5fed-470a-b07f-86362d0573e3)

## **Étape 4, Nettoyer, organiser et calculer un nouveau champ sur la donnée

Le transformer "AttributeKeeper" permet de nettoyer la donnée en conservant uniquement les champs voulu. Le "AttributeManager" permet lui de renommer les champs ainsi que de modifier le type des champs. Il est utilisé ici pour renommer le champ "_overlaps" en "qt_arbres".
Le champ "densite_arbres" est calculé en divisant le nombre d'arbres par l'aire de l'arrondissement dans lesquels ils se trouvent. le transformer "AttributeCreator" est utilisé pour faire se calcule avec les paramètres suivant (ne pas oublier de remplir l'expression dans l'Arithmetic Editor).

![image](https://github.com/user-attachments/assets/d18a5617-522b-4e1a-98d5-cd247f9243ed)
