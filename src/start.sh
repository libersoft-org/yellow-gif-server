#!/bin/sh

bun i
echo -ne "\033]0;YELLOW GIF SERVER\007"
bun server.js $1
