var Evaluator = require('./Evaluator');

var interpret = function(rule, obj) {
    if(rule.condition === "or")
    {
        for(var i=0; i < rule.rules.length; i++)
        {
            if(interpret(rule.rules[i], obj))
            {
                return true;
            }
        }

        return false;
    }
    if(rule.condition === 'and')
    {
        for(var i=0; i < rule.rules.length; i++)
        {
            if(!interpret(rule.rules[i], obj))
            {
                return false;
            }
        }

        return true;
    }

    return Evaluator.evaluate(rule, obj);
}

module.exports = {
    filter: function(rule, items) {
        return items.filter(function(item) {
            return interpret(rule, item);
        })
    }
};