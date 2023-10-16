---
sidebar_label: "Pandas"
---

# Pandas
## Getting Started

```bash
pip install pandas
```

```python
import pandas as pd
df = pd.read_csv('QueryResults.csv')
```

## Show Dataframe Details

```python
df.head()   ## show first 5 rows
df.tail()   ## show last 5 rows
df.shape    ## show number of rows and columns
df.columns  ## show column names
```

## Nan Values

```python
df.isna()           ## check for missing values
df = df.dropna()    ## drop rows with missing values
```

## Accessing Columns

```python
df["tag"]
df["posts"].max()
df["posts"].min()
df["posts"].mean()
df["posts"].idxmax()    ## Get the index of the highest value
df["posts"].idxmin()    ## Get the index of the lowest value
df.loc[17]              ## See entry at index 17
df[["tag", "posts"]]    ## filer columns
df['tag'][13]           ## Access entry at index 13 in column tag
```

## Adding Columns

```python 
new_column = "Whatever Data"
df.insert(3, "Coulumn name", new_column)    ## index location, column name, value
```

## Grouping

```python
df.groupby('tag').count()   ## number of entries
df.groupby('tag').max()     ## most entries on a day
df.groupby('tag').min()

## Sorting values
df.groupby("tag").max().sort_values("posts", ascending=False)
```

## Sorting Values

```python
df.sort_values("posts", ascending=False)
```