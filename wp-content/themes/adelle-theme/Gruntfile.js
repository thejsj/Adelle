module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		// CSS & Sass

		sass: {
			options: {
				includePaths: ['bower_components/foundation/scss', require('node-bourbon').includePaths ]
			},
			dist: {
				options: {
				  outputStyle: 'expanded'
				},
				files: {
				  'style.css': 'scss/style.scss'
				}        
			}
		},
		watch: {
			grunt: { files: ['Gruntfile.js'] },
			sass: {
				files: 'scss/**/*.scss',
				tasks: ['sass']
			},
			mustache : {
				files: ['templates/*.mustache'],
				tasks: ['mustache', 'watchify']
			},
			watchify: {
				files: [
					'js/app/*.js',
					'js/classes/*.js',
					'js/backbone/*.js',
					'bower_components/foundation/js/**/*.js', 
					'js/templates.js'
				],
				tasks: ['watchify']
			},
			options: {
				livereload: true,
			},
		},

		// Javascript

		watchify: {
			header: {
				src: './js/app/header.js',
				dest: './js/header.js',
			},
			footer: {
				src: './js/app/footer.js',
				dest: './js/footer.js',
			}
		},
		browserify: {
			header: {
				src: './js/app/header.js',
				dest: './js/header.js',
			},
			footer: {
				src: './js/app/footer.js',
				dest: './js/footer.js',
			}
		},
		mustache: {
			files : {
				src: 'templates/',
				dest: 'js/templates.js',
				options: {
					prefix: 'Templates = ',
					postfix: '; \nmodule.exports = Templates;',
					verbose: true
				}
			}
		},

		// For Production

		uglify: {
			dependencies: {
				options: {
					report : 'gzip',
					compress: true,
					preserveComments : false,
					mangle: true,
				},
				files: {
					'js/libs/footer-libs.js': [
						'bower_components/foundation/js/foundation/foundation.js',
						'js/libs/foundation.reveal.js',
						'bower_components/jquery.cookie/jquery.cookie.js'
					],
				}
			},
			dev: {
				options: {
					beautify: true,
					compress: false,
					preserveComments : 'all',
					banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
        				'<%= grunt.template.today("yyyy-mm-dd") %> */',
        			mangle: false,
				},
				files: {
					'js/header.js': ['js/header.js'],
					'js/footer.js': ['js/footer.js'],
				}
			},
			production: {
				options: {
					report : 'gzip',
					preserveComments : false,
					mangle: true,
				},
				files: {
					'js/header.js': ['js/header.js'],
					'js/footer.js': ['js/footer.js'],
				}
			}
		},
		cssmin: {
			minify: {
				expand: true,
				cwd: './',
				src: ['style.css'],
				dest: './',
				ext: '.css'
			}
		},
		favicons: {
			options: {
				debug: true,
				windowsTile: false,
			},
			icons: {
				src: 'images/fav.png',
				dest: './ico'
			}
		},
	});

	// CSS & Sass
	grunt.loadNpmTasks('grunt-sass');

	// Javascript
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-watchify');
	grunt.loadNpmTasks('grunt-browserify');
	grunt.loadNpmTasks('grunt-mustache');

	// Images
	grunt.loadNpmTasks('grunt-favicons');

	// Production
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');

	// Tasks
	grunt.registerTask('default', ['build','watch']);
	grunt.registerTask('build', ['sass', 'browserify', 'mustache', 'favicons']);
	grunt.registerTask('staging', ['build', 'uglify:dependencies', 'uglify:dev']);
	grunt.registerTask('production', ['build', 'uglify', 'cssmin']);
}