Bienvenue sur le projet API Piiquante par Erwan de Belleville !


Configuration minimum pour l'installation :

    Node.Js : Version 18.12.0 LTS Or Later
    Navigateur web : Chrome


Procédure d'installation :

    1- Téléchargez la totalité du projet sur github

    2 - Créer une base de données sur MongoDB 

    3 - Créer un fichier .env dans le dossier config et copier/coller les éléments suivants en retirant les commentaires :
    PORT=3000 // A vous de choisir le port de votre choix pour faire tourner le server node
    DB_ADMIN_LOGIN=user:password  // Changez le pseudo et le mot de passe de votre base de données
    SECURITY_TOKEN=password // Définissez un mot de passe 
    IMAGEDIR="images" // Choisissez ou vous stockez vos images

    5- A la racine du dossier piiquante-api, créez un dossier vide "images"

    4- Lancez un npm install pour installer les dépendances du projets

    5- C'est prêt !


Procédure de lancement

    1-Démarrez le serveur backend :
        Ouvrir un nouveau terminal, entrer la commande "cd piiquante-api", puis "npm install" fichiers , puis entrer la commande "npm start" pour lancer le projet.

    3- Utilisez l'application sur localhost 4200 (http://localhost:4200/)

    4- Créez un compte et amusez vous a créer, liker et partager vos recettes !