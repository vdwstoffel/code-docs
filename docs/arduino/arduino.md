# Arduino

## Getting Started

```c
void setup(){
    // run once
}

void loop() {
    // run in loop
}
```

## LED

For this example attach the pin to Pin 7

```c
void setup(){
    pinMode(7, OUTPUT); // Use pin 7 as output
}

void loop() {
    digitalWrite(7, HIGH); // power up led
    delay(1000);
    digitalWrite(7, LOW); // power down led
    delay(1000);
}
```
