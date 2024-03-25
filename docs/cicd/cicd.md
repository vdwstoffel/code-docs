---
sidebar_label: CICD
---

# CICD

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

```yml
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
