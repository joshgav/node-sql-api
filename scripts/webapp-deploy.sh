#!/usr/bin/env bash
SCRIPT_DIR=$(dirname ${BASH_SOURCE[0]})

set -o allexport
source ${SCRIPT_DIR}/../.env
set +o allexport

exists=$(az group exists --name ${GROUP_NAME} --output json)
echo $GROUP_NAME exists: $exists
if [ $exists == 'false' ]; then
  az group create \
    --name ${GROUP_NAME} \
    --location ${DEFAULT_LOCATION}
fi

# az appservice plan create \
#   --sku S1 \
#   --resource-group ${GROUP_NAME} \
#   --name ${WEBAPPS_PLAN_NAME} \
#  --location ${DEFAULT_LOCATION} \
#  --is-linux

az webapp create \
  --resource-group ${GROUP_NAME} \
  --plan ${WEBAPPS_PLAN_NAME} \
  --name ${WEBAPPS_SITE_NAME} \
  --deployment-source-url 'https://github.com/joshgav/node-sql-api' \
  --runtime 'node|8.1' \
  --startup-file 'index.js'

az webapp config appsettings set \
  --resource-group ${GROUP_NAME} \
  --name ${WEBAPPS_SITE_NAME} \
  --settings $(cat ${SCRIPT_DIR}/../.env | grep '^[A-Z]' | tr '\n' ' ')

az webapp browse \
  --name ${WEBAPPS_SITE_NAME} \
  --resource-group ${GROUP_NAME}
