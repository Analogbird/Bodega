"use strict";

var pg = require('pg');

module.exports = {

	open : function (config) {
		
		if (!config.hasOwnProperty('host')) {
			config.host = 'localhost';
		}

		if (!config.hasOwnProperty('port')) {
			config.port = 5432;
		}

		if (!config.hasOwnProperty('ssl')) {
			config.ssl = false;
		}

		this.config = config;

		return this;
	},

	do : function(query, data, callback) {

		/**
		 * If no callback was provided we create one, simply to avoid any
		 * errors and to not force the user to provide one.
		 */
		if (typeof data === 'function') {
			callback = data;	
		}
		callback = callback || function() {};

		pg.connect(this.config, function(err, client, done) {

			if (err) {
				done();
				callback({ code: 500, message: err.message, dbError: err });
			} else {
				client.query(query, data, function (err, result) {
					done();

					if (err) {
						callback({ code: 500, message: err.message, dbError: err }, null);
					} else {
						
						var response = {
							rows: result.rows,
							rowCount: result.rowCount
						};

						if (result.rows.length === 1) {
							for (var row in result.rows[0]) {
								if (result.rows[0].hasOwnProperty(row)) {
									response[row] = result.rows[0][row];
								}
							}
						}

						callback(null, response);
					}
				});
			}

		});
	}

};
