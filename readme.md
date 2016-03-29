# Not In Use

This is a prototype that is not currently used.

# How It Will Work (When Finished)

1. Connect to `my.farmbot.io` with any MQTT client
2. Use your myfarmbot username / pass as MQTT credentials.
3. RPC all the things.

# Installation

1. git clone THIS_REPO
2. cd THIS_REPO
3. npm install
4. node index.js
5. Visit `http://localhost:3000` or `mqtt://localhost:1883`

# Deploy

0. Create a fresh Ubuntu 14.04 LTS image and install Docker (Hint: use scaleway or digitalocean)
0. Run docker: `sudo service docker start`
0. Install Dokku:
```
# installs dokku via apt-get
wget https://raw.githubusercontent.com/dokku/dokku/v0.5.2/bootstrap.sh
sudo DOKKU_TAG=v0.5.2 bash bootstrap.sh
```

# TODO

1. Tie into `authorizePublish` and `authorizeSubscribe`..
2. Deploy to prod.
