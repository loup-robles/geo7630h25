# Laboratoire 11, Création d'une carte interactive web

## Étape 1 : configuration des fichiers

Apres avoir ouvert un codespace du repertoire de Clément, on créer dans ce dernier un nouveau dossier "semaine 11". On y ajoute les fichiers : 
- .env (qu'on copie-colle depuis le dossier "Atlas", utilisé lors du précédent lab

![image](https://github.com/user-attachments/assets/8def9fc5-725f-40a4-858f-c96257248839)


- .yml, le docker compose, lui aussi copié depuis le dossier Atlas et utilisé la semaine derniere mais on modifie le code des *volumes*

![image](https://github.com/user-attachments/assets/771c2fbf-2abf-4677-91f7-c15035b7a505)

- map-controls.js, dans lequel on initialise la carte en y ajoutant les objets suivants :
    -  Création de la carte (maplibregl.Map)
    -  Ajout de controle de géolocalisation
    -  Ajout de contrôle de navigation (zoom, boussole)

![image](https://github.com/user-attachments/assets/b7ddc2c3-62af-4ae4-9ef4-35844de2f195)

![image](https://github.com/user-attachments/assets/7f48c6f2-6978-4635-b9b7-6b63beb17d06)

!!! aller dans le `.html` pour y référer notre fichier `map-controls.js`

![image](https://github.com/user-attachments/assets/c5b26247-a756-4931-b8de-1b133c68b3b2)

# Étape 2, Ajout des couches de données

créer un fichier `map-layers.js` pour y créer les layer sous forme de variables

