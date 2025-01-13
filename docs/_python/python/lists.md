---
sidebar_label: Lists
sidfebar_position: 1
---

# Lists


## Find the index of an item

```python
fruits = ['apple', 'banana', 'cherry']
index = fruits.index('banana')
print(index)  # Output: 1
```

## List comprehension

```python
numbers = [1, 2, 3, 4, 5]
squared = [x**2 for x in numbers]
print(squared)  # Output: [1, 4, 9, 16, 25]
```

## How to reverse a list

`reverse()` method reverses the elements of a list in place.

```python
numbers = [1, 2, 3, 4, 5]
numbers.reverse()
print(numbers)  # Output: [5, 4, 3, 2, 1]
```
