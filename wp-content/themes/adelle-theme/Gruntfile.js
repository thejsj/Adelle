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
				  'style.css': 'app/scss/style.scss'
				}        
			}
		},
		watch: {
			grunt: { files: ['Gruntfile.js'] },
			sass: {
				files: 'app/scss/**/*.scss',
				tasks: ['sass']
			},
			mustache : {
				files: ['app/templates/*.mustache'],
				tasks: ['mustache', 'watchify']
			},
			watchify: {
				files: [
					'app/js/app/*.js',
					'app/js/classes/*.js',
					'app/js/backbone/*.js',
					'bower_components/foundation/js/**/*.js', 
					'app/js/templates.js'
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
				src: './app/js/app/header.js',
				dest: './dist/js/header.js',
			},
			footer: {
				src: './app/js/app/footer.js',
				dest: './dist/js/footer.js',
			}
		},
		browserify: {
			header: {
				src: './app/js/app/header.js',
				dest: './dist/js/header.js',
			},
			footer: {
				src: './app/js/app/footer.js',
				dest: './dist/js/footer.js',
			}
		},
		mustache: {
			files : {
				src: 'app/templates/',
				dest: 'dist/js/templates.js',
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
					'dist/js/libs/footer-libs.js': [
						'bower_components/foundation/js/foundation/foundation.js',
						'app/js/libs/foundation.reveal.js',
						// 'bower_components/foundation/js/foundation/foundation.tooltip.js',
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
					'dist/js/header.js': ['dist/js/header.js'],
					'dist/js/footer.js': ['dist/js/footer.js'],
				}
			},
			production: {
				options: {
					report : 'gzip',
					preserveComments : false,
					mangle: true,
				},
				files: {
					'dist/js/header.js': ['dist/js/header.js'],
					'dist/js/footer.js': ['dist/js/footer.js'],
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
				src: 'app/images/fav.png',
				dest: './dist/ico'
			}
		},

		copy: {
			images: {
				files: [
					// includes files within path
					{ 
						expand: true, 
						src: ['app/ico/**/*'], 
						dest: 'dist/', 
					},
				]
			}
		}
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
	grunt.loadNpmTasks('grunt-contrib-copy');

	// Production
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');

	// Tasks
	grunt.registerTask('default', ['build','watch']);
	grunt.registerTask('build', ['sass', 'browserify', 'mustache', 'favicons', 'copy']);
	grunt.registerTask('staging', ['build', 'uglify:dependencies', 'uglify:dev']);
	grunt.registerTask('production', ['build', 'uglify', 'cssmin']);
}