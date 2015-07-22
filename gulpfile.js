(function () {

    // gulp
    var gulp = require('gulp');
    var plugins = require('gulp-load-plugins')();
    var runSequence = require('run-sequence');
    var del = require('del');
    var addStream = require('add-stream');
    var config = require('./gulpfile.config.js');

    // main tasks
    gulp.task('default', function (callback) {
        runSequence('clean',
                    'lint',
                    ['process-js', 'process-styles', 'move-fonts', 'move-static-content'],
                    'run-server',
                    'watch')
    });

    gulp.task('build', function (callback) {
        runSequence('clean',
                    'lint',
                    ['process-js-dist', 'process-styles-dist', 'move-fonts-dist', 'move-static-content-dist', 'run-server-dist']);
    });

    //component tasks
    gulp.task('watch', watch);
    gulp.task('lint', lint);
    gulp.task('clean', clean);
    gulp.task('run-server', runServer);
    gulp.task('process-styles', processStyles);
    gulp.task('process-styles-dist', processStylesDist);
    gulp.task('process-js', processJs);
    gulp.task('process-js-dist', processJsDist);
    gulp.task('move-fonts', moveFonts);
    gulp.task('move-fonts-dist', moveFontsDist);
    gulp.task('move-static-content', moveStaticContent);
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
        return gulp.src(['src/app/**/*.html', '!src/app/common/templates/index.html'])
            .pipe(plugins.angularTemplatecache())
            .on('error', plugins.util.log);
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
            .pipe(gulp.dest('dev/fonts'))
            .on('error', plugins.util.log);
    }

    function moveFontsDist() {
        return gulp.src(config.fontFiles)
            .pipe(gulp.dest('dist/fonts'))
            .on('error', plugins.util.log);
    }

    function moveStaticContent() {
        return gulp.src(['src/assets/**/*', 'src/app/common/templates/index.html'])
            .pipe(gulp.dest('dev/'))
            .on('error', plugins.util.log);
    }

    function moveStaticContentDist() {
        return gulp.src(['src/assets/**/*', 'src/app/common/templates/index.html'])
            .pipe(gulp.dest('dist/'))
            .on('error', plugins.util.log);
    }

    function runServer() {
        return plugins.connect.server({
            root: 'dev/',
            port: 8888,
            livereload: false,
            fallback: 'dev/index.html',
            host: 'localhost'
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
            .pipe(plugins.jshint.reporter('fail'))
            .on('error', plugins.util.log);
    }

    function clean() {
        process.on('uncaughtException', function (err) {
            console.log(err);
        })

        return del([
            'dist/*',
            'dev/*'
        ]);
    }

    function watch() {
        return gulp
            .watch('src/**/*.*', ['build-dev'])
            .on('error', plugins.util.log);
    }

}());