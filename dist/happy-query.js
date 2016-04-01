(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["HappyQuery"] = factory();
	else
		root["HappyQuery"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var RuleBuilder = __webpack_require__(1)
	var Evaluator = __webpack_require__(2);
	
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

/***/ },
/* 1 */
/***/ function(module, exports) {

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
	    };
	}
	
	RuleBuilder.Bool = function(field) {
	    return new Operator('bool', field);
	}
	
	RuleBuilder.Equal = function(field, value) {
	    return new Operator('equal', field, value);
	}
	
	RuleBuilder.GreaterThan = function(field, value) {
	    return new Operator('gt', field, value);
	}
	
	RuleBuilder.OneOf = function(field, value) {
	    return new Operator('oneOf', field, value);
	}
	
	RuleBuilder.IsEmpty = function(field) {
	    return new Operator('isEmpty', field);
	}
	
	RuleBuilder.Always = function() {
	    return new Always();
	}
	
	RuleBuilder.NestedRule = function(field, rule) {
	    return new Operator('nested', field, rule);
	}
	
	
	module.exports = RuleBuilder;

/***/ },
/* 2 */
/***/ function(module, exports) {

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

/***/ }
/******/ ])
});
;
//# sourceMappingURL=happy-query.js.map