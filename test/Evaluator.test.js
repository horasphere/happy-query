var chai = require('chai');
var expect = chai.expect;
var Evaluator = require('./../src/Evaluator');
var RuleBuilder = require('./../src/RuleBuilder');

describe('Evaluator [bool]', function () {

    it('should be true', function () {
        var rule = RuleBuilder.Bool('isMale');

        expect(Evaluator.evaluate(rule, {isMale: true})).to.be.true;
    });

    it('should be false', function () {
        var rule = RuleBuilder.Bool('isMale');

        expect(Evaluator.evaluate(rule, {isMale: false})).to.be.false;
    });
})

describe('Evaluator [equal]', function () {

    it('should be equal', function () {
        var rule = RuleBuilder.Equal('age', 18);

        expect(Evaluator.evaluate(rule, {age: 18})).to.be.true;
    });

    it('should not be equal', function () {
        var rule = RuleBuilder.GreaterThan('age', 18);

        expect(Evaluator.evaluate(rule, {age: 17})).to.be.false;
    });

})

describe('Evaluator [gt]', function () {

    it('should be greaterThan', function () {
        var rule = RuleBuilder.GreaterThan('age', 18);

        expect(Evaluator.evaluate(rule, {age: 21})).to.be.true;
    });

    it('should not be greaterThan', function () {
        var rule = RuleBuilder.GreaterThan('age', 18);

        expect(Evaluator.evaluate(rule, {age: 17})).to.be.false;
    });

})

describe('Evaluator [oneOf]', function () {

    it('should be oneOf', function () {
        var rule = RuleBuilder.OneOf('sexe', ['m', 'f']);

        expect(Evaluator.evaluate(rule, {sexe: 'm'})).to.be.true;
    });

    it('should not be oneOf', function () {
        var rule = RuleBuilder.OneOf('sexe', ['m', 'f']);

        expect(Evaluator.evaluate(rule, {sexe: 'unknown'})).to.be.false;
    });
})


describe('Evaluator [isEmpty]', function () {

    it('should be empty', function () {
        var rule = RuleBuilder.IsEmpty('skills');

        expect(Evaluator.evaluate(rule, {skills: []})).to.be.true;
    });

    it('should not be empty', function () {
        var rule = RuleBuilder.IsEmpty('skills');

        expect(Evaluator.evaluate(rule, {skills: ['js']})).to.be.false;
    });

})

describe('Evaluator [always]', function () {

    it('should be empty', function () {
        var rule = RuleBuilder.Always();

        expect(Evaluator.evaluate(rule, {})).to.be.true;
    });

})

describe('Evaluator [nested]', function () {

    it('should evaluate a nested rule.', function () {
        var rule = RuleBuilder.NestedRule('address', RuleBuilder.Equal('city', 'chicoutimi'));

        expect(Evaluator.evaluate(rule, {
            address: {
                city: 'chicoutimi'
            }
        })).to.be.true;
    });

})

describe('Evaluator [not]', function () {

    it('should not be true', function () {
        var rule = RuleBuilder.Not(RuleBuilder.Bool('isMale'))

        expect(Evaluator.evaluate(rule, {isMale: true})).to.be.false;
    });

    it('should be true', function () {
        var rule = RuleBuilder.Not(RuleBuilder.Bool('isMale'))

        expect(Evaluator.evaluate(rule, {isMale: false})).to.be.true;
    });

})

describe('Evaluator [or]', function () {
     var rule;

     beforeEach(function() {
        rule = RuleBuilder.Or(
            RuleBuilder.Bool('isMale'),
            RuleBuilder.Bool('hasChild'
        ));
     })


    it('if all rule are true then it should be true', function () {
        expect(Evaluator.evaluate(rule, {
                isMale: true,
                hasChild: true
            })).to.be.true;
    });

    it('if one of rule is false then it should be true', function () {
        expect(Evaluator.evaluate(rule, {
                isMale: false,
                hasChild: true
            })).to.be.true;
    });

    it('if all false then it should be false', function () {
        expect(Evaluator.evaluate(rule, {
                isMale: false,
                hasChild: false
            })).to.be.false;
    });
})

describe('Evaluator [and]', function () {
     var rule;

     beforeEach(function() {
        rule = RuleBuilder.And(
                    RuleBuilder.Bool('isMale'),
                    RuleBuilder.Bool('hasChild')
                );
     })


    it('if all rule are true then it should be true', function () {
        expect(Evaluator.evaluate(rule, {
                isMale: true,
                hasChild: true
            })).to.be.true;
    });

    it('if one of rule is false then it should be false', function () {
        expect(Evaluator.evaluate(rule, {
                isMale: false,
                hasChild: true
            })).to.be.false;
    });

    it('if all true then it should be true', function () {
        expect(Evaluator.evaluate(rule, {
                isMale: true,
                hasChild: true
            })).to.be.true;
    });
})