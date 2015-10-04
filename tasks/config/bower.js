/**
 * Install bower components.
 *
 * ---------------------------------------------------------------
 *
 * Installs bower components and copies the required files into the assets folder structure.
 *
 */

module.exports = function(grunt) {

	grunt.config.set('bower', {
		dev: {
			dest: 'assets/vendor'/*,
			js_dest: '.tmp/public/js',
			css_dest: '.tmp/public/styles'*/
		}
	});

	grunt.loadNpmTasks('grunt-bower');
};
