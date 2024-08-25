# Regex

```js
const text = `One Ring to rule them all
One Ring to find them
One Ring to bring them all
and in the darkness bind them`;

const pattern = /.+bind them/;

const match = text.match(pattern);
console.log(match); // prints out the match object
console.log(match.toString()); // and in the darkness bind them

console.log(pattern.test(text)); // true
```

```js
const original = "Now is the time, this is the tame";
const match = original.match(/t\w{2}e/g);
console.log(match);
// [ 'time', 'tame' ]
```

## Finding all instances of a pattern

```js
const searchString = "Now is the time and this is the time and that is the time";
const regex = /t\w*e/g; // starts with an t and ends with an e
const matches = searchString.matchAll(regex);
for (const match of matches) {
  console.log(match[0]);
}
//the
// time
// the
// time
// the
// time
```

## Validate email address

```js
const emailValid = "abeLincoln@gmail.com";
const emailInvalid = "abeLincoln@gmail .com";
const regex = /\S+@\S+\.\S+/;

if (regex.test(emailValid)) {
  console.log("This email is valid");
}
```
