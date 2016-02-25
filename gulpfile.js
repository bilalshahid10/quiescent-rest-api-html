/**
 * Load all the plugins
 */
var 
	gulp = require( 'gulp' ),
	htmlmin = require( 'gulp-htmlmin' ),
	sass = require( 'gulp-ruby-sass' ),
	uglify = require( 'gulp-uglify' ),
	concat = require( 'gulp-concat' ),
	sourcemaps = require( 'gulp-sourcemaps' ),
	imagemin = require( 'gulp-imagemin' ),
	svgmin = require( 'gulp-svgmin' ),
	changed = require( 'gulp-changed' );



/**
 * Organizing file paths
 */
var
	src = 'src/',
	dest = 'dist/',

	html = {
		src: src,
		dest: dest
	},

	css = {
		src: src + 'scss/',
		dest: dest + 'css/'
	},

	js = {
		src: src + 'js/',
		fileList: ['src/js/vendor/jquery.min.js', 'src/js/vendor/what-input.min.js', 'src/js/foundation.js', "src/js/vendor/angular.js", "src/js/vendor/angular-resource.js", "src/js/vendor/angular-route.js", "src/js/vendor/angular-sanitize.js", "src/js/vendor/loading-bar.js", 'src/js/app.js'],
		dest: dest + 'js/'
	},

	img = {
		src: src + 'img/',
		dest: dest + 'img/'
	};



/**
 * Preparing HTML
 */
gulp.task( 'build-html', function() {
	return gulp.src( html.src + '**/*.html' )
		.pipe( changed( html.dest ) )
		.pipe( htmlmin({removeComments: true, collapseWhitespace: true}) )
		.pipe( gulp.dest( html.dest ) );
});



/**
 * Preparing CSS
 */
gulp.task( 'build-css', function() {
	return sass( 'src/scss/app.scss', {sourcemap: true, style: 'compressed'} )
		.pipe( sourcemaps.write( '/' ) )
		.pipe( gulp.dest( css.dest ) );
});



/**
 * Preparing JavaScript
 */
gulp.task( 'build-js', function() {
	return gulp.src( js.fileList )
		.pipe( sourcemaps.init() )
		.pipe( concat( 'main.js' ) )
		.pipe( uglify() )
		.pipe( sourcemaps.write( '/' ) )
		.pipe( gulp.dest( js.dest ) );
});



/**
 * Optimize images
 */
gulp.task( 'optimize-images', function() {
	return gulp.src( img.src + '*' )
		.pipe( changed( img.dest ) )
		.pipe( imagemin( {progressive: true} ) )
		.pipe( gulp.dest( img.dest ) );
});



/**
 * Optimize SVGs
 */
gulp.task( 'optimize-svg', function() {
	return gulp.src( img.src + '*.svg' )
		.pipe( svgmin() )
		.pipe( gulp.dest( img.dest ) );
});



/**
 * The default task
 */
gulp.task( 'default', ['build-html', 'build-css', 'build-js', 'optimize-images', 'optimize-svg'], function() {
	gulp.watch( html.src + '**/*.html', ['build-html'] );
	gulp.watch( css.src + '*.scss', ['build-css'] );
	gulp.watch( js.src + '**/*.js', ['build-js'] );
	gulp.watch( img.src + '**/*', ['optimize-images'] );
	gulp.watch( img.src + '*.svg', ['optimize-svg'] );
});