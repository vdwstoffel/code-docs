# Classes

## Creating an object/class

```java title="Person.java"
public class Person {
    private String name;
    private int age;

    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getAge() {
        return this.age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public void printInfo() {
        System.out.println("Name: " + this.name + ", Age: " + this.age);
    }
}

```

```java title="Main.java"
public class Main {
    public static void main(String[] args) {
        Person person = new Person("John", 25);
        person.printInfo();
    }
}
```

## Copy Constructor

```java title="Person.java"
public class Person {
    private String name;
    private int age;

    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }

    public Person(Person source) {
        this.name = source.name;
        this.age = source.age;
    }
}
```

```java title="Main.java"
public class Main {
    public static void main(String[] args) {
        Person person1 = new Person("John", 25);
        Person person2 = new Person(person1);
    }
}
```

## Print class isntatance

To print the object in a human-readable format, you need to override the `toString` method.

```java title="Person.java"
public class Person {
    private String name;
    private int age;

    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }

    @Override
    public String toString() {
        return "Name: " + this.name + ", Age: " + this.age;
    }
}
```

```java title="Main.java"
public class Main {
    public static void main(String[] args) {
        Person person = new Person("John", 25);
        System.out.println(person); // Name: John, Age: 25
    }
}
```
