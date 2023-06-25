#!/bin/sh

CHANNEL_NAME="default"
PROJPATH=$(pwd)
CLIPATH=$PROJPATH/cli/peers

echo
echo "##########################################################"
echo "#########  Generating Orderer Genesis block ##############"
echo "##########################################################"
$PROJPATH/configtxgen -profile FourOrgsGenesis -outputBlock $CLIPATH/genesis.block

echo
echo "#################################################################"
echo "### Generating channel configuration transaction 'channel.tx' ###"
echo "#################################################################"
$PROJPATH/configtxgen -profile FourOrgsChannel -outputCreateChannelTx $CLIPATH/channel.tx -channelID $CHANNEL_NAME
cp $CLIPATH/channel.tx $PROJPATH/web

echo
echo "#################################################################"
echo "####### Generating anchor peer update for CourtOrg ##########"
echo "#################################################################"
$PROJPATH/configtxgen -profile FourOrgsChannel -outputAnchorPeersUpdate $CLIPATH/CourtOrgMSPAnchors.tx -channelID $CHANNEL_NAME -asOrg CourtOrgMSP

echo
echo "#################################################################"
echo "#######    Generating anchor peer update for PrisonOrg   ##########"
echo "#################################################################"
$PROJPATH/configtxgen -profile FourOrgsChannel -outputAnchorPeersUpdate $CLIPATH/PrisonOrgMSPAnchors.tx -channelID $CHANNEL_NAME -asOrg PrisonOrgMSP

echo
echo "##################################################################"
echo "####### Generating anchor peer update for InvestigationOrg ##########"
echo "##################################################################"
$PROJPATH/configtxgen -profile FourOrgsChannel -outputAnchorPeersUpdate $CLIPATH/InvestigationOrgMSPAnchors.tx -channelID $CHANNEL_NAME -asOrg InvestigationOrgMSP

echo
echo "##################################################################"
echo "#######   Generating anchor peer update for LawEnforcementOrg   ##########"
echo "##################################################################"
$PROJPATH/configtxgen -profile FourOrgsChannel -outputAnchorPeersUpdate $CLIPATH/LawEnforcementOrgMSPAnchors.tx -channelID $CHANNEL_NAME -asOrg LawEnforcementOrgMSP

