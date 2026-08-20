---
title: Préambule
sidebar_label: Préambule
sidebar_position: 0
---

# Préambule

Cette section s’adresse aux personnes souhaitant apprendre le développement full stack, avec, dans un premier temps, l’apprentissage de Spring Boot, puis, dans un second temps, celui de React. Cette documentation s’appuie sur le livre de Juha Hinkula intitulé _Full Stack Development with Spring Boot 3 and React_. Nous n’allons pas aborder les notions de Java, mais si vous avez suivi ma documentation sur le C++, cela devrait suffire.

## Création et configuration d’un projet Spring Boot avec Gradle

Tout d’abord, rendez-vous sur [https://start.spring.io/](https://start.spring.io/), un outil web permettant de générer facilement un projet Spring Boot. Une fois sur le site, vous pouvez conserver les paramètres par défaut dans la partie de gauche. Si vous le souhaitez, vous pouvez toutefois modifier les champs **Group**, **Artifact** et **Package name** afin de les adapter à votre projet.
Dans la partie de droite, ajoutez ensuite les deux dépendances suivantes, qui seront utiles pour le développement full stack : **Spring Web** et  **Spring Boot DevTools**

:::info
Une notion importante à connaître est Gradle. Gradle est un **outil d’automatisation de build** principalement utilisé pour les projets Java et Android. Il permet notamment de **compiler le code, gérer les dépendances, exécuter les tests et générer l’application** à partir d’un fichier de configuration comme `build.gradle`.

Il existe d’autres outils de build, comme Maven, mais ici nous nous intéresserons uniquement à Gradle.
:::

Une fois cela fait, générez le projet puis ouvrez le dossier avec IntelliJ. Si le build Gradle ne fonctionne pas, ce n’est pas grave. Dans IntelliJ, cliquez sur l’engrenage **Paramètres** en haut à droite, puis allez dans **Project Structure**. Sélectionnez ensuite **SDK**, cliquez sur **Download JDK...**, choisissez la **version 17** avec **Eclipse Temurin** comme fournisseur. Une fois le JDK installé, relancez le build Gradle. Tout devrait alors fonctionner correctement. Si vous n’y arrivez vraiment pas et que le build Gradle ne fonctionne toujours pas, vous pouvez demander à une IA de vous aider à identifier et résoudre le problème.

## Structure d’une application Spring Boot et annotations principales

Dans la classe principale d’une application Spring Boot, on retrouve généralement la structure suivante :

```java
package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class DemoApplication {

	public static void main(String[] args) {
		SpringApplication.run(DemoApplication.class, args);
	}

}
```

La principale différence avec Java réside dans l’utilisation des annotations. La première, présente dans le fichier principal de l’application, est `@SpringBootApplication`.

| Annotation                 | Description                                                                                                                                                                                                                                                                                                         |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `@EnableAutoConfiguration` | Active la configuration automatique de Spring Boot afin que le projet soit configuré automatiquement en fonction de ses dépendances. Par exemple, si la dépendance `spring-boot-starter-web` est présente, Spring Boot considère que vous développez une application web et configure l’application en conséquence. |
| `@ComponentScan`           | Active l’analyse des composants Spring afin de détecter tous les composants de l’application.                                                                                                                                                                                                                       |
| `@Configuration`           | Définit une classe pouvant être utilisée comme source de définitions de beans.                                                                                                                                                                                                                                      |

## Logs et résolution de problèmes

La journalisation peut être utilisée pour surveiller le déroulement de votre application et constitue un bon moyen d’identifier les erreurs inattendues dans le code de votre programme. Le package de démarrage Spring Boot fournit Logback, que nous pouvons utiliser pour la journalisation sans aucune configuration. L’exemple de code suivant montre comment utiliser la journalisation. Logback utilise comme interface native **Simple Logging Facade for Java, SLF4J**.

```java
package com.example.demo;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class DemoApplication {

	private static final Logger logger = LoggerFactory.getLogger(DemoApplication.class);
	
	public static void main(String[] args) {
		SpringApplication.run(DemoApplication.class, args);
		logger.info("Application started");
	}

}
```
