---
slug: docusaurus
title: Docusaurus
authors:
  name: Christoff van der Walt
  title: Author
  url: https://github.com/vdwstoffel
  image_url: https://avatars.githubusercontent.com/u/86371768?s=400&v=4
tags: [docusaurus, code_blocks]
---

import CodeBlock from "@theme/CodeBlock";
import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

## Adding Code Block tabs to Docusaurus .md files

As early as possible import the relevant imports

```md
import CodeBlock from "@theme/CodeBlock";
import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";
```

Then you need to wrap all the code blocks in a Tab and Tabitems. Notice how the middle closes one tabitem and opens another

````md
```mdx-code-block
<Tabs>
<TabItem value="python.py">
```

CODE SNIPPET

```mdx-code-block
</TabItem>
<TabItem value="javascript.js">
```

CODE SNIPPET

```mdx-code-block
</TabItem>
</Tabs>
```
````

---

```mdx-code-block
<Tabs>
<TabItem value="python.py">
```

```python
print("Hello World")
```

```mdx-code-block
</TabItem>
<TabItem value="javascript.js">
```

```js
console.log("Hello World");
```

```mdx-code-block
</TabItem>
</Tabs>
```

## Highlight Code

`//` Should reflect the language comment

```md
// highlight-next-line
```

```js
// highlight-next-line
console.log("HEllo");
```

```md
// highlight-start
....
// highlight-end
```

```python
# highlight-start
x = "something"
print(x)
# highlight-end
```
