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
            return this.props.name.toUpperCase();
        }
    }
    expiry() {
        if (this.props.expiry === "") {
            return "••/••";
        } else {
            var expiry = this.props.expiry.toString();

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
        const cardStyle = [styles.container, {width: this.props.width, height: this.props.height, backgroundColor: this.props.bgColor}, this.props.style];
        return (
            <View style={styles.cardStyle}>
                <FlipCard
                    style={[styles.container, {width: this.props.width, height: this.props.height, backgroundColor: this.props.bgColor}, this.props.style]}
                    friction={6}
                    perspective={1000}
                    flipHorizontal={true}
                    flipVertical={false}
                    flip={this.props.focused === 'cvc'}
                    clickable={true}
                    onFlipped={(isFlipped)=>{console.log('isFlipped', isFlipped)}}
                    >
                    <View style={[styles.front, {width: this.props.width, height: this.props.height}]}>
                        {this.props.imageFront ?
                            <Image source={this.props.imageFront} style={[styles.bgImage, {width: this.props.width, height: this.props.height}]} />
                            : null}
                        <View style={styles.lower}>
                            {this.props.shiny ?
                                <View style={styles.shinyFront} />
                                : null}
                            <Image
                                 style={styles.logo}
                                 source={{uri: images[this.props.type ? this.props.type : this.state.type.name]}}
                            />
                            {isAmex ? 
                                <View style={styles.cvcFront}>
                                    <Text style={styles.text}>{this.getValue("cvc")}</Text>
                                </View>
                                : null}
                            <View style={styles.info}>
                                <View style={styles.number}><Text style={styles.textNumber}>{this.getValue("number")}</Text></View>
                                <View style={styles.rowWrap}>
                                    <View style={styles.name}><Text style={styles.textName}>{this.getValue("name")}</Text></View>
                                    <View style={styles.validthru}><Text style={styles.textValidThru}>VALID THRU</Text></View>
                                    <View
                                        style={styles.expiry}
                                        data-before={this.props.expiryBefore}
                                        data-after={this.props.expiryAfter}>
                                        <Text style={styles.textSmall}>MONTH/YEAR</Text>
                                        <Text style={styles.textExpiry}>{this.getValue("expiry")}</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={[styles.back, {width: this.props.width, height: this.props.height}]}>
                        {this.props.imageBack ?
                            <Image source={this.props.imageBack} style={[styles.bgImage, {width: this.props.width, height: this.props.height}]} />
                            : null}
                        {this.props.bar ?
                            <View style={styles.bar}/>
                            : null}
                        <View style={styles.cvc}><Text style={styles.textCvc}>{this.getValue("cvc")}</Text></View>
                        {this.props.shiny ?
                            <View style={styles.shinyBack} data-after={this.props.shinyAfterBack}/>
                            : null}
                    </View>
                </FlipCard>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 8,
        borderWidth: 0,
        flex: 1,
    },
    logo: {
        height: 35,
        width: 57,
        position: 'absolute',
        top: 20,
        right: 20
    },
    text: {
        color: '#fff'
    },
    bgImage: {
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        right: 0,
        borderRadius: 8
    },
    lower: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-end',
        paddingVertical: 20,
        paddingHorizontal: 20
    },
    expiry: {
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'center'
    },
    rowWrap: {
        flexDirection: 'row',
    },
    name: {
        flex: 2,
        justifyContent: 'center'
    },
    validthru: {
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'center'
    },
    textValidThru: {
        fontSize: 8,
        color: '#ddd',
        fontWeight: '900'
    },
    textSmall: {
        fontSize: 8,
        color: '#ddd',
        fontWeight: '900'
    },
    textNumber: {
        color: '#fff',
        fontSize: 22,
        textAlign: 'center',
        marginBottom: 10,
    },
    textName: {
        color: '#fff',
        fontSize: 14
    },
    textExpiry: {
        color: '#fff',
        fontSize: 16
    },
    front: {
        flex: 1
    },
    back: {
        flex: 1
    },
    cvc: {
        width: 45,
        height: 30,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        right: 15,
        top: 76
    },
    textCvc: {
        color: '#000',
        fontSize: 18
    },
    info: {
        flex: 1,
    },
    shinyFront: {
        backgroundColor: '#ddd',
        borderRadius: 8,
        width: 50,
        height: 40,
        position: 'absolute',
        top: 15,
        left: 20
    },
    shinyBack: {
        backgroundColor: '#ddd',
        borderRadius: 8,
        width: 50,
        height: 40,
        position: 'absolute',
        bottom: 15,
        left: 20
    },
    bar: {
        height: 40,
        position: 'absolute',
        left: 0,
        right: 0,
        top: 30,
        backgroundColor: '#000'
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
    width: 300,
    height: 180,
    bgColor: '#191278',
};

CreditCard.CardImages = images;

module.exports = CreditCard;