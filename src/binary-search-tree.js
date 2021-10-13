const {
  NotImplementedError
} = require('../extensions/index.js');

const {
  Node
} = require('../extensions/list-tree.js');

/**
 * Implement simple binary search tree according to task description
 * using Node from extensions
 */


module.exports = class BinarySearchTree {
  node = null

  root() {
    return this.node
  }

  add(data) {
    let currentElement = this.node;

    if (!this.node) {
      this.node = new Node(data);
      return;
    }

    while (currentElement) {
      if (currentElement.data > data && currentElement.left == null) {
        currentElement.left = new Node(data);
        return;
      } else if (currentElement.data < data && currentElement.right == null) {
        currentElement.right = new Node(data);
        return;
      }

      if (currentElement.data > data) {
        currentElement = currentElement.left;
      } else {
        currentElement = currentElement.right;
      }
    }
  }

  has(data) {
    return this.find(data) !== null;
  }

  find(data) {
    let currentElement = this.node;

    while (currentElement) {

      if (data > currentElement.data) {
        currentElement = currentElement.right;
      } else if (data < currentElement.data) {
        currentElement = currentElement.left;
      } else if (data == currentElement.data) {
        return currentElement;
      }

    }
    return null;
  }

  remove(data) {
    if (this.has(data)) {
      this.node = removeWithin(this.node, data);

      function removeWithin(node, data) {
        if (node.data == data) {
          if (node.left == null && node.right == null) {
            return null;
          } else if (node.left == null) {
            node = node.right;
            return node;
          } else if (node.right == null) {
            node = node.left;
            return node;
          } else {
            if (node.right.left === null) {
              node.data = node.right.data;
              node.right = node.right.right;
              return node;
            }

            let removedElement = minFromLeft(node.right);
            node = removeWithin(node, removedElement.data);
            node.data = removedElement.data;

            function minFromLeft(node) {
              while (node.left) {
                node = node.left;
              }
              return node;
            }

            return node;
          }
        }
        if (node.data < data) {
          node.right = removeWithin(node.right, data);
          return node;
        } else {
          node.left = removeWithin(node.left, data);
          return node;
        }
      }
    }
  }

  min() {
    let currentElement = this.node;

    while (currentElement.left) {
      currentElement = currentElement.left;
    }
    
    return currentElement.data;
  }

  max() {
    let currentElement = this.node;

    while (currentElement.right) {
      currentElement = currentElement.right;
    }

    return currentElement.data;
  }
}