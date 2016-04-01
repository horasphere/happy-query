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
    'bool': function(rule, target) {
        return (getValue(rule.field, target) === true)
    },
    'gt': function(rule, target) {
        return getValue(rule.field, target) > rule.value;
    },
    'oneOf': function(rule, target) {
        var value = getValue(rule.field, target);
        for(var i=0; i < rule.value.length; i++) {
            if(rule.value[i] === value)
                return true;
        }

        return false;
    },
    'equal': function(rule, target) {
        return getValue(rule.field, target) === rule.value;
    },
    'isEmpty': function(rule, target) {
        return getValue(rule.field, target).length === 0;
    },
    'always': function(rule, target) {
        return true;
    },
    'nested': function(rule, target) {
        return evaluate(rule.value, getValue(rule.field, target));
    }

}

var getValue = function(field, target) {
    var value = target[field];

    if(value === undefined)
        throw new Error('Field can\'t be undefined: ' + field);

    return value;
}

var evaluate = function(rule, target) {
    if(rule.condition)
        return Condition[rule.condition].call(null, rule, target)

    return Operator[rule.operator].call(null, rule, target)
}

module.exports = {
    evaluate: evaluate
}