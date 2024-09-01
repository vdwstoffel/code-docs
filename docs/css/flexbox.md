---
sidebar_label: "Flexbox"
sidebar_position: 2
---

import CodeBlock from "@theme/CodeBlock";
import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

import BrowserWindow from "@site/src/components/BrowserWindow/BrowserWindow";

# Flexbox

Flexbox is a layout model that allows you to design complex layouts more easily. It is a one-dimensional layout method for laying out items in rows or columns. Items flex to fill additional space and shrink to fit into smaller spaces.

## Flex Container

### Flex

```html
<div class="container">
  <div>1</div>
  <div>2</div>
  <div>3</div>
</div>
```

### Flex Direction

```mdx-code-block
<Tabs>
<TabItem value="Row">
```

```css
.container {
  display: flex;
  flex-direction: row;
}
```

<BrowserWindow>
    <div style={{ display: 'flex', flexDirection: 'row', height: '100px', width: '100px', backgroundColor: 'lightgray', color: "black" }}>
        <div style={{ border: "1px solid black", width: '50px' }}>1</div>
        <div style={{ border: "1px solid black", width: '50px' }}>2</div>
        <div style={{ border: "1px solid black", width: '50px' }}>3</div>
    </div>
</BrowserWindow>

```mdx-code-block
</TabItem>
<TabItem value="Column">
```

```css
.container {
  display: flex;
  flex-direction: column;
}
```

<BrowserWindow>
    <div style={{ display: 'flex', flexDirection: 'column', height: '100px', width: '100px', backgroundColor: 'lightgray', color: "black" }}>
        <div style={{ border: "1px solid black"}}>1</div>
        <div style={{ border: "1px solid black"}}>2</div>
        <div style={{ border: "1px solid black" }}>3</div>
    </div>
</BrowserWindow>

```mdx-code-block
</TabItem>
<TabItem value="Row-Reverse">
```

```css
.container {
  display: flex;
  flex-direction: row-reverse;
}
```

<BrowserWindow>
    <div style={{ display: 'flex', flexDirection: 'row-reverse', height: '100px', width: '100px', backgroundColor: 'lightgray', color: "black" }}>
        <div style={{ border: "1px solid black", width: '50px' }}>1</div>
        <div style={{ border: "1px solid black", width: '50px' }}>2</div>
        <div style={{ border: "1px solid black", width: '50px' }}>3</div>
    </div> 
</BrowserWindow>

```mdx-code-block
</TabItem>
<TabItem value="Column-Reverse">
```

```css
.container {
  display: flex;
  flex-direction: column-reverse;
}
```

<BrowserWindow>
    <div style={{ display: 'flex', flexDirection: 'column-reverse', height: '100px', width: '100px', backgroundColor: 'lightgray', color: "black" }}>
        <div style={{ border: "1px solid black"}}>1</div>
        <div style={{ border: "1px solid black"}}>2</div>
        <div style={{ border: "1px solid black" }}>3</div>
    </div>
</BrowserWindow>

```mdx-code-block
</TabItem>
</Tabs>
```

### Flex Wrap

```mdx-code-block
<Tabs>
<TabItem value="No Wrap">
```

```css
.container {
  display: flex;
  flex-wrap: nowrap;
}
```

<BrowserWindow>
    <div style={{ display: 'flex', flexWrap: 'nowrap', height: '100px', width: '100px', backgroundColor: 'lightgray', color: "black" }}>
        <div style={{ border: "1px solid black", width: '50px' }}>1</div>
        <div style={{ border: "1px solid black", width: '50px' }}>2</div>
        <div style={{ border: "1px solid black", width: '50px' }}>3</div>
    </div>
</BrowserWindow>

```mdx-code-block
</TabItem>
<TabItem value="Wrap">
```

```css
.container {
  display: flex;
  flex-wrap: wrap;
}
```

<BrowserWindow>
    <div style={{ display: 'flex', flexWrap: 'wrap', height: '100px', width: '100px', backgroundColor: 'lightgray', color: "black" }}>
        <div style={{ border: "1px solid black", width: '50px' }}>1</div>
        <div style={{ border: "1px solid black", width: '50px' }}>2</div>
        <div style={{ border: "1px solid black", width: '50px' }}>3</div>
    </div>
</BrowserWindow>

```mdx-code-block
</TabItem>
<TabItem value="Wrap-Reverse">
```

```css
.container {
  display: flex;
  flex-wrap: wrap-reverse;
}
```

<BrowserWindow>
    <div style={{ display: 'flex', flexWrap: 'wrap-reverse', height: '100px', width: '100px', backgroundColor: 'lightgray', color: "black" }}>
        <div style={{ border: "1px solid black", width: '50px' }}>1</div>
        <div style={{ border: "1px solid black", width: '50px' }}>2</div>
        <div style={{ border: "1px solid black", width: '50px' }}>3</div>
    </div>
</BrowserWindow>

```mdx-code-block
</TabItem>
</Tabs>
```

### Justify Content

```mdx-code-block
<Tabs>
<TabItem value="Flex Start">
```

```css
.container {
  display: flex;
  justify-content: flex-start;
}
```

<BrowserWindow>
    <div style={{ display: 'flex', justifyContent: 'flex-start', height: '100px', width: '300px', backgroundColor: 'lightgray', color: "black" }}>
        <div style={{ border: "1px solid black", width: '50px' }}>1</div>
        <div style={{ border: "1px solid black", width: '50px' }}>2</div>
        <div style={{ border: "1px solid black", width: '50px' }}>3</div>
    </div>
</BrowserWindow>

```mdx-code-block
</TabItem>
<TabItem value="Flex End">
```

```css
.container {
  display: flex;
  justify-content: flex-end;
}
```

<BrowserWindow>
    <div style={{ display: 'flex', justifyContent: 'flex-end', height: '100px', width: '300px', backgroundColor: 'lightgray', color: "black" }}>
        <div style={{ border: "1px solid black", width: '50px' }}>1</div>
        <div style={{ border: "1px solid black", width: '50px' }}>2</div>
        <div style={{ border: "1px solid black", width: '50px' }}>3</div>
    </div>
</BrowserWindow>

```mdx-code-block
</TabItem>
<TabItem value="Center">
```

```css
.container {
  display: flex;
  justify-content: center;
}
```

<BrowserWindow>
    <div style={{ display: 'flex', justifyContent: 'center', height: '100px', width: '300px', backgroundColor: 'lightgray', color: "black" }}>
        <div style={{ border: "1px solid black", width: '50px' }}>1</div>
        <div style={{ border: "1px solid black", width: '50px' }}>2</div>
        <div style={{ border: "1px solid black", width: '50px' }}>3</div>
    </div>
</BrowserWindow>

```mdx-code-block
</TabItem>
<TabItem value="Space Between">
```

```css
.container {
  display: flex;
  justify-content: space-between;
}
```

<BrowserWindow>
    <div style={{ display: 'flex', justifyContent: 'space-between', height: '100px', width: '300px', backgroundColor: 'lightgray', color: "black" }}>
        <div style={{ border: "1px solid black", width: '50px' }}>1</div>
        <div style={{ border: "1px solid black", width: '50px' }}>2</div>
        <div style={{ border: "1px solid black", width: '50px' }}>3</div>
    </div>
</BrowserWindow>

```mdx-code-block
</TabItem>
<TabItem value="Space Around">
```

```css
.container {
  display: flex;
  justify-content: space-around;
}
```

<BrowserWindow>
    <div style={{ display: 'flex', justifyContent: 'space-around', height: '100px', width: '300px', backgroundColor: 'lightgray', color: "black" }}>
        <div style={{ border: "1px solid black", width: '50px' }}>1</div>
        <div style={{ border: "1px solid black", width: '50px' }}>2</div>
        <div style={{ border: "1px solid black", width: '50px' }}>3</div>
    </div>
</BrowserWindow>

````mdx-code-block
</TabItem>
<TabItem value="Space Evenly">

```css
.container {
  display: flex;
  justify-content: space-evenly;
}
````

<BrowserWindow>
    <div style={{ display: 'flex', justifyContent: 'space-evenly', height: '100px', width: '300px', backgroundColor: 'lightgray', color: "black" }}>
        <div style={{ border: "1px solid black", width: '50px' }}>1</div>
        <div style={{ border: "1px solid black", width: '50px' }}>2</div>
        <div style={{ border: "1px solid black", width: '50px' }}>3</div>
    </div>
</BrowserWindow>

```mdx-code-block
</TabItem>
</Tabs>
```

### Align Items

```mdx-code-block
<Tabs>
<TabItem value="Flex Start">
```

```css
.container {
  display: flex;
  align-items: flex-start;
}
```

<BrowserWindow>
    <div style={{ display: 'flex', alignItems: 'flex-start', height: '100px', width: '100px', backgroundColor: 'lightgray', color: "black" }}>
        <div style={{ border: "1px solid black", height: '50px' }}>1</div>
        <div style={{ border: "1px solid black", height: '50px' }}>2</div>
        <div style={{ border: "1px solid black", height: '50px' }}>3</div>
    </div> 
</BrowserWindow>

```mdx-code-block
</TabItem>
<TabItem value="Flex End">
```

```css
.container {
  display: flex;
  align-items: flex-end;
}
```

<BrowserWindow>
    <div style={{ display: 'flex', alignItems: 'flex-end', height: '100px', width: '100px', backgroundColor: 'lightgray', color: "black" }}>
        <div style={{ border: "1px solid black", height: '50px' }}>1</div>
        <div style={{ border: "1px solid black", height: '50px' }}>2</div>
        <div style={{ border: "1px solid black", height: '50px' }}>3</div>
    </div>
</BrowserWindow>

```mdx-code-block
</TabItem>
<TabItem value="Center">
```

```css
.container {
  display: flex;
  align-items: center;
}
```

<BrowserWindow>
    <div style={{ display: 'flex', alignItems: 'center', height: '100px', width: '100px', backgroundColor: 'lightgray', color: "black" }}>
        <div style={{ border: "1px solid black", height: '50px' }}>1</div>
        <div style={{ border: "1px solid black", height: '50px' }}>2</div>
        <div style={{ border: "1px solid black", height: '50px' }}>3</div>
    </div>
</BrowserWindow>

```mdx-code-block
</TabItem>
<TabItem value="Baseline">
```

```css
.container {
  display: flex;
  align-items: baseline;
}
```

<BrowserWindow>
    <div style={{ display: 'flex', alignItems: 'baseline', height: '100px', width: '100px', backgroundColor: 'lightgray', color: "black" }}>
        <div style={{ border: "1px solid black", height: '50px' }}>1</div>
        <div style={{ border: "1px solid black", height: '50px' }}>2</div>
        <div style={{ border: "1px solid black", height: '50px' }}>3</div>
    </div>
</BrowserWindow>

```mdx-code-block
</TabItem>
<TabItem value="Stretch">
```

```css
.container {
  display: flex;
  align-items: stretch;
}
```

<BrowserWindow>
    <div style={{ display: 'flex', alignItems: 'stretch', height: '100px', width: '100px', backgroundColor: 'lightgray', color: "black" }}>
        <div style={{ border: "1px solid black", height: '50px' }}>1</div>
        <div style={{ border: "1px solid black", height: '50px' }}>2</div>
        <div style={{ border: "1px solid black", height: '50px' }}>3</div>
    </div>
</BrowserWindow>

```mdx-code-block
</TabItem>
</Tabs>
```

### Align Content

```mdx-code-block
<Tabs>
<TabItem value="Flex Start">
```

```css
.container {
  display: flex;
  align-content: flex-start;
  flex-wrap: wrap;
}
```

<BrowserWindow>
    <div style={{ display: 'flex', flexWrap: "wrap", alignContent: 'flex-start', height: '200px', width: '300px', backgroundColor: 'lightgray', color: "black" }}>
        <div style={{ border: "1px solid black", height: '50px', width: '50px' }}>1</div>
        <div style={{ border: "1px solid black", height: '50px', width: '50px' }}>2</div>
        <div style={{ border: "1px solid black", height: '50px', width: '50px' }}>3</div>
    </div>
</BrowserWindow>

```mdx-code-block
</TabItem>
<TabItem value="Flex End">
```

```css
.container {
  display: flex;
  align-content: flex-end;
  flex-wrap: wrap;
}
```

<BrowserWindow>
    <div style={{ display: 'flex', flexWrap: "wrap", alignContent: 'flex-end', height: '200px', width: '300px', backgroundColor: 'lightgray', color: "black" }}>
        <div style={{ border: "1px solid black", height: '50px', width: '50px' }}>1</div>
        <div style={{ border: "1px solid black", height: '50px', width: '50px' }}>2</div>
        <div style={{ border: "1px solid black", height: '50px', width: '50px' }}>3</div>
    </div>
</BrowserWindow>

```mdx-code-block
</TabItem>
<TabItem value="Center">
```

```css
.container {
  display: flex;
  align-content: center;
  flex-wrap: wrap;
}
```

<BrowserWindow>
    <div style={{ display: 'flex', flexWrap: "wrap", alignContent: 'center', height: '200px', width: '300px', backgroundColor: 'lightgray', color: "black" }}>
        <div style={{ border: "1px solid black", height: '50px', width: '50px' }}>1</div>
        <div style={{ border: "1px solid black", height: '50px', width: '50px' }}>2</div>
        <div style={{ border: "1px solid black", height: '50px', width: '50px' }}>3</div>
    </div>
</BrowserWindow>

```mdx-code-block
</TabItem>
<TabItem value="Space Between">
```

```css
.container {
  display: flex;
  align-content: space-between;
  flex-wrap: wrap;
}
```

<BrowserWindow>
    <div style={{ display: 'flex', flexWrap: "wrap" ,alignContent: 'space-between', height: '200px', width: '300px', backgroundColor: 'lightgray', color: "black" }}>
        <div style={{ border: "1px solid black", height: '50px', width: '50px' }}>1</div>
        <div style={{ border: "1px solid black", height: '50px', width: '50px' }}>2</div>
        <div style={{ border: "1px solid black", height: '50px', width: '50px' }}>3</div>
         <div style={{ border: "1px solid black", height: '50px', width: '50px' }}>4</div>
        <div style={{ border: "1px solid black", height: '50px', width: '50px' }}>5</div>
        <div style={{ border: "1px solid black", height: '50px', width: '50px' }}>6</div>
         <div style={{ border: "1px solid black", height: '50px', width: '50px' }}>7</div>
        <div style={{ border: "1px solid black", height: '50px', width: '50px' }}>8</div>
        <div style={{ border: "1px solid black", height: '50px', width: '50px' }}>9</div>
    </div>
</BrowserWindow>

```mdx-code-block
</TabItem>
<TabItem value="Space Around">
```

```css
.container {
  display: flex;
  align-content: space-around;
  flex-wrap: wrap;
}
```

<BrowserWindow>
    <div style={{ display: 'flex', flexWrap: "wrap", alignContent: 'space-around', height: '200px', width: '300px', backgroundColor: 'lightgray', color: "black" }}>
        <div style={{ border: "1px solid black", height: '50px', width: '50px' }}>1</div>
        <div style={{ border: "1px solid black", height: '50px', width: '50px' }}>2</div>
        <div style={{ border: "1px solid black", height: '50px', width: '50px' }}>3</div>
         <div style={{ border: "1px solid black", height: '50px', width: '50px' }}>4</div>
        <div style={{ border: "1px solid black", height: '50px', width: '50px' }}>5</div>
        <div style={{ border: "1px solid black", height: '50px', width: '50px' }}>6</div>
         <div style={{ border: "1px solid black", height: '50px', width: '50px' }}>7</div>
        <div style={{ border: "1px solid black", height: '50px', width: '50px' }}>8</div>
        <div style={{ border: "1px solid black", height: '50px', width: '50px' }}>9</div>
    </div>
</BrowserWindow>

```mdx-code-block
</TabItem>
<TabItem value="Stretch">
```

```css
.container {
  display: flex;
  align-content: stretch;
  flex-wrap: wrap;
}
```

<BrowserWindow>
    <div style={{ display: 'flex', flexWrap: "wrap", alignContent: 'stretch', height: '200px', width: '300px', backgroundColor: 'lightgray', color: "black" }}>
        <div style={{ border: "1px solid black", height: '50px', width: '50px' }}>1</div>
        <div style={{ border: "1px solid black", height: '50px', width: '50px' }}>2</div>
        <div style={{ border: "1px solid black", height: '50px', width: '50px' }}>3</div>
    </div>
</BrowserWindow>

```mdx-code-block
</TabItem>
</Tabs>
```
