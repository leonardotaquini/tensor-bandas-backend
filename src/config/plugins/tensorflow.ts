import * as tensorflow from '@tensorflow/tfjs';

// Export the TensorFlow library with the Tensor class
const tfMethods = tensorflow;
type Tensor = tensorflow.Tensor;

export { tfMethods as tf, Tensor}



