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

## Variables

```c
int SLEEP_TIME = 3000;

void setup() {
pinMode(7, OUTPUT);
}

void loop() {
    digitalWrite(7, HIGH);
    delay(SLEEP_TIME);
    digitalWrite(7, LOW);
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

## Printing

```c

void setup() {
    Serial.begin(9600);
}

void loop() {
    Serial.print("Hello")
    Serial.println("World"); // add a newline at the end
}
```
