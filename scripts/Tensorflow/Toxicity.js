const TOXICITY = require("@tensorflow-models/toxicity");
const THRESHOLD = 1.0;
const tensorflow = TOXICITY.load(THRESHOLD);
const is_sensitive = async (sentences) => {
  // method 1: 0.9; method 2: 1.0
  const tox_status = await tensorflow.then(async (model) => {
    // const sentences = ["you suck"];
    console.log("await");
    return await model.classify(sentences).then((predictions) => {
      /*
      // Method 1: each predication is evaluated in relation to the threshold
      for (let i = 0; i < predictions.length; ++i) {
        console.log(
          predictions[i].label +
            ": " +
            predictions[i].results[0].probabilities[1] +
            "\n"
        ); // second # for predictions - confidence rating
        if (predictions[i].results[0].probabilities[1] >= THRESHOLD) {
          console.log("Sensitive post.\n");
          return true;
        }
      }
      */
      // Method 2: each prediction is given a "weight", in which the total summation of each predication is evaluated in relation to the threshold
      const weights = [1.0, 0.3, 0.5, 1.0, 0.8, 1.0, 0.8]; // identity_attack, insult, obscene, severe_toxicity, sexual_explicit, threat, toxicity (respectively)
      var weightedProbabilities = [];
      // Calculate and display weighted probabilities
      for (let i = 0; i < predictions.length; ++i) {
        weightedProbabilities[i] =
          weights[i] * predictions[i].results[0].probabilities[1];
      }
      // Calculate and display sum of weighted probabilities
      var sumWeightedProbabilities = weightedProbabilities.reduce(function (
        x,
        y
      ) {
        return x + y;
      },
      0);
      // Display unweighted probabilities individually
      console.log(
        "========================\nUNWEIGHTED PROBABILITIES\n========================"
      );
      for (let i = 0; i < predictions.length; ++i) {
        console.log(
          predictions[i].label +
            ": " +
            predictions[i].results[0].probabilities[1] +
            "\n"
        );
      }
      // Display weighted probabilites individually
      console.log(
        "======================\nWEIGHTED PROBABILITIES\n======================"
      );
      for (let i = 0; i < predictions.length; ++i) {
        console.log(
          predictions[i].label + ": " + weightedProbabilities[i] + "\n"
        );
      }
      // Compare weighted probabilities sum in relation to threshold
      console.log(
        "SUM OF WEIGHTED PROBABILITIES: " + sumWeightedProbabilities + "\n"
      );
      if (sumWeightedProbabilities >= THRESHOLD) {
        console.log("Sensitive post.\n");
        return true;
      } else {
        console.log("Not a sensitive post.\n");
        return false;
      }
    });
  });
  return await tox_status;
};

export default is_sensitive;
