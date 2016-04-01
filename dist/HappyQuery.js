/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var Interpreter = __webpack_require__(1)

	var HappyQuery = {};

	HappyQuery.Interpreter = Interpreter;

	module.exports = HappyQuery;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var Evaluator = __webpack_require__(2);

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

/***/ },
/* 2 */
/***/ function(module, exports) {

	var Evaluator = {
	    'bool': function(value, rule) {
	        return (value === true)
	    },
	    'gt': function(value, rule) {
	        return value > rule.value;
	    }
	}

	module.exports = {
	    evaluate: function(rule, target) {
	        return Evaluator[rule.operator].call(null, target[rule.field], rule)
	    }
	}

/***/ }
/******/ ]);