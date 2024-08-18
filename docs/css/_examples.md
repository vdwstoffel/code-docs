---
sidebar_label: "Examples"
---

import CodeBlock from "@theme/CodeBlock";
import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

import ImageOverlay from "@site/src/components/cssExamples/ImageOverlay"

# Examples

## Image Overlay

```mdx-code-block
<Tabs>
<TabItem value="Dark Overlay">
```

<ImageOverlay text={"Beautiful image with dark overlay"} effect={"darkOverlay"}/>

```html
<div class="test">
  <p>Beautiful image with dark overlay</p>
</div>
```

```css
.test {
  width: 500px;
  height: 400px;
  background-size: cover;
  background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url("https://download.unsplash.com/photo-1428604467652-115d9d71a7f1");
  position: relative;
}

.test p {
  font-size: 23px;
  color: #fff;
  text-transform: uppercase;
  font-family: sans-serif;
  position: absolute;
  top: 160px;
  left: 22px;
}
```

```mdx-code-block
</TabItem>
<TabItem value="Text Box">
```

<ImageOverlay text={"Beautiful image with some text in a box"} effect={"textBox"}/>

```html
<div class="test">
  <p>Beautiful image with some text in a box</p>
</div>
```

```css
.test {
  width: 500px;
  height: 400px;
  background-size: cover;
  position: relative;
  background-image: url("https://download.unsplash.com/photo-1428604467652-115d9d71a7f1");
}

.test p {
  background-color: rgba(0, 0, 0, 0.6);
  color: #fff;
  display: inline;
  padding: 10px;
  font-size: 30px;
  color: #fff;
  text-transform: uppercase;
  font-family: sans-serif;
  width: 440px;
  position: absolute;
  top: 120px;
  left: 20px;
}
```

```mdx-code-block
</TabItem>
<TabItem value="Floor Fade">
```

<ImageOverlay text={"Beautiful image with floor fade"} effect={"floorFade"}/>

```html
<div class="test">
  <p>Beautiful image with floor fade</p>
</div>
```

```css
.test {
  width: 500px;
  height: 400px;
  background-size: cover;
  background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.6)),
    url("https://download.unsplash.com/photo-1428604467652-115d9d71a7f1");
  position: relative;
}

.test p {
  font-size: 24px;
  color: #fff;
  text-transform: uppercase;
  font-family: sans-serif;
  position: absolute;
  bottom: 10px;
  left: 25px;
}
```

```mdx-code-block
</TabItem>
</Tabs>
```
