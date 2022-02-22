## Requirements

- Node.js LTS

## Local development

- Create Azure resources
    - Azure Cosmos DB for MongoDB API
        - [Create resource](https://ms.portal.azure.com/#create/Microsoft.DocumentDB_MongoDB_Support) in Azure portal
        - Create database
        - Create collection
        - Copy the following to the `.env` file:
            - Connection string
            - Database name
            - Collection name
    - Azure Storage (for images)
        - [Create resource](https://ms.portal.azure.com/#create/Microsoft.StorageAccount)
            - Make sure `Blob public access` is enabled
        - Create container
        - Copy the following to the `.env` file:
            - Connection string
            - Container name
- Install npm dependencies: `npm install`
- Verify environment variables are set in `.env`
    - PORT=8080 - default port for Azure App Service
    - AZURE_COSMOSDB_CONNECTIONSTRING=
    - AZURE_COSMOSDB_MONGODB_DATABASE_NAME=
    - AZURE_COSMOSDB_MONGODB_COLLECTION_NAME=
    - AZURE_STORAGE_BLOB_CONNECTIONSTRING=
    - AZURE_STORAGE_BLOB_CONTAINER_NAME=
- Start the server: `npm start`
- Access Web App at: `http://127.0.0.1:8080`

