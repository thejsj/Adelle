var body = document.getElementsByTagName("body")[0];

var NodeMapOptions = function() {
	this.charge = -200;
	this.linkDistance = 10;
	this.radius = 8;
	this.alpha = 0.1;	
	if(page_options['size'] == 200){
		this.charge = -58;
		this.linkDistance = 30;
		this.radius = 5.5;
		this.alpha = 0.3;		
	}
	if(page_options['size'] == 400){
		this.charge = -235;
		this.linkDistance = 27;
		this.radius = 6.1;
		this.alpha = 0.3;		
	}
	if(page_options['size'] == 600){
		this.charge = -222;
		this.linkDistance = 22;
		this.radius = 6.8;
		this.alpha = 0.37;		
	}

};

var NodeMap = function(){

	var that = this;

	var width = 200, height = 200;
	if(page_options['size']){
		var width = page_options['size'], height = page_options['size'];
	}
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
			that.tick();
		});

	var svg = d3.select("body").append("svg")
		.attr("width", width)
		.attr("height", height);

	var node = svg.selectAll(".node"),
		link = svg.selectAll(".link");

	this.i = 0;

	this.init = function(){

		$body = $("body"); 
		$body.append('<br><br>');
		for(i in projects){
		
			$body.append("<button \
				id='node-" + projects[i].id + "' \
				class='node-button' \
				data-id='" + projects[i].id + "' \
				style='background-color: " + color(projects[i].id) + "' \
				>" + projects[i].title + "</span>");
		}

		if(page_options['display-all-on-load']){
			for(i in projects){
				that.addNode(projects[i]);
			}
		}
		else {
			$('.node-button').click(function(){
				$(this).addClass('disabled');
				var id = $(this).data('id');
				that.addNode(projects[id]);
			})
		}
	}

	this.start = function() {

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
		try{
			if(_.where(nodes, { id: node_object.id }).length === 0) {
				// Add Node
				var new_node = {
					id: node_object.id,
					title: node_object.title
				};
				nodes.push(new_node);
				this.start();

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
						this.start();
					}
				}
			}
		}
		catch(err){
			console.error("Error - Could Not Add Node");
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

	setInterval(function(){
		force.alpha(node_map_options.alpha);
	}, 100);

	this.init(); 
}

var node_map_options;

window.onload = function() {

	// Start Node Options
	node_map_options = new NodeMapOptions();	

	// Create Node Map
	var node_map = new NodeMap(node_map_options); 

	// Start GUI
	var gui = new dat.GUI();
	var c = [];
	c[c.length] = gui.add(node_map_options, 'charge', -400, 0);
	c[c.length] = gui.add(node_map_options, 'linkDistance', 0, 30);
	c[c.length] = gui.add(node_map_options, 'radius', 0, 16);
	c[c.length] = gui.add(node_map_options, 'alpha', 0, 2);
	for(i in c){
		c[i].onChange(function(value) {
			// Start
			console.log("start");
			node_map.start(); 
		});
	};

	// Bind Key Buttons
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

};



