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

### How to take user input (integer)

```java
import java.util.Scanner;

Scanner scanner = new Scanner(System.in);

System.out.println("Enter a number: ");
int number = scanner.nextInt();
scanner.close();
```

### How to take user input (double)

```java
import java.util.Scanner;

Scanner scanner = new Scanner(System.in);

System.out.println("Enter a number: ");
double number = scanner.nextDouble();
scanner.close();
```

## Strings

Strings must contain only characters enclosed in double quotes.

### String formatting

```java
String name = "John";
int age = 25;

String formattedString = String.format("My name is %s and I am %d years old", name, age);
```

### How to take user input

```java
import java.util.Scanner;

Scanner scanner = new Scanner(System.in);

System.out.println("Enter your name: ");
String name = scanner.nextLine();
scanner.close();
```

## Char

char must contain only a single character enclosed in single quotes.

## Type casting

```java
int a = 10;
int b = 4;

double c = (double) a / b; // 2.5
```
