# Dates

## Get the current date

```java
import java.time.LocalDate;

LocalDate date = LocalDate.now();  // 2021-10-10
```

## Get the current time

```java
import java.time.LocalTime;

LocalTime time = LocalTime.now();  // 12:30:45.123456789
```

## Get the current date and time

```java
import java.time.LocalDateTime;

LocalDateTime dateTime = LocalDateTime.now();  // 2021-10-10T12:30:45.123456789
```

## Get the difference between two dates

```java
import java.time.LocalDate;
import java.time.Period;

LocalDate date1 = LocalDate.of(2021, 10, 10);
LocalDate date2 = LocalDate.of(2023, 09, 15);

Period period = Period.between(date1, date2);
int years = period.getYears();  // 2
int months = period.getMonths();  // 11
int days = period.getDays();  // 5
```

## Convert a string to a date

```java
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

String str = "2021-10-10";
DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
LocalDate date = LocalDate.parse(str, formatter);
```

