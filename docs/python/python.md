---
sidebar_label: "Python"
sidebar_position: 3
---

# Python

## Decorators

Decorators in Python are functions that modify the behavior of other functions or methods without changing their actual code. They allow you to add functionality to existing functions dynamically.

```python
# Decorator function
def emphasize_name(func):
    # Wrapper function inside the decorator
    def wrap_func():
        # Call the original function
        name = func()
        # Modify the result
        return name.upper()  # Convert the result to uppercase
    return wrap_func  # Return the modified function

# Apply the decorator using @emphasize_name
@emphasize_name
def hello():
    return "stoffel"  # Original function returns "stoffel"

# Call the decorated function
print(hello())  # Output: STOFFEL
```

### Passing arguments

```python
# Decorator function emphasize_name that modifies the behavior of functions
def emphasize_name(func):
    # Inner function wrap_func that acts as a wrapper for the original function
    def wrap_func(*args, **kwargs):
        # Access the first argument passed to the original function
        name = args[0]
        # Modify the behavior: return a string greeting with the name in uppercase
        return f"Hello, {name.upper()}"

    return wrap_func  # Return the modified function

# Applying the decorator to the hello function
@emphasize_name
def hello(name):
    return name

# Invoking the decorated hello function with an argument "stoffel"
result = hello("stoffel")
print(result)  # Output: Hello, STOFFEL
```

## Math

```python
# Rounding
print(round(2.5457457, 2))
>>> 2.55
```

## Pathlib

```python
import pathlib

# Find the abs path of the folder the file is int
pathlib.Path(__file__).parent.resolve()
```
