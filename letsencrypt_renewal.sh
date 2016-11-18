#!/bin/bash

letsencrypt renew
# Restart node:
pkill -9 node
