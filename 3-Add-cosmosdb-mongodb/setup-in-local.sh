#!/bin/bash 

# All resources and resource group will have the same name. 

# Prereqs
# - Must have local copy/clone of this sample repo and run this script from root of project (not root of repo)
# - Must have Azure CLI installed and cached signon (az login)
# - FILL IN SUBSCRIPTION

# With Bash and Azure CLI
# - Generate resource variables
# - Create resource group
# - Enable Application Insights
# - Create App Service and deploy sample code in '3-Add-cosmosdb-mongodb'

SUBSCRIPTION='REPLACE-WITH-YOUR-SUBSCRIPTION-ID'

#----------------------------------------------------------------------------------------
# DON"T CHANGE ANYTHING BELOW THIS LINE
#----------------------------------------------------------------------------------------

printf '%s \n' "$RESOURCEGROUPNAME"

let "ID=$RANDOM*$RANDOM"
LOCATION='westus'
RESOURCENAME="js-rentals-$ID"
RESOURCEGROUPNAME=$RESOURCENAME
echo "resource name is $RESOURCENAME"

OSTYPE="Linux"
RUNTIME="node|14-lts"

# Silently install AZ CLI extensions if needed
# on older versions
echo "Allow extensions to auto-install"
az config set extension.use_dynamic_install=yes_without_prompt

# - Create resource group
echo "Create resource group: $RESOURCEGROUPNAME"
az group create --subscription $SUBSCRIPTION --name $RESOURCENAME --location $LOCATION

# Create Azure Workspace for log analytics
#echo "Create log-analytics workspace"
#az monitor log-analytics workspace create --subscription $SUBSCRIPTION --resource-group $RESOURCEGROUPNAME --location $LOCATION --workspace-name $RESOURCENAME --query-access disabled --ingestion-access disabled

# - Create Monitor (Application Insights)
# az monitor app-insights component create --subscription $SUBSCRIPTION --resource-group $RESOURCEGROUPNAME --location $LOCATION --app jimb-rentals-with-data-83422584 --workspace "/subscriptions/320d9379-a62c-4b5d-84ab-52f2b0fc40ac/resourcegroups/jimb-rentals-with-data-83422584/providers/microsoft.operationalinsights/workspaces/jimb-rentals-with-data-83422584"
# WORKS - az monitor app-insights component create --subscription $SUBSCRIPTION --resource-group $RESOURCEGROUPNAME --location $LOCATION --app jimb-rentals-with-data-83422584 --workspace jimb-rentals-with-data-83422584
echo "Create app insights"
az monitor app-insights component create --subscription $SUBSCRIPTION --resource-group $RESOURCEGROUPNAME --location $LOCATION --app $RESOURCENAME #--workspace $RESOURCENAME	

# - Create App Service
# 
# - Create a webapp and deploy code from a local workspace to the app. 
# - The command is required to run from the folder where the code is present. 
#
# - add --debug to see verbose messages
echo "Create web app"
az webapp up --subscription $SUBSCRIPTION --resource-group $RESOURCEGROUPNAME --location $LOCATION --name $RESOURCENAME --os-type $OSTYPE --runtime $RUNTIME #--debug

# - Connect to App Service
echo "Connect web app to app insights"
az monitor app-insights component connect-webapp --subscription $SUBSCRIPTION --resource-group $RESOURCEGROUPNAME --app $RESOURCENAME --web-app $RESOURCENAME