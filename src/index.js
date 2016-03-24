var RuleBuilder = require('./RuleBuilder')
var Evaluator = require('./Evaluator');

var HappyQuery = {};

HappyQuery.RuleBuilder = RuleBuilder;

HappyQuery.evaluate = function(rule, target) {
    return Evaluator.evaluate(rule, target);
}

HappyQuery.filter = function(rule, data) {
    var result = [];

    for(var i=0; i<data.length; i++)
    {
        if(HappyQuery.evaluate(rule, data[i]))
        {
            result.push(data[i])
        }
    }

    return result;
}

module.exports = HappyQuery;