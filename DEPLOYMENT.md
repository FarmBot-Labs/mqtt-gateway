# How to Deploy

 0. Get a nice, fresh VM with Ubuntu 16. We recomend the one that comes pre-installed Docker on Digital Ocean.
 0. [Install Docker if you didn't use Digital Ocean's docker image.](https://docs.docker.com/engine/installation/linux/ubuntulinux/). DigitalOcean offers an Ubuntu image that comes pre-installed with Docker.
 0. `sudo docker build -t mqtt https://github.com/FarmBot/mqtt-gateway.git`
 0. Run this:

```shell
sudo docker run -d \
                -e WEB_API_URL=http://YOUR_API_URL_HERE \
                -p 3002:3002 \
                -p 8883:8883 \
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
                    -d SSL_DOMAIN_HERE \
                    --text \
                    --non-interactive \
                    --agree-tos \
                    --email SSL_EMAIL_HERE

```

** Step 3: **

Exit from the shell session (`exit`) and set the `SSL_DOMAIN`.

You can accomplish this by running the same command during setup (see top of document), but this time add an additional flag to `docker run`:
```
sudo docker run -d \
                -e WEB_API_URL=http://YOUR_API_URL_HERE \
                -e SSL_DOMAIN=YOUR-MQTT-DOMAIN-HERE \
                -p 3002:3002 \
                -p 8883:8883 \
                -p 1883:1883 \
                -p 80:3002 \
                -p 443:443 \
                -v /etc/letsencrypt/:/etc/letsencrypt/ \
                --restart=always mqtt
```
# Renewing SSL Certs with Let's Encrypt

**NOTE:** I have made a script, `letsencrypt_renewal.sh` to help.

**Step 1**

SSH into the runing docker container (`docker exec -i -t CONTAINER_ID_HERE /bin/bash`)

**Step 2**

Run `letsencrypt renew` within 90 day. There is a `--force` flag if you care to use it.

**Step 3**

Kill the container. `docker kill CONTAINER_NAME`.
Re-run the container, this time with two extra ENV vars:

```shell

sudo docker run -d \
                -e WEB_API_URL=http://YOUR_API_URL_HERE \
                -e SSL_DOMAIN=YOUR_MQTT_URL_HERE \
                -e SSL_EMAIL=you@domain.com \
                -p 3002:3002 \
                -p 8883:8883 \
                -p 1883:1883 \
                -p 80:3002 \
                -p 443:443 \
                -v /etc/letsencrypt/:/etc/letsencrypt/ \
                --restart=always mqtt
```
