---
sidebar_label: "Examples"
---

# Examples

## Advance filtering Express + Mongoose

```
/api/tours?difficulty=easy&price[lt]=1500

difficulty = easy
price[lt] = 1500
```

```js
app.get('/api/tours' async (req, res) => {
  try {
    //Build Query
    let queryObj = { ...req.query }; // destructure to create new copy
    const excludeFields = ["page", "sort", "limit", "fields"]; // exclude from the params
    excludeFields.forEach((el) => delete queryObj[el]); // delete from the object

    let queryStr = JSON.stringify(queryObj); // turn into string to use js replace
    // use regex to transform lt into $lt (mongodb for less than)
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    queryObj = JSON.parse(queryStr); // convert back into object

    console.log(queryObj);
    const query = Tour.find(queryObj);

    // Execute Query
    const tours = await query;

    // Send response
    res.status(200).json(tours);
  } catch (err) {
    res.status(400).json({ status: "error", message: err });
  }
});
```
