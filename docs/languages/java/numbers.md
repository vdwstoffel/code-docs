# Numbers

## Converting Number to a string

```java
int a = 10;
String str = Integer.toString(a);
```

## Convert string to number

```java
String str = "10";
int a = Integer.parseInt(str);
```

## Getting the remainder of a division

```java
int a = 10;
int b = 4;
int remainder = a % b; // 2
```

## Generating a random number

```java
import java.util.Random;

Random rand = new Random();
int randomNumber = rand.nextInt(100); // Random number between 0 and 100
```

```java
Math.random(); // Random number between 0 and 1
```

## Convert double to int

```java
double a = 10.5;
int b = (int) a; // 10
```

