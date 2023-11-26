class Node {
  constructor(val) {
    this.value = val
    this.left = null
    this.right = null
  }
}

class BinarySearchTree {
  constructor() {
    this.root = null
  }

  insert(val) {
    let newNode = new Node(val)
    if (!this.root) return (this.root = newNode)
    let current = this.root
    while (true) {
      if (val < current.value && current.left) current = current.left
      else if (val < current.value) return (current.left = newNode)
      else if (current.right) current = current.right
      else return (current.right = newNode)
    }
  }
  search(val) {
    let current = this.root
    while (current) {
      if (val > current.value) current = current.right
      else if (val < current.value) current = current.left
      else return console.log(current.value)
    }
    return console.log(
      "The Value is Not Found \n<======================================================================>"
    )
  }
  delete(val) {
    let { parent, current, direction } = this.searchForDelete(val)
    if (!current) return console.log("the value for deletion not exist")

    if (current.left && current.right) {
      let { smallestNode, smallestParent, smallestDirection } = this.findRightSmallest(current)
      current.value = smallestNode.value
      if (smallestNode.right) {
        smallestParent[smallestDirection] = smallestNode.right
      } else {
        smallestParent[smallestDirection] = null
      }
    } else if (current.right) {
      parent[direction] = current.right
    } else {
      parent[direction] = current.left
    }
  }

  searchForDelete(val) {
    let parent = this.root
    let current = parent
    let direction = null
    while (current) {
      if (val < current.value) {
        parent = current
        current = current.left
        direction = "left"
      } else if (val > current.value) {
        parent = current
        current = current.right
        direction = "right"
      } else if (val == current.value) break
      else return { parent: null, current: null }
    }
    return { parent, current, direction }
  }

  findRightSmallest(node) {
    let parent = node
    let start = parent.right
    let direction = "right"
    while (start.left) {
      parent = start
      start = start.left
      direction = "left"
    }
    return { smallestNode: start, smallestParent: parent, smallestDirection: direction }
  }
}

const tree = new BinarySearchTree()
tree.insert(10)
tree.insert(5)
tree.insert(15)
tree.insert(2)
tree.insert(5)
tree.insert(1)
tree.insert(13)
tree.insert(22)
tree.insert(12)
tree.insert(14)
tree.delete(5)
tree.delete(2)
console.log(tree.root)
