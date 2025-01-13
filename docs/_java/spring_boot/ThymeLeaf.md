---
sidebar_label: "ThymeLeaf"
sidebar_position: 1
---

# ThymeLeaf

Thymeleaf is a modern server-side Java template engine for web and standalone environments.

## Getting Started

- [**Thymeleaf**](https://mvnrepository.com/artifact/org.springframework.boot/spring-boot-starter-thymeleaf): A modern server-side Java template engine for web and standalone environments.

```java title="HelloController.java"
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HelloController {

    @GetMapping("/hello")
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

## Selection Expressions

```java
@Controller
public class GradeController {

    @GetMapping("/grades")
    public String getGrades(Model model) {
        Grade grade = new Grade("harry", "Potions", "C-");
        model.addAttribute("grade", grade);
        return "grades"; // should match the html file name
    }
}
```

```html
<tr th:object="${grade}">
  <th th:text="*{name}"></th>
  <th th:text="*{subject}"></th>
  <th th:text="*{score}"></th>
</tr>
```
