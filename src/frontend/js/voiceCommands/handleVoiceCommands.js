
let model = null; 


use.loadQnA()
.then((loadedModel) => {
    console.log("Loaded universal sentence encoder");
    model = loadedModel; 
})
.catch(err => {
    console.log("Error: " + err + " while trying to load encoder");
})

// Map your commands to intent labels
const intents = [
    'defrost',
    'reheat',
    'watt',
    'cancel',
]; 

const numberRegex = /\b(\d+)\b/g; // Matches any number

export let voiceCommandFunctions = {
   /**
    * Extracts the intent of the user command using 
    * word embeddings. E.g. 
    * ``Please defrost my food`` will produce: 
    * ```javascript 
    *   scores = [8,3,1,0] 
    * ```
    * Since index 0 has the biggest score intent ``defrost`` is chosen. 
    * @param {*} command voice command spoken by user 
    * @return {*} returns the correct intent 
    */ 
    async extractIntent(command){

        try{
            const commands = Array(1).fill(command);
            const input = {
                queries: commands, 
                responses: intents,
            }
            var scores = [];
            const embeddings = model.embed(input);
            const embed_query = embeddings['queryEmbedding'].arraySync();
            const embed_responses = embeddings['responseEmbedding'].arraySync();
            // compute the dotProduct of each query and response pair.
            for (let i = 0; i < input['queries'].length; i++) {
                for (let j = 0; j < input['responses'].length; j++) {
                scores.push(dotProduct(embed_query[i], embed_responses[j]));
                }
            }
            let index = scores.indexOf(Math.max(...scores)); 
            return intents[index];
        }catch(err){
            console.log("Error: " + err + " while extracting intent");
        }
    },

    /**
     *  Figures the value of the metric to use in the command. 
     *  E.g. " reheat for 3 minutes and 30 seconds" 
     *  this extracts 3 -> minutes and 30 -> seconds 
     * @param {*} intent the intent that was extracted before  
     * @param {*} command the initial command  
     * @returns 
     */
    figureMetric(intent, command){
        intent = intent.toLowerCase(); 
        command = command.toLowerCase(); 
        let constructed_command = null; 
        switch (intent){
            case 'defrost':
            case 'reheat':
                //can produce multiple entries 
                let time_value = command.match(numberRegex);
                //user did not specify time value
                if(time_value == null){
                    return null;
                }
                //metrics that come after have priority
                //E.g. I want to set to 30 minutes and 30 seconds no in fact 15 minutes and 30 seconds 
                let index_minutes = Math.max(
                    findMaxIndex(command, 'min'), 
                    findMaxIndex(command, 'mins'), 
                    findMaxIndex(command, 'minute'), 
                    findMaxIndex(command, 'minutes'), 
                );

                let index_seconds = Math.max(
                    findMaxIndex(command, 'sec'), 
                    findMaxIndex(command, 'secs'), 
                    findMaxIndex(command, 'second'), 
                    findMaxIndex(command, 'seconds'), 
                );

                //user specified time value but did not specify metric
                if(index_minutes == -1 && index_seconds == -1){
                    return null;
                }
                
                //there is only one metric present 
                if(index_minutes == -1){
                   constructed_command = intent + ", for: " + (time_value[time_value.length - 1] || 0) + " minutes " + (0) + " seconds";
                }else if(index_seconds == -1){
                   constructed_command = intent + ", for: " + (time_value[time_value.length - 1] || 0) + " seconds " + (0) + " minutes ";
                }

                return constructed_command;

                //depending on the order of metrics choose appropriate place values and metrics from they array
                //E.g. based on the above [30,30,15,30] you need to choose 15,30  
                if(index_minutes < index_seconds ){
                   constructed_command = intent + ", for: " + (time_value[time_value.length - 2] || 0) + " minutes " + (time_value[time_value.length - 1] || 0) + " seconds";
                }else{
                   constructed_command = intent + ", for: " + (time_value[time_value.length - 2] || 0) + " seconds " + (time_value[time_value.length - 1] || 0) + " minutes ";
                }

                return constructed_command;

            case 'watt':
                let watt_value = command.match(numberRegex);
                //user did not specify watts 
                if(watt_value == null){
                    return null; 
                }
                constructed_command = "Setting watts to: " + watt_value[time_value.length - 1]; 
                return constructed_command;
            case 'cancel':
                console.log("Canceling operation");
                break;
            default: 
                console.log("Unknown intent");
        }

    }
} 


// Calculate the dot product of two vector arrays.
const dotProduct = (xs, ys) => {
  const sum = xs => xs ? xs.reduce((a, b) => a + b, 0) : undefined;

  return xs.length === ys.length ?
    sum(zipWith((a, b) => a * b, xs, ys))
    : undefined;
}

function findMaxIndex(sentence, word) {
  const words = sentence.split(" ");
  let maxIndex = -1;

  for (let i = 0; i < words.length; i++) {
    if (words[i] === word && i > maxIndex) {
      maxIndex = i;
    }
  }

  return maxIndex;
}

// zipWith :: (a -> b -> c) -> [a] -> [b] -> [c]
const zipWith =
    (f, xs, ys) => {
      const ny = ys.length;
      return (xs.length <= ny ? xs : xs.slice(0, ny))
          .map((x, i) => f(x, ys[i]));
    }

