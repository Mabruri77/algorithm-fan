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
    if (!this.root) {
      this.root = newNode
    } else {
      let current = this.root
      while (true) {
        if (val >= current.value && current.right) {
          current = current.right
        } else if (val >= current.value) {
          current.right = newNode
          break
        } else if (current.left) {
          current = current.left
        } else {
          current.left = newNode
          break
        }
      }
    }
  }

  search(val) {
    let current = this.root
    let result = null
    while (current) {
      if (current.value == val) {
        result = current
        break
      } else if (val >= current.value) {
        current = current.right
      } else {
        current = current.left
      }
    }
    return current
  }
  remove(val) {
    let root = this.root
    let { current, parent, direction } = this.searchingForRemove(val)
    if (current.left && current.right) {
      smallestRightMostAndMove(current)
    } else if (current.left) {
      console.log("left")
      parent[direction] = current.left
    } else if (current.right) {
      console.log(" right")
      parent[direction] = current.right
    } else {
      parent[direction] = null
    }

    function smallestRightMostAndMove(current) {
      let parentTarget = current
      let direction = null
      let target = current.right
      if (target.left) {
        while (true) {
          if (target.left) {
            direction = "left"
            parentTarget = target
            target = target.left
          } else if (target.right) {
            direction = "right"
            parentTarget = target
            target = target.right
          } else break
        }
      }
      current.value = target.value
      if (target.right) {
        if (!direction) {
          current.right = target.right
        } else {
          parentTarget[direction] = target.right
        }
      } else {
        if (!direction) {
          parentTarget["right"] = null
        } else {
          parentTarget[direction] = null
        }
      }
    }
  }

  searchingForRemove(val) {
    let current = this.root
    let parent = null
    let direction = null
    while (current) {
      if (current.value == val) {
        break
      } else if (val >= current.value) {
        parent = current
        direction = "right"
        current = current.right
      } else {
        parent = current
        direction = "left"
        current = current.left
      }
    }
    return { current, parent, direction }
  }
}

const bst = new BinarySearchTree()
bst.insert(10)
bst.insert(5)
bst.insert(15)
bst.insert(2)
bst.insert(5)
bst.insert(1)
bst.insert(13)
bst.insert(22)
bst.insert(12)
bst.insert(14)
bst.insert(33)
bst.insert(23)
bst.remove(15)
console.log(bst.root)
