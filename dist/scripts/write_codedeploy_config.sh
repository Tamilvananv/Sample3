#!/bin/bash

set -e

mkdir -p /var/www/apache2

cat <<EOF >/var/www/apache2/env.properties
APPLICATION_NAME=$APPLICATION_NAME
DEPLOYMENT_GROUP_NAME=$DEPLOYMENT_GROUP_NAME
DEPLOYMENT_ID=$DEPLOYMENT_ID
EOF