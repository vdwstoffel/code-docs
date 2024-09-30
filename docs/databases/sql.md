---
sidebar_label: "SQL"
sidebar_position: 1
---

# SQL

## SELECT

### Select All Rows

```sql
SELECT *
FROM employees;
```

### Select All Where

```sql
SELECT * FROM employees
WHERE employeeId = 5;
```

### Select All Multiple Conditions

```sql
SELECT * FROM employees
WHERE employeeId = 5
AND lastName = 'Davolio'
OR city = 'WA';
```

### Select a Subset of Columns

```sql
SELECT employeeId, lastName, firstName
FROM employees;
```

### Alias names of columns

```sql
SELECT employeeId AS "ID", LastName AS "Last Name"
FROM employees;
```

### Referencing an Aliased Column

```sql
SELECT employeeId AS "ID"
FROM employees
WHERE "ID" = 5;
```

### Concatenating Column Values

```sql
SELECT lastName || ', ' || firstName
FROM employees;
```

> Output: `Davolio, Nancy`

### Conditional Logic

```sql
SELECT employeeId, lstName, firstName, city,
CASE
    WHEN city = 'Seattle' THEN 'Northwest'
    WHEN city = 'Tacoma' THEN 'Northeast'
    ELSE 'Other'
END AS "Region"
FROM employees;
```

### LIMIT the Rows Returned

```sql
SELECT *
FROM employees
LIMIT 5;
```

### Returning n Random Records

```sql
SELECT *
FROM employees
ORDER BY RANDOM()
```

### Finding Null Values

```sql
SELECT *
FROM employees
WHERE reportsTo IS NULL;
```

### Transforming Nulls into Real Values

```sql
SELECT *
FROM employees
WHERE COALESCE(reportsTo, 0) = 0;
```

### LIKE - Searching for Patterns

In SQL, the LIKE keyword is used to search for a specified pattern in a column.

`% - The percent sign represents zero, one, or multiple characters`

`\_ - The underscore represents a single character`

Gets all employees whose last name starts with the letter D.

```sql
SELECT *
FROM employees
WHERE lastName LIKE 'D%';
```

### ORDER BY

```sql
SELECT *
FROM employees
ORDER BY lastName ASC;
```

```sql
SELECT *
FROM employees
ORDER BY lastName DESC;
```

### ORDER BY Multiple Columns

```sql
SELECT *
FROM employees
ORDER BY lastName ASC, city DESC;
```

### COUNT

```sql
SELECT COUNT(*)
FROM employees;
```

> Output: `9`

### Return DISTINCT Values

```sql
SELECT DISTINCT city
FROM employees;
```

### GROUP BY

```sql
SELECT COUNT(*), salary
FROM employees
GROUP BY salary;
```

### GROUP BY - HAVING

```sql
SELECT COUNT(*), salary
FROM employees
GROUP BY salary
HAVING salary > 50000;
```

### IN - multiple values in WHERE

The IN operator allows you to specify multiple values in a WHERE clause.

```sql
SELECT *
FROM employees
WHERE city IN ('Seattle', 'Tacoma');
```

## INSERT

### Inserting a New Record

```sql
INSERT INTO employees (lastName, firstName, city)
VALUES ('Doe', 'John', 'Seattle');
```

## UPDATE

### Updating a Record

```sql
UPDATE employees
SET city = 'Tacoma'
WHERE employeeId = 5;
```

## DELETE

### Deleting a Record

```sql
DELETE FROM employees
WHERE employeeId = 5;
```

### Deleting All Records

```sql
DELETE FROM employees;
```

## JOINS

### Alias a row

```sql
SELECT COUNT(amount) AS num_transactions
FROM payment;
```

<details>
<summary>Output</summary>

| num_transactions |
| ---------------- |
| 16049            |

</details>

```sql
SELECT customer_id, SUM(amount) as total_spent
FROM payment
GROUP BY customer_id;
```

<details>
<summary>Output</summary>

| customer_id | total_spent |
| ----------- | ----------- |
| 132         | 118.68      |
| 242         | 128.76      |
| 301         | 135.74      |

</details>

### Inner Join

Inner join is used to return rows when there is at least one match in both tables.

```sql title="Syntax"
SELECT * FROM TableA
INNER JOIN TableB
ON TableA.column_name = TableB.column_name;
```

```sql
SELECT * FROM customer
INNER JOIN payment
ON customer.customer_id = payment.customer_id
```

<details>
<summary>Output</summary>

Customer Table:

| customer_id | first_name | last_name |
| ----------- | ---------- | --------- |
| 1           | Mary       | Smith     |

Payment Table:

| payment_id | customer_id | staff_id | rental_id | amount | payment_date |
| ---------- | ----------- | -------- | --------- | ------ | ------------ |
| 1          | 1           | 1        | 76        | 7.99   | 2005-05-25   |
| 2          | 1           | 1        | 573       | 1.99   | 2005-05-28   |

Result:

| customer_id | first_name | last_name | payment_id | customer_id | staff_id | rental_id | amount | payment_date |
| ----------- | ---------- | --------- | ---------- | ----------- | -------- | --------- | ------ | ------------ |
| 1           | Mary       | Smith     | 1          | 1           | 1        | 76        | 7.99   | 2005-05-25   |
| 1           | Mary       | Smith     | 2          | 1           | 1        | 573       | 1.99   | 2005-05-28   |

</details>

## Tables

### Create Table with Constraints

```sql
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(250) NOT NULL,
    age INTEGER NOT NULL
);
```

### Create Table with Foreign Key

```sql
CREATE TABLE platform (
    platform_id SERIAL PRIMARY KEY,
    user_id INTEGER,
    platform_name VARCHAR(250),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);
```

```sql
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(250),
    age INTEGER
);
```

### Show all Tables (Postgresql)

```sql
SELECT * FROM pg_catalog.pg_tables
WHERE schemaname = 'public';
```

### Drop Table

```sql
DROP TABLE IF EXISTS users;
```

### Rename Table

```sql
ALTER TABLE users
RENAME TO customers;
```

### Add Column

```sql
ALTER TABLE users
ADD COLUMN email VARCHAR(250);
```

### Drop Column

```sql
ALTER TABLE users
DROP COLUMN email;
```
