---
title: 4. Code Guidelines
sidebar_label: 4. Code Guidelines
sidebar_position: 4
---

# Code Guidelines

Une **code guideline** (ou convention de code) est un ensemble de règles qui définissent comment le code doit être écrit et organisé au sein d'un projet. Elle couvre des aspects comme le nommage des variables, le placement des accolades, l'indentation ou encore la structure des fichiers.

Respecter une convention de code est essentiel pour plusieurs raisons :

- **Lisibilité** : un style uniforme permet à n'importe quel membre de l'équipe de lire et comprendre rapidement le code, même s'il ne l'a pas écrit.
- **Maintenabilité** : un code cohérent est plus facile à modifier, déboguer et faire évoluer sur le long terme.
- **Collaboration** : lorsque tout le monde suit les mêmes règles, les revues de code se concentrent sur la logique plutôt que sur le formatage.
- **Qualité** : des conventions claires réduisent les erreurs courantes et encouragent de bonnes pratiques de développement.

## 4.1. Accolades : ouverture sur la même ligne

L'accolade ouvrante est **toujours placée en fin de ligne**, que ce soit pour une classe, une méthode ou un bloc de contrôle.

```cpp
// Good
class Widget {
};

void Renderer::execute() {
}

// Bad
class Widget
{
};

void Renderer::execute()
{
}
```

## 4.2. Déclaration vs Implémentation

**Déclarer** dans un fichier `.hpp` et **implémenter** dans un fichier `.cpp`. Ces deux rôles ne se mélangent jamais.

```cpp
// Foo.hpp
class Widget {
public:
    Widget() = default;
    ~Widget() = default;

    int readValue() const;

private:
    int _storedValue;
};

// Foo.cpp
#include "Widget.hpp"

int Widget::readValue() const { return _storedValue; }
```

## 4.3. Alignement des noms de variables

Au sein d'un même bloc de déclarations, **les noms de variables s'alignent** sur le type le plus long du groupe.

```cpp
// Good
int         a;
std::string b;

// Bad
int a;
std::string b;
```

## 4.4. Constructeur et Destructeur : toujours présents

Toujours déclarer un constructeur et un destructeur, même lorsque le comportement par défaut suffit. Utiliser `= default` dans ce cas.

```cpp
// Good
class Widget {
public:
    Widget() = default;
    ~Widget() = default;
};

// Bad
class Widget {
};
```

## 4.5. Spécificateurs d'accès : une seule occurrence chacun

Toujours déclarer les spécificateurs d'accès (`public`, `private`, `protected`). Chaque spécificateur n'apparaît **qu'une seule fois** dans la classe.

```cpp
// Good
class Widget {
public:
    Widget() = default;
    ~Widget() = default;

    int readValue() const;

private:
    int _storedValue;
};

// Bad
class Widget {
public:
    Widget() = default;

public:         // interdit, déjà déclaré
    int readValue() const;

    int _storedValue; // pas de spécificateur d'accès
};
```

## 4.6. Méthodes courtes : tout sur une seule ligne

Si le corps d'une méthode contient **une seule instruction**, tout s'écrit sur une seule ligne.

```cpp
// Good
int Widget::readValue() const { return _storedValue; }

// Bad
int Widget::readValue() const
{
    return _storedValue;
}
```

## 4.7. Includes : en-têtes système avant les en-têtes locaux

Séparez les directives `#include` en deux groupes, dans cet ordre :

1. **En-têtes système / externes** avec des chevrons `<>`
2. **En-têtes locaux / du projet** avec des guillemets doubles `""`

Laissez une ligne vide entre les deux groupes.

```cpp
// Good
#include <iostream>
#include <string>
#include <vector>

#include "Widget.hpp"
#include "Renderer.hpp"

// Bad
#include "Widget.hpp"
#include <iostream>
#include "Renderer.hpp"
#include <vector>
```

## 4.8. Méthodes avec de nombreux paramètres : un paramètre par ligne

À partir de **4 paramètres**, chaque paramètre est placé sur sa propre ligne, indenté d'un niveau. L'accolade ouvrante du corps reste sur la ligne du dernier paramètre.

```cpp
// Good
void Widget::configure(
    const int a,
    const int b,
    const int c,
    const int d) {
    _a = a;
    _b = b;
    _c = c;
    _d = d;
}

// Bad
void Widget::configure(const int a, const int b, const int c, const int d) {
    ...
}
```
