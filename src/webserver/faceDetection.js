const blazeface = require('@tensorflow-models/blazeface');




async function loadModel(){
	
	console.log("Loading model into the code");

	const model = await blazeface.load(); 
} 


async function detectFaces(model, videoElement){

	const predictions = await model.estimateFaces(videoElement); 

	if(predictions != 0){
		console.log("Face detected"); 
	}
}

loadModel(); 
