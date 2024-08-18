#!/usr/bin/env bash

docker run -it --rm -v ./:/usr/src/app:ro -p 4444:4000 starefossen/github-pages@sha256:5097d63b50e7a894b694761ded6ace912aa901b98f283824801db649ddb37684;