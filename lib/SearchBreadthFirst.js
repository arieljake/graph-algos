
var _ = require("underscore");
var GraphEdge = require("./GraphEdge.js");
var GraphSearchResult = require("./GraphSearchResult.js");

var GraphSearchBFS = function()
{

}

GraphSearchBFS.prototype.execute = function(graph,sourceIndex,targetIndex)
{
	var visitedNodeIndexes = _.times(graph.numNodes(),function(index){ return "unvisited"; });
	var nodeParents = _.times(graph.numNodes(),function(index){ return "no_parent_assigned"; });
	var edgeQueue = [];
	var startingEdge = new GraphEdge(sourceIndex,sourceIndex);

	edgeQueue.push(startingEdge);
	visitedNodeIndexes[sourceIndex] = "visited";

	while (edgeQueue.length > 0)
	{
		var curEdge = edgeQueue.shift();

		nodeParents[curEdge.to] = curEdge.from;

		if (curEdge.to == targetIndex)
		{
			return new GraphSearchResult({
				graph: graph,
				nodeParents: nodeParents,
				visitedNodeIndexes: visitedNodeIndexes,
				source: sourceIndex,
				target: targetIndex,
				found: true
			});
		}

		graph.getEdgesFrom(curEdge.to).forEach(function(edgeFrom)
		{
			if (visitedNodeIndexes[edgeFrom.to] == "unvisited")
			{
				edgeQueue.push(edgeFrom);
				visitedNodeIndexes[curEdge.to] = "visited";
			}
		})
	}

	return new GraphSearchResult({
		graph: graph,
		nodeParents: nodeParents,
		visitedNodeIndexes: visitedNodeIndexes,
		source: sourceIndex,
		target: targetIndex,
		found: false
	});
}

module.exports = GraphSearchBFS;