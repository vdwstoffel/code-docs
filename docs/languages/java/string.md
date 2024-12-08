# Strings

Strings must contain only characters enclosed in double quotes.

## String formatting

```java
String name = "John";
int age = 25;

String formattedString = String.format("My name is %s and I am %d years old", name, age);
```

## Comparing strings

```java
String str1 = "Hello";
String str2 = "Hello";

str1.equals(str2); // true
```

## Turn String Array into a string

```java
String[] arr = {"Hello", "World"};

String str = String.join(" ", arr); // "Hello World"
```

## Turn char array into string

```java
char[] charArray = {'H', 'e', 'l', 'l', 'o'};

String str = new String(charArray); // "Hello"
```

## Turn int into a string

```java
int a = 10;

String str = Integer.toString(a); // "10"
```

## Index of a character in a string

```java
String str = "Hello";

int index = str.indexOf('e'); // 1
```

## Access a char in a string

```java
String str = "Hello";

char c = str.charAt(1); // 'e'
```

## Convert a string to lowercase

```java
String str = "Hello";

String lowerCaseStr = str.toLowerCase(); // "hello"
```

## Convert a string to uppercase

```java
String str = "Hello";

String upperCaseStr = str.toUpperCase(); // "HELLO"
```

## Get the length of a string

```java
String str = "Hello";

int length = str.length(); // 5
```

## Replace a character in a string

```java
String str = "Hello";

String newStr = str.replace('e', 'a'); // "Hallo"
```

## Replace all occurrences of a character in a string

```java
String str = "Hello";

String newStr = str.replaceAll("l", "a"); // "Heaao"
```

## Get a substring

```java
String str = "Hello";

String subStr = str.substring(1, 3); // "el"
```
