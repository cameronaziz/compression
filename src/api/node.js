class Node {
  constructor({ frequency, value, left, right }) {
    this.frequency = frequency;
    if (value) {
      this.value = value;
    }
    if (left) {
      this.left = left;
    }
    if (right) {
      this.right = right;
    }
    if (right && left) {
      this.frequency  = right.frequency + left.frequency;
    }
  }
}

export default Node;