# Troov technical test server side :fax:

A RESTful API using Node, Express, and MongoDB.

## Configurations d'installation

Installer les dépendances:
```
npm i
```

Lancer le serveur sur le port 3001:
```
npm start
```

## Lancer avec Docker :whale:

Lancer le server avec docker et l'exposer sur le port {PORT}:
```
docker build . -t <username>/server-troov
docker run -p {PORT}:3001 -d <username>/node-web-app
```

