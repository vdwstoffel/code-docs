---
sidebar_label: "Examples"
---

# Examples

## Advance filtering Express + Mongoose

### Filtering

```
/api/tours?difficulty=easy&price[lt]=1500

difficulty = easy
price[lt] = 1500
```

```js
app.get('/api/tours' async (req, res) => {
  console.log(re.query) // { difficulty: 'easy', price: { lt: '1500' } }
  try {
    //Build Query
    let queryObj = { ...req.query }; // destructure to create new copy
    const excludeFields = ["page", "sort", "limit", "fields"]; // exclude from the params
    excludeFields.forEach((el) => delete queryObj[el]); // delete from the object

    let queryStr = JSON.stringify(queryObj); // turn into string to use js replace
    // use regex to transform lt into $lt (mongodb for less than)
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    queryObj = JSON.parse(queryStr); // convert back into object

    const query = Tour.find(queryObj);

    // Execute Query
    const tours = await query;

    // Send response
  } catch (err) {
    // send error
  }
});
```

### Sorting

```
api/v1/tours?sort=duration
```

```js
app.get('/api/tours' async (req, res) => {

  console.log(req.query) //{ sort: 'duration' }

  // add additional logic to exclude sorting from mongo queries

  try {
    let query = Tour.find(cleanedQuery); // db find logic

    //  Sorting
    if (req.query.sort) {
      query.sort(req.query.sort)
    }

    // Execute Query
    const tours = await query;

    // Send response
  } catch (err) {
    // send err
  }
});
```


### Limiting Fields


```
api/v1/tours?fields=price,duration
```

```js
app.get('/api/tours' async (req, res) => {

  console.log(req.query) //{ fields: 'price,duration' }

  // add additional logic to exclude sorting from mongo queries

  try {
    let query = Tour.find(cleanedQuery); // db find logic

    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" "); // create one string with word split by a space
      query = query.select(fields); // expects names separated by space as one string
    } else {
      query = query.select('-__v') // use - to exclude __v
    }

    // Execute Query
    const tours = await query;

    // Send response
  } catch (err) {
    // send err
  }
});
```

### Pagnation

```
api/v1/tours?page=2&limit=3
```

```js
app.get('/api/tours' async (req, res) => {

  console.log(req.query) // { page: '2', limit: '3' }

  // add additional logic to exclude sorting from mongo queries

  try {
    let query = Tour.find(cleanedQuery); // db find logic

    /* pagination
     * skip: amount of results to be skipped before getting data
     * limit: amount of results to return
     */

    const page = req.query.page * 1 || 1; // convert string to number. by default use page 1
    const limit = req.query.limit * 1 || 10; // set default limit to 10
    const skip = (page - 1) * limit; // calculate the skip

    query = query.skip(skip).limit(limit);

    // Execute Query
    const tours = await query;

    // check that we do not skip all the documents
    if (req.query.page) {
      const numTours = await Tour.countDocuments();
      if (skip >= numTours) throw new Error("This page does not exist!"); // go to the catch block
    }

    // Send response
  } catch (err) {
    // send err
  }
});
```