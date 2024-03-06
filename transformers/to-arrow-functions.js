module.exports = function (fileInfo, api) {
    const j = api.jscodeshift;

    // initialize root and read the source file(s)
    const root = j(fileInfo.source);

    // find all the nodes which are FunctionDeclaration
    root.find(j.FunctionDeclaration).forEach((path) => {
        const { id, params, body, async } = path.node;

        // function name
        const functionName = id.name;

        // creating a new arrow function expression with the same metadata as of the original function
        const arrowFunctionExpression = j.arrowFunctionExpression(
            params,
            body,
            false
        );

        // new function has to be assigned to a new variable with same name as the original function
        const variableDeclarator = j.variableDeclarator(
            j.identifier(functionName),
            arrowFunctionExpression
        );

        // assigning it to a variableDeclaration
        const variableDeclaration = j.variableDeclaration("const", [
            variableDeclarator,
        ]);

        // replace the original function declaration with the new variable declaration
        j(path).replaceWith(variableDeclaration);
    });

    return root.toSource();
};
