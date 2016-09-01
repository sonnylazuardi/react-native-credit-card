import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

import CreditCard from 'react-native-credit-card';

const s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: "center",
    marginTop: 100,
  },
});


export default class Example extends Component {
  render() {
    return (
      <View style={s.container}>
        <CreditCard
            imageFront={require('./images/card.png')}
            imageBack={require('./images/card.png')}
            shiny={false}
            bar
            focused
            number="4242424242424242"
            name="John Doe"
            expiry="04/12"
            cvc="042"/>
      </View>
    );
  }
}
