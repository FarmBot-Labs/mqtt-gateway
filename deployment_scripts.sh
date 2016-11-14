#!/bin/bash

# HOW TO GET LET'S ENCRYPT RUNNING:
    # STEP 1:
        # SSH into runing container and execute:
        # docker exec -i -t loving_heisenberg /bin/bash
    # STEP 2:
        # Run this from the shell:
    letsencrypt certonly --webroot \
                        -w /app/public \
                        -d $SSL_DOMAIN \
                        --text \
                        --non-interactive \
                        --agree-tos \
                        --email $SSL_EMAIL

# HOW TO BUILD THE IMAGE:
    # Using local repo:
    sudo docker build -t mqtt .
    # Using Official Repo:
    sudo docker build -t mqtt https://github.com/FarmBot/mqtt-gateway.git

# HOW TO RUN THE IMAGE:
    sudo docker run -d -e WEB_API_URL=http://YOUR_API_URL_HERE \
                    -p 3002:3002 \
                    -p 1883:1883 \
                    -p 80:3002 \
                    -p 443:443 \
                    -v /etc/letsencrypt/:/etc/letsencrypt/ \
                    --restart=always mqtt \
