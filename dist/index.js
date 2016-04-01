(function (root, factory) {
    var resolved = [],
        required = ["require","exports","module"],
        i, len = required.length;

    if (typeof define === "function" && define.amd) {
        define("index",["require","exports","module"], factory);
    } else if (typeof exports === "object") {
        for (i = 0; i < len; i += 1) {
            resolved.push(require(required[i]));
        }

        module.exports = factory.apply({}, resolved);
    } else {
        for (i = 0; i < len; i += 1) {
            resolved.push(root[required[i]]);
        }

        root["index"] = factory.apply({}, resolved);
    }
}(this, function (require,exports,module) {
    
    var Interpreter = require('./Interpreter')

var HappyQuery = {};

HappyQuery.Interpreter = Interpreter;

module.exports = HappyQuery;
    return HappyQuery;
    
}));