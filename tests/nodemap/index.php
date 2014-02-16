<!DOCTYPE html>
<head>
	<meta charset="utf-8">
	<link href="style.css" rel="stylesheet" >
	<script src="http://d3js.org/d3.v3.min.js"></script>
	<script src="jquery-2.1.0.min.js"></script>
	<script src="underscore.js"></script>
	<script src="dat.gui.min.js"></script>
</head>
<body>
<?php 
	ini_set('display_errors',1);
	ini_set('display_startup_errors',1);
	error_reporting(-1);
?>

	<!-- BODY -->
	<h1>Node Map Test</h1>
	<ul>
		<li>Click on a button below to add a node</li>
		<li>Click on one of the links below to change size, and other options. These are encoded in the url, so you can change them in the url and just hit refresh.</li>
		<li>The options to the right, are not saved, so just copy paste them if you want to save them.</li>
		<li>The colors will probably change</li>
		<li>Click on a node to see the title of that piece</li>
		<li>Click 'View Source' and scroll to the bottom to see all the projects and their respective relationships<li>
	</ul>
	<h2>Some Options</h2>
	<ul>
		<li>
			<a href="?size=600&include-test-links=0&display-all-on-load=0">600px</a>
		</li>
		<li>
			<a href="?size=400&include-test-links=0&display-all-on-load=0">400px</a>
		</li>
		<li>
			<a href="?size=200&include-test-links=0&display-all-on-load=0">200px</a>
		</li>
		<li>
			<a href="?size=200&include-test-links=1&display-all-on-load=0">Include Test Links/Relations Between Projects (Just to see how it looks with more links)</a>
		</li>
		<li>
			<a href="?size=200&include-test-links=0&display-all-on-load=1">Display All Nodes On Load (Don't Have to Click On Them)</a>
		</li>
	</ul>

	<script>
		var page_options = [];
		page_options['size'] = <?php echo (isset($_GET['size']) && $_GET['size'] ? $_GET['size'] : 200); ?>;
		page_options['include-test-links'] = <?php echo (isset($_GET['include-test-links']) && $_GET['include-test-links'] == 1 ? 'true' : 'false' ); ?>;
		page_options['display-all-on-load'] = <?php echo (isset($_GET['display-all-on-load']) && $_GET['display-all-on-load'] == 1 ? 'true' : 'false' ); ?>;
		console.log(page_options);
	</script>
	<script>

	var projects = [{ 
			id : 0,
			title : "Body Space"
		},{
			id : 1,
			title : "Weeping Walls"
		},{
			id : 2,
			title : "Locomotion"
		},{
			id : 3,
			title : "The Wave Hotel"
		},{
			id : 4,
			title : "BoboBall"
		},{
			id : 5,
			title : "Storage String"
		},{
			id : 6,
			title : "Fitness Second"
		},{
			id : 7,
			title : "Man Power Tower"
		},{
			id : 8,
			title : "Jershey Streets"
		},{
			id : 9,
			title : "Body Storminy"
		},{
			id : 10,
			title : "Jazz Festival"
		},{
			id : 11,
			title : "4 Feasts"
		},{
			id : 12,
			title : "Pressing Play"
		},{
			id : 13,
			title : "Free Play"
		},{
			id : 14,
			title : "GeeLab Monthly"
		},{
			id : 15,
			title : "DOHA"
		}];

	var project_relationships = [
		{ source: 0, target: 4},
		{ source: 1, target: 3},
		{ source: 2, target: 7},
		{ source: 3, target: 12},
		{ source: 4, target: 10},
		{ source: 4, target: 11},
		{ source: 5, target: 8},
		{ source: 6, target: 9},
		{ source: 7, target: 11},
		{ source: 7, target: 12},
		{ source: 7, target: 13},
		{ source: 9, target: 12},
		{ source: 12, target: 13}
	];

	// Tests
	if(page_options['include-test-links']){
		var test_relationships = [
			{ source: 6, target: 10},
			{ source: 1, target: 0},
			{ source: 1, target: 7},
			{ source: 6, target: 7},
			{ source: 9, target: 7},
			{ source: 10, target: 7}
		];
		console.log("Concat Test Relationshis");
		console.log(project_relationships.length);
		var project_relationships = project_relationships.concat( test_relationships );
		console.log(project_relationships.length);
	}
	console.log(project_relationships);

	</script>
	<script src="main.js"></script>
</body>