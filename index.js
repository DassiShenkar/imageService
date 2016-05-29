var restify = require('restify');
var moment = require('moment');
var server = restify.createServer();
server.use(restify.queryParser());
var imageData;
var imageQuery = require('./image_api');
var images = new imageQuery();
var port = process.env.PORT || 3000;

server.get("/image/", function (req, res){
	imageData = images.getAll();
	console.log(imageData);
	if(imageData == null){
		res.send(404, {error:"No images found"});
	}
	else{
		console.log("got GET request at "+ moment().format('h:mm:ss') + '\n' + imageData);
		res.send(200, imageData);
	}
});

server.get("/image/:dominantColor", function (req, res){
	imageData = images.getImageByColor(req.param.dominantColor);
	if(imageData == null){
		res.send(404, {error:"No image found"});
	}
	else{
		console.log("got GET request at "+ moment().format('h:mm:ss') + '\n' + imageData);
		res.send(200, imageData);
	}
});

server.put("/image/:id", function (req, res){
	imageData = images.updateImageMetadata(req.param.id, req.body);
	if(imageData == null){
		res.send(404, {error:"No image found"});
	}
	else{
		console.log("got GET request at "+ moment().format('h:mm:ss') + '\n' + imageData);
		res.send(200, imageData);
	}
});

server.post("/image/", function (req, res){
	imageData = images.addImage(req.body);
	if(imageData == null){
		res.send(404, {error:"No image found"});
	}
	else{
		console.log("got GET request at "+ moment().format('h:mm:ss') + '\n' + imageData);
		res.send(200, imageData);
	}
});

server.del("/image/:id", function (req, res){
	imageData = images.deleteImage(req.body);
	if(imageData != null){
		res.send(404, {error:"No image found"});
	}
	else{
		console.log("got GET request at "+ moment().format('h:mm:ss') + '\n' + imageData);
		res.send(200, imageData);
	}
});

server.get(/\/public\/?.*/, restify.serveStatic({
	directory: __dirname
}));

server.listen(port, function() {
  console.log('%s listening at %s', server.name, server.url);
});