---
sidebar_label: CI/CD
---

import CodeBlock from "@theme/CodeBlock";
import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

# CI/CD

## SonarQube

### Docker

```bash
docker pull sonarqube
docker pull sonarsource/sonar-scanner-cli
```

Create a docker network ex `sonar`. If you map the docker to another external port ensure the the scanner tool connects to the sonarcuber server name and internal port. Example if you run -p 9000:9050, the scanner should connet to sonarqube:9000.

```bash
$ docker run -d \
    --name sonarqube \
    --network sonar \
    -e SONAR_ES_BOOTSTRAP_CHECKS_DISABLE=true \
    -p 9000:9000 sonarqube:latest
```

Create a file called `sonar-project.properties`

```yaml
# must be unique in a given SonarQube instance
sonar.projectKey=my:project
# --- optional properties ---

# defaults to project key
#sonar.projectName=My project
# defaults to 'not provided'
#sonar.projectVersion=1.0

# Path is relative to the sonar-project.properties file. Defaults to .
#sonar.sources=.

# Encoding of the source code. Default is default system encoding
#sonar.sourceEncoding=UTF-8
```

```bash
docker run \
    --rm \
    --network sonar \
    -e SONAR_HOST_URL="http://sonarqube:9000/" \
    -e SONAR_SCANNER_OPTS="-Dsonar.projectKey=habit_tracker" \
    -e SONAR_TOKEN="sqp_307bb384a6dac2e730c52b592679e0a8def78fe6" \
    -v "./:/usr/src" \
    sonarsource/sonar-scanner-cli
```

### Docker-compose

```yaml
version: "3.1"
services:
  sonarqube:
    image: sonarqube
    container_name: sonarqube
    ports:
      - "9000:9000"
    environment:
      - SONAR_ES_BOOTSTRAP_CHECKS_DISABLE=true
      - SONAR_JDBC_URL=jdbc:postgresql://sonar_postgres:5432/sonar
      - SONAR_JDBC_USERNAME=sonar
      - SONAR_JDBC_PASSWORD=sonar
    volumes:
      - sonarqube_data:/opt/sonarqube/data
    depends_on:
      - sonar_postgres

  sonar_postgres:
    image: postgres
    container_name: sonarqube_postgres
    environment:
      - POSTGRES_USER=sonar
      - POSTGRES_PASSWORD=sonar
      - POSTGRES_DB=sonar
    volumes:
      - postgresql:/var/lib/postgresql
      - postgresql_data:/var/lib/postgresql/data

  ## Utility container for sonar code code analysis
  ## docker-compose run --rm sonar_scanner
  sonar_scanner:
    image: sonarsource/sonar-scanner-cli
    container_name: sonar_scanner
    depends_on:
      - sonarqube
    environment:
      - SONAR_HOST_URL=http://sonarqube:9000/ # container_name:internal_port
      - SONAR_SCANNER_OPTS=-Dsonar.projectKey=my_project
      - SONAR_TOKEN=sqp_34402c40743e43e47173955c437dbf9187597a9b
    volumes:
      - ./:/usr/src

volumes:
  sonarqube_data:
  postgresql_data:
  postgresql:
```

## Jenkins

[Github](https://github.com/jenkinsci/docker/blob/master/README.md)

```bash
docker run -d --name jenkins -p 8080:8080 -p 50000:50000 --restart=on-failure -v jenkins_home:/var/jenkins_home jenkins/jenkins:lts-jdk17
```

### Jenkinsfile 
```groovy title="Jenkinsfile"
pipeline {
     agent {
        node {
            label 'my-pc'
        }
    }

    stages {
        stage('Build') {
            environment {
                MY_ENV_VAR = 'This is the build environment'
            }
            steps {
                dir('/path/to/dir') {
                    echo "Building in ${env.WORKSPACE}"
                    echo "${env.MY_ENV_VAR}"
                    // Your build steps go here
                }
            }
        }
        stage('Test') {
            environment {
                MY_ENV_VAR = 'This is the test environment'
            }
            steps {
                dir('/path/to/dir') {
                    echo "Testing in ${env.WORKSPACE}"
                    echo "${env.MY_ENV_VAR}"
                    // Your test steps go here
                }
            }
        }
        stage('Deploy') {
            environment {
                MY_ENV_VAR = 'This is the deploy environment'
            }
            steps {
                dir('/path/to/dir') {
                    echo "Deploying in ${env.WORKSPACE}"
                    echo "${env.MY_ENV_VAR}"
                    // Your deploy steps go here
                }
            }
        }
    }
}
```

### Setup ssh keys in Docker

Open a terminal in the container

```bash
docker exec -it <container_id> bash
```

```bash
ssh-keygen
```

- Add SSH Key to GitHub: Add the generated SSH public key (id_rsa.pub) to your GitHub account's SSH keys.

- Configure Jenkins Credentials: In your Jenkins instance, Select to add credentials and select `SSH Username with private key` fill in `ID` and `Username` and add the id_rsa key to the `Private Key` field.

- Configure Jenkins Pipeline: Create or modify your Jenkins pipeline script to use the SSH key for authentication when checking out code from GitHub.

### Setup a new Agent on host machine

- Installing Java

```bash
sudo apt-get update
sudo apt install -y --no-install-recommends openjdk-17-jdk-headless
```

- Creating Jenkins user

```bash
sudo adduser --group --home /home/jenkins --shell /bin/bash jenkins
```

- Create Node

Go to your Jenkins dashboard

Go to Manage Jenkins option in the main menu

Go to Manage Nodes and clouds item

Go to New Node option in the side menu

Click on the Create button

As Remote root directory, enter the directory where you want to install the agent (/home/jenkins for me) \*\*recommended

- Run your Jenkins agent as a service

Create a directory called jenkins or jenkins-service in your home directory or anywhere else where you have access

```bash
sudo mkdir -p /usr/local/jenkins-service
```

Download the agent from found in the Jenkins page

```bash
curl -sO http://<ip>:8080/jnlpJars/agent.jar
```

Now (in /usr/local/jenkins-service) create a start-agent.sh file with the Jenkins java command we’ve seen earlier as the file’s content.

```bash
touch start-agent.sh
```

Copy the curl and java command from Jenkins agent details

```bash
#!/bin/bash
cd /usr/local/jenkins-service
# Just in case we would have upgraded the controller, we need to make sure that the agent is using the latest version of the agent.jar
curl -sO http://my_ip:8080/jnlpJars/agent.jar
java -jar agent.jar -jnlpUrl http://my_ip:8080/computer/My%20New%20Ubuntu%2022%2E04%20Node%20with%20Java%20and%20Docker%20installed/jenkins-agent.jnlp -secret my_secret -workDir "/home/jenkins"
exit 0
```

Make the script executable

```bash
chmod +x start-agent.sh
```

Now create a /etc/systemd/system/jenkins-agent.service file with the following content:

```
[Unit]
Description=Jenkins Agent

[Service]
User=jenkins
WorkingDirectory=/home/jenkins
ExecStart=/bin/bash /usr/local/jenkins-service/start-agent.sh
Restart=always

[Install]
WantedBy=multi-user.target
```

Enable the daemon with the following command

```bash
sudo systemctl enable jenkins-agent.service
sudo systemctl start jenkins-agent.service
```

### Setting Up Jenkins Pipeline with Robot Framework

```mdx-code-block
<Tabs>
<TabItem value="Jenkinsfile">
```

```groovy
/* Requires the Docker Pipeline plugin and Robot Framework Plugin */
pipeline {
    agent {
        node {
            label "main"
        }
    }

    stages {
        stage("Run Test") {
            steps {
                sh "pip install robotframework"
                dir("examples/ci_cd/jenkins_robot_framework") {
                    sh "./run_tests.sh"
                }
            }
        }

        stage("Publish Test Results") {
            steps {
                dir("examples/ci_cd/jenkins_robot_framework") {
                    step([
                        $class              : 'RobotPublisher',
                        outputPath          : '.',
                        logFileName         : 'log.html',
                        outputFileName      : 'output.xml',
                        reportFileName      : 'report.hml',
                        disableArchiveOutput: false,
                        passThreshold       : 100,
                        unstableThreshold   : 75.0,
                        otherFiles          : '*.png',
                    ])
                }
            }
        }
    }
}
```

```mdx-code-block
</TabItem>
<TabItem value="run_test.sh">
```
```bash
#!/usr/bin/bash

python -m robot mock_test.robot

exit 0  # By default Robot returns an error if anyt test fails.
        # So return 0 to avoid Jenkins marking the build as failed.
        # Robot Plugin will mark the test according to your defined thresholds.
```


```mdx-code-block
</TabItem>
<TabItem value="mock_test.robot">
```

```robot
*** Settings ***
Documentation
...    An example of a Jenkins job running a test in Robot Framework

*** Test Cases ***
Equality
    Should Be Equal    ${1}    ${1}
```

```mdx-code-block
</TabItem>
</Tabs>
```
