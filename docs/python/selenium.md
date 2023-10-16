---
sidebar_label: "Selenium"
---

# Selenium

```bash
pip install selenium
pip install webdriver-manager
```

## Getting Started

```python
'''
Manually download the webdriver and add it to your path
https://github.com/mozilla/geckodriver/releases
export PATH=$PATH:/path/to/folder/geckodriver
'''

from selenium import webdriver
from selenium.webdriver.common.by import By


driver = webdriver.Firefox()    ## webdriver specific

## Set Option
driver.maximize_window()
driver.implicitly_wait(2)

## Open the browser
driver.get("https://wikipedia.org")

## Request browser information
print(driver.title)

## Find an element
search_box = driver.find_element(by=By.NAME, value="search")
search_button = driver.find_element(by=By.CLASS_NAME, value="pure-button-primary-progressive")

## Take action on element
search_box.send_keys("Python")
search_button.click()

## Get text
news = driver.find_element(by=By.ID, value="Computing").text
print(news)

## End the session
driver.quit()
```

## Using keyboard Keys

```python
from selenium.webdriver.common.keys import Keys

driver.find_element().send_keys(Keys.RETURN)
```

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
