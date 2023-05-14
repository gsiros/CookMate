

// 	redundant code

/*async function loadModel(){
	
	console.log("Asking user for video permissions"); 	
	//ask user for video permissions 
	const videoElement = document.createElement('video'); 
	const stream = await navigator.mediaDevices.getUserMedia({video: true});
	videoElement.srcObject = stream; 
	await videoElement.play(); 


	//load the model 
	console.log("Loading model into the code");
	const model = await blazeface.load(); 

	async function detectFaces(){

		const predictions = await model.estimateFaces(videoElement); 

		if(predictions != 0){
			//if face is detected exit the loop
			console.log("Face detected"); 
			alert("Face detected");
		}else{
			//if face not detected continue to ask for face
			console.log("No face detected");	
			alert("Face not detected");
			requestAnimationFrame(detectFaces);
		}
	}

	detectFaces();
} 



loadModel();*/



