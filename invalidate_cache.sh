#!/usr/bin/bash

aws cloudfront create-invalidation --distribution-id E2WQDPTF7CT3YQ --paths "/*"
