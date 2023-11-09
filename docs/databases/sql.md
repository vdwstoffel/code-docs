---
sidebar_label: "SQL"
sidebar_position: 1
---

# SQL

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

## SELECT

The SELECT statement is used to select data from a database.

```sql
SELECT * FROM users;

SELECT * FROM users
WHERE username = 'Stoffel';

SELECT username AS us
FROM users;

SELECT * FROM users
ORDER BY username ASC/DESC;
```

## INSERT INTO

The INSERT INTO statement is used to insert new records in a table.

```sql
INSERT INTO users (username, age)
VALUES ('Stoffel', 30);
```

## UPDATE

The UPDATE statement is used to modify existing records in a table.

```sql
UPDATE users
SET username = 'stoffel_updated'
WHERE username = 'Stoffel'
RETURNING *; -- See output
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

## LIMIT

```sql
SELECT * FROM users
LIMIT 5;
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

## LIKE

The LIKE operator is used in a WHERE clause to search for a specified pattern in a column.

```sql
-- Exact Pattern Match
SELECT * FROM users
WHERE username LIKE 'Stof';

-- Use % for more than one pattern match
SELECT * FROM users
WHERE username LIKE '%Stof%';

-- Use _ for more than one pattern match
SELECT * FROM users
WHERE username LIKE 'Stof_';

-- Case Insensitive
SELECT * FROM users
WHERE username ILIKE '%stof%';
```

## Aggregate

```sql
SELECT MIN(age) FROM users;

SELECT MAX(age) FROM users;

SELECT SUM(age) FROM users;

SELECT AVG(age) FROM users;

SELECT ROUND(AVG(age)) FROM users;
```
