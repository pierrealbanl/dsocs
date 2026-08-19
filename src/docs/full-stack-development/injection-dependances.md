---
title: 1. L'injection de dépendances
sidebar_label: 1. L'injection de dépendances
sidebar_position: 1
---

# L'injection de dépendances

**L’injection de dépendances** (DI — Dependency Injection) est une technique de développement logiciel qui permet de créer des objets qui dépendent d’autres objets. Elle facilite les interactions entre les classes tout en permettant de garder les classes indépendantes les unes des autres.

Il existe trois types de classes dans l’injection de dépendances :

- Un service est une classe qui peut être utilisée : c’est la dépendance.
- Le client est une classe qui utilise la dépendance.
- L’injecteur transmet ou fournit la dépendance (le service) à la classe dépendante (le client).

## 1.1. Le principe du faible couplage

L’injection de dépendances permet de rendre les classes moins dépendantes les unes des autres. Cela signifie que la création des dépendances du client est séparée du comportement du client, ce qui facilite les tests unitaires.


### 1.1.1. Sans injection de dépendances

Dans le code suivant, il n’y a pas d’injection de dépendances, car la classe cliente `Car` crée elle-même un objet de la classe de service :

```java
public class Car {
  private Engine engine;

  public Car() {
    engine = new DieselEngine();
  }
}
```

Ici, `Car` fait deux choses : elle crée elle-même son moteur avec `new DieselEngine()`, et elle utilise ce moteur dans son comportement. Donc `Car` est fortement liée à `DieselEngine`.

### 1.1.2. Avec injection de dépendances

Dans le code suivant, l’objet de service n’est pas créé directement dans la classe cliente. Il est transmis comme paramètre au constructeur de la classe :

```java
public class Car {
  private Engine engine;

  public Car(Engine engine) {
    this.engine = engine;
  }
}
```

Ici, `Car` ne crée plus le moteur. Elle dit simplement : "Donne-moi un `Engine`, et moi je saurai l’utiliser."

La création est faite ailleurs :

```java
Engine engine = new DieselEngine();
Car car = new Car(engine);
```

## 1.2. Utilisation d’une classe abstraite et des mocks pour les tests

La classe de service peut également être une classe abstraite. Nous pouvons alors utiliser n’importe quelle implémentation de cette classe dans notre classe cliente et utiliser des mocks lors des tests :

```java
public abstract class Engine {
  public abstract void start();
}
```

```java
public class Car {
  private Engine engine;

  public Car(Engine engine) {
    this.engine = engine;
  }

  public void startCar() {
    engine.start();
  }
}
```

```java
Engine engineMock = mock(Engine.class);
Car car = new Car(engineMock);

car.startCar();
verify(engineMock).start();
```

Ici, le mock remplace temporairement le vrai moteur.

## 1.3. Les différents types d’injection de dépendances

En résumé, dans le premier exemple, `Car` décide elle-même de créer son `Engine` avec `new DieselEngine()`. Dans le deuxième, `Car` reçoit son `Engine` depuis l’extérieur : c’est le principe de l’injection de dépendances.

Il existe différents types d’injection de dépendances ; examinons-en deux ici :

- Injection par constructeur (Constructor injection) : les dépendances sont transmises au constructeur de la classe cliente. Un exemple d’injection par constructeur a déjà été montré dans le code précédent de la classe `Car`. L’injection par constructeur est recommandée pour les dépendances obligatoires. Toutes les dépendances sont fournies via le constructeur de la classe, et un objet ne peut pas être créé sans ses dépendances requises.
- Injection par setter (Setter injection) : les dépendances sont fournies à travers des méthodes setter. Le code suivant montre un exemple :

```java
public class Car { 
  private Engine engine; 

  public void setEngine(Engine engine) { 
    this.engine = engine;
  } 
}
```

Ici, la dépendance est désormais transmise au setter en tant qu’argument. L’injection par setter est plus flexible, car les objets peuvent être créés sans avoir immédiatement toutes leurs dépendances. Cette approche permet donc d’avoir des dépendances optionnelles.

## 1.4. Avantages de l’injection de dépendances

L’injection de dépendances réduit les dépendances directes dans votre code et rend celui-ci plus réutilisable. Elle améliore également la testabilité de votre code. Nous avons maintenant appris les bases de l’injection de dépendances. Ensuite, nous allons voir comment l’injection de dépendances est utilisée dans Spring Boot.