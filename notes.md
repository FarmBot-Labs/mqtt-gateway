dokku checks:disable 00-default
dokku config:set WEB_APP_URL=http://staging.farmbot.io
dokku proxy:disable 00-default
