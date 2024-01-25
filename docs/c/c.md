---
sidebar_label: C
---

# C

## Basic Syntax

```c
#include <stdio.h>

int main(void) {
    printf("Hello world\n");
}
```

## Compiling

### GCC

Compiles the "hello.c" file using GCC and generates an executable named "hello.bin"

```bash
gcc -o hello.bin hello.c
```

## Taking User input

```c
#include <stdio.h>

void main() {
    char name[15];
    printf("What is your name: ");
    scanf("%s", name);
    printf("Hello %s\n", name);
}
```

## Code Formatting

| Symbol | Type   |
| ------ | ------ |
| %s     | string |
