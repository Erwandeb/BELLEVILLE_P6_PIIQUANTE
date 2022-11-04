#Bienvenue sur le projet API Piiquante par Erwan de Belleville

##Minimum installation :

    NodeJs : Version 18.12.0 LTS Or Later

##Procédure d'installation :

    1- Téléchargez la totalité du projet sur github

    2 - Créer une base de données sur MongoDB 

    3 - Créer un fichier .env dans le dossier config qui contient les éléments suivant :
    PORT=3000 // A vous de choisir le port de votre choix pour faire tourner le server node
    CLIENT_URL=http://localhost:3000  // A vous de choisir le port de votre choix pour faire tourner le server node
    DB_ADMIN_LOGIN=user:password  // Changez le pseudo et le mot de passe de votre base de données
    SECURITY_TOKEN=password // Définissez un mot de passe 
    IMAGEDIR="images" // Choisissez ou vous stockez vos images

    4- Lancez un npm install pour installer les dépendances du projets

    5- C'est pret !


##Procédure de lancement


    1-Démarrez le serveur backend :
    Ouvrir un nouveau terminal, entrer la commande "cd piiquante-api", puis "npm install" fichiers , puis entrer la commande "npm start" pour lancer le projet.

    2-Démarrez l'appli frontend : 
    Ouvrir un nouveau terminal, entrer la commande "cd front", puis "npm install". A la fin du téléchargement entrez la commande "npm start"

    3- Utilisez l'application sur localhost 4200 (http://localhost:4200/)

    4- Créez un compte et amusez vous a créer, liker et partager vos recettes !