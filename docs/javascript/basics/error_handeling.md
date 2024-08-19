# Error Handeling

## Try/Catch

```js
try {
  fetch("invalid-url");
} catch (error) {
  console.log(error.name);
  console.log(error.message);
  console.log(error.stack);
}
```

## Run another function after try/catch

```js
try {
  fetch("invalid-url");
} catch (error) {
  console.log(error.name);
  console.log(error.message);
} finally {
  console.log("Done");
}
```

## Catching Errors in Async Functions

```js
const fetchData = async () => {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts/1");
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.log(error);
  } finally {
    console.log("Done");
  }
};

fetchData();
```

## Catching different types of errors

```js
try {
  // ...
} catch (error) {
  if (error instanceof TypeError) {
    console.log("This is a TypeError");
  } else if (error instanceof RangeError) {
    console.log("This is an RangeError");
  } else {
    throw error;
  }
}
```

## Throwing an error

```js
const divide = (a, b) => {
  if (b === 0) {
    //highlight-next-line
    throw new Error("Cannot divide by zero");
  }

  return a / b;
};
```

## Throwing a custom error

```js
class CustomError extends Error {
  constructor(message) {
    super(message);
    this.name = "CustomError";
  }
}

const divide = (a, b) => {
  if (b === 0) {
    throw new CustomError("Cannot divide by zero");
  }

  return a / b;
};

// Output: CustomError: Cannot divide by zero
```
