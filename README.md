# Uderstanding Codemods

### Installation

1. Clone the [repo](https://github.com/nobi1007/understanding-codemods) and `cd` into `understanding-codemods`.
2. update deps - `yarn install`
3. install jscodeshift globally - `npm install -g jscodeshift`

### Run codemods

1. No comment blocks - Remove all comments from the files

```bash
jscodeshift -t transformers/remove-comments.js index.js
```

2. Adopt arrow functions  - Replace all function definitions with arrow functions

```bash
jscodeshift -t transformers/to-arrow-functions.js index.js
```

3. Replace require statements - Replace all “require” imports with es6 “import” statements

```bash
jscodeshift -t transformers/to-es6-imports.js index.js
```
