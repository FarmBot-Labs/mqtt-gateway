#!/bin/bash

letsencrypt certonly --webroot \
                      -w /app/public \
                      -d $SSL_DOMAIN \
                      --text \
                      --non-interactive \
                      --agree-tos \
                      --email $SSL_EMAIL