#!/bin/bash

# === CONFIGURATION ===
MTAR_PATH="mta_archives/capm-smartforms_1.0.0.mtar"
ORG="Merit_Polymers Pvt Ltd._MeritPolymersSubdomain1"
SPACE="DEV"
CF_USER="mbk@meritpolymers.com"

# === DEPLOYMENT ===
echo "🔐 Logging into Cloud Foundry..."
cf login -a https://api.cf.sap.hana.ondemand.com -u "$CF_USER" -o "$ORG" -s "$SPACE"

if [ $? -ne 0 ]; then
  echo "❌ CF login failed. Aborting."
  exit 1
fi

echo "📦 Deploying $MTAR_PATH..."
cf deploy "$MTAR_PATH" -f

if [ $? -eq 0 ]; then
  echo "✅ Deployment successful!"
else
  echo "❌ Deployment failed. Check logs above or use: cf dmol -i <operation-id>"
fi
