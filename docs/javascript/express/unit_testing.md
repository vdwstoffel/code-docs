---
sidebar_label: Unit Testing
---

import CodeBlock from "@theme/CodeBlock";
import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

# Unit Testing

```bash
npm i -D mocha
npm i -D chai@4.3.6 # version ^5 only supports modules
npm i -D chai-http
npm i -D nyc        # code coverage
```

```
├── app.js
├── birdsController.js
├── birdsModel.js
├── birdsRoute.js
├── package.json
├── package-lock.json
├── server.js
└── tests
    └── birds.test.js
```

```mdx-code-block
<Tabs>
<TabItem value="server.js">
```

```js
const app = require("./app");

app.listen(3000);
```

```mdx-code-block
</TabItem>
<TabItem value="app.js">
```

```js
const express = require("express");
const app = express();

const birdRouter = require("./birdsRoute");

app.use("/birds", birdRouter);

module.exports = app;
```

```mdx-code-block
</TabItem>
<TabItem value="birdsRouter.js">
```

```js
const express = require("express");
const router = express.Router();

const birdController = require("./birdsController");

router.route("/").get(birdController.getAllBirds).post(birdController.createBird);

module.exports = router;
```

```mdx-code-block
</TabItem>
<TabItem value="birdsController.js">
```

```js
module.exports.getAllBirds = async (req, res) => {
  res.status(200).json({ status: "success", data: { type: "bird" } });
};

// http://127.0.0.1:3000/birds?title=birds&text=all_birds
module.exports.createBird = async (req, res) => {
  const { title, text } = req.query;

  if (!title || !text) {
    return res.status(400).json({ status: "error", message: "Invalid Input" });
  }
  res.status(200).json({ status: "success", data: req.query });
};
```

```mdx-code-block
</TabItem>
<TabItem value="test/birds.test.js">
```

```js
const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app");

const should = chai.should();
chai.use(chaiHttp);

describe("Birds Route /Get", () => {
  it("Should return correct response", (done) => {
    chai
      .request(app)
      .get("/birds")
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.property("status").eql("success");
        res.body.should.have.property("data");
        done();
      });
  });
});

describe("Birds Controller /Post", () => {
  it("Should return success if all fields are filed in", (done) => {
    chai
      .request(app)
      .post("/birds?title=birds&text=all_birds")
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property("status").eql("success");
        done();
      });
  });

  it("Should fail in not all fields are filled", (done) => {
    chai
      .request(app)
      .post("/birds?title=bird")
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property("message").eql("Invalid Input");
        done();
      });
  });
});
```

```mdx-code-block
</TabItem>
</Tabs>
```

```json title="package.json"
 "scripts": {
    "test": "mocha ./tests/*.test.js",
    "coverage": "nyc --reporter=text --reporter=lcov npm test"
  },
```

```bash
npm test
npm run coverage
```

## Test Skeleton

```js
describe("What does the suite cover", () => {
  it("what does the test do", (done) => {
    let blog = {
      body: "This is the body",
    };

    chai
      .request(app)
      .post("/endpoint")
      .send(blog)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.property("errors");
        res.body.errors.should.have.property("title");
        res.body.errors.title.should.have.property("kind").eql("required");
        done();
      });
  });

  it("another test", (done) => {
    chai
      .request(app)
      .post("/another/endpoint")
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("array");
        res.body.should.have.property("message").eql("Blog successfully added!");
        res.body.blog.should.have.property("title");
        res.body.blog.should.have.property("body");
        done();
      });
  });
});
```
