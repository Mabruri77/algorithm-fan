class Node {
  constructor(val) {
    this.value = val
    this.children = []
  }
}

class Tree {
  constructor() {
    this.root = null
  }
  insert(parent, children) {
    if (!this.root) {
      this.root = new Node(parent)
      for (let value of children) {
        this.root.children.push(new Node(value))
      }
    } else {
      let queue = [this.root]
      for (let i = 0; i < queue.length; i++) {
        if (queue[i].value == parent) {
          for (let value of children) {
            queue[i].children.push(new Node(value))
          }
          return
        }
        for (let value of queue[i].children) {
          queue.push(value)
        }
      }
    }
  }
}

const tree = new Tree()
tree.insert("A", ["B", "C", "D", "E", "F"])
tree.insert("B", ["G", "H", "I"])
tree.insert("C", ["J"])
tree.insert("D", ["K", "L"])
tree.insert("F", ["M", "N"])
tree.insert("H", ["O", "P", "Q", "R"])
tree.insert("P", ["T", "U"])
tree.insert("R", ["V"])
tree.insert("V", ["W", "X", "Y"])
tree.insert("X", ["Z"])

function youngestCommonAncestor(valueOne, valueTwo) {
  let result = { info: null }
  dfs(tree.root, valueOne, valueTwo, result)
  console.log(result.info)
}

function dfs(node, valueOne, valueTwo, result) {
  let count = 0
  for (let value of node.children) {
    count += dfs(value, valueOne, valueTwo, result)
  }
  if (count > 1 && result.info == null) {
    result.info = node.value
  }
  if (node.value == valueOne || node.value == valueTwo) {
    return 1
  } else return count
}

youngestCommonAncestor("N", "Z")
