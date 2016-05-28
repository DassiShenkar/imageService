var mongoose = require('mongoose'),
	schema = mongoose.Schema,
	Image;

var imageSchema = new schema({
	title: String,
	creator: String,
	originalImageUrl: String,
	thumbnailUrl: String,
	webSizeUrl: String,
	dominantColor: String
}, {collection: 'images'});

Image = mongoose.model('Image', imageSchema);

module.exports = Image;