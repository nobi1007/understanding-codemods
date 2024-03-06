module.exports = function (fileInfo, api) {
    const j = api.jscodeshift;

    // initialize root and read the source file(s)
    const root = j(fileInfo.source);

    // 1. Remove Comments
    // traverse through all nodes in the AST
    root.find(j.Node).forEach((path) => {
        // remove the comments array of the current node, if any
        delete path?.value?.comments;

        // remove leading and trailing comments from the current node
        delete path?.node?.leadingComments;
        delete path?.node?.trailingComments;
    });

    // convert the modified AST back to source code and return it
    return root.toSource();
};
