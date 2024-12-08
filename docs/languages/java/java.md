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




