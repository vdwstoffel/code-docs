import CodeBlock from "@theme/CodeBlock";
import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

# Jenkins

[Github](https://github.com/jenkinsci/docker/blob/master/README.md)

```bash
docker run -d --name jenkins -p 8080:8080 -p 50000:50000 --restart=on-failure -v jenkins_home:/var/jenkins_home jenkins/jenkins:lts-jdk17
```

## Creating a Jenkinsfile

```groovy title="Jenkinsfile"
pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                echo 'Building..'
                sh 'build_script.sh'
            }
        }
        stage('Test') {
            steps {
                echo 'Testing..'
                sh 'test_script.sh'
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying....'
                sh 'deploy_script.sh'
            }
        }
    }
}
```

## Post pipeline actions

```groovy title="Jenkinsfile"
pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                echo 'Building..'
                sh 'build_script.sh'
            }
        }
        stage('Test') {
            steps {
                echo 'Testing..'
                sh 'test_script.sh'
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying....'
                sh 'deploy_script.sh'
            }
        }
    }

    post {
        always {
            echo 'This will always run'
        }
        success {
            echo 'This will run only if the build is successful'
        }
        failure {
            echo 'This will run only if the build fails'
        }
        unstable {
            echo 'This will run only if the build is unstable'
        }
        changed {
            echo 'This will run only if the build is marked as changed'
        }
    }
}
```

## Using environment variables

```groovy
pipeline {
    agent any

    stages {
        stage('Test') {
            steps {
                echo "Running ${env.BUILD_ID} on ${env.JENKINS_URL}"
            }
        }
    }
}
```

| Variable Name        | Description                                                 |
| -------------------- | ----------------------------------------------------------- |
| BUILD_ID             | The current build ID                                        |
| BUILD_NUMBER         | The current build number                                    |
| BUILD_URL            | The URL of the current build                                |
| JOB_NAME             | The name of the current job                                 |
| JOB_URL              | The URL of the current job                                  |
| NODE_NAME            | The name of the current node                                |
| NODE_LABELS          | The labels of the current node                              |
| EXECUTOR_NUMBER      | The number of the current executor                          |
| WORKSPACE            | The absolute path of the current workspace                  |
| GIT_COMMIT           | The commit hash of the current build (for Git projects)     |
| GIT_BRANCH           | The branch name of the current build (for Git projects)     |
| SVN_REVISION         | The revision number of the current build (for SVN projects) |
| MAVEN_HOME           | The path to the Maven installation                          |
| JAVA_HOME            | The path to the Java installation                           |
| PATH                 | The system PATH variable                                    |
| HOME                 | The user's home directory                                   |
| USER                 | The username of the user running the build                  |
| HUDSON_URL           | The URL of the Jenkins server                               |
| HUDSON_HOME          | The path to the Jenkins home directory                      |
| HUDSON_SLAVE_HOME    | The path to the Jenkins slave home directory                |
| HUDSON_NODE_COOKIE   | The cookie for the current node                             |
| HUDSON_COOKIE        | The cookie for the current build                            |
| HUDSON_SERVER_COOKIE | The cookie for the Jenkins server                           |

## Setting environment variables

```groovy

pipeline {
    agent any

    environment {
        MY_VAR = 'Hello World'
    }

    stages {
        stage('Test') {
            steps {
                echo "Running ${MY_VAR}"
            }
        }
    }
}
```

## Using credentials

Credentials are added in Jenkins web server

```groovy
pipeline {
    agent {
        // Define agent details here
    }
    environment {
        AWS_ACCESS_KEY_ID     = credentials('jenkins-aws-secret-key-id')
        AWS_SECRET_ACCESS_KEY = credentials('jenkins-aws-secret-access-key')
    }
    stages {
        stage('Example stage 1') {
            steps {
                //
            }
        }
    }
}
```

## Using parameters

```groovy
pipeline {
    agent any
    parameters {
        string(name: 'Greeting', defaultValue: 'Hello', description: 'How should I greet the world?')
    }
    stages {
        stage('Example') {
            steps {
                echo "${params.Greeting} World!"
            }
        }
    }
}
```

```groovy
pipeline {
    agent any
    parameters {
        string(name: 'PERSON', defaultValue: 'Mr Jenkins', description: 'Who should I say hello to?')

        text(name: 'BIOGRAPHY', defaultValue: '', description: 'Enter some information about the person')

        booleanParam(name: 'TOGGLE', defaultValue: true, description: 'Toggle this value')

        choice(name: 'CHOICE', choices: ['One', 'Two', 'Three'], description: 'Pick something')

        password(name: 'PASSWORD', defaultValue: 'SECRET', description: 'Enter a password')
    }
    stages {
        stage('Example') {
            steps {
                echo "Hello ${params.PERSON}"

                echo "Biography: ${params.BIOGRAPHY}"

                echo "Toggle: ${params.TOGGLE}"

                echo "Choice: ${params.CHOICE}"

                echo "Password: ${params.PASSWORD}"
            }
        }
    }
}
```

## Running Steps in parallel

```groovy
pipeline {
    agent any

    stages {
        stage('Testing') {
            parallel {
                stage('Branch A') {
                    steps {
                        echo 'Branch A'
                    }
                }
                stage('Branch B') {
                    steps {
                        echo 'Branch B'
                    }
                }
            }
        }
    }
}
```

## Choosing agent to run on

```groovy
pipeline {
    agent {
        label 'my_label'
    }

    stages {
        stage('Test') {
            steps {
                echo 'Testing..'
            }
        }
    }
}
```

## Setting a start trigger

```groovy
pipeline {
    agent any

    triggers {
        cron('H/15 * * * *')
    }

    stages {
        stage('Test') {
            steps {
                echo 'Testing..'
            }
        }
    }
}
```

## Run stage on given conditions

```groovy
pipeline {
    agent any

    stages {
        stage('Test') {
            when {
                expression {
                    return env.BUILD_ID == '1'
                }
            }
            steps {
                echo 'Testing..'
            }
        }
    }
}
```

## Flow Control

```groovy
pipeline {
    agent any

    stages {
        stage('Test') {
            steps {
                script {
                    if (env.BUILD_ID == '1') {
                        echo 'Testing..'
                    } else {
                        echo 'Not testing..'
                    }
                }
            }
        }
    }
}
```

## Setup ssh keys in Docker

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

## Setup a new Agent on host machine

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

## Setting Up Jenkins Pipeline with Robot Framework

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
