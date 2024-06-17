---
sidebar_label: "Java"
sidebar_position: 203
---

import JavaLogo from "@site/static/img/java.png"
import DisplayLogo from "@site/src/components/DisplayLogo"

# Java

<DisplayLogo logo={JavaLogo}/>

## Compile and Run Java App

```java title="HelloWorld.java"
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}
```

```bash
javac HelloWorld.java
java HelloWorld
```

## Basic variable types

```java
int a = 10;
long b = 1000000000L;
double b = 10.5;
char c = 'a';
String d = "Hello";
boolean e = true;
```

## Numbers

### Converting Number to a string

```java
int a = 10;
String str = Integer.toString(a);
```

### Getting the remainder of a division

```java
int a = 10;
int b = 4;
int remainder = a % b; // 2
```

### Generating a random number

```java
import java.util.Random;

Random rand = new Random();
int randomNumber = rand.nextInt(100); // Random number between 0 and 100
```

```java
Math.random(); // Random number between 0 and 1
```

### Convert double to int

```java
double a = 10.5;
int b = (int) a; // 10
```

## Strings

Strings must contain only characters enclosed in double quotes.

### String formatting

```java
String name = "John";
int age = 25;

String formattedString = String.format("My name is %s and I am %d years old", name, age);
```

### Comparing strings

```java
String str1 = "Hello";
String str2 = "Hello";

str1.equals(str2); // true
```

### Turn String Array into a string

```java
String[] arr = {"Hello", "World"};

String str = String.join(" ", arr); // "Hello World"
```
### Turn char array into string

```java
char[] charArray = {'H', 'e', 'l', 'l', 'o'};

String str = new String(charArray); // "Hello"
```

### Turn int into a string

```java
int a = 10;

String str = Integer.toString(a); // "10"
```

### Index of a character in a string

```java
String str = "Hello";

int index = str.indexOf('e'); // 1
```

### Access a char in a string

```java
String str = "Hello";

char c = str.charAt(1); // 'e'
```

### Convert a string to lowercase

```java
String str = "Hello";

String lowerCaseStr = str.toLowerCase(); // "hello"
```

### Convert a string to uppercase

```java
String str = "Hello";

String upperCaseStr = str.toUpperCase(); // "HELLO"
```

### Get the length of a string

```java
String str = "Hello";

int length = str.length(); // 5
```

### Replace a character in a string

```java
String str = "Hello";

String newStr = str.replace('e', 'a'); // "Hallo"
```

### Replace all occurrences of a character in a string

```java
String str = "Hello";

String newStr = str.replaceAll("l", "a"); // "Heaao"
```




## Char

char must contain only a single character enclosed in single quotes.

## Arrays

### Add an item to an array

In java, arrays have a fixed size. To add an item to an array, you need to create a new array with a larger size and copy the elements from the old array to the new array.

```java
String[] kingdoms = {"Mercia", "Wessex", "East Anglia"};

String[] newKingdoms = Arrays.copyOf(kingdoms, kingdoms.length + 1);
newKingdoms[newKingdoms.length - 1] = "Northumbria";
```

### Getting the length of an array

```java
String[] kingdoms = {"Mercia", "Wessex", "East Anglia"};

int length = kingdoms.length; // 3
```

### Randomly shuffling an array

```java
import java.util.Random;

int[] arr = {1, 2, 3, 4, 5};

Random rand = new Random();
for (int i = 0; i < arr.length; i++) {
    int randomIndex = rand.nextInt(arr.length);
    int temp = arr[i];
    arr[i] = arr[randomIndex];
    arr[randomIndex] = temp;
}
```

### Turn a string into an array of characters

```java
String str = "Hello";

char[] charArray = str.toCharArray(); // ['H', 'e', 'l', 'l', 'o']
```

### Find the index of an element in an array

```java
String[] arr = {"Hello", "World"};

int index = Arrays.asList(arr).indexOf("World"); // 1
```

### 2D Arrays

```java
int[][] arr = {
    {1, 2, 3},
    {4, 5, 6},
    {7, 8, 9}
};

for (int i = 0; i < arr.length; i++) {
    for (int j = 0; j < arr[i].length; j++) {
        System.out.print(arr[i][j] + " ");
    }
}
```

## Switch statement

```java
int day = 3;

switch (day) {
    case 1:
        System.out.println("Monday");
        break;
    case 2:
        System.out.println("Tuesday");
        break;
    case 3:
        System.out.println("Wednesday");
        break;
    default:
        System.out.println("Invalid day");
}
```

### Print Arrays a string

```java
import java.util.Arrays;

String[] arr = {"Hello", "World"};

System.out.println(Arrays.toString(arr)); // [Hello, World]
```

## How to take user input

### String

```java
import java.util.Scanner;

Scanner scanner = new Scanner(System.in);

System.out.println("Enter a string: ");
String str = scanner.nextLine();
scanner.close();
```

### integer

```java
import java.util.Scanner;

Scanner scanner = new Scanner(System.in);

System.out.println("Enter a number: ");
int number = scanner.nextInt();
scanner.close();
```

### Double

```java
import java.util.Scanner;

Scanner scanner = new Scanner(System.in);

System.out.println("Enter a number: ");
double number = scanner.nextDouble();
scanner.close();
```

## Type casting

```java
int a = 10;
int b = 4;

double c = (double) a / b; // 2.5
```

## Loops

### For loop

```java
for (int i = 0; i < 5; i++) {
    System.out.println(i);
}
```

### While loop

```java
int i = 0;

while (i < 5) {
    System.out.println(i);
    i++;
}
```

### For Each loop

```java
String[] kingdoms = {"Mercia", "Wessex", "East Anglia"};

for (String kingdom : kingdoms) {
    System.out.println(kingdom);
}
```

### Break statement

Exits the loop.

```java
for (int i = 0; i < 5; i++) {
    if (i == 3) {
        break;
    }
    System.out.println(i);
}
```

### Continue statement

Continues with the next iteration of the loop.

```java
for (int i = 0; i < 5; i++) {
    if (i == 3) {
        continue;
    }
    System.out.println(i);
}
```

## Functions

### Function with return value

```java
public static int add(int a, int b) {
    return a + b;
}

int result = add(10, 20); // 30
```

### Function without return value

```java
public static void printHello() {
    System.out.println("Hello");
}

printHello(); // Hello
```

### Arguments

```java
public static void printName(String name) {
    System.out.println("Hello " + name);
}

printName("John"); // Hello John
```

### Default arguments

```java
public static void printName(String name, String greeting = "Hello") {
    System.out.println(greeting + " " + name);
}

printName("John"); // Hello John
```

### Documenting functions

```java
/**
 * This is a doc comment
 * @param a (int)
 * @param b (int)
 * @return (int)
 */
public static int add(int a, int b) {
    return a + b;
}
```
