# Website

This website is built using [Docusaurus 2](https://docusaurus.io/), a modern static website generator.

## Getting Started

Install Docker + Docker compose

from the root folder run

```bash
docker-compose up -d --build docs_server
```

## How to add new items in snippets dropdown

1. Create folder structure under docs folder, ex javascript/react
2. In docusaurus.config.js add the new type to die dropdown

```js
// Snippets dropdown menu
{type: "dropdown", label: "Snippets", position: "left", items: [
    {type: "doc", label: "JavaScript", docId: "javascript/basics/README"},
    {type: "doc", label: "Docker", docId: "docker/docker"},
]},
```

3. in the sidebar.js file add the name and the type

```js
javascript: [{ type: 'autogenerated', dirName: 'javascript' }],
```
