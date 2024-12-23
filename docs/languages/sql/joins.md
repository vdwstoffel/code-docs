---
sidebar_label: 'JOINS'
sidebar_position: 5
---

# JOINS

## Inner Join

Return rows when there is at least one match in both tables.

```sql
SELECT column_name
FROM table1
INNER JOIN table2
ON table1.column_name = table2.column_name;
```

## Alias

Use aliases to make the query easier to read.

```sql
SELECT column_name
FROM table1 AS t1
INNER JOIN table2 AS t2
ON t1.column_name = t2.column_name;
```
