var D3 = require('d3');
var _  = require('underscore');

var NodeMap;

(function($){

	NodeMap = function( projects, node_map_options ){

		var self = {}, __self = {};

		__self.project_relationships = [];
		__self.width = 170, __self.height = 170;

		__self.nodes = [],__self.links = [];

		var force = D3.layout.force()
			.nodes(__self.nodes)
			.links(__self.links)
			.charge(node_map_options.get('charge'))
			.linkDistance(node_map_options.get('linkDistance'))
			.size([__self.width, __self.height])
			.on("tick", function(){
				__self.tick();
			});

		var svg = D3.select("body").append("svg")
			.attr("width", __self.width)
			.attr("height", __self.height)
			.attr("id", "node_map");

		var node = svg.selectAll(".node"),
			link = svg.selectAll(".link");

		__self.init = function(){

			projects.forEach(function(project, i){
				project.set('id', i);
			});

			// Add Project Relationships
			projects.forEach(function(project){
				// Get related projects, by project IDs
				var related_projects = _.clone( project.get('related_projects') );

				// Substitute the project ID by the local id (index), used by D3
				for( var i = 0; i < related_projects.length; i++ ){
					var related_project = projects.findWhere( { ID: related_projects[i] } );
					related_projects[i] = related_project.get('id');
				}

				// Generate a list of all project relationships
				for( var i = 0; i < related_projects.length; i++ ){
					var existing_links = _.where(__self.project_relationships, { 
						source: project.get('id'), 
						target: related_projects[i]
					});
					var existing_links = _.union(existing_links, _.where(__self.project_relationships, { 
						source: related_projects[i], 
						target: project.get('id')
					}));
					// If this link doesn't exists, create it
					if( existing_links.length === 0 ){
						__self.project_relationships.push({
							source: project.get('id'), 
							target: related_projects[i]
						})
					}
				}
			});

			// Add available nodes
			projects.forEach(function(project, i){
				if( project.get('available') ){
					self.addNode( project.get('ID') );
				}
			});
		}

		__self.start = function() {

			force
				.charge(node_map_options.get('charge'))
				.linkDistance(node_map_options.get('linkDistance'))

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

			node = node.data(force.nodes(), function(d) { return d.id; });

			node
				.enter()
				.append("circle")
				.attr("r", node_map_options.get('radius'))
				.attr("fill", function(d) { return d.model.get('color'); })
				.on("click", function(d){
					document.location = d.model.get('permalink');
				})

			node
				.exit()
				.remove();

			node
				.attr("class", function(d) { 
					return "node node-" + d.id + " viewed-" + d.model.get('viewed') + " currently-viewing-" + d.model.get('currently_viewing'); 
				})
				.attr("r", function(d){
					var radius = node_map_options.get('radius');
					if( d.model.get('currently_viewing') ){
						return radius * 1.2;
					}
					else if( d.model.get('viewed') ){
						return radius;
					}
					else {
						return radius * 0.8;
					}
				});

			force.start();
		}

		__self.tick = function() {
			node
				.attr("cx", function(d) { return d.x; })
				.attr("cy", function(d) { return d.y; })

			link
				.attr("x1", function(d) { return d.source.x; })
				.attr("y1", function(d) { return d.source.y; })
				.attr("x2", function(d) { return d.target.x; })
				.attr("y2", function(d) { return d.target.y; });
		}

		self.addNode = function( node_id ){
			var node_object = projects.findWhere( { ID: node_id } );

			try {
				if( _.where(__self.nodes, { id: node_object.id }).length === 0) {
					// Add Node
					var new_node = {
						id: node_object.get('id'),
						model: node_object
					};

					__self.nodes.push(new_node);
					__self.start();
					// Find Links
					var new_links = _.where(__self.project_relationships, { source: node_object.id });
					var new_links = _.union(new_links, _.where(__self.project_relationships, { target: node_object.id }));

					for(i in new_links){
						if(_.where(__self.nodes, {id: new_links[i].source}).length > 0
						&& _.where(__self.nodes, {id: new_links[i].target}).length > 0 ){

							var source = _.where(__self.nodes, {id: new_links[i].source})[0];
							var target = _.where(__self.nodes, {id: new_links[i].target})[0];
							
							var source_index = _.indexOf(__self.nodes, source);
							var target_index = _.indexOf(__self.nodes, target);
							__self.links.push({source: source_index, target: target_index});
							__self.start();
						}
					}
				}
			}
			catch(err){
				console.error("Error - Could Not Add Node");
			}
		}

		self.deleteNode = function(){
			__self.nodes.splice(1, 1); // remove b
			__self.links.shift(); // remove a-b
			__self.links.pop(); // remove b-c
			__self.start();
		}

		self.update = function(){
			__self.start();
		}

		setInterval(function(){
			force.alpha(node_map_options.get('alpha'));
		}, 100);

		__self.init(); 
		return self; 
	}
})(jQuery);

module.exports = NodeMap; 

