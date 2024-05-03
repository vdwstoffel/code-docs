---
sidebar_label: "Selenium"
---

# Selenium

## Install Dependencies

```bash
pip install selenium
pip install webdriver-manager
```

## Install webdrivers

```bash
webdriver-manager firefox chrome --linkpath /usr/local/bin
```

https://github.com/mozilla/geckodriver/releases
export PATH=$PATH:/path/to/folder/geckodriver

## Getting Started

### Open window and get title

```python
from selenium import webdriver

driver = webdriver.Firefox()
driver.get("https://wikipedia.org")
print(driver.title)
driver.quit()
```

### Get text from element

```python
from selenium import webdriver
from selenium.webdriver.common.by import By

driver = webdriver.Firefox()
driver.get("https://wikipedia.org")
element = driver.find_element(by=By.ID, value="js-link-box-en")
print(element.text)
driver.quit()
```

### Set window size

```python
from selenium import webdriver

driver = webdriver.Firefox()
driver.set_window_size(1024, 768)
driver.quit()
```

### Set wait time

```python
from selenium import webdriver

driver = webdriver.Firefox()
#highlight-next-line
driver.implicitly_wait(10) # seconds
driver.get("http://somedomain/url_that_delays_loading")
driver.quit()
```

## Locating Elements

### By ID

```python
from selenium import webdriver
from selenium.webdriver.common.by import By

driver = webdriver.Firefox()
driver.get("https://wikipedia.org")
#highlight-next-line
element = driver.find_element(by=By.ID, value="search")
print(element)
driver.quit()
```

### By Name

```python
from selenium import webdriver
from selenium.webdriver.common.by import By

driver = webdriver.Firefox()
driver.get("https://wikipedia.org")
#highlight-next-line
element = driver.find_element(by=By.NAME, value="search")
print(element)
driver.quit()
```

### By Class Name

```python
from selenium import webdriver
from selenium.webdriver.common.by import By

driver = webdriver.Firefox()
driver.get("https://wikipedia.org")
#highlight-next-line
element = driver.find_element(by=By.CLASS_NAME, value="pure-button-primary-progressive")
print(element)
driver.quit()
```

### By Tag Xpath

```python
from selenium import webdriver
from selenium.webdriver.common.by import By

driver = webdriver.Firefox()
driver.get("https://wikipedia.org")
#highlight-next-line
element = driver.find_element(by=By.XPATH, value="//button")
print(element)
driver.quit()
```

Elements can be located like:

```python
# Absolute path (would break if the HTML was changed only slightly)
login_form = driver.find_element(By.XPATH, "/html/body/form[1]")

# First form element in the HTML
login_form = driver.find_element(By.XPATH, "//form[1]")

# The form element with attribute id set to loginForm
login_form = driver.find_element(By.XPATH, "//form[@id='loginForm']")
```

## Interaction with elements

### Sending text to an element

```python
from selenium import webdriver
from selenium.webdriver.common.by import By

driver = webdriver.Firefox()
driver.get("https://wikipedia.org")
element = driver.find_element(by=By.ID, value="search")
#highlight-next-line
element.send_keys("Python")
driver.quit()
```

### Clicking an element

```python
from selenium import webdriver
from selenium.webdriver.common.by import By

driver = webdriver.Firefox()
driver.get("https://wikipedia.org")
element = driver.find_element(by=By.ID, value="search")
element.send_keys("Python")
#highlight-next-line
element.click()
driver.quit()
```

### Sending keys to an element

```python
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys

driver = webdriver.Firefox()
driver.get("https://wikipedia.org")
element = driver.find_element(by=By.ID, value="search")
element.send_keys("Python")
#highlight-next-line
element.send_keys(Keys.RETURN)
driver.quit()
```

Commonly Used Keys

| Key            | Description                  |
| -------------- | ---------------------------- |
| Keys.RETURN    | Enter/Return key             |
| Keys.TAB       | Tab key                      |
| Keys.ESCAPE    | Escape key                   |
| Keys.SPACE     | Space key                    |
| Keys.UP        | Up arrow key                 |
| Keys.DOWN      | Down arrow key               |
| Keys.LEFT      | Left arrow key               |
| Keys.RIGHT     | Right arrow key              |
| Keys.HOME      | Home key                     |
| Keys.END       | End key                      |
| Keys.PAGE_UP   | Page Up key                  |
| Keys.PAGE_DOWN | Page Down key                |
| Keys.DELETE    | Delete key                   |
| Keys.BACKSPACE | Backspace key                |
| Keys.CLEAR     | Clear key                    |
| Keys.SHIFT     | Shift key                    |
| Keys.CONTROL   | Control key                  |
| Keys.ALT       | Alt key                      |
| Keys.CAPS_LOCK | Caps Lock key                |
| Keys.INSERT    | Insert key                   |
| Keys.F1-F12    | Function keys (F1, F2, etc.) |

## [Webdriver Manager](https://github.com/SergeyPirogov/webdriver_manager)

Auto download webdrivers

### Firefox

```python
"""
For ubuntu you need to install firefox vis deb and not snap

sudo snap remove firefox

sudo add-apt-repository ppa:mozillateam/ppa

echo '
Package: *
Pin: release o=LP-PPA-mozillateam
Pin-Priority: 1001
' | sudo tee /etc/apt/preferences.d/mozilla-firefox

echo 'Unattended-Upgrade::Allowed-Origins:: "LP-PPA-mozillateam:${distro_codename}";' | sudo tee /etc/apt/apt.conf.d/51unattended-upgrades-firefox

sudo apt install firefox
"""

from selenium import webdriver
from selenium.webdriver.firefox.service import Service as FirefoxService
from webdriver_manager.firefox import GeckoDriverManager

# automatically download the webdriver
driver = webdriver.Firefox(service=FirefoxService(GeckoDriverManager().install()))
```
