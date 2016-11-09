FROM node:4-onbuild
MAINTAINER rick@farmbot.io

EXPOSE 3002
EXPOSE 1883

# CMD ["npm", "install"]
CMD ["npm", "start"]
