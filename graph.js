class Node {
	constructor(value, adjacent = new Set()) {
		this.value = value;
		this.adjacent = adjacent;
	}
}

class Graph {
	constructor() {
		this.nodes = new Set();
	}

	addVertex(vertex) {
		this.nodes.add(vertex);
	}

	addVertices(vertexArray) {
		for (let vertex of vertexArray) {
			this.addVertex(vertex);
		}
	}

	addEdge(v1, v2) {
		v1.adjacent.add(v2);
		v2.adjacent.add(v1);
	}

	removeEdge(v1, v2) {
		v1.adjacent.delete(v2);
		v2.adjacent.delete(v1);
	}

	removeVertex(vertex) {
		for (let node of this.nodes) {
			node.adjacent.delete(vertex);
		}
		this.nodes.delete(vertex);
	}

	depthFirstSearch(start) {
		const visited = new Set();
		const result = [];

		function traverse(vertex) {
			if (!vertex || visited.has(vertex)) return;
			visited.add(vertex);
			result.push(vertex.value);
			vertex.adjacent.forEach((node) => traverse(node));
		}

		traverse(start);
		return result;
	}

	breadthFirstSearch(start) {
		const visited = new Set();
		const result = [];
		const queue = [start];

		while (queue.length) {
			const vertex = queue.shift();
			if (!visited.has(vertex)) {
				visited.add(vertex);
				result.push(vertex.value);
				queue.push(...vertex.adjacent);
			}
		}

		return result;
	}
}

module.exports = { Graph, Node };
