var chai = require('chai');
var expect = chai.expect;
var HappyQuery = require('./../src');
var RuleBuilder = require('./../src/RuleBuilder');

var persons = [
    {
        name: 'Maxime',
        age: 32,
        isMale: true,
        hasDog: false
    },
    {
        name: 'Emile',
        age: 14,
        isMale: true,
        hasDog: false
    },
    {
        name: 'Charles',
        age: 9,
        isMale: true,
        hasDog: true
    },
    {
        name: 'Eliot',
        age: 5,
        isMale: true,
        hasDog: false
    }
]

describe('HappyQuery filter', function () {
    it('should return Person older than 18 years or a male with a dog', function () {

        var rule = RuleBuilder.Or(
            RuleBuilder.GreaterThan('age', 18),
            RuleBuilder.And(
                RuleBuilder.Bool('isMale'),
                RuleBuilder.Bool('hasDog')
            )
        );
        var result = HappyQuery.filter(rule, persons)

        expect(result.length).to.equal(2);
    });

})