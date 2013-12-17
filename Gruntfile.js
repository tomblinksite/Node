module.exports = function(grunt) {
	
	var cssFiles = [
		'css/base.css',
		'css/layout.css',
		'css/modules.css',
		'css/state.css'
	];
	
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		
		cssmin: {
			options:{
				banner:'/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
			},
			combine: {
				files: {					
					'public/css/<%= pkg.name %>.min.css': cssFiles
				}
			}
		}

	});
	
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	
	grunt.registerTask('default', ['cssmin']);
	
	grunt.registerTask('buildcss', ['cssmin']);
	
};