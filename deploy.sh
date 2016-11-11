#!/bin/bash

if [ -z $WEB_API_URL ]; then
  echo "You forgot to set the WEB_API_URL environment variable."
  echo "WEB_API_URL is a fully formed URL (includes http://) pointing to a FarmBot API server."
  echo "Please run again with WEB_API_URL set."
  exit 1
fi

apt-get update
curl -sL https://deb.nodesource.com/setup_7.x | bash -
apt-get install -y nodejs
apt-get install -y letsencrypt

npm install