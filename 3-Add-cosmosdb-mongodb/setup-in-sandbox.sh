#!/bin/bash 

# All resources and resource group will have the same name. 

# Prereqs
# - Must have local copy/clone of this sample repo and run this script from root of project (not root of repo)
# - Must have Azure CLI installed and cached signon (az login)

# With Bash and Azure CLI
# - Create Application Insights resource
# - Create App Service resource, deploy sample code
# - Connect App Insights to App Service

#----------------------------------------------------------------------------------------
# DON'T CHANGE ANYTHING BELOW THIS LINE
#----------------------------------------------------------------------------------------

# az login -t 604c1504-c6a3-4080-81aa-b33091104187

RESOURCEGROUPSTRING=$(az group list --query "[0].name")
RESOURCEGROUPNAME=`sed -e 's/^"//' -e 's/"$//' <<<"$RESOURCEGROUPSTRING" `

printf '%s \n' "$RESOURCEGROUPNAME"

# Silently install AZ CLI extensions if needed
# on older versions
echo "Allow extensions to auto-install"
az config set extension.use_dynamic_install=yes_without_prompt

echo "Create app insights"
az monitor app-insights component create --resource-group "$RESOURCEGROUPNAME" --location westus --app js-rentals

echo "Create web app"
az webapp up --resource-group "$RESOURCEGROUPNAME" --location westus3 --name js-rentals --os-type "Linux" --runtime "node|14-lts" 

echo "Connect web app to app insights"
az monitor app-insights component connect-webapp --resource-group "$RESOURCEGROUPNAME" --app js-rentals --web-app js-rentals