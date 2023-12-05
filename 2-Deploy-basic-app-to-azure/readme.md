# JavaScript on Azure Learn Path - Module 2 - Deploying a basic app to Azure

This Learn module requires the following Azure resources to deploy correctly:

* Azure App Service
* Azure Cosmos DB with MongoDB API

## Requirements

- Node.js LTS

## Local development

- Create Azure resources
    - Azure App Service  + Cosmos DB for MongoDB API
        - [Create resource](https://ms.portal.azure.com/#create/Microsoft.AppServiceWebAppDatabaseV3) in Azure portal
        - Create database
        - Create collection
        - Copy the following to the `.env` file:
            - Connection string
            - Database name
            - Collection name
- Install npm dependencies: `npm install`
- Verify environment variables are set in `.env`
    - PORT=8080 - default port for Azure App Service
    - MONGODB_URI_CONNECTION_STRING=
    - MONGODB_URI_DATABASE_NAME=
    - MONGODB_URI_COLLECTION_NAME=
- Start the server: `npm start`
- Access Web App at: `http://127.0.0.1:8080`