#!/bin/bash

./export-jrnls.sh

mkdir -p out
rm -rf out/*

deno run --compat --unstable --allow-read --allow-write=./ --allow-env index.ts ./journals
