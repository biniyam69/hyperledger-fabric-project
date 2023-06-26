#!/bin/bash
set -e

CORE_PEER_MSPCONFIGPATH=/peers/ordererOrganizations/orderer-org/orderers/orderer0/msp CORE_PEER_LOCALMSPID="OrdererMSP" peer channel create -o orderer0:7050 -c default -f /peers/orderer/channel.tx --tls true --cafile /peers/orderer/localMspConfig/cacerts/ordererOrg.pem

CORE_PEER_MSPCONFIGPATH=/peers/courtPeer/localMspConfig CORE_PEER_ADDRESS=court-peer:7051 CORE_PEER_LOCALMSPID=CourtOrgMSP CORE_PEER_TLS_ROOTCERT_FILE=/peers/courtPeer/localMspConfig/cacerts/courtOrg.pem peer channel join -b default.block

CORE_PEER_MSPCONFIGPATH=/peers/prisonPeer/localMspConfig CORE_PEER_ADDRESS=prison-peer:7051 CORE_PEER_LOCALMSPID=PrisonOrgMSP CORE_PEER_TLS_ROOTCERT_FILE=/peers/prisonPeer/localMspConfig/cacerts/prisonOrg.pem peer channel join -b default.block

CORE_PEER_MSPCONFIGPATH=/peers/investigationPeer/localMspConfig CORE_PEER_ADDRESS=investigation-peer:7051 CORE_PEER_LOCALMSPID=InvestigationOrgMSP CORE_PEER_TLS_ROOTCERT_FILE=/peers/investigationPeer/localMspConfig/cacerts/investigationOrg.pem peer channel join -b default.block

CORE_PEER_MSPCONFIGPATH=/peers/lawEnforcementPeer/localMspConfig CORE_PEER_ADDRESS=law-enforcement-peer:7051 CORE_PEER_LOCALMSPID=LawEnforcementOrgMSP CORE_PEER_TLS_ROOTCERT_FILE=/peers/lawEnforcementPeer/localMspConfig/cacerts/lawEnforcementOrg.pem peer channel join -b default.block

## Don't use TLS
# CORE_PEER_MSPCONFIGPATH=/peers/orderer/localMspConfig CORE_PEER_LOCALMSPID="OrdererMSP" peer channel create -o orderer0:7050 -c default -f /peers/orderer/channel.tx
#
# CORE_PEER_MSPCONFIGPATH=/peers/courtPeer/localMspConfig CORE_PEER_ADDRESS=court-peer:7051 CORE_PEER_LOCALMSPID=CourtOrgMSP peer channel join -b default.block
#
# CORE_PEER_MSPCONFIGPATH=/peers/prisonPeer/localMspConfig CORE_PEER_ADDRESS=prison-peer:7051 CORE_PEER_LOCALMSPID=PrisonOrgMSP peer channel join -b default.block
#
# CORE_PEER_MSPCONFIGPATH=/peers/investigationPeer/localMspConfig CORE_PEER_ADDRESS=investigation-peer:7051 CORE_PEER_LOCALMSPID=InvestigationOrgMSP peer channel join -b default.block
#
# CORE_PEER_MSPCONFIGPATH=/peers/lawEnforcementPeer/localMspConfig CORE_PEER_ADDRESS=law-enforcement-peer:7051 CORE_PEER_LOCALMSPID=LawEnforcementOrgMSP peer channel join -b default.block
