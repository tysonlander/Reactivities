Start the backend: cd API, "dotnet watch --no-hot-reload" or 'dotnet run'
Start the frontend: cd client-app, npm start

drop the database: "dotnet ef database drop -s API -p Persistence"
 Migration:
- "dotnet ef migrations add {{giveMigrationName}} -p Persistence -s {{giveProjectName - in this case "API"}}
- Add a migration after any changes to the models

Troubleshooting
- run "dotnet restore" if you think you should have access to something but don't


Docker
- create docker image for postgres "docker run --name reactivitiesDev -e POSTGRES_USER=admin -e POSTGRES_PASSWORD=secret -p 5435:5432 -d postgres:latest" (I changed to 5435 because 5432 was already in use)
- build the docker image: "docker build -t {dockeraccountUsername}/reactivities ."
- build the docker image: "docker build -t {dockeraccountUsername}/reactivities:latest ."
- run the image: "docker run --rm -it -p 8080:80 {dockeraccountUsername}/reactivities"
- push to docker: "docker push {dockerAccountUsername}/reactivities:latest"
