#!/bin/bash

# Remove Docker containers
docker rm -f $(docker ps -aq)

# Remove Docker images
images=(orderer0 law-enforcement-peer court-peer investigation-peer prison-peer law-enforcement-ca shop-ca repairshop-ca)
for image in "${images[@]}"
do
	echo "Removing image: $image"
	docker rmi -f $image
done

# Remove specific Docker images
specific_images=(dev-law-enforcement-peer dev-court-peer dev-investigation-peer dev-prison-peer)
for specific_image in "${specific_images[@]}"
do
	echo "Removing image: $specific_image"
	docker rmi -f $(docker images | grep $specific_image)
done

# Remove unused Docker images
docker rmi -f $(docker images | grep none)
