Bodega
===============
```
/bəˈdeɪgə/
	
	noun: bodega; plural noun: bodegas
	A cellar or shop selling wine and food,
	especially in a Spanish-speaking country or area.
```


[![Dependencies](https://david-dm.org/aichholzer/bodega.png)](https://david-dm.org/aichholzer/bodega)

[![NPM](https://nodei.co/npm/bodega.png?downloads=true&stars=true)](https://nodei.co/npm/bodega/)

[![NPM](https://nodei.co/npm-dl/bodega.png)](https://nodei.co/npm/bodega/)

A simple wrapper for [node-postgres](https://github.com/brianc/node-postgres) to make your life even easier. You do not need to worry about which connection to use, about pooling or about returning a client/connection to the pool after using it.

There is no need to additionally install `node-postgres`. Bodega will take care of it. If you need more information/details on the actual `node-postgres` module, take a look at [its own repository](https://github.com/brianc/node-postgres).


#### Super simple usage:

Install your `bodega`:

```
npm install bodega
```

Require your `bodega` and open it:

```
var bodega = require('bodega').open(config);
```

The `config` object requires these properties:

* `user` - Your DB `username` (*string*).
* `password` - Your DB `password` (*string*).
* `database` - The `database` you are trying to connect to (*string*).

Optional properties:

* `host` - The `host` where your DB is to be found. (*string*, default: `localhost`).
* `port` - The `port` on which your DB is listening. (*int*, default: `5432`).
* `ssl` - Whether to use an SSL connection or not. (*boolean*, default: `false`). 



###### Below you will find some basic examples to illustrate the use of `bodega`



### <a id="select">SELECT</a>
```
var query = 'SELECT * FROM "Wine"';
bodega.do(query, function (err, data) {
	if (err) {
		throw err;
	}

	// Do something with your data
	return data;
});
```

##### Expected response
```
{
 "rows": [],
 "rowCount": int,
}
```


### <a id="insert">INSERT</a>
```
var query = 'INSERT INTO "Wine"("brand", "year") VALUES($1, $2) RETURNING id';
bodega.do(query, ['Quintanilla del Monte', '1980'], function (err, data) {
	if (err) {
		throw err;
	}

	// Do something with your data
	return data.id;
});
```

##### Expected response
```
{
 "rows": [
 		{ "id": int }
 	],
 "rowCount": int,
 "id": int
}
```

The `id` property is what's expected to be returned from the DB by using the `RETURNING` syntax. Furthemore -to keep things easy and comfortable; if `rows` contains only one object, then all of this object's properties will be mapped to the root, hence the presence of `id` at root level.


### <a id="insert-function">INSERT (Via a stored procedure)</a>
```
var query = 'SELECT "insertWine"($1, $2) AS "bottle"';
bodega.do(query, ['Tempranillo de la Torre', '1980'], function (err, data) {
	if (err) {
		throw err;
	}

	// Do something with your data
	return data.bottle;
});
```

##### Expected response
```
{
 "rows": [
 		{ "bottle": variable }
 	],
 "rowCount": int,
 "bottle": variable
}
```

In this case, the contents of the `bottle` property will depend on what the stored procedure decides to return. The rest is the same as described [above](#insert).


### <a id="delete">DELETE</a>
```
var query = 'DELETE FROM "Wine" WHERE "year" = $1';
bodega.do(query, ['1980'], function (err, data) {
	if (err) {
		throw err;
	}

	// Do something with your data
	return data.rowCount;
});
```

##### Expected response
```
{
 "rows": [],
 "rowCount": int
}
```

The `rowCount` property will hold the number of deleted rows.






