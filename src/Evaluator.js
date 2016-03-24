var Condition = {
    'not': function(rule, target) {
        return !evaluate(rule.rule, target);
    },
    'or': function(rule, target) {
        for(var i=0; i < rule.rules.length; i++)
        {
            if(evaluate(rule.rules[i], target))
            {
                return true;
            }
        }

        return false;
    },
    'and': function(rule, target) {
        for(var i=0; i < rule.rules.length; i++)
        {
            if(!evaluate(rule.rules[i], target))
            {
                return false;
            }
        }

        return true;
    }
}

var Operator = {
    'bool': function(value, rule) {
        return (value === true)
    },
    'gt': function(value, rule) {
        return value > rule.value;
    },
    'oneOf': function(value, rule) {
        for(var i=0; i < rule.value.length; i++) {
            if(rule.value[i] === value)
                return true;
        }

        return false;
    },
    'isEmpty': function(value, rule) {
        return value.length === 0;
    }
}

var evaluate = function(rule, target) {
    if(rule.condition)
        return Condition[rule.condition].call(null, rule, target)

    if(rule.operator === 'always')
        return true;

    var value = target[rule.field];
    if(value === undefined)
        throw new Error('Field can\'t be undefined: ' + rule.field);

    return Operator[rule.operator].call(null, value, rule)
}

module.exports = {
    evaluate: evaluate
}