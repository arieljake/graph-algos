
var _ = require("underscore");
var GraphEdge = require("./GraphEdge.js");
var GraphSearchResult = require("./GraphSearchResult.js");

var GraphSearchDFS = function()
{

}

GraphSearchDFS.prototype.execute = function(graph,sourceIndex,targetIndex)
{
	var visitedNodeIndexes = _.times(graph.numNodes(),function(index){ return "unvisited"; });
	var nodeParents = _.times(graph.numNodes(),function(index){ return "no_parent_assigned"; });
	var edgeStack = [];
	var startingEdge = new GraphEdge(sourceIndex,sourceIndex);

	edgeStack.push(startingEdge);

	while (edgeStack.length > 0)
	{
		var curEdge = edgeStack.pop();

		nodeParents[curEdge.to] = curEdge.from;
		visitedNodeIndexes[curEdge.to] = "visited";

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
				edgeStack.push(edgeFrom);
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

module.exports = GraphSearchDFS;