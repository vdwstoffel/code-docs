# Arrays

## Add an item to an array

In java, arrays have a fixed size. To add an item to an array, you need to create a new array with a larger size and copy the elements from the old array to the new array.

```java
String[] kingdoms = {"Mercia", "Wessex", "East Anglia"};

String[] newKingdoms = Arrays.copyOf(kingdoms, kingdoms.length + 1);
newKingdoms[newKingdoms.length - 1] = "Northumbria";
```

## Getting the length of an array

```java
String[] kingdoms = {"Mercia", "Wessex", "East Anglia"};

int length = kingdoms.length; // 3
```

## Randomly shuffling an array

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

## Turn a string into an array of characters

```java
String str = "Hello";

char[] charArray = str.toCharArray(); // ['H', 'e', 'l', 'l', 'o']
```

## Find the index of an element in an array

```java
String[] arr = {"Hello", "World"};

int index = Arrays.asList(arr).indexOf("World"); // 1
```

## Making a deep copy of an array

```java
int[] arr = {1, 2, 3, 4, 5};

int[] copy = Arrays.copyOf(arr, arr.length);
```

## Making a deep copy of a 2d array

```java
int[][] arr = {
    {1, 2, 3},
    {4, 5, 6},
    {7, 8, 9}
};

int[][] copy = new int[arr.length][arr[0].length];
for (int i = 0; i < arr.length; i++) {
    copy[i] = Arrays.copyOf(arr[i], arr[i].length);
}
```

## Print Arrays a string

```java
import java.util.Arrays;

String[] arr = {"Hello", "World"};

System.out.println(Arrays.toString(arr)); // [Hello, World]
```

## 2D Arrays

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
