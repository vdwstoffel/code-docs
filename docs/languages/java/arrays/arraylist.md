# ArrayList

An ArrayList is a resizable array that can grow or shrink in size.

## Creating an ArrayList

```java
import java.util.ArrayList;
import java.util.List;

List<String> list = new ArrayList<>();
```

## Adding an element to an ArrayList

```java
import java.util.ArrayList;
import java.util.List;

List<String> list = new ArrayList<>();
list.add("Hello");
```

## Removing an element from an ArrayList

```java
import java.util.ArrayList;
import java.util.List;

List<String> list = new ArrayList<>();
list.add("Hello");
list.remove(0); // Removes the element at index 0
```

## Updating an element in an ArrayList

```java
import java.util.ArrayList;
import java.util.List;

List<String> list = new ArrayList<>();
list.add("Hello");
list.set(0, "World"); // Replaces the element at index 0 with "World"
```

## Getting the size of an ArrayList

```java
import java.util.ArrayList;
import java.util.List;

List<String> list = new ArrayList<>();
list.add("Hello");

int size = list.size(); // 1
```

## Iterating over an ArrayList

```java
import java.util.ArrayList;
import java.util.List;

List<String> myList = new ArrayList<>();
list.add("Hello");
list.add("World");

for (String str : myList) {
    System.out.println(str);
}
```

## Get an element from an ArrayList

```java
import java.util.ArrayList;
import java.util.List;

List<String> list = new ArrayList<>();
list.add("Hello");

String str = list.get(0); // "Hello"
```
