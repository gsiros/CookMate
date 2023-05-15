


export let voiceCommandFunctions = {
    
    handleVoiceCommand(command){


        const words = this.wordTokenizer(command); 
        console.log(JSON.stringify(words));
    },

    wordTokenizer(command){
        // Remove any punctuation inside the sentence and convert to lowercase
        let transformed = command.replace(/[.,\/#!$%\^&\*;?:{}=\-_`~()]/g," ").toLowerCase();

        // Split the sentence into an array of words using whitespace as the delimiter
        const words = transformed.trim().split(/\s+/);

        // Return the array of words
        return words;
    }
} 


