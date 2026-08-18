# engineering-docs

This document serves as a technical foundation designed to support progress in full-stack software development and to foster a comprehensive understanding, both practical and theoretical, of modern tools. The explanations are based on my own learning journey and reflect my personal approach to programming languages, with the goal of making the assimilation of concepts more natural and gradual.

> ⚠ The documentation is written in French.

## How to Use

To clone and run this application, you'll need Git and Node.js (which comes with npm) installed on your computer.
From your command line:

```
# Clone this repository
$ git clone https://github.com/pierrealbanl/engineering-docs.git

# Go into the repository
$ cd engineering-docs

# Install dependencies
$ npm install

# Run the app
$ npm start
```

## Créer ou renommer une catégorie

Une catégorie correspond à un dossier situé dans `src/docs`. Par exemple, la catégorie **Full Stack Development** est créée par le dossier suivant :

```text
src/docs/full-stack-development/
```

Tous les fichiers Markdown ajoutés dans ce dossier apparaissent automatiquement dans cette catégorie :

```text
src/docs/
└── full-stack-development/
    ├── preambule.md
    ├── spring-boot.md
    └── react.md
```

Par défaut, le nom du dossier est transformé en titre : les tirets deviennent des espaces et chaque mot commence par une majuscule. Ainsi, `full-stack-development` devient **Full Stack Development**.

Pour choisir précisément le nom et la position de la catégorie, créez un fichier `_category.json` dans son dossier :

```json
{
  "label": "Développement Full Stack",
  "position": 2
}
```

Cette configuration ne nécessite aucune modification de TypeScript. Les sous-catégories fonctionnent de la même façon :

```text
src/docs/
└── full-stack-development/
    ├── _category.json
    └── react/
        ├── _category.json
        └── hooks.md
```

Les catégories et sous-catégories sont triées selon leur propriété `position`, puis par ordre alphabétique lorsque cette propriété est absente.
