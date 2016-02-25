/**
 * Created by Marco on 25/02/16.
 */
var should = require('should');

describe('Array', function() {
    describe('#indexOf()', function () {
        it('should return -1 when the value is not present', function () {
            [1,2,3].indexOf(5).should.equal(-1);
        });
    });
});