---
sidebar_label: "Pandas"
---

# Pandas

import pandasLogo from "@site/static/img/pandas.png"
import DisplayLogo from "@site/src/components/DisplayLogo"

<DisplayLogo logo={pandasLogo} />

## How to install pandas

```bash
pip install pandas
```

## How to open a file

- **CSV**

```python
import pandas as pd
df = pd.read_csv('QueryResults.csv')
```

## How to work with a dataframe

```python
import pandas as pd
df = pd.read_csv("employees.csv")

df.shape   # (10, 5)
df.columns  # ['ID', 'Name', 'Age', 'Department', 'Salary']

df.head()
df.tail()
```

<details>
    <summary>Output</summary>

| ID  | Name           | Age | Department  | Salary |
| --- | -------------- | --- | ----------- | ------ |
| 1   | John Doe       | 28  | Engineering | 70000  |
| 2   | Jane Smith     | 34  | Marketing   | 80000  |
| 3   | Emily Davis    | 22  | Sales       | 45000  |
| 4   | Michael Brown  | 45  | HR          | 60000  |
| 5   | Jessica Wilson | 30  | Engineering | 75000  |

</details>

## Na Values

### Check for missing values

```python
import pandas as pd
df = pd.read_csv("employees.csv")
df.isna()
```

<details>
    <summary>Output</summary>

| ID    | Name  | Age   | Department | Salary |
| ----- | ----- | ----- | ---------- | ------ | --------------- |
| False | False | False | False      | False  |
| True  | True  | True  | True       | True   | <--- Nan Values |
| False | False | False | False      | False  |

</details>

### Dropping Rows with missing values

```python
import pandas as pd
df = pd.read_csv("employees.csv")
df = df.dropna()
```

### Convert missing values to a specific value

```python
import pandas as pd
df = pd.read_csv("employees.csv")
df.fillna(0, inplace=True)
```

## Columns & Rows

### Accessing Rows

```python
import pandas as pd
df = pd.read_csv("employees.csv")
df["Name"]
```

<details>
    <summary>Output</summary>

    0            John Doe
    1          Jane Smith
    2         Emily Davis
    3       Michael Brown
    4      Jessica Wilson
    5       Daniel Garcia
    6      Laura Martinez
    7      James Anderson
    8     Patricia Thomas
    9                 NaN
    10     Robert Jackson
    Name: Name, dtype: object

</details>

### How to get column at row index

```python
import pandas as pd
df = pd.read_csv("employees.csv")
print(df.loc[10])
```

### How to get specific row column value

```python
import pandas as pd
df = pd.read_csv("employees.csv")
df["Salary"][10]    # get the salary of the employee at index 10
```

### Math Operations

```python
df['Salary'].max()      # get the highest salary
df['Salary'].idxmax()   # get the index of the highest salary

df['Salary'].min()      # get the lowest salary
df['Salary'].idxmin()   # get the index of the lowest salary

df['Salary'].mean()     # get the average salary
df['Salary'].sum()      # get the total salaries
```

### How to add a Column

```python
import pandas as pd
df = pd.read_csv("employees.csv")
df.insert(5, "Bonus", "False")
df.head()
```

<details>
<summary>Output</summary>

| ID  | Name           | Age  | Department  | Salary  | Bonus |
| --- | -------------- | ---- | ----------- | ------- | ----- |
| 1.0 | John Doe       | 28.0 | Engineering | 70000.0 | False |
| 2.0 | Jane Smith     | 34.0 | Marketing   | 80000.0 | False |
| 3.0 | Emily Davis    | 22.0 | Sales       | 45000.0 | False |
| 4.0 | Michael Brown  | 45.0 | HR          | 60000.0 | False |
| 5.0 | Jessica Wilson | 30.0 | Engineering | 75000.0 | False |

</details>

### How to add a row

```python
import pandas as pd
df = pd.read_csv("employees.csv")
df.loc[10] = [11, "Robert Jackson", 33, "Engineering", 90000]
df.tail()
```

<details>
<summary>Output</summary>

| ID   | Name            | Age  | Department  | Salary  |
| ---- | --------------- | ---- | ----------- | ------- |
| 6.0  | Daniel Garcia   | 38.0 | Marketing   | 80000.0 |
| 7.0  | Laura Martinez  | 24.0 | Sales       | 45000.0 |
| 8.0  | James Anderson  | 30.0 | HR          | 60000.0 |
| 9.0  | Patricia Thomas | 35.0 | Engineering | 75000.0 |
| 10.0 | Robert Jackson  | 33.0 | Engineering | 90000.0 |

</details>

### How to rename a column

```python
import pandas as pd
df = pd.read_csv("employees.csv")
df.rename(columns={"Name": "Full Name"}, inplace=True)
df.head()
```

## Grouping

### Group by column

```python
import pandas as pd
df = pd.read_csv("employees.csv")
df.groupby("Department").count()
```

<details>
<summary>Output</summary>

| Department  | ID  | Name | Age | Salary |
| ----------- | --- | ---- | --- | ------ |
| Engineering | 3   | 3    | 3   | 3      |
| HR          | 2   | 2    | 2   | 2      |
| Marketing   | 2   | 2    | 2   | 2      |
| Sales       | 2   | 2    | 2   | 2      |

</details>

### Get the max values of each group

```python
import pandas as pd
df = pd.read_csv("employees.csv")
df.groupby("Department").max()
```

<details>
<summary>Output</summary>

| Department  | ID  | Name            | Age | Salary |
| ----------- | --- | --------------- | --- | ------ |
| Engineering | 9   | Patricia Thomas | 35  | 90000  |
| HR          | 8   | Michael Brown   | 45  | 60000  |
| Marketing   | 7   | Laura Martinez  | 38  | 80000  |
| Sales       | 6   | Laura Martinez  | 24  | 45000  |

</details>

Same applies for `min()`, `mean()`, `sum()`

## Sorting Values

```python
import pandas as pd
df = pd.read_csv("employees.csv")
df.sort_values("Name", ascending=True)
```

<details>
<summary>Output</summary>

| ID  | Name           | Age | Department | Salary |
| --- | -------------- | --- | ---------- | ------ |
| 7   | James Anderson | 30  | HR         | 60000  |
| 1   | Jane Smith     | 34  | Marketing  | 80000  |
| 4   | Michael Brown  | 45  | HR         | 60000  |

</details>

## Dates

### How to convert a column to a date

```python
import pandas as pd
df = pd.read_csv("employees.csv")
df['Date'] = pd.to_datetime(df['Date'])
```

## Pivot Tables

| Category | Item | Value |
| -------- | ---- | ----- |
| A        | X    | 10    |
| A        | Y    | 20    |
| B        | X    | 30    |
| B        | Y    | 40    |
| C        | X    | 50    |
| C        | Y    | 60    |

```python
import pandas as pd
df = pd.read_csv("employees.csv")
pivoted = df.pivot(index='Category', columns='Item', values='Value')
```

<details>
<summary>Output</summary>

| Item       | X      | Y       |
| ---------- | ------ | ------- |
| Category   |        |         |
| ---------- | ------ | ------- |
| A          | 10     | 20      |
| B          | 30     | 40      |
| C          | 50     | 60      |

</details>

## How to make chart with matplotlib

Given table:

| Date       | Facebook | Youtube |
| ---------- | -------- | ------- |
| 2022-01-31 | 4        | 8       |
| 2022-02-28 | 8        | 7       |
| 2022-03-31 | 5        | 1       |
| 2022-04-30 | 7        | 8       |
| 2022-05-31 | 1        | 6       |
| 2022-06-30 | 4        | 9       |

### Create a simple line chart

```python
import pandas as pd
import matplotlib.pyplot as plt

df = pd.read_csv("social_media.csv")
plt.plot(data.index, data["Facebook"])
```

<details>
<summary>Output</summary>

![alt text](@site/static/img/pandas/simpleChart.png)

</details>

### Create a multiline chart

```python
import pandas as pd
import matplotlib.pyplot as plt

df = pd.read_csv("social_media.csv")
plt.plot(data.index, data["Facebook"])
plt.plot(data.index, data["Youtube"])
```

<details>
<summary>Output</summary>

![alt text](@site/static/img/pandas/multilineChart.png)

</details>

### How to change the size of the chart

```python
import matplotlib.pyplot as plt

plt.figure(figsize=(10, 5))
plt.plot(data.index, data["Facebook"])
```

### How to add labels to the chart

```python
import matplotlib.pyplot as plt

plt.plot(data.index, data["Facebook"])
plt.xlabel("Date", fontsize=12)
plt.ylabel("Facebook")
plt.title("Facebook Usage")
```

### How to add a legend

```python
import matplotlib.pyplot as plt

plt.plot(data.index, data["Facebook"], label="Facebook")
plt.plot(data.index, data["Youtube"], label="Youtube")
plt.legend()
```

### How to smooth the timeseries

By using the rolling method we can smooth the timeseries using the mean of the last n values.

```python
import matplotlib.pyplot as plt

rolled = data.rolling(window=2).mean()
plt.plot(rolled.index, rolled["Facebook"])
```

<details>
<summary>Output</summary>

![alt text](@site/static/img/pandas/timeSmoothing.png)

</details>
