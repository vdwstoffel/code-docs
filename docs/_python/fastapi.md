---
sidebar_label: "FastAPI"
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";
import FastApi from "@site/static/img/fastapi.png"
import DisplayLogo from "@site/src/components/DisplayLogo"

# FastAPI

FastAPI is a modern, fast (high-performance), web framework for building APIs with Python 3.6+ based on standard Python type hints.

<DisplayLogo logo={FastApi} />

## MVC

```bash
.
├── controllers
│   ├── items.py
├── main.py
└── requirements.txt
```

```bash
python -m venv .venv
source .venv/bin/activate

pip install "fastapi[standard]"
```

```mdx-code-block
<Tabs>
<TabItem value="items.py">
```

The controller file contains the API endpoints + business logic.

```python
from fastapi import APIRouter
from fastapi import status
from pydantic  import BaseModel


class Item(BaseModel):
    name: str
    price: int

router = APIRouter(prefix="/items")

@router.get("", status_code=status.HTTP_200_OK)
def get_all_items():
    return {"message": "All items returned"}

@router.get("/{itemId}", status_code=status.HTTP_200_OK)
def get_item_by_id(itemId: str):
    return {"message": f"Return item id {itemId}"}

@router.post("", status_code=status.HTTP_201_CREATED)
def create_item(item: Item):
    return {"message": item}

@router.delete("", status_code=status.HTTP_200_OK)
def get_all_items():
    return {"message": "All items deleted"}
```

```mdx-code-block
</TabItem>
<TabItem value="main.py">
```

The main file is the entry point of the application.

```python
from typing import Union
from fastapi import FastAPI

from controllers import items

app = FastAPI()

app.include_router(items.router)
```

```mdx-code-block
</TabItem>
</Tabs>
```

Run the application:

```bash
fastapi dev main.py
```

Ping the API:

```bash
curl -X GET "http://localhost:8000/items"
```

View Swagger API documentation:

```bash
http://localhost:8000/docs
```
