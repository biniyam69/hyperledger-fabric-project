#!/bin/sh
set -e

echo
echo "#################################################################"
echo "#######        Generating cryptographic material       ##########"
echo "#################################################################"
PROJPATH=$(pwd)
CLIPATH=$PROJPATH/cli/peers
ORGS=$CLIPATH/organizations

rm -rf $CLIPATH
$PROJPATH/cryptogen generate --config=$PROJPATH/crypto-config.yaml --output=$CLIPATH

sh generate-cfgtx.sh

rm -rf $PROJPATH/{peer,lawEnforcementPeer,courtPeer,investigationAgencyPeer,prisonPeer}/crypto
mkdir $PROJPATH/{peer,lawEnforcementPeer,courtPeer,investigationAgencyPeer,prisonPeer}/crypto
cp -r $ORGS/orderer/{msp,tls} $PROJPATH/peer/crypto
cp -r $ORGS/lawEnforcementOrg/{msp,tls} $PROJPATH/lawEnforcementPeer/crypto
cp -r $ORGS/courtOrg/{msp,tls} $PROJPATH/courtPeer/crypto
cp -r $ORGS/investigationAgencyOrg/{msp,tls} $PROJPATH/investigationAgencyPeer/crypto
cp -r $ORGS/prisonOrg/{msp,tls} $PROJPATH/prisonPeer/crypto
cp $CLIPATH/genesis.block $PROJPATH/peer/crypto/

LAWENFORCEMENTCAPATH=$PROJPATH/lawEnforcementCA
COURTCAPATH=$PROJPATH/courtCA
INVESTIGATIONAGENCYCAPATH=$PROJPATH/investigationAgencyCA
PRISONCAPATH=$PROJPATH/prisonCA

rm -rf {$LAWENFORCEMENTCAPATH,$COURTCAPATH,$INVESTIGATIONAGENCYCAPATH,$PRISONCAPATH}/{ca,tls}
mkdir -p {$LAWENFORCEMENTCAPATH,$COURTCAPATH,$INVESTIGATIONAGENCYCAPATH,$PRISONCAPATH}/{ca,tls}
cp $ORGS/lawEnforcementOrg/ca/* $LAWENFORCEMENTCAPATH/ca
cp $ORGS/lawEnforcementOrg/tlsca/* $LAWENFORCEMENTCAPATH/tls
mv $LAWENFORCEMENTCAPATH/ca/*_sk $LAWENFORCEMENTCAPATH/ca/key.pem
mv $LAWENFORCEMENTCAPATH/ca/*-cert.pem $LAWENFORCEMENTCAPATH/ca/cert.pem
mv $LAWENFORCEMENTCAPATH/tls/*_sk $LAWENFORCEMENTCAPATH/tls/key.pem
mv $LAWENFORCEMENTCAPATH/tls/*-cert.pem $LAWENFORCEMENTCAPATH/tls/cert.pem

cp $ORGS/courtOrg/ca/* $COURTCAPATH/ca
cp $ORGS/courtOrg/tlsca/* $COURTCAPATH/tls
mv $COURTCAPATH/ca/*_sk $COURTCAPATH/ca/key.pem
mv $COURTCAPATH/ca/*-cert.pem $COURTCAPATH/ca/cert.pem
mv $COURTCAPATH/tls/*_sk $COURTCAPATH/tls/key.pem
mv $COURTCAPATH/tls/*-cert.pem $COURTCAPATH/tls/cert.pem

cp $ORGS/investigationAgencyOrg/ca/* $INVESTIGATIONAGENCYCAPATH/ca
cp $ORGS/investigationAgencyOrg/tlsca/* $INVESTIGATIONAGENCYCAPATH/tls
mv $INVESTIGATIONAGENCYCAPATH/ca/*_sk $INVESTIGATIONAGENCYCAPATH/ca/key.pem
mv $INVESTIGATIONAGENCYCAPATH/ca/*-cert.pem $INVESTIGATIONAGENCYCAPATH/ca/cert.pem
mv $INVESTIGATIONAGENCYCAPATH/tls/*_sk $INVESTIGATIONAGENCYCAPATH/tls/key.pem
mv $INVESTIGATIONAGENCYCAPATH/tls/*-cert.pem $INVESTIGATIONAGENCYCAPATH/tls/cert.pem

cp $ORGS/prisonOrg/ca/* $PRISONCAPATH/ca
cp $ORGS/prisonOrg/tlsca/* $PRISONCAPATH/tls
mv $PRISONCAPATH/ca/*_sk $PRISONCAPATH/ca/key.pem
mv $PRISONCAPATH/ca/*-cert.pem $PRISONCAPATH/ca/cert.pem
mv $PRISONCAPATH/tls/*_sk $PRISONCAPATH/tls/key.pem
mv $PRISONCAPATH/tls/*-cert.pem $PRISONCAPATH/tls/cert.pem

WEBCERTS=$PROJPATH/web/certs
rm -rf $WEBCERTS
mkdir -p $WEBCERTS
cp $PROJPATH/peer/crypto/tls/ca.crt $WEBCERTS/peerOrg.pem
cp $PROJPATH/lawEnforcementPeer/crypto/tls/ca.crt $WEBCERTS/lawEnforcementOrg.pem
cp $PROJPATH/courtPeer/crypto/tls/ca.crt $WEBCERTS/courtOrg.pem
cp $PROJPATH/investigationAgencyPeer/crypto/tls/ca.crt $WEBCERTS/investigationAgencyOrg.pem
cp $PROJPATH/prisonPeer/crypto/tls/ca.crt $WEBCERTS/prisonOrg.pem
cp $ORGS/lawEnforcementOrg/users/Admin@lawEnforcement-org/msp/keystore/* $WEBCERTS/Admin@lawEnforcement-org-key.pem
cp $ORGS/lawEnforcementOrg/users/Admin@lawEnforcement-org/msp/signcerts/* $WEBCERTS/
cp $ORGS/prisonOrg/users/Admin@prison-org/msp/keystore/* $WEBCERTS/Admin@prison-org-key.pem
cp $ORGS/prisonOrg/users/Admin@prison-org/msp/signcerts/* $WEBCERTS/
cp $ORGS/courtOrg/users/Admin@court-org/msp/keystore/* $WEBCERTS/Admin@court-org-key.pem
cp $ORGS/courtOrg/users/Admin@court-org/msp/signcerts/* $WEBCERTS/
cp $ORGS/investigationAgencyOrg/users/Admin@investigationAgency-org/msp/keystore/* $WEBCERTS/Admin@investigationAgency-org-key.pem
cp $ORGS/investigationAgencyOrg/users/Admin@investigationAgency-org/msp/signcerts/* $WEBCERTS/
