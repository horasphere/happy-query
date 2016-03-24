var RuleBuilder = {};

var Or = function() {
    this.condition = "or";
    this.rules = Array.prototype.slice.call(arguments);

    return this;
}

var And = function() {
    this.condition = "and";
    this.rules = Array.prototype.slice.call(arguments);

    return this;
}

var Always = function() {
    this.operator = "always"

    return this;
}


var Operator = function(operator, field, value) {
    this.operator = operator;
    this.field = field;

    if(value !== undefined)
        this.value = value;

    return this;
}

RuleBuilder.And = function() {
    var self = {};
    And.apply(self, arguments);

    return self;
}

RuleBuilder.Or = function() {
    var self = {};

    Or.apply(self, arguments);

    return self;
}

RuleBuilder.Not = function(rule) {
    return {
        condition: "not",
        rule: rule
    }
}

RuleBuilder.Bool = function(field) {
    return new Operator('bool', field)
}

RuleBuilder.GreaterThan = function(field, value) {
    return new Operator('gt', field, value)
}

RuleBuilder.OneOf = function(field, value) {
    return new Operator('oneOf', field, value)
}

RuleBuilder.IsEmpty = function(field) {
    return new Operator('isEmpty', field)
}

RuleBuilder.Always = function() {
    return new Always();
}


module.exports = RuleBuilder;