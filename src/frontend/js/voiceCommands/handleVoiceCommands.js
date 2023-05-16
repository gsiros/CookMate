
let encoder = null; 


use.load()
.then((enc) => {
    console.log("Loaded universal sentence encoder");
    encoder = enc; 
})
.catch(err => {
    console.log("Error: " + err + " while trying to load encoder");
})

// Map your commands to intent labels
const intents = {
    defrost: 'DEFROST',
    reheat: 'REHEAT',
    watt: 'WATT',
    cancel: 'CANCEL'
};


export let voiceCommandFunctions = {
    
    async handleVoiceCommand(command){


        // Encode the sentence using the Universal Sentence Encoder model
        const embeddings = await encoder.embed(command);

        const intentLabel = recognizeIntent(embeddings);
        console.log('Recognized intent:', intentLabel);
        // Perform the action associated with the intent
        // handleIntent(intentLabel);

        //create commands from words here
    },
} 


