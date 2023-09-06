class PriorityQueue {
  constructor() {
    this.data = []
  }
  insert(node) {
    this.data.push(node)
    this.shiftUp(this.data)
  }
  remove() {
    let data = this.data
    if (data.length <= 1) return data.pop()
    let removedValue = data[0]
    data[0] = data.pop()
    this.shiftDown(data)
    return removedValue
  }
  shiftUp(data) {
    let current = data.length - 1
    while (current > 0) {
      let parent = Math.floor((current - 1) / 2)
      if (data[current][1] < data[parent][1]) {
        this.swap(data, current, parent)
        current = parent
      } else break
    }
  }

  shiftDown(data) {
    let current = 0
    while (true) {
      let leftChild = 2 * current + 1
      let rightChild = 2 * current + 2
      if (
        data[rightChild] &&
        data[rightChild][1] < data[current][1] &&
        data[rightChild][1] < data[leftChild][1]
      ) {
        this.swap(data, current, rightChild)
        current = rightChild
      } else if (data[leftChild] && data[leftChild][1] < data[current][1]) {
        this.swap(data, current, leftChild)
        current = leftChild
      } else break
    }
  }
  swap(data, indexOne, indexTwo) {
    ;[data[indexOne], data[indexTwo]] = [data[indexTwo], data[indexOne]]
  }
}

function dijsktraAlgo(graph, start, end) {
  let vertexes = new PriorityQueue()
  let result = []
  for (let vertex = 0; vertex < graph.length; vertex++) {
    result[vertex] = -1
  }
  result[start] = 0
  let seen = {}
  vertexes.insert([start, 0])
  seen[start] = true
  while (vertexes.data.length) {
    let current = vertexes.remove()
    let vertex = current[0]
    let weight = current[1]
    if (vertex == end) {
      break
    } else {
      for (let neighbour of graph[vertex]) {
        let vertexNeighbour = neighbour[0]
        let weightNeighbour = neighbour[1]
        let countWeight = weightNeighbour + weight
        if (!seen[vertexNeighbour]) {
          seen[vertexNeighbour] = true
          result[vertexNeighbour] = countWeight
          vertexes.insert([vertexNeighbour, countWeight])
        } else if (result[vertexNeighbour] > countWeight) {
          result[vertexNeighbour] = countWeight
          vertexes.insert([vertexNeighbour, countWeight])
        }
      }
    }
  }
  console.log(result)
}

dijsktraAlgo(
  [
    [[1, 7]],
    [
      [2, 6],
      [3, 20],
      [4, 3],
    ],
    [[3, 14]],
    [[4, 2]],
    [],
    [],
  ],
  0,
  4
)
