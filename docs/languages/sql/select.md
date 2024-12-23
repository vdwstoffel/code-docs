---
sidebar_label: 'SELECT'
sidebar_position: 1
---


# SELECT

## Return all results

Return all results from a table.

```sql
SELECT * FROM table_name;
```

## Return specific columns

Return specific columns from a table.

```sql
SELECT column1, column2 FROM table_name;
```

## Return unique results

Return unique results from a column.

```sql
SELECT DISTINCT column1 FROM table_name;
```

## Return results with a condition

Return results with a condition.

```sql
SELECT * FROM table_name 
WHERE column1 = 'value';
```

## Return results with multiple conditions

Return results with multiple conditions.

```sql
SELECT * FROM table_name 
WHERE column1 = 'value1'
AND column2 = 'value2';
```

## Return results with a range

Return results with a range.

```sql
SELECT * FROM table_name 
WHERE column1 BETWEEN 'value1' AND 'value2';
```

## Order results

Order results in ascending or descending order.

```sql
SELECT * FROM table_name
ORDER BY column1 ASC;
```

```sql
SELECT * FROM table_name
ORDER BY column1 DESC;
```

