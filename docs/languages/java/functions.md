# Functions

## Function with return value

```java
public static int add(int a, int b) {
    return a + b;
}

int result = add(10, 20); // 30
```

## Function without return value

```java
public static void printHello() {
    System.out.println("Hello");
}

printHello(); // Hello
```

## Arguments

```java
public static void printName(String name) {
    System.out.println("Hello " + name);
}

printName("John"); // Hello John
```

## Default arguments

```java
public static void printName(String name, String greeting = "Hello") {
    System.out.println(greeting + " " + name);
}

printName("John"); // Hello John
```

## Documenting functions

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
