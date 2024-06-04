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

### Turn Array into a string

```java
String[] arr = {"Hello", "World"};

String str = String.join(" ", arr); // "Hello World"
```

### Turn int into a string

```java
int a = 10;

String str = Integer.toString(a); // "10"
```

## Char

char must contain only a single character enclosed in single quotes.

## Arrays

### Getting the length of an array

```java
int[] arr = {1, 2, 3, 4, 5};

int length = arr.length; // 5
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
