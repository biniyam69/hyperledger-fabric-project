#!/bin/bash
set -eu

dockerFabricPull() {
  local FABRIC_TAG=$1
  for IMAGES in peer orderer ccenv; do
    echo "==> FABRIC IMAGE: $IMAGES"
    echo
    docker pull hyperledger/fabric-$IMAGES:$FABRIC_TAG
    docker tag hyperledger/fabric-$IMAGES:$FABRIC_TAG hyperledger/fabric-$IMAGES
  done
}

dockerCaPull() {
  local CA_TAG=$1
  echo "==> FABRIC CA IMAGE"
  echo
  docker pull hyperledger/fabric-ca:$CA_TAG
  docker tag hyperledger/fabric-ca:$CA_TAG hyperledger/fabric-ca
}

BUILD=
DOWNLOAD=
if [ $# -eq 0 ]; then
  BUILD=true
  PUSH=true
  DOWNLOAD=true
else
  for arg in "$@"
  do
    if [ $arg == "build" ]; then
      BUILD=true
    fi
    if [ $arg == "download" ]; then
      DOWNLOAD=true
    fi
  done
fi

if [ $DOWNLOAD ]; then
  : ${CA_TAG:="latest"}
  : ${FABRIC_TAG:="latest"}

  echo "===> Pulling Fabric Images"
  dockerFabricPull ${FABRIC_TAG}

  echo "===> Pulling Fabric CA Image"
  dockerCaPull ${CA_TAG}
  echo
  echo "===> List out Hyperledger Docker images"
  docker images | grep hyperledger*
fi

if [ $BUILD ]; then
  echo '############################################################'
  echo '#                 BUILDING CONTAINER IMAGES                #'
  echo '############################################################'
  docker build -t orderer:latest orderer/
  docker build -t law-enforcement-peer:latest lawEnforcementPeer/
  docker build -t prison-peer:latest prisonPeer/
  docker build -t court-peer:latest courtPeer/
  docker build -t investigation-peer:latest investigationPeer/
  docker build -t web:latest web/
  docker build -t law-enforcement-ca:latest lawEnforcementCA/
  docker build -t prison-ca:latest prisonCA/
  docker build -t court-ca:latest courtCA/
  docker build -t investigation-ca:latest investigationCA/
fi
