
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
    'defrost.',
    'reheat.',
    'watt',
    'cancel',
]; 


export let voiceCommandFunctions = {
    
    async handleVoiceCommand(command){

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
            //let index = scores.findIndex(scores.max); 
            //console.log(intents[index]);
            //return index;
        }catch(err){
            console.log("Error: " + err + " while creating embeddings");
        }
        //create commands from words here
    },
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

