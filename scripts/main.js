var img_upload = document.getElementById("image-upload");

Promise.all([
	faceapi.nets.faceRecognitionNet.loadFromUri("./models"),
	faceapi.nets.faceLandmark68Net.loadFromUri("./models"),
	faceapi.nets.ssdMobilenetv1.loadFromUri("./models")
]).then(start)

function start() {

	console.log("loaded");
}
