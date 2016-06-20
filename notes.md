dokku apps:create 00-default
dokku checks:disable 00-default
dokku proxy:disable 00-default
dokku config:set 00-default WEB_APP_URL=http://staging.farmbot.io
dokku docker-options:add 00-default run -p 3002:3002
dokku docker-options:add 00-default run -p 1883:1883