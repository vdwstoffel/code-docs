---
sidebar_label: "Other"
---

# Python

## Requests

```bash
pip install requests
```

```python
import requests

def get_requests():
    ## https://sunrise-sunset.org/api
    params = {
        'lat': '50.5039',
        'lng': '4.4699',
        'formatted': 0
    }
    response = requests.get(url='https://api.sunrise-sunset.org/json', params=params)
    response.raise_for_status()
    ret = response.json()
    print(ret)
```

## UUID

```python
import uuid

x = uuid.uuid4()
## >>> 33259d8a-f16c-4f00-b26f-76dae63ca071
```

## ArgParse

```python
#!/usr/bin/python

import argparse

parser = argparse.ArgumentParser(
    description='Example of Command Line Arguments')
## Add arguments
parser.add_argument('-m',
                    '--message',
                    metavar="message",
                    action='store',
                    type=str,
                    nargs='?',
                    required=True,
                    help='Prints out a message to the console')

parser.add_argument('-c',
                    '--capitalize',
                    action='store_true',
                    help='Capitalizises the message')

## Create object
args = parser.parse_args()

if args.capitalize:
  print(args.message.upper())
else:
  print(args.message)
```

## dotenv

```bash
pip install python-dotenv
```

```python
from dotenv import load_dotenv
load_dotenv(dotenv_path='../.env')
import os

print(os.getenv('DB_PASSWORD'))
```

```json
DB_PASSWORD="SOMETHING"
```

## Email

```python
import smtplib
import ssl
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from dotenv import load_dotenv
import os

load_dotenv(dotenv_path='../../.env')

sender_email = os.getenv('SENDER_EMAIL')
receiver_email = os.getenv('RECEIVER_EMAIL')
password = os.getenv('EMAIL_PASSWORD')
port = 465  ## For SSL


## Construct the email
message = MIMEMultipart("alternative")
message["Subject"] = "Python Email Test"
message["From"] = sender_email
message["To"] = receiver_email

## Create the plain-text and HTML version of your message
html = """\
<html>
  <body>
    <h1>Python Test Mail</h1><br>
    <p>Link to <a href='www.google.com'>google</a></p>
  </body>
</html>
"""

## Turn these into plain/html MIMEText objects
message_body = MIMEText(html, "html")
## Add HTML/plain-text parts to MIMEMultipart message
## The email client will try to render the last part first
message.attach(message_body)

## Create secure connection with server and send email
## Create a secure SSL context
context = ssl.create_default_context()

with smtplib.SMTP_SSL("smtp.gmail.com", port, context=context) as server:
    server.login(sender_email, password)
    server.sendmail(
        sender_email, receiver_email, message.as_string()
    )
```

### Attachment

```python
import smtplib
import ssl
from email import encoders
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from email.mime.base import MIMEBase
from dotenv import load_dotenv
import os

load_dotenv(dotenv_path='../../.env')

sender_email = os.getenv('SENDER_EMAIL')
receiver_email = os.getenv('RECEIVER_EMAIL')
password = os.getenv('EMAIL_PASSWORD')
port = 465  ## For SSL


## Construct the email
message = MIMEMultipart("alternative")
message["Subject"] = "Python Email Test"
message["From"] = sender_email
message["To"] = receiver_email

## Create the plain-text and HTML version of your message
html = """\
<html>
  <body>
    <h1>Python Test Mail With Attachment</h1><br>
    <p>Link to <a href='www.google.com'>google</a></p>
  </body>
</html>
"""

## Turn these into plain/html MIMEText objects
message_body = MIMEText(html, "html")
## Add HTML/plain-text parts to MIMEMultipart message
## The email client will try to render the last part first
message.attach(message_body)

## Add attachment
filename = 'emailAttachment.txt'
## Open file in binary mode
with open(filename, "rb") as attachment:
    ## Add file as application/octet-stream
    ## Email client can usually download this automatically as attachment
    part = MIMEBase("application", "octet-stream")
    part.set_payload(attachment.read())

## Encode file in ASCII characters to send by email
encoders.encode_base64(part)

## Add header as key/value pair to attachment part
part.add_header(
    "Content-Disposition",
    f"attachment; filename= {filename}",
)

## Add attachment to message and convert message to string
message.attach(part)
text = message.as_string()

## Log in to server using secure context and send email
context = ssl.create_default_context()
with smtplib.SMTP_SSL("smtp.gmail.com", 465, context=context) as server:
    server.login(sender_email, password)
    server.sendmail(sender_email, receiver_email, text)
```
