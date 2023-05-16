
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

    figureMetric(intent, command){
        switch (intent){
            case 'defrost':
            case 'reheat':
                let time_value = command.match(numberRegex);
                time_value = time_value.push(0);
                let minutes = command.includes('minutes') || command.includes('minute');
                let seconds = command.includes('seconds') || command.includes('second');
                return {time: time_value, watts: -1,metric:[minutes, seconds]};
            case 'watt':
                let watt_value = command.match(numberRegex);
                return {watts: watt_value, time: -1};
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

// zipWith :: (a -> b -> c) -> [a] -> [b] -> [c]
const zipWith =
    (f, xs, ys) => {
      const ny = ys.length;
      return (xs.length <= ny ? xs : xs.slice(0, ny))
          .map((x, i) => f(x, ys[i]));
    }

