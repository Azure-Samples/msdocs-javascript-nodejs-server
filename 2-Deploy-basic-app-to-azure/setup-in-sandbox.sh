#!/bin/bash 

# All resources and resource group will have the same name. 

# Prereqs
# - Must have local copy/clone of this sample repo and run this script from root of project (not root of repo)
# - Must have Azure CLI installed and cached signon (az login) - Az CLI is available from Learn sandbox terminal

# Learn sandbox provides
# - Free `Concierge subscription` with ability to create these exact resources
# -     Tenant ID: 604c1504-c6a3-4080-81aa-b33091104187
# - Resource group

# With Bash and Azure CLI
# - Create Application Insights resource
# - Create App Service resource and plan, deploy sample code
# - Connect App Insights to App Service

# If you need to switch tenant, use this command
# az login -t 604c1504-c6a3-4080-81aa-b33091104187

# To Run Script use the following command on the bash terminal
# bash setup-in-sandbox.sh 

#----------------------------------------------------------------------------------------
# DON'T CHANGE ANYTHING BELOW THIS LINE
#----------------------------------------------------------------------------------------

# <content_fullscript>

# Get Sandbox resource group provided for you
RESOURCEGROUPSTRING=$(az group list --query "[0].name")
RESOURCEGROUPNAME=`sed -e 's/^"//' -e 's/"$//' <<<"$RESOURCEGROUPSTRING" `

# Show resource group name
printf '%s \n' "$RESOURCEGROUPNAME"

# Silently install AZ CLI extensions if needed
# on older versions
echo "Allow extensions to auto-install"
az config set extension.use_dynamic_install=yes_without_prompt

echo "Create app insights"
az monitor app-insights component create --resource-group "$RESOURCEGROUPNAME" --location westus --app js-rentals

echo "Create web app and its plan"
az webapp up --resource-group "$RESOURCEGROUPNAME" --location westus3 --name js-rentals --os-type "Linux" --runtime "node|14-lts" 

echo "Connect web app to app insights"
az monitor app-insights component connect-webapp --resource-group "$RESOURCEGROUPNAME" --app js-rentals --web-app js-rentals

# </content_fullscript>
