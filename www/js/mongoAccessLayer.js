var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
var assert = require('assert');
var config = require('./config');

function MongoAccessLayer() {
    this.url = null;
    this.db = null;

    this.setup = function (url) {
        this.url = url;
    };

    this.connect = function (callback) {
        if (!this.db) {
            MongoClient.connect(this.url, function (err, db) {
                assert.equal(null, err);
                this.db = db;
                callback(null, db);
            });

        } else {
            callback(null, this.db);
        }
    };

    this.insertDocument = function (collectionName, document, callback) {
        this.connect(function (err, db) {
            if (err) {
                callback(err, null);

            } else {
                db.collection(collectionName).insertOne(document, function (err, result) {
                    assert.equal(err, null);
                    callback(null, result);
                });
            }
        });
    };

    this.getCollection = function (collectionName, query, callback) {
        this.connect(function (err, db) {
            if (err) {
                callback(err, null);

            } else {
                db.collection(collectionName).find(query).toArray(function (err, items) {
                    if (err) {
                        callback(err, null);

                    } else {
                        callback(null, items);
                    }
                });
            }
        });
    };

    this.getTopNDocs = function (collectionName, query, fields, N, callback) {
        this.connect(function (err, db) {
            if (err) {
                callback(err, null);
            } else {
                db.collection(collectionName).find(query, fields, {
                    limit: N,
                    sort: {_id: -1}
                }).toArray(function (err, items) {
                    if (err) {
                        callback(err, null);
                    } else {
                        callback(null, items);
                    }
                });
            }
        });
    };

    this.updateDocument = function (collectionName, criteria, callback) {
        this.connect(function (err, db) {
            if (err) {
                callback(err, null);
            } else {
                db.collection(collectionName).updateOne(criteria.condition, {$set: criteria.setValues},
                    function (err, result) {
                        assert.equal(err, null);
                        callback(null, result);
                    });
            }
        });
    };

    this.getObjectID = function (objectId) {
        return new ObjectID(objectId);
    };
}

var mongoAccessLayer = new MongoAccessLayer();
mongoAccessLayer.setup(config.mongoUrl);
module.exports = mongoAccessLayer;