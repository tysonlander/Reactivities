# FRONT END:

## Starting the Client:
1. cd client-app
2. `yarn add` 
3. yarn (running with run "npm i --legacy-peer-deps" package like "typescript" and "notistack" conflicting legacy dependancies weren't as well managed) 
4. yarn start


# Backend

## Starting the API:
1. cd API, 
    "dotnet watch --no-hot-reload" OR
    "dotnet run"

## Migration:
- "dotnet ef migrations add {{giveMigrationName}} -p Persistence -s {{giveProjectName - in this case "API"}}
- Add a migration after any changes to the models
- drop the database: "dotnet ef database drop -s API -p Persistence"

## Troubleshooting
- run "dotnet restore" if you think you should have access to something but don't
- port localhost:5000 is the client build version of the app being served from the api and port 3000 unbuilt version

Docker
- create docker image for postgres "docker run --name reactivitiesDev -e POSTGRES_USER=admin -e POSTGRES_PASSWORD=secret -p 5435:5432 -d postgres:latest" (I changed to 5435 because 5432 was already in use)
- build the docker image: "docker build -t {dockeraccountUsername}/reactivities ."
- build the docker image: "docker build -t {dockeraccountUsername}/reactivities:latest ."
- run the image: "docker run --rm -it -p 8080:80 {dockeraccountUsername}/reactivities"
- push to docker: "docker push {dockerAccountUsername}/reactivities:latest"
