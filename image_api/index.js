'use strict'

var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://gd_admin:fuckthecloud@ds019063.mlab.com:19063/images');
var imageShcema = require('./image_schema');
var EventEmitter = require('events').EventEmitter;
var eventsConfig = require('./config').events;

class ImageQuery extends EventEmitter {
	constructor() {
		super();
		this.data = null;

	this.on(eventsConfig.GET_ALL, function() {
		console.log("get all");
		db.connection.once('open', function(){
			console.log("connecting");
			imageShcema.find({}, function(err, data){
				console.log("connected to mongoDB");
				if(err == null){
					this.data = data
				}
				mongoose.disconnect();
			}); 
		});
	});

	this.on(eventsConfig.GET_IMAGE_BY_COLOR, function(color) {
		mongoose.connection.once('open', function(){
			imageShcema.find().where('dominantColor').equals(color).exec(function(err, data){
				console.log("connected to mongoDB");
				if(err == null){
					this.data = data
				}
				mongoose.disconnect();
			}); 
		});
	});

	this.on(eventsConfig.UPDATE_METADATA, function(image) {
		mongoose.connection.once('open', function(){
			var image = findOne({})
			image.update({
				$set:image
			}).exec(function(err, data){
				console.log("connected to mongoDB");
				if(err == null){
					this.data = data
				}
				mongoose.disconnect();
			}); 
		});
	});

	this.on(eventsConfig.ADD_IMAGE, function(image) {
		mongoose.connection.once('open', function(){
			image.save(function(err, data){
				console.log("connected to mongoDB");
				if(err == null){
					this.data = data
				}
				mongoose.disconnect();
			}); 
		});
	});

	this.on(eventsConfig.DELETE_IMAGE, function(id) {
		mongoose.connection.once('open', function(){
			var image = imageShcema.findOne({id: id});
			image.remove(function(err, data){
				console.log("connected to mongoDB");
				if(err == null){
					this.data = data
				}
				mongoose.disconnect();
			}); 
		});
	});
}

	getAll() {
		this.emit(eventsConfig.GET_ALL);
		return this.data;
	}

	getImageByColor(color) {
		this.emit(eventsConfig.GET_IMAGE_BY_COLOR, color);
		return this.data;
	}

	updateImageMetadata(body) {
		var image = {
			title: body.title,
			creator: body.creator,
			originalImageUrl: body.originalImageUrl,
			thumbnailUrl: body.thumbnailUrl,
			webSizeUrl: body.webSizeUrl,
			dominantColor: body.dominantColor
		}
		this.emit(eventsConfig.UPDATE_METADATA, image);
		return this.data;
	}

	addImage(body) {
		var image = {
			title: body.title,
			creator: body.creator,
			originalImageUrl: body.originalImageUrl,
			thumbnailUrl: body.thumbnailUrl,
			webSizeUrl: body.webSizeUrl,
			dominantColor: body.dominantColor
		}
		this.emit(eventsConfig.ADD_IMAGE, image);
		return this.data;
	}

	deleteImage(id) {
		this.emit(eventsConfig.DELETE_IMAGE, id);
		return this.data;
	}

}
module.exports = ImageQuery;