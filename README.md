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

### Resources
1. [jscodeshift](https://github.com/facebook/jscodeshift)
2. [AST examples gist](https://astexplorer.net/#/gist/89b5d7a5e4873841b7eaf39fdb33ba9d/f778f6157509d2565da97e7eafe6a427a4a36516)
3. [Slides - Should we care about CodeMods?](https://docs.google.com/presentation/d/1JXCEucKMg78p4Phcs8al9P2Qke37a8lEhvY7KxiF1lo/edit?usp=sharing)
   
