---
sidebar_label: "Spring Boot"
sidebar_position: 1
---

import CodeBlock from "@theme/CodeBlock";
import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

import SpringLogo from "@site/static/img/spring.png"
import DisplayLogo from "@site/src/components/DisplayLogo"

# Spring Boot

<DisplayLogo logo={SpringLogo}/>

Spring Boot is a Java-based framework used to create standalone, production-grade Spring-based Applications. It is a project built on the top of the Spring Framework and allows you to create stand-alone, production-grade Spring-based Applications that you can "just run".

## Getting Started

Get started using Spring initializr to create a new Spring Boot project. You can access the Spring initializr at [https://start.spring.io/](https://start.spring.io/).

### Dependencies

Add the dependencies to your `pom.xml` file. Here are some common dependencies:

- [**Spring Boot Starter Web**](https://mvnrepository.com/artifact/org.springframework.boot/spring-boot-starter-web): Build web, including RESTful, applications using Spring MVC.

### Running application

To run a Spring Boot application, you can use the following command from the root directory of the project:

```bash
./mvnw clean spring-boot:run
```

### Change the default port

```properties title="application.properties"
server.port=8081
```

### Watch for changes

- [**Spring Boot DevTools**](https://mvnrepository.com/artifact/org.springframework.boot/spring-boot-devtools): Provides fast application restarts, LiveReload, and configurations for enhanced development experience.

```bash
./mvnw spring-boot:run
```

## Set up a Basic crud REST API with MVC

```mdx-code-block
<Tabs>
<TabItem value="Setting Up">
```

- Visit Spring [Initializr](https://start.spring.io/)
- Dependencies:
  - Spring Web
  - Spring Boot DevTools
  - Spring Data JPA
  - PostgreSQL Driver

```
├── pom.xml
├── src
│   ├── main
│   │   ├── java
│   │   │   └── com
│   │   │       └── example
│   │   │           └── cruddemo
│   │   │               ├── controller
│   │   │               │   └── UserController.java
│   │   │               ├── CrudDemoApplication.java
│   │   │               ├── model
│   │   │               │   └── User.java
│   │   │               ├── repository
│   │   │               │   └── UserRepository.java
│   │   │               └── service
│   │   │                   └── UserService.java
│   │   └── resources
│   │       └── application.properties
```

```mdx-code-block
</TabItem>
<TabItem value="Configure Properties">
```

```properties title="application.properties"
spring.application.name=your_application_name
server.port=3000

spring.datasource.url=jdbc:postgresql://localhost:5432/your_database
spring.datasource.username=your_username
spring.datasource.password=your_password
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect
```

```mdx-code-block
</TabItem>
<TabItem value="Entity class">
```

The entity class represents the table in the database.

Create an entity class User in src/main/java/com/example/cruddemo/model/User.java

```java title="User.java"
package com.example.cruddemo.model;

import jakarta.persistence.*;

@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "email")
    private String email;

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
```

```mdx-code-block
</TabItem>
<TabItem value="Repository Interface">
```

The repository interface is used to perform CRUD operations on the entity.

Create a repository interface UserRepository in src/main/java/com/example/cruddemo/repository/UserRepository.java

```java title="UserRepository.java"
package com.example.cruddemo.repository;

import com.example.cruddemo.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
}

```

```mdx-code-block
</TabItem>
<TabItem value="Service Class">
```

The service class is used to implement business logic.

Create a service class UserService in src/main/java/com/example/cruddemo/service/UserService.java

```java title="UserService.java"
package com.example.cruddemo.service;

import com.example.cruddemo.model.User;
import com.example.cruddemo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }

    public User createUser(User user) {
        return userRepository.save(user);
    }

    public User updateUser(Long id, User userDetails) {
        User user = userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));

        user.setName(userDetails.getName());
        user.setEmail(userDetails.getEmail());

        return userRepository.save(user);
    }

    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }
}


```

```mdx-code-block
</TabItem>
<TabItem value="Controller Class">
```

The controller class is used to handle HTTP requests.

Create a controller class UserController in src/main/java/com/example/cruddemo/controller/UserController.java

```java title="UserController.java"
package com.example.cruddemo.controller;

import com.example.cruddemo.model.User;
import com.example.cruddemo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {
    @Autowired
    private UserService userService;

    @GetMapping
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        User user = userService.getUserById(id).orElseThrow(() -> new RuntimeException("User not found"));
        return ResponseEntity.ok(user);
    }

    @PostMapping
    public User createUser(@RequestBody User user) {
        return userService.createUser(user);
    }

    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(@PathVariable Long id, @RequestBody User userDetails) {
        User updatedUser = userService.updateUser(id, userDetails);
        return ResponseEntity.ok(updatedUser);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }
}
```

```mdx-code-block
</TabItem>
</Tabs>
```

- Create User: POST /api/users
- Get All Users: GET /api/users
- Get User by ID: GET /api/users/{id}
- Update User: PUT /api/users/{id}
- Delete User: DELETE /api/users/{id}
