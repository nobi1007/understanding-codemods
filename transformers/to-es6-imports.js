module.exports = function (fileInfo, api) {
    const j = api.jscodeshift;

    // initialize root and read the source file(s)
    const root = j(fileInfo.source);

    // find all the nodes which are variable declarations
    root.find(j.VariableDeclaration).forEach((path) => {
        path.node.declarations.forEach((declaration) => {
            /**
             * 1. check if the declaration has a calle
             * 2. check if calle is a CallExpression
             * 3. check if the name of calle is "require", otherwise its just some function invocation
             */
            if (
                declaration.init &&
                j.CallExpression.check(declaration.init) &&
                declaration.init.callee.name === "require"
            ) {
                // module name being requested
                let source = declaration.init.arguments[0].value;
                let importDeclaration;

                // check if the LHS is just an identifier, e.g., const foo = require("bar");
                if (declaration.id.type === "Identifier") {
                    // instantiating a default import declaration with a default specifier and a source
                    importDeclaration = j.importDeclaration(
                        [
                            j.importDefaultSpecifier(
                                j.identifier(declaration.id.name)
                            ),
                        ],
                        j.literal(source)
                    );
                }
                // check if the LHS is an ObjectPattern, e.g., const {foo} = require("bar");
                else if (declaration.id.type === "ObjectPattern") {
                    // instantiating a const import declaration with a map of properties and a source
                    importDeclaration = j.importDeclaration(
                        declaration.id.properties.map((property) =>
                            j.importSpecifier(j.identifier(property.key.name))
                        ),
                        j.literal(source)
                    );
                }

                j(path).replaceWith(importDeclaration);
            }
        });
    });

    return root.toSource();
};
