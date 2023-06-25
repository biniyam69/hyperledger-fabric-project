#!/bin/bash

docker rm -f $(docker ps -aq)
images=( web law-enforcement-peer court-peer investigation-peer prison-peer law-enforcement-ca court-ca prison-ca investigation-ca )
for i in "${images[@]}"
do
	echo Removing image : $i
  docker rmi -f $i
done

#docker rmi -f $(docker images | grep none)
images=( dev-investigation-peer dev-lawenforcement-peer dev-court-peer dev-prison-peer)
for i in "${images[@]}"
do
	echo Removing image : $i
  docker rmi -f $(docker images | grep $i )
done