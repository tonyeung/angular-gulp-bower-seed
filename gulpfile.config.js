'use strict';

module.exports = {

    jsFiles: [
        'bower_components/jquery/dist/jquery.js',
        'bower_components/bootstrap/dist/js/bootstrap.js',
        'bower_components/angular/angular.js',
        'bower_components/angular-animate/angular-animate.js',
        'bower_components/angular-route/angular-route.js',
        'bower_components/angular-messages/angular-messages.js',
        'bower_components/angular-sanitize/angular-sanitize.js',
        'src/app/app.js',
        'src/app/**/*.js',
    ],

    cssFiles: [
        'bower_components/bootstrap/dist/css/bootstrap.css',
        'bower_components/bootstrap/dist/css/bootstrap-theme.css',
        'bower_components/animate.css/animate.css',
        'bower_components/fontawesome/css/font-awesome.css'
    ],

    lessFiles: [
        'src/app/**/*.less'
    ],

    fontFiles: [
        'bower_components/bootstrap/dist/fonts/**/*.*',
        'bower_components/fontawesome/fonts/**/*.*'
    ],

    imgFiles: [
        '/src/assets/imgs/**/*'
    ]

}