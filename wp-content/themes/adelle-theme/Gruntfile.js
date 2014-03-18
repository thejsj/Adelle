module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		// CSS & Sass

		sass: {
			options: {
				includePaths: ['bower_components/foundation/scss']
			},
			dist: {
				options: {
				  outputStyle: 'expanded'
				},
				files: {
				  'styles.css': 'scss/app.scss'
				}        
			}
		},
		watch: {
			grunt: { files: ['Gruntfile.js'] },
			sass: {
				files: 'scss/**/*.scss',
				tasks: ['sass']
			}
		},

		// Javascript

		browserify: {
			header: {
				src: 'js/app/header.js',
				dest: 'js/header.js',
				options: {
					transform: ['debowerify', 'decomponentify', 'deamdify', 'deglobalify'],
				},
			},
			footer: {
				src: 'js/app/footer.js',
				dest: 'js/footer.js',
				options: {
					transform: ['debowerify', 'decomponentify', 'deamdify', 'deglobalify'],
				},
			}
		},

		// For Production

		uglify: {
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
				dest: 'style.css',
				ext: '.css'
			}
		},
	});

	// CSS & Sass
	grunt.loadNpmTasks('grunt-sass');

	// Javascript
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-browserify');

	// Images
	grunt.loadNpmTasks('grunt-favicons');

	// Production
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');

	// Tasks
	grunt.registerTask('default', ['build','watch']);
	grunt.registerTask('build', ['sass', 'browserify']);
	grunt.registerTask('deploy', ['sass', 'browserify','uglify', 'cssmin']);
}