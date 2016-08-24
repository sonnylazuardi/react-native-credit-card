'use strict';

import React from 'react';
const {
    PropTypes,
    Component
} = React;

import Payment from 'payment';
import FlipCard from 'react-native-flip-card';

import {
    View,
    TouchableOpacity,
    Text,
    StyleSheet,
    Platform,
    Image
} from 'react-native';
const images = require('./card-images');
const validate = Payment.fns;

class CreditCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type: {
                name:"unknown", 
                length: 16
            }
        }
    }
    getValue(name) {
        return this[name]();
    }
    componentWillReceiveProps(nextProps) {
        this.updateType(nextProps);
    }
    componentWillMount() {
        this.updateType(this.props);
    }
    updateType(props) {

        if (!props.number)
            return this.setState({type: {name:"unknown", length: 16}});

        var type = validate.cardType(props.number);
        if (type) {
            if (type === "amex") {
                return this.setState({type: {name: type, length: 15}});
            } else {
                return this.setState({type: {name: type, length: 16}});
            }
        }
        
        return this.setState({type: {name: "unknown", length: 16}});
    }
    number() {
        if (!this.props.number) {
            var string = "";
        } else {
            var string = this.props.number.toString();
        }

        const maxLength = this.state.type.length;

        if (string.length > maxLength) string = string.slice(0, maxLength);

        while (string.length < maxLength) {
            string += "•"
        }

        if (this.state.type.name === "amex") {
            const space_index1 = 4;
            const space_index2 = 10;

            string = string.substring(0, space_index1) + " " + string.substring(space_index1, space_index2) + " " + string.substring(space_index2);
        } else {
            const amountOfSpaces = Math.ceil(maxLength/4);

            for (var i = 1; i <= amountOfSpaces; i++) {
                var space_index = (i * 4 + (i - 1));
                string = string.slice(0, space_index) + " " + string.slice(space_index)
            }
        }

        return string;
    }
    name() {
        if (this.props.name === "") {
            return "FULL NAME";
        } else {
            return this.props.name;
        }
    }
    expiry() {
        if (this.props.expiry === "") {
            return "••/••";
        } else {
            let expiry = this.props.expiry.toString();

            const expiryMaxLength = 6;

            if (expiry.match(/\//))
                expiry = expiry.replace("/", "");

            if (!expiry.match(/^[0-9]*$/))
                return "••/••";

            while (expiry.length < 4) {
                expiry += "•";
            }

            expiry = expiry.slice(0, 2) + "/" + expiry.slice(2, expiryMaxLength);
        }

        return expiry;
    }

    cvc() {
        if (this.props.cvc == null) {
            return "•••"
        } else {
            return (this.props.cvc.toString().length <= 4) ? this.props.cvc : this.props.cvc.toString().slice(0, 4);
        }
    }

    render() {
        const isAmex = this.state.type && this.state.type.name === "amex";
        return (
            <FlipCard 
                style={styles.card}
                friction={6}
                perspective={1000}
                flipHorizontal={true}
                flipVertical={false}
                flip={false}
                clickable={true}
                onFlipped={(isFlipped)=>{console.log('isFlipped', isFlipped)}}
                >
                <View style={styles.front}>
                    <View style={[styles.container, {width: this.props.width, height: this.props.height, backgroundColor: this.props.bgColor}]}>
                        <View style={this.props.focused == "cvc" && !isAmex ? styles.flipped : styles.default}>
                            <View style={styles.lower}>
                                <View style={styles.shiny} />
                                <Image
                                     style={styles.logo}
                                     source={{uri: images[this.props.type ? this.props.type : this.state.type.name]}}
                                />
                                {isAmex ? 
                                    <View style={styles.cvc_front}>
                                        <Text style={styles.text}>{this.getValue("cvc")}</Text>
                                    </View>
                                    : null}
                                <View style={styles.number}><Text style={styles.text}>{this.getValue("number")}</Text></View>
                                <View style={styles.name}><Text style={styles.text}>{this.getValue("name")}</Text></View>
                                <View
                                    style={styles.expiry}
                                    data-before={this.props.expiryBefore}
                                    data-after={this.props.expiryAfter}>
                                    <Text style={styles.text}>{this.getValue("expiry")}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={styles.back}>
                    <View style={[styles.container, {width: this.props.width, height: this.props.height, backgroundColor: this.props.bgColor}]}>
                        <View style={styles.bar}/>
                        <View style={styles.cvc}><Text style={styles.text}>{this.getValue("cvc")}</Text></View>
                        <View style={styles.shiny} data-after={this.props.shinyAfterBack}/>
                    </View>
                </View>
            </FlipCard>
        );
    }
}

const styles = StyleSheet.create({
    container: {

    },
    logo: {
        height: 35,
        width: 57
    },
    text: {
        color: '#fff'
    }
});

CreditCard.defaultProps = {
    number: null,
    cvc: null,
    name: '',
    expiry: '',
    focused: null,
    expiryBefore: 'month/year',
    expiryAfter: 'valid thru',
    shinyAfterBack: '',
    type: null,
    width: 350,
    height: 200,
    bgColor: '#191278',
};

module.exports = CreditCard;