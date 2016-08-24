# React Native Credit Card 💳

### A better credit card form for React Native

React native port of the display of Card by [@jessepollak](https://github.com/jessepollak/card)

![rn-credit-card](http://i.giphy.com/26gJznmOI4qQSA2UE.gif)

#### Background

This is a react native port of Card. There is a [react port of Card](https://github.com/JohnyDays/react-credit-card), but it still renders on browser DOM (which is not as good as native view), so this library will take advantage of both.

#### Goals

- Look like Card.
- Provide a react interface for displaying credit card information.

#### Usage

- `npm install --save react-native-credit-card`
- In your react native script add these lines

```jsx
import CreditCard from 'react-native-credit-card';


<CreditCard 
    type={this.state.type}
    imageFront={require('./images/card-front.png')}
    imageBack={require('./images/card-back.png')}
    shiny={false}
    bar={false}
    focused={this.state.focused}
    number={this.state.number}
    name={this.state.name}
    expiry={this.state.expiry}
    cvc={this.state.cvc}/>
```

### Available props
  
- `cvc`: number(max 4 characters, will cut the rest)(The "/" will be automatically added)
- `name`: string (max 2 lines)
- `number`: credit card number(max 16 characters, will cut the rest)
- `expiry`: number(max 4 characters, will cut the rest) 
- `imageFront`: image(image file for the card front card background -- with require) 
- `imageBack`: image(image file for the card back card background -- with require) 
- `shiny`: boolean(show sticker) 
- `bar`: boolean(show bar on the back) 
- `focused`: one of the above fields
  - type
  - name
  - number
  - expiry
  - cvc (Upon focusing cvc, the form will be rotated until this is changed.)
  - null
- `type`: Available in case you need to explicitly specify the card type. In most cases this will be inferred for you as the user fills the form, so you won't need to use it. One of the following:
  - dankort
  - discover
  - mastercard
  - visa
  - amex

#### Todo

- Automated test 
- More credit card type variations

#### Examples

todo.

Most of the credit goes to [@jessepollak](http://github.com/jessepollak) and [@JohnyDays](http://github.com/JohnyDays) for creating and mantaining [Card](http://github.com/jessepollak/card) and [React Credit Card](https://github.com/JohnyDays/react-credit-card), I just ported it over to React Native.


