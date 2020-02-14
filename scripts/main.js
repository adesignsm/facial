var img_upload = document.getElementById("image-upload");

Promise.all([
	faceapi.nets.faceRecognitionNet.loadFromUri("./models"),
	faceapi.nets.faceLandmark68Net.loadFromUri("./models"),
	faceapi.nets.ssdMobilenetv1.loadFromUri("./models")
]).then(start)

function start() {

	var container = document.createElement("div");
	container.style.position = "relative";
	document.getElementById("image-container").append(container);

	console.log("loaded");

	img_upload.addEventListener("change", async() => {

		var img = await faceapi.bufferToImage(img_upload.files[0]);

		if (img.width >= 1920 && img.height >= 1080) {

			img.width = window.innerWidth / 2;
			img.height = window.innerHeight / 2;
		
		} else {

			img.width = img.width;
			img.height = img.height;
		}


		var canv = faceapi.createCanvasFromMedia(img);
		var img_size = {

			width: img.width,
			height: img.height
		};

		faceapi.matchDimensions(canv, img_size);

		container.append(canv);
		container.append(img);

		var detections = await faceapi.detectAllFaces(img).withFaceLandmarks().withFaceDescriptors();
		var resize_detections = faceapi.resizeResults(detections, img_size);

		resize_detections.forEach(detections => {
			var box = detections.detection.box;
			var draw_box = new faceapi.draw.DrawBox(box, {label: "face"});
			draw_box.draw(canv);
		});	
	});
}
