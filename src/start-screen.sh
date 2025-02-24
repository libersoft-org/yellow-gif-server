#!/bin/sh

bun i
screen -dmS yellow-gif-server bash -c '
echo -ne "\033]0;YELLOW GIF SERVER\007"
while true; do
 bun server.js || exit 1
done
'
