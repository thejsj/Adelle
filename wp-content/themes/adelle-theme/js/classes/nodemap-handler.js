var d3 = require('d3');

var NodeMap;

(function($){

	NodeMap = function( projects, node_map_options ){

		console.log( projects, node_map_options );

		var body = document.getElementsByTagName("body")[0];

		var self = {}, __self = {};

		var width = 250, height = 250;

		var color = d3.scale.category10();
		var nodes = [],links = [];
		var color = d3.scale.category20();

		var force = d3.layout.force()
			.nodes(nodes)
			.links(links)
			.charge(node_map_options.charge)
			.linkDistance(node_map_options.linkDistance)
			.size([width, height])
			.on("tick", function(){
				self.tick();
			});

		var svg = d3.select("body").append("svg")
			.attr("width", width)
			.attr("height", height);

		var node = svg.selectAll(".node"),
			link = svg.selectAll(".link");

		self.i = 0;

		self.init = function(){
			projects.forEach(function(project){
				console.log( project );
				console.log( project.get('ID') );
				console.log( project.get('post_title') );
				console.log( project.get('available') );
			});
		}

		self.start = function() {

			force
				.charge(node_map_options.charge)
				.linkDistance(node_map_options.linkDistance)

			link = link.data(force.links(), function(d) { 
				return d.source.id + "-" + d.target.id; 
			});

			link
				.enter()
				.insert("line", ".node")
				.attr("class", "link");

			link
				.exit()
				.remove();

			node = node.data(force.nodes(), function(d) { return d.id;});

			node
				.enter()
				.append("circle")
				.attr("class", function(d) { 
					return "node " + d.id; })
				.attr("r", node_map_options.radius)
				.attr("fill", function(d, i) { return color(d.id); })
				.on("click", function(d){
					console.log(d.id + " - " + d.title);
					alert(d.id + " - " + d.title);
				})

			node
				.exit()
				.remove();

			node
				.attr("r", node_map_options.radius);

			force.start();
		}

		self.tick = function() {
			node
				.attr("cx", function(d) { return d.x; })
				.attr("cy", function(d) { return d.y; })

			link
				.attr("x1", function(d) { return d.source.x; })
				.attr("y1", function(d) { return d.source.y; })
				.attr("x2", function(d) { return d.target.x; })
				.attr("y2", function(d) { return d.target.y; });
		}

		self.addNode = function(node_object){
			try{
				if(_.where(nodes, { id: node_object.id }).length === 0) {
					// Add Node
					var new_node = {
						id: node_object.id,
						title: node_object.title
					};
					nodes.push(new_node);
					self.start();

					// Find Links
					var new_links = _.where(project_relationships, { source: node_object.id });
					var new_links = _.union(new_links, _.where(project_relationships, { target: node_object.id }));
					for(i in new_links){
						if(_.where(nodes, {id: new_links[i].source}).length > 0
						&& _.where(nodes, {id: new_links[i].target}).length > 0 ){
							var source = _.where(nodes, {id: new_links[i].source})[0];
							var target = _.where(nodes, {id: new_links[i].target})[0];
							var source_index = _.indexOf(nodes, source);
							var target_index = _.indexOf(nodes, target);
							links.push({source: source_index, target: target_index});
							self.start();
						}
					}
				}
			}
			catch(err){
				console.error("Error - Could Not Add Node");
			}
		}

		self.deleteNode = function(){
			nodes.splice(1, 1); // remove b
			links.shift(); // remove a-b
			links.pop(); // remove b-c
			self.start();
		}

		self.print = function(){
			console.log("nodes:");
			console.log(nodes);
			console.log("links:");
			console.log(links);
		}

		function spliceLinksForNode(node) {
			toSplice = links.filter(function(l) { 
				return (l.source === node) || (l.target === node); 
			});
			toSplice.map(function(l) {
				links.splice(links.indexOf(l), 1); 
			});
		}

		setInterval(function(){
			force.alpha(node_map_options.alpha);
		}, 100);

		self.init(); 
		return self; 
	}
})(jQuery);

module.exports = NodeMap; 

