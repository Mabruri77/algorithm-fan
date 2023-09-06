class Node {
  constructor(val, weight) {
    this.value = val
    this.weight = weight
  }
}

class PriorityQueue {
  constructor() {
    this.data = []
  }
  push(node) {
    let data = this.data
    data.push(node)
    this.shiftUp(data)
  }
  pop() {
    let data = this.data
    if (data.length < 1) return null
    if (data.length == 1) return data.pop()
    let valueRemoved = data[0]
    data[0] = data.pop()
    this.shiftDown(data)
    return valueRemoved
  }
  shiftDown(data) {
    let current = 0
    while (true) {
      let leftChild = 2 * current + 1
      let rightChild = 2 * current + 2
      if (
        data[rightChild] &&
        data[rightChild].weight < data[current].weight &&
        data[rightChild].weight < data[leftChild].weight
      ) {
        this.swap(data, current, rightChild)
        current = rightChild
      } else if (data[leftChild] && data[leftChild].weight < data[current].weight) {
        this.swap(data, current, leftChild)
        current = leftChild
      } else break
    }
  }
  shiftUp(data) {
    let current = data.length - 1
    while (current > 0) {
      let parent = Math.floor((current - 1) / 2)
      if (data[parent].weight > data[current].weight) {
        this.swap(data, current, parent)
        current = parent
      } else break
    }
  }

  swap(data, indexOne, indexTwo) {
    let temp = data[indexOne]
    data[indexOne] = data[indexTwo]
    data[indexTwo] = temp
  }
}

class WeightedGraph {
  constructor() {
    this.data = {}
  }
  addVertex(val) {
    let data = this.data
    if (!data[val]) data[val] = []
  }
  addEdge(vertex1, vertex2, weight) {
    let data = this.data
    let nodeVertex1 = new Node(vertex1, weight)
    let nodeVertex2 = new Node(vertex2, weight)
    if (data[vertex1] && data[vertex2]) {
      data[vertex1].push(nodeVertex2)
      data[vertex2].push(nodeVertex1)
    }
  }
  dijkstraAlgo(start, end) {
    let result = []
    let nodes = new PriorityQueue()
    let distances = {}
    let previous = {}
    let seen = {}
    previous["A"] = null
    seen["A"] = true
    nodes.push(new Node(start, 0))
    distances["A"] = 0
    while (nodes.data.length) {
      let current = nodes.pop()
      if (current.value == end) {
        let node = end
        while (node) {
          result.push(node)
          node = previous[node]
        }
        break
      } else {
        for (let neighbour of this.data[current.value]) {
          let newWeight = current.weight + neighbour.weight
          if (!seen[neighbour.value]) {
            seen[neighbour.value] = true
            distances[neighbour.value] = newWeight
            previous[neighbour.value] = current.value
            neighbour.weight = newWeight
            nodes.push(neighbour)
          } else if (distances[neighbour.value] > newWeight) {
            neighbour.weight = newWeight
            nodes.push(neighbour)
            distances[neighbour.value] = newWeight
            previous[neighbour.value] = current.value
          }
        }
      }
    }
    console.log(result.reverse())
  }
}

const graph = new WeightedGraph()
graph.addVertex("A")
graph.addVertex("B")
graph.addVertex("C")
graph.addVertex("D")
graph.addVertex("E")
graph.addVertex("F")

graph.addEdge("A", "B", 4)
graph.addEdge("A", "C", 2)
graph.addEdge("B", "E", 3)
graph.addEdge("C", "D", 2)
graph.addEdge("C", "F", 4)
graph.addEdge("D", "E", 3)
graph.addEdge("D", "F", 1)
graph.addEdge("E", "F", 1)
graph.dijkstraAlgo("A", "E")
