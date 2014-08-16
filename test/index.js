'use strict';

require('should');

var bodega = require('../lib/index').open({
	user: 'Stefan',
	password: '',
	database: 'Bodega'
});

describe('Bodega', function () {

	describe('#SELECT', function () {
		it('Should return a dataset', function (done) {
			var query = 'SELECT * FROM "Wine"';
			bodega.do(query, function (err, data) {
				if (err) {
					throw err;
				}

				data.should.not.equal.null;
				done();
			});
		});
	});

	describe('#INSERT', function () {
		it('Should return a record ID', function (done) {
			var query = 'INSERT INTO "Wine"("brand", "year") VALUES($1, $2) RETURNING id';
			bodega.do(query, ['Quintanilla del Monte', '1980'], function (err, data) {
				if (err) {
					throw err;
				}

				data['id'].should.not.equal.null;
				done();
			});
		});
	});

	describe('#FUNCTION INSERT', function () {
		it('Should return a record ID', function (done) {
			var query = 'SELECT "insertWine"($1, $2) AS "bottle"';
			bodega.do(query, ['Tempranillo de la Torre', '1980'], function (err, data) {
				if (err) {
					throw err;
				}

				data['bottle'].should.not.equal.null;
				done();
			});
		});
	});

	describe('#DELETE', function () {
		it('Should return the number of deleted rows', function (done) {
			var query = 'DELETE FROM "Wine" WHERE "year" = $1';
			bodega.do(query, ['1980'], function (err, data) {
				if (err) {
					throw err;
				}

				data['rowCount'].should.not.equal.null;
				done();
			});
		});
	});

});
