import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';


const { Gateway,Wallets} = require('fabric-network');
// const FabricCAServices = require('fabric-ca-client');

// const walletPath = './assets/wallet'
// let ccp = require('./assets/connection-org1.json')




const getAllAssets = async () => {

//Returns a "hello world" message to show interaction with the native module
  // await HlfSdk.connectionProfileSetup(ccp);
  const org1UserId = 'appUser';
  const channelName = "mychannel";
  const chaincodeName = "basic";

  const wallet = await Wallets.newFileSystemWallet(walletPath);


  const gateway = new Gateway();
            await gateway.connect(ccp, {
                wallet,
                identity:org1UserId,
                discovery: { enabled: true, asLocalhost: true },
            });

  // Build a network instance based on the channel where the smart contract is deployed
  const network = await gateway.getNetwork(channelName);

  // Get the contract from the network.
  const contract = network.getContract(chaincodeName);

  let result = await contract.evaluateTransaction('GetAllAssets');

  return JSON.parse(result);
}

export default function App() {
  return (
    <View style={styles.container}>
      <Text>{{result}}</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
