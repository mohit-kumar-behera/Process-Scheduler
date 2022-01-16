class Queue {
  elements = [];

  enqueue(entry) {
    this.elements.push(entry);
  }

  dequeue() {
    const delEntry = this.elements.shift();
    return delEntry;
  }

  get isEmpty() {
    return this.elements.length == 0;
  }

  get peek() {
    return this.isEmpty ? this.elements[0] : null;
  }
}

module.exports = Queue;
