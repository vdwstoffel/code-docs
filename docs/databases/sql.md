---
sidebar_label: "SQL"
sidebar_position: 1
---

# SQL

## SELECT

### Select All Rows

```sql
SELECT *
FROM "Employees";
```

### Select All Where

```sql
SELECT * FROM "Employees"
WHERE "EmployeeID" = 5;
```

### Select All Multiple Conditions

```sql
SELECT * FROM "Employees"
WHERE "EmployeeID" = 5
AND "LastName" = 'Davolio'
OR "State" = 'WA';
```

### Select a Subset of Columns

```sql
SELECT "EmployeeID", "LastName", "FirstName"
FROM "Employees";
```

### Alias names of columns

```sql
SELECT "EmployeeID" AS "ID", "LastName" AS "Last Name"
FROM "Employees";
```

### Referencing an Aliased Column

```sql
SELECT "EmployeeID" AS "ID", "LastName" AS "Last Name"
FROM "Employees"
WHERE "ID" = 5;
```

### Concatenating Column Values

```sql
SELECT "LastName" || ', ' || "FirstName"
FROM "Employees";
```

> Output: `Davolio, Nancy`

### Conditional Logic

```sql
SELECT "EmployeeID", "LastName", "FirstName", "City",
CASE
    WHEN "City" = 'Seattle' THEN 'Northwest'
    WHEN "City" = 'Tacoma' THEN 'Northeast'
    ELSE 'Other'
END AS "Region"
FROM "Employees";
```

### LIMIT the Rows Returned

```sql
SELECT *
FROM "Employees"
LIMIT 5;
```

### Returning n Random Records

```sql
SELECT *
FROM "Employees"
ORDER BY RANDOM()
```

### Finding Null Values

```sql
SELECT *
FROM "Employees"
WHERE "ReportsTo" IS NULL;
```

### Transforming Nulls into Real Values

```sql
SELECT *
FROM "Employees"
WHERE COALESCE("ReportsTo", 0) = 0;
```

### LIKE - Searching for Patterns

In SQL, the LIKE keyword is used to search for a specified pattern in a column.

`% - The percent sign represents zero, one, or multiple characters`

`\_ - The underscore represents a single character`

Gets all employees whose last name starts with the letter D.

```sql
SELECT *
FROM "Employees"
WHERE "LastName" LIKE 'D%';
```

### ORDER BY

```sql
SELECT *
FROM "Employees"
ORDER BY "LastName" ASC;
```

```sql
SELECT *
FROM "Employees"
ORDER BY "LastName" DESC;
```

### ORDER BY Multiple Columns

```sql
SELECT *
FROM "Employees"
ORDER BY "LastName" ASC, "City" DESC;
```

### Count

```sql
SELECT COUNT(*)
FROM "Employees";
```

> Output: `9`

## INSERT

### Inserting a New Record

```sql
INSERT INTO "Employees" ("LastName", "FirstName", "City")
VALUES ('Doe', 'John', 'Seattle');
```

## UPDATE

### Updating a Record

```sql
UPDATE "Employees"
SET "City" = 'Tacoma'
WHERE "EmployeeID" = 5;
```
## DELETE

### Deleting a Record

```sql
DELETE FROM "Employees"
WHERE "EmployeeID" = 5;
```

### Deleting All Records

```sql
DELETE FROM "Employees";
```

## Multiple Tables

### INNER JOIN

```sql
SELECT *
FROM Employees
INNER JOIN Customers
ON Employees.EmployeeID = Orders.EmployeeID;
```

## Create Database

```sql
CREATE DATABASE code_snippets;
```

## Create Table

To auto increase the primary key

1. MySQL: `AUTO_INCREMENT`
2. PostgreSQL: `SERIAL`
3. SQLite3: `AUTOINCREMENT`

```sql
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(250) UNIQUE,
    age INT
);
```

### Create Table with Foreign Key

```sql
CREATE TABLE platform (
    platform_id SERIAL PRIMARY KEY,
    platform_name VARCHAR(250),
    user_id INTEGER REFERENCES users(user_id)
);
```

## Drop Table

```sql
DROP TABLE users;
```

## Alter Table

```sql
-- Rename Table
ALTER TABLE users
RENAME TO new_users;

-- Rename COLUMN
ALTER TABLE new_users
RENAME COLUMN username TO new_username;

-- Drop COLUMN
ALTER TABLE new_users
DROP COLUMN IF EXISTS age;
```



## DELETE

The DELETE statement is used to delete existing records from a table.

```sql
-- Delete all
DELETE FROM users;

-- Delete on condition
DELETE FROM users
WHERE username = 'Christoff'
```

## COUNT

```sql
SELECT COUNT(*) FROM users;
```

## JOIN

```sql
SELECT * FROM users
INNER JOIN platform
ON users.user_id = platform.user_id;
```

## GROUP BY

The GROUP BY statement is used to group rows that have the same values into summary rows.

```sql
SELECT age, COUNT(*) FROM users
GROUP BY age;

-- The HAVING clause is used to filter records that are returned by GROUP BY
SELECT age, COUNT (*) FROM users
GROUP BY age
HAVING age < 30;
```

## DISTINCT

The DISTINCT keyword is used to return only distinct (unique) values.

```sql
SELECT DISTINCT age FROM users;
```

## IN

The IN operator allows you to specify multiple values in a WHERE clause.

```sql
SELECT * FROM users
WHERE username
IN ('Stoffel', 'Mavis');
```

## Aggregate

```sql
SELECT MIN(age) FROM users;

SELECT MAX(age) FROM users;

SELECT SUM(age) FROM users;

SELECT AVG(age) FROM users;

SELECT ROUND(AVG(age)) FROM users;
```
