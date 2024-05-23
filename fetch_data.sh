#!/usr/bin/env bash

# download: 
# * data from nhood_data release
# * metadata from scratchpad
# * shapes from scratchpad

datarepo="CT-Data-Haven/nhood_profile_data22"
# toporepo="CT-Data-Haven/scratchpad"

datatag="viz"
# topotag="geos"

gh release download "$datatag" \
  --repo "$datarepo" \
  --dir src/data \
  --clobber

mv src/data/*_topo.json src/data/shapes

# gh release download "$topotag" \
  # --repo "$toporepo" \
  # --dir src/data/shapes \
  # --clobber