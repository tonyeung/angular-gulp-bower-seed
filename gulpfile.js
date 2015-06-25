(function () {

// gulp
var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var del = require('del');
var addStream = require('add-stream');
var config = require('./gulpfile.config.js');

// default task
gulp.task('default', [ 'watch']);

// build tasks
gulp.task('build-dev', ['process-js','process-styles', 'move-fonts', 'move-static-content']);
gulp.task('build-dist', ['process-js-dist', 'process-styles-dist', 'move-fonts-dist', 'move-static-content-dist', 'run-server-dist']);

// dependent tasks
gulp.task('watch', ['run-server'], watch);
gulp.task('run-server', ['build-dev'], runServer);
gulp.task('run-server-dist', ['build-dist'], runServer);
gulp.task('lint', ['clean'], lint);
gulp.task('clean', clean);

    //component tasks
gulp.task('process-styles', ['lint'], processStyles);
gulp.task('process-styles-dist', processStylesDist);
gulp.task('process-js', ['lint'], processJs);
gulp.task('process-js-dist', processJsDist);
gulp.task('move-fonts', ['lint'], moveFonts);
gulp.task('move-fonts-dist', moveFontsDist);
gulp.task('move-static-content', ['lint'], moveStaticContent);
gulp.task('move-static-content-dist', moveStaticContentDist);
gulp.task('run-server-dist', runServerDist);

function processJs() {
    return gulp.src(config.jsFiles)
        .pipe(plugins.ngAnnotate())
        .pipe(addStream.obj(prepareTemplates()))
        .pipe(plugins.concat('app.js'))
        .pipe(gulp.dest('dev/js/'))
        .on('error', plugins.util.log);
}

function processJsDist() {
    return gulp.src(config.jsFiles)
        .pipe(plugins.ngAnnotate())
        .pipe(addStream.obj(prepareTemplates()))
        .pipe(plugins.concat('app.js'))
        .pipe(plugins.uglify())
        .pipe(gulp.dest('dist/js/'))
        .on('error', plugins.util.log);
}

function prepareTemplates() {
    return gulp.src('src/content/templates/**/*.html')
      .pipe(plugins.angularTemplatecache());
}

function processStyles() {
    return gulp.src(config.lessFiles)
        .pipe(plugins.less())
        .pipe(plugins.addSrc.prepend(config.cssFiles))
        .pipe(plugins.concat('app.css'))
        .pipe(gulp.dest('dev/css/'))
        .on('error', plugins.util.log);
}

function processStylesDist() {
    return gulp.src(config.lessFiles)
        .pipe(plugins.less())
        .pipe(plugins.addSrc.append(config.cssFiles))
        .pipe(plugins.concat('app.css'))
        .pipe(plugins.minifyCss({ keepSpecialComments: 0 }))
        .pipe(gulp.dest('dist/css/'))
        .on('error', plugins.util.log);
}

function moveFonts() {
    return gulp.src(config.fontFiles)
		.pipe(gulp.dest('dev/fonts'));
}

function moveFontsDist() {
    return gulp.src(config.fontFiles)
		.pipe(gulp.dest('dist/fonts'));
}

function moveStaticContent() {
    return gulp.src(['src/content/**/*', '!src/content/{templates,templates/**,styles,styles/**}'])
        .pipe(gulp.dest('dev/'));
}

function moveStaticContentDist() {
    return gulp.src(['src/content/**/*', '!src/content/{templates,templates/**,styles,styles/**}'])
		.pipe(gulp.dest('dist/'));
}

function runServer() {
    return plugins.connect.server({
        root: 'dev/',
        port: 8888,
        livereload: true
    });
}

function runServerDist() {
    return plugins.connect.server({
        root: 'dist/',
        port: 9999
    });
}

function lint() {
    return gulp.src('src/app/**/*.js')
      .pipe(plugins.jshint())
      .pipe(plugins.jshint.reporter('jshint-stylish'))
      .pipe(plugins.jshint.reporter('fail'));
}

function clean() {
    return del([
        'dist/*',
        'dev/*'
    ]);
}

function watch() {
    gulp.watch('src/**/*.*', ['build-dev']);
}

}());