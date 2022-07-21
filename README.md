# Test-technique-Troov

Application web contenant une interface simple qui permet l'authentification et la gestion simple d'un objet Personne.
L'application web est hebergé sur mon VPS à l'adresse suivante: [51.79.255.217:4080](51.79.255.217:4080)

## Configurations d'installation

Pour tester le projet en local, ouvrez un terminal et lancez les commandes suivantes:
```
> git clone https://github.com/YannickCardini/Test-technique-Troov.git
> cd Test-technique-Troov/front-troov/
> npm i
> npm run dev
```

puis ouvrer un autre terminal pour lancer le back:
```
> cd Test-technique-Troov/server
> echo "DATABASE_URL ={**VOTRE_MONGODB_DATABASE_URL**}" > .env
> npm i
> npm start
```