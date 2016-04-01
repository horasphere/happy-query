var chai = require('chai');
var expect = chai.expect;
var Interpreter = require('./../src/Interpreter');
var RuleBuilder = require('./../src/RuleBuilder');

describe('RuleBuilder [operators]', function () {
    it('should build a Boolean rule', function () {

        var rule = RuleBuilder.Bool('isMale');

        expect(rule).to.deep.equal({
            operator: 'bool',
            field: 'isMale'
        });
    });

    it('should build a Equal rule', function () {
        var rule = RuleBuilder.Equal('age', 18);

        expect(rule).to.deep.equal({
            operator: 'equal',
            field: 'age',
            value: 18
        });
    });

    it('should build a GreaterThan rule', function () {
        var rule = RuleBuilder.GreaterThan('age', 18);

        expect(rule).to.deep.equal({
            operator: 'gt',
            field: 'age',
            value: 18
        });
    });

    it('should build a OneOf rule', function () {
        var rule = RuleBuilder.OneOf('sexe', ['m', 'f']);

        expect(rule).to.deep.equal({
            operator: 'oneOf',
            field: 'sexe',
            value: ['m','f']
        });
    });

    it('should build a isEmpty rule', function () {
        var rule = RuleBuilder.IsEmpty('skills');

        expect(rule).to.deep.equal({
            operator: 'isEmpty',
            field: 'skills'
        });
    });

    it('should build a Always rule', function () {
        var rule = RuleBuilder.Always();

        expect(rule).to.deep.equal({
            operator: 'always'
        });
    });

    it('should build a NestedRule rule', function () {
        var cityRule = RuleBuilder.Equal('city', 'chicoutimi');
        var rule = RuleBuilder.NestedRule('address', cityRule)

        expect(rule).to.deep.equal({
            operator: 'nested',
            field: 'address',
            value: cityRule
        });
    });
})

describe('RuleBuilder [conditions]', function () {
    it('should build a Or condition', function () {
        var isMaleRule = RuleBuilder.Bool('isMale');
        var hasChild = RuleBuilder.Bool('hasChild');

        var rule = RuleBuilder.Or(isMaleRule, hasChild);

        expect(rule).to.deep.equal({
            condition: 'or',
            rules: [isMaleRule, hasChild]
        });

    })

    it('should build a And condition', function () {
        var isMaleRule = RuleBuilder.Bool('isMale');
        var hasChild = RuleBuilder.Bool('hasChild');

        var rule = RuleBuilder.And(isMaleRule, hasChild);

        expect(rule).to.deep.equal({
            condition: 'and',
            rules: [isMaleRule, hasChild]
        });

    })

    it('should build a Not condition', function () {
        var isMaleRule = RuleBuilder.Bool('isMale');
        var rule = RuleBuilder.Not(isMaleRule);

        expect(rule).to.deep.equal({
            condition: 'not',
            rule: isMaleRule
        });

    })
})