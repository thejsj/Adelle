var body = document.getElementsByTagName("body")[0];

var NodeMap = function(){

	var that = this;

	var width = 960, height = 500;
	var color = d3.scale.category10();
	var nodes = [],links = [];
	var color = d3.scale.category20();

	var force = d3.layout.force()
		.nodes(nodes)
		.links(links)
		.charge(-400)
		.linkDistance(20)
		.size([width, height])
		.on("tick", function(){
			that.tick();
		});

	var svg = d3.select("body").append("svg")
		.attr("width", width)
		.attr("height", height);

	var node = svg.selectAll(".node"),
		link = svg.selectAll(".link");

	this.i = 0;

	this.init = function(){
		for(i in projects){
			$body = $("body"); 
			$body.append("<button id='node-" + projects[i].id + "' class='node-button' data-id='" + projects[i].id + "'>" + projects[i].title + "</span>");
		}

		$('.node-button').click(function(){
			var id = $(this).data('id');
			that.addNode(projects[id]);
		})

	}

	this.start = function() {

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
			.attr("r", 8)
			.attr("fill", function(d, i) { return color(i); })
			.on("click", function(d){
				console.log(d.id + " - " + d.title);
			})

		node
			.exit()
			.remove();

		force.start();
	}

	this.tick = function() {
		node
			.attr("cx", function(d) { return d.x; })
			.attr("cy", function(d) { return d.y; })

		link
			.attr("x1", function(d) { return d.source.x; })
			.attr("y1", function(d) { return d.source.y; })
			.attr("x2", function(d) { return d.target.x; })
			.attr("y2", function(d) { return d.target.y; });
	}

	this.addNode = function(node_object){
		console.log(" -- add node -- ");
		try{
			var new_node = {
				id: node_object.id,
				title: node_object.title
			};
			nodes.push(new_node);
			var new_links = _.where(project_relationships, { source: node_object.id });
			var new_links = _.union(new_links, _.where(project_relationships, { target: node_object.id }));
			for(i in new_links){
				if(_.where(nodes, {id: new_links[i].source}).length > 0
				&& _.where(nodes, {id: new_links[i].target}).length > 0 ){
					console.log(' ^ appended link');
					var source = _.where(nodes, {id: new_links[i].source})[0];
					var target = _.where(nodes, {id: new_links[i].target})[0];
					var source_index = _.indexOf(nodes, source);
					var target_index = _.indexOf(nodes, target);
					links.push({source: source_index, target: target_index});
				}
			}
			this.start();
		}
		catch(err){
			console.error("Error");
		}
		
	}

	this.deleteNode = function(){
		nodes.splice(1, 1); // remove b
		links.shift(); // remove a-b
		links.pop(); // remove b-c
		this.start();
	}

	this.print = function(){
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

	this.init(); 
}

var node_map = new NodeMap(); 
var add_node_button = document.getElementById("add-node");
var remove_node_button = document.getElementById("remove-node");

body.onkeypress = function(event){
	if(event.keyCode === 112){
		node_map.print(); 
	}
	else if(event.keyCode === 13){
		node_map.deleteNode(); 
	}
	else {
		console.log(event.keyCode);
	}
}