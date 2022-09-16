class NeuralNetwork {
    constructor(a, b, c) {
        this.input_nodes = a;
        this.hidden_nodes = b;
        this.output_nodes = c;
        this.createModel();
    }
    createModel() {
        this.model = tf.sequential();
    }
}
