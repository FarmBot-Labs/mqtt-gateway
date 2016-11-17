# How to Deploy

 0. Get a nice, fresh VM with Ubuntu 16. We recomend the one that comes pre-installed Docker on Digital Ocean.
 0. [Install Docker if you didn't use Digital Ocean's docker image.](https://docs.docker.com/engine/installation/linux/ubuntulinux/). DigitalOcean offers an Ubuntu image that comes pre-installed with Docker.
 0. `sudo docker build -t mqtt https://github.com/FarmBot/mqtt-gateway.git`
 0. Run this:

```shell
sudo docker run -d -e WEB_API_URL=http://YOUR_API_URL_HERE \
                -e SSL_DOMAIN=YOUR_MQTT_URL_HERE
                -e SSL_EMAIL=you@domain.com
                -p 3002:3002 \
                -p 1883:1883 \
                -p 80:3002 \
                -p 443:443 \
                -v /etc/letsencrypt/:/etc/letsencrypt/ \
                --restart=always mqtt
```

The server is now running.

# Using SSL with Let's Encrypt

**STEP 1:**

SSH into the runing docker container  (`docker exec -i -t CONTAINER_ID_HERE /bin/bash`)

**STEP 2:**

From inside the container, run:

```shell

letsencrypt certonly --webroot \
                    -w /app/public \
                    -d $SSL_DOMAIN \
                    --text \
                    --non-interactive \
                    --agree-tos \
                    --email $SSL_EMAIL

```

# Renewing SSL Certs with Let's Encrypt

**Step 1**

SSH into the runing docker container (`docker exec -i -t CONTAINER_ID_HERE /bin/bash`)

**Step 2**

SSH into the runing docker container  (`docker exec -i -t CONTAINER_ID_HERE /bin/bash`)

**Step 3**

Run `letsencrypt renew`. There is a `--force` flag if you care to use it.

**Step 4**

Restart the container. `docker restart CONTAINER_NAME`.