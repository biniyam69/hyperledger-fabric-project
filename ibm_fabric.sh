#!/bin/sh
set -e

echo
echo "#################################################################"
echo "#######        Generating cryptographic material       ##########"
echo "#################################################################"
PROJPATH=$(pwd)
CLIPATH=$PROJPATH/cli/peers
ORDERERS=$CLIPATH/ordererOrganizations
PEERS=$CLIPATH/peerOrganizations

rm -rf $CLIPATH
$PROJPATH/cryptogen generate --config=$PROJPATH/crypto-config.yaml --output=$CLIPATH

sh generate-cfgtx.sh

# Remove existing crypto directories
rm -rf $PROJPATH/orderer/crypto
rm -rf $PROJPATH/courtPeer/crypto
rm -rf $PROJPATH/prisonPeer/crypto
rm -rf $PROJPATH/lawEnforcementPeer/crypto
rm -rf $PROJPATH/investigationPeer/crypto

# Create new crypto directories
mkdir $PROJPATH/orderer/crypto
mkdir $PROJPATH/courtPeer/crypto
mkdir $PROJPATH/prisonPeer/crypto
mkdir $PROJPATH/lawEnforcementPeer/crypto
mkdir $PROJPATH/investigationPeer/crypto

# Copy crypto files
cp -r $ORDERERS/orderer-org/orderers/orderer0/msp $PROJPATH/orderer/crypto
cp -r $ORDERERS/orderer-org/orderers/orderer0/tls $PROJPATH/orderer/crypto
cp -r $PEERS/court-org/peers/court-peer/msp $PROJPATH/courtPeer/crypto
cp -r $PEERS/court-org/peers/court-peer/tls $PROJPATH/courtPeer/crypto
cp -r $PEERS/prison-org/peers/prison-peer/msp $PROJPATH/prisonPeer/crypto
cp -r $PEERS/prison-org/peers/prison-peer/tls $PROJPATH/prisonPeer/crypto
cp -r $PEERS/law-enforcement-org/peers/law-enforcement-peer/msp $PROJPATH/lawEnforcementPeer/crypto
cp -r $PEERS/law-enforcement-org/peers/law-enforcement-peer/tls $PROJPATH/lawEnforcementPeer/crypto
cp -r $PEERS/investigation-org/peers/investigation-peer/msp $PROJPATH/investigationPeer/crypto
cp -r $PEERS/investigation-org/peers/investigation-peer/tls $PROJPATH/investigationPeer/crypto

cp $CLIPATH/genesis.block $PROJPATH/orderer/crypto/

COURTCAPATH=$PROJPATH/CourtCA
INVESTIGATIONCAPATH=$PROJPATH/InvestigationCA
LAWENFORCEMENTCAPATH=$PROJPATH/LawEnforcementCA
PRISONCAPATH=$PROJPATH/PrisonCA

rm -rf $COURTCAPATH/ca
rm -rf $INVESTIGATIONCAPATH/ca
rm -rf $LAWENFORCEMENTCAPATH/ca
rm -rf $PRISONCAPATH/ca
rm -rf $COURTCAPATH/tls
rm -rf $INVESTIGATIONCAPATH/tls
rm -rf $LAWENFORCEMENTCAPATH/tls
rm -rf $PRISONCAPATH/tls

mkdir -p $COURTCAPATH/ca
mkdir -p $INVESTIGATIONCAPATH/ca
mkdir -p $LAWENFORCEMENTCAPATH/ca
mkdir -p $PRISONCAPATH/ca
mkdir -p $COURTCAPATH/tls
mkdir -p $INVESTIGATIONCAPATH/tls
mkdir -p $LAWENFORCEMENTCAPATH/tls
mkdir -p $PRISONCAPATH/tls

cp $PEERS/court-org/ca/* $COURTCAPATH/ca
cp $PEERS/court-org/tlsca/* $COURTCAPATH/tls
mv $COURTCAPATH/ca/*_sk $COURTCAPATH/ca/key.pem
mv $COURTCAPATH/ca/*-cert.pem $COURTCAPATH/ca/cert.pem
mv $COURTCAPATH/tls/*_sk $COURTCAPATH/tls/key.pem
mv $COURTCAPATH/tls/*-cert.pem $COURTCAPATH/tls/cert.pem

cp $PEERS/investigation-org/ca/* $INVESTIGATIONCAPATH/ca
cp $PEERS/investigation-org/tlsca/* $INVESTIGATIONCAPATH/tls
mv $INVESTIGATIONCAPATH/ca/*_sk $INVESTIGATIONCAPATH/ca/key.pem
mv $INVESTIGATIONCAPATH/ca/*-cert.pem $INVESTIGATIONCAPATH/ca/cert.pem
mv $INVESTIGATIONCAPATH/tls/*_sk $INVESTIGATIONCAPATH/tls/key.pem
mv $INVESTIGATIONCAPATH/tls/*-cert.pem $INVESTIGATIONCAPATH/tls/cert.pem

cp $PEERS/law-enforcement-org/ca/* $LAWENFORCEMENTCAPATH/ca
cp $PEERS/law-enforcement-org/tlsca/* $LAWENFORCEMENTCAPATH/tls
mv $LAWENFORCEMENTCAPATH/ca/*_sk $LAWENFORCEMENTCAPATH/ca/key.pem
mv $LAWENFORCEMENTCAPATH/ca/*-cert.pem $LAWENFORCEMENTCAPATH/ca/cert.pem
mv $LAWENFORCEMENTCAPATH/tls/*_sk $LAWENFORCEMENTCAPATH/tls/key.pem
mv $LAWENFORCEMENTCAPATH/tls/*-cert.pem $LAWENFORCEMENTCAPATH/tls/cert.pem

cp $PEERS/prison-org/ca/* $PRISONCAPATH/ca
cp $PEERS/prison-org/tlsca/* $PRISONCAPATH/tls
mv $PRISONCAPATH/ca/*_sk $PRISONCAPATH/ca/key.pem
mv $PRISONCAPATH/ca/*-cert.pem $PRISONCAPATH/ca/cert.pem
mv $PRISONCAPATH/tls/*_sk $PRISONCAPATH/tls/key.pem
mv $PRISONCAPATH/tls/*-cert.pem $PRISONCAPATH/tls/cert.pem

WEBCERTS=$PROJPATH/web/certs
rm -rf $WEBCERTS
mkdir -p $WEBCERTS
cp $PROJPATH/orderer/crypto/tls/ca.crt $WEBCERTS/ordererOrg.pem
cp $PROJPATH/lawEnforcementPeer/crypto/tls/ca.crt $WEBCERTS/lawEnforcementOrg.pem
cp $PROJPATH/prisonPeer/crypto/tls/ca.crt $WEBCERTS/prisonOrg.pem
cp $PROJPATH/courtPeer/crypto/tls/ca.crt $WEBCERTS/courtOrg.pem
cp $PROJPATH/investigationPeer/crypto/tls/ca.crt $WEBCERTS/investigationOrg.pem
cp $PEERS/law-enforcement-org/users/Admin@law-enforcement-org/msp/keystore/* $WEBCERTS/Admin@law-enforcement-org-key.pem
cp $PEERS/law-enforcement-org/users/Admin@law-enforcement-org/msp/signcerts/* $WEBCERTS/
cp $PEERS/prison-org/users/Admin@prison-org/msp/keystore/* $WEBCERTS/Admin@prison-org-key.pem
cp $PEERS/prison-org/users/Admin@prison-org/msp/signcerts/* $WEBCERTS/
cp $PEERS/court-org/users/Admin@court-org/msp/keystore/* $WEBCERTS/Admin@court-org-key.pem
cp $PEERS/court-org/users/Admin@court-org/msp/signcerts/* $WEBCERTS/
cp $PEERS/investigation-org/users/Admin@investigation-org/msp/keystore/* $WEBCERTS/Admin@investigation-org-key.pem
cp $PEERS/investigation-org/users/Admin@investigation-org/msp/signcerts/* $WEBCERTS/
