class NeuralNetwork {
    constructor(a, b) {
        // console.log(a);
        if (a instanceof tf.Sequential) {
            this.model = a;
            this.input_nodes = b.shift();
            this.output_nodes = b.pop();
            this.hidden_nodes = b;
        } else {
            this.input_nodes = a.shift();
            this.output_nodes = a.pop();
            this.hidden_nodes = a;
            this.model = this.createModel();
        }
    }

    mutate(rate) {
        tf.tidy(() => {
            const weights = this.model.getWeights();
            const mutatedWeights = [];
            for (let i = 0; i < weights.length; i++) {
                let tensor = weights[i];
                let shape = weights[i].shape;
                let values = tensor.dataSync().slice();
                for (let j = 0; j < values.length; j++) {
                    if (random(1) < rate) {
                        let x = values[j];
                        values[j] = x + randomGaussian();
                    }
                }
                let newTensor = tf.tensor(values, shape);
                mutatedWeights[i] = newTensor;
            }
            this.model.setWeights(mutatedWeights);
        });
    }

    copy() {
        return tf.tidy(() => {
            const modelCopy = this.createModel();
            const weights = this.model.getWeights();
            const weightCopies = [];
            for (let weight of weights) {
                weightCopies.push(weight.clone());
            }
            modelCopy.setWeights(weightCopies);
            return new NeuralNetwork(modelCopy, [this.input_nodes, ...this.hidden_nodes, this.output_nodes]);
        });
    }

    predict(inputs) {
        return tf.tidy(() => {
            const xs = tf.tensor2d([inputs]);
            const ys = this.model.predict(xs);
            const outputs = ys.dataSync();
            return outputs;
        });
    }

    createModel() {
        return tf.tidy(() => {
            const model = tf.sequential();

            for (let i = 0; i < this.hidden_nodes.length; i++) {
                const hidden_layer = tf.layers.dense({
                    units: this.hidden_nodes[i],
                    inputShape: [this.input_nodes],
                    activation: "sigmoid",
                });
                model.add(hidden_layer);
            }

            const output_layer = tf.layers.dense({
                units: this.output_nodes,
                activation: "softmax",
            });
            model.add(output_layer);
            return model;
        });
    }
}
