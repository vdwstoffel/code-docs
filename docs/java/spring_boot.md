---
sidebar_label: 'Spring Boot'
sidebar_position: 1
---

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

### Dynamic HTML

- [**Thymeleaf**](https://mvnrepository.com/artifact/org.springframework.boot/spring-boot-starter-thymeleaf): A modern server-side Java template engine for web and standalone environments.


```java title="HelloController.java"
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HelloController {

    @GetMapping("/")
    public String hello(Model model) {
        String message = "Hello, World!";
        model.addAttribute("greeting", message);
        return "hello"; // html file
    }
}
```

```html title="hello.html"
<h1 th:text="${greeting}"></h1>
```

