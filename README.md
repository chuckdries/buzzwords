# Buzzwords.gg

"Scrabble meets Go" - a hexagonal word game about strategically taking territory

### [gameplay demo](https://twitter.com/BuzzwordsGG/status/1476286068898996225?s=20)

## Follow our twitter for updates

https://twitter.com/BuzzwordsGG


## Running the code for development

0. drop a `.env` file in `./server` with `API_PREFIX=/api`
1. run `yarn` in this folder
2. run `yarn dev` in this folder
4. go to http://localhost:5173/ in your browser

By default, the server stores all its data in memory only. To use mongo, drop a .env file in `./server` with 
```
DB_TYPE=mongo
MONGO_URL=<your connection string>
```

Because we're using transactions, your mongo must be a replica set. We're using Atlas for this reason.


## Running the code in production

For now, production is dockerized with docker compose. `docker-compose build` or `docker-compose pull`, then `docker-compose up`.
You'll need a .env file in the root folder with 
```
MONGO_URL=<your connection string>
COOKIE_DOMAIN=<the domain you're hosting the API on>
MONGO_DB_NAME=<the name of your db, should match what's after the slash in your connection string>
```

TODO document FCM stuff. for now see https://firebase.google.com/docs/admin/setup#initialize_the_sdk_in_non-google_environments