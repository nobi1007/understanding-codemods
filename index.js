// example 1 - variable declaration
const foo = "bar";

// example 2 - nested variable declaration
const someObject = {
    data: {
        data: {
            foo: "bar",
        },
    },
};

// example 3 - single statement
console.log("hello world");

// example 4 - multi arg
console.log(foo, "hello", 6);

// example 5 - accessing nested data
const value = someObject.data.data.foo;

// example 6 - accessing nested data when not sure
const unknownValue = someObject?.data?.data?.foo;

// example 7 - defining functions
function basicFunction() {
    // hello
    return value;
}

// example 8 - import and default import
const fs = require("fs");

// example 9 - import and default import
// import React, { useState } from "react";
