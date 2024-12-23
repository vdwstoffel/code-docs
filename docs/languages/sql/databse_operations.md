---
sidebar_label: 'Database Operations'
sidebar_position: 100
---

# Database Operations

## Create a new database

Create a new database.

```sql
CREATE DATABASE database_name;
```

## Drop a database

Drop a database.

```sql
DROP DATABASE database_name;
```

## Create a new table

Create a new table.

```sql
CREATE TABLE table_name (
  column2 INTEGER
  column3 VARCHAR(255)
  column4 DATE
  column5 BOOLEAN
);
```

## Create a table with a primary key

Create a table with a primary key.

Note that the `SERIAL` data type is an auto-incrementing integer for postgres.

```sql
CREATE TABLE table_name (
  id SERIAL PRIMARY KEY,
  column2 INTEGER
  column3 VARCHAR(255)
  column4 DATE
  column5 BOOLEAN
);
```

## Create a table with a foreign key

Create a table with a foreign key.

```sql
CREATE TABLE table_name (
  id SERIAL PRIMARY KEY,
  column2 INTEGER
  column3 VARCHAR(255)
  column4 DATE
  column5 BOOLEAN
  foreign_key_id INTEGER REFERENCES other_table_name(that_table_id)
);
```

## Drop a table

Drop a table.

```sql
DROP TABLE table_name;
```

## Rename a table

Rename a table.

```sql
ALTER TABLE table_name
RENAME TO new_table_name;
```

## Add a column to a table

Add a column to a table.

```sql
ALTER TABLE table_name
ADD column_name VARCHAR(255);
```

## Drop a column from a table

Drop a column from a table.

```sql
ALTER TABLE table_name
DROP COLUMN column_name;
```

## Rename a column in a table

Rename a column in a table.

```sql
ALTER TABLE table_name
RENAME COLUMN column_name TO new_column_name;
```

## Update a column in a table

Update a column in a table.

```sql
ALTER TABLE table_name
ALTER COLUMN column_name TYPE VARCHAR(255);
```


