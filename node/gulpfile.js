var gulp = require('gulp');
var args = require('yargs')
    .default('env', 'dev')
    .argv;

var $ = require('gulp-load-plugins')({lazy: true});

var forever = require('forever-monitor');
var browserify = require('browserify');
var source = require('vinyl-source-stream');

var buildSource = './../src/';
var buildTarget = './build/';

gulp.task('clean', function () {
    
    return gulp.src('./build/', {read: false})
        .pipe($.clean());
});


/****************************************
* Main Build Task
****************************************/

gulp.task('build', ['html-build', 'js-vendor-build', 'asset-build'], function() {
    
    log('Bundling js files into game.js');
    
    return browserify(buildSource + 'js/game.js')
        .bundle()
        .pipe(source('game.js'))
        .pipe(gulp.dest(buildTarget + 'js/'));
});

gulp.task('html-build', [], function() {
    
    log('Copying html files');

    return gulp
        .src(buildSource + 'index.html')
        .pipe(gulp.dest(buildTarget));
});

gulp.task('js-vendor-build', [], function() {
    
    log('Copying Javascript vendor files');

    return gulp
        .src(buildSource + 'js/vendor/*.js')
        .pipe(gulp.dest(buildTarget + 'js/vendor/'));
});

gulp.task('asset-build', [], function() {
    
    log('Copying asset files');

    return gulp
        .src(buildSource + 'assets/*')
        .pipe(gulp.dest(buildTarget + 'assets/'));
});


/****************************************
* Serve Tasks
****************************************/

gulp.task('serve', [], function () {
    
    var script = 'server.js';
    
    var child = new (forever.Monitor)(
        script, 
        {
            env: {
                'PORT': 8080,
                'NODE_ENV': 'dev'
            },
            max: 10,
            silent: false,
            watch: false
        });
    
    child.on('restart', function() {
        log('Restarting.');
    });
    
    child.start();
    
    return gulp.watch(['build/index.html'], function(event) {
        
        log('File ' + event.path + ' was ' + event.type);

        child.restart();
    });
    
});



/****************************************
* Utility Functions
****************************************/

function log (msg) {
    
    if(typeof(msg) === 'object') {
        for(var item in msg) {
            if(msg.hasOwnProperty(item)) {
                $.util.log($.util.colors.blue(msg[item]));
            }
        }
    }
    else {
        $.util.log($.util.colors.blue(msg));
    }
}
