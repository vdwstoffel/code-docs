---
sidebar_label: "Robot Framework"
---

import CodeBlock from "@theme/CodeBlock";
import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

# Robot Framework

## Setting up a basic test

```bash
pip install robotframework
```

To run a test

```bash
robot -t TestName /path/to/test
robot -s TestSuite /path/to/suite
```

<Tabs>
<TabItem value="__init__.py">

The `__init__.robot` file in Robot Framework serves as an initialization file for a directory, allowing the setup of common settings and resources shared across multiple test suites within that directory.

```robotframework
*** Settings ***
Documentation    This is the initialization file for the test suite.

Suite Setup    Suite Setup Default

*** Keywords ***
Suite Setup Default
    Log    This is a custom suite setup
```

</TabItem>
<TabItem value="common.resource">

```robotframework
*** Settings ***
Documentation
...    This is a resource file that can contain keyword for the test suites

*** Keywords ***
Default Test Setup
    Log    This is the start of a test

Default Test Teardown
    Log    This is the end of the test
```

</TabItem>
<TabItem value="TestSuite.robot">

```robotframework
*** Settings ***
Documentation
...    Add some documentation what the suite is about

Resource     common.resource
Library      Libraries.py
Test Tags    Robot Example

Test Setup       Default Test Setup
Test Teardown    Default Test Teardown

*** Test Cases ***
Add Two Numbers
    Add    ${5}    ${1}    ${6}

Cat 2 Streings
    Cat two strings    Hello    World    HelloWorld
```

</TabItem>
<TabItem value="Libraries.py">

```python
from robot.api.deco import keyword

class Libraries:

    ROBOT_LIBRARY_SCOPE = 'SUITE'

    @keyword(name="Add")
    def add(self, num1, num2, expected_answer):
        assert num1 + num2 == expected_answer

    @keyword(name="Cat two strings")
    def concatenate_two_strings(self, str1, str2, expected_answer):
        assert  str1 + str2 == expected_answer
```

</TabItem>
</Tabs>

## Create a python list

```robotframework
*** Settings ***
Library    Collections

*** Test Cases ***
Print List
    @{list}    one    two    three
    Log    ${list}
```

## Create a python dictionary

```robotframework
*** Settings ***
Library    Collections

*** Test Cases ***
Print Dictionary
    &{dict}    one=1    two=2    three=3
    Log    ${dict}
```
