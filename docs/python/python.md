---
sidebar_label: "Python"
sidebar_position: 202
---

import CodeBlock from "@theme/CodeBlock";
import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

# Python

## Setting up a virtual environments

```bash
python -m venv .venv
```

To deactivate 

```bash
deactivate
```

## Lists

### Find the index of an item

```python
fruits = ['apple', 'banana', 'cherry']
index = fruits.index('banana')
print(index)  # Output: 1
```

### List comprehension

```python
numbers = [1, 2, 3, 4, 5]
squared = [x**2 for x in numbers]
print(squared)  # Output: [1, 4, 9, 16, 25]
```

## Dicts

### Add a key-value pair

```python
person = {'name': 'John', 'age': 30}
person['city'] = 'New York'
print(person)  # Output: {'name': 'John', 'age': 30, 'city': 'New York'}
```

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

## Regex

```python
text = """
One Ring to rule them all
One Ring to find them
One Ring to bring them all
and in the darkness bind them
"""
```

```mdx-code-block
<Tabs>
<TabItem value="Search">
```

Returns a Match object if there is a match anywhere in the string

```python
import re

search = re.search(r'.+bind them', text)
print(search.group(0))  # and in the darkness bind them
```

```mdx-code-block
</TabItem>
<TabItem value="Findall">
```

Returns a list containing all matches

```python
import re

find = re.findall(r'.+ them all', text)
print(find)  # ['One Ring to rule them all', 'One Ring to bring them all']
```

```mdx-code-block
</TabItem>
<TabItem value="Sub">
```

```python
import re

sub = re.sub(r'R.+g', 'card', text)
print(sub)  # One card to rule them all ...
```

```mdx-code-block
</TabItem>
</Tabs>
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
