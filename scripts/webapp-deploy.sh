#!/usr/bin/env sh
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

az appservice plan create \
  --sku S1 \
  --resource-group ${GROUP_NAME} \
  --name ${WEBAPPS_PLAN_NAME} \
  --location ${DEFAULT_LOCATION} \
  --is-linux

az appservice web create \
  --resource-group ${GROUP_NAME} \
  --plan ${WEBAPPS_PLAN_NAME} \
  --name ${WEBAPPS_SITE_NAME}

az appservice web config update \
  --resource-group ${GROUP_NAME} \
  --name ${WEBAPPS_SITE_NAME} \
  --node-version ${WEBAPPS_NODE_VERSION} \
  --startup-file ${WEBAPPS_NODE_MAIN}

az appservice web source-control config-local-git \
  --resource-group ${GROUP_NAME} \
  --name ${WEBAPPS_SITE_NAME}

az appservice web deployment user set \
  --user-name ${WEBAPPS_DEPLOY_USER} \
  --password ${WEBAPPS_DEPLOY_PASSWORD}

az appservice web config appsettings update \
  --resource-group ${GROUP_NAME} \
  --name ${WEBAPPS_SITE_NAME} \
  --settings $(cat ${SCRIPT_DIR}/../.env | grep '^[A-Z]' | tr '\n' ' ')

if [ -e $(git remote | grep azure) ]; then
  git remote add azure https://${WEBAPPS_DEPLOY_USER}:${WEBAPPS_DEPLOY_PASSWORD}@${WEBAPPS_SITE_NAME}.scm.azurewebsites.net/${WEBAPPS_SITE_NAME}.git
fi

git push azure master:master

az appservice web browse \
  --name ${WEBAPPS_SITE_NAME} \
  --resource-group ${GROUP_NAME}
