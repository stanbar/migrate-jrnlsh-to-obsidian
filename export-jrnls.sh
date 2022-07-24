#!/bin/bash

mkdir -p journals
rm journals/*
jrnl --format json --file journals/
