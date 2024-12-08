# Loops

## For loop

```java
for (int i = 0; i < 5; i++) {
    System.out.println(i);
}
```

## While loop

```java
int i = 0;

while (i < 5) {
    System.out.println(i);
    i++;
}
```

## For Each loop

```java
String[] kingdoms = {"Mercia", "Wessex", "East Anglia"};

for (String kingdom : kingdoms) {
    System.out.println(kingdom);
}
```

## Break statement

Exits the loop.

```java
for (int i = 0; i < 5; i++) {
    if (i == 3) {
        break;
    }
    System.out.println(i);
}
```

## Continue statement

Continues with the next iteration of the loop.

```java
for (int i = 0; i < 5; i++) {
    if (i == 3) {
        continue;
    }
    System.out.println(i);
}
```
