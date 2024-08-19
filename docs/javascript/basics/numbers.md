---
sidebar_label: 'Numbers'
sidebar_position: 2
---

# Numbers

## Generating Random Numbers

```js
const random_number = Math.floor(Math.random() * 6) + 1;
console.log(random_number); // Generate a random number between 1 and 6
```

## Generating Cryptographically Secure Random Numbers

```js
const crypto = require("crypto").webcrypto;

const randomBuffer = new Uint32Array(1);
crypto.getRandomValues(randomBuffer);
const randomFraction = randomBuffer[0] / (0xffffffff + 1);
const randomNumber = Math.floor(randomFraction * 6) + 1;
console.log(randomNumber); // Generate a cryptographically secure random number between 1 and 6
```

## Rounding to a decimal

```js
const fraction = 123.45678;
const rounded = Math.round(fraction); // nearest integer
```

```js
// Round to decimal
const fraction = 123.45678;
const toRound = fraction * 10 ** 2;
let roundedNumber = Math.round(toRound);
roundedNumber = roundedNumber / 10 ** 2; // 123.46
```

## Convert Number to String

```js
const stringNumber = "123.45";
const number = Number(stringNumber);

if (stringNumber.trim() !== "") {
  // all whitespace
  console.log("Safe to process this data as a number");
}

if (!Number.isNaN(number)) {
  console.log("Safe to process this data as a number");
}
```
