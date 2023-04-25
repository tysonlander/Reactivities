Start the backend: cd API, dotnet watch --no-hot-reload
Start the frontend: cd client-app, npm start

drop the database: "dotnet ef database drop -s API -p Persistence"
Add a migration:
- "dotnet ef migrations add {{giveMigrationName}} -p Persistence -s {{giveProjectName - in this case "API"}}
- Add a migration after any changes to the models

Troubleshooting
- run "dotnet restore" if you think you should have access to something but don't