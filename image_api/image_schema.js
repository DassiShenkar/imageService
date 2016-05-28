var mongoose = require('mongoose'),
	schema = mongoose.Schema,
	imageSchema;

var schema_name = new schema({
	title: String,
	creator: String,
	originalImageUrl: String,
	thumbnailUrl: String,
	webSizeUrl: String,
	dominantColor: String
}, {collection: 'images'});

imagesSchema = mongoose.model('imagesSchema', schema_name);

module.exports = imagesSchema;