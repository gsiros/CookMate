



async function loadModel(){
	
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
			console.log("Face detected"); 
		}else{
			console.log("No face detected");	

			requestAnimationFrame(detectFaces);
		}
	}

	detectFaces();
} 



loadModel();



