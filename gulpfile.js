const babel = require('gulp-babel')
const autoprefixer = require('gulp-autoprefixer')
const csso = require('gulp-csso')
const del = require('del')
const gulp = require('gulp')
const htmlmin = require('gulp-htmlmin')
const runSequence = require('run-sequence')
const uglify = require('gulp-uglify-es').default
const sass = require('gulp-sass')
const pug = require('gulp-pug')
const watch = require('gulp-watch')
const browserSync = require('browser-sync').create()
const rename = require('gulp-rename')
const concat = require('gulp-concat')
const inject = require('gulp-inject')

var AUTOPREFIXER_BROWSERS = [
  'ie >= 10',
  'ie_mob >= 10',
  'ff >= 30',
  'chrome >= 34',
  'safari >= 7',
  'opera >= 23',
  'ios >= 7',
  'android >= 4.4',
  'bb >= 10'
]

const paths = {
  jsFiles: './src/js/*.js',
  jsDest: './dist/js',
  cssDest: './dist/styles',
  cssDev: './src/styles/**/*.css'
}

// Inject in development mode
gulp.task('inject', function() {
  return gulp
    .src('./src/*.html')
    .pipe(inject(gulp.src(paths.cssDev), { relative: true }))
    .pipe(inject(gulp.src('./src/js/*.js'), { relative: true }))
    .pipe(gulp.dest('./src/tmp/'))
})


// dev-mode SASS process.
gulp.task('sass', function() {
  return gulp
    .src('./src/styles/sass/*.sass')
    .pipe(sass())
    .on('error', function(err) {
      console.log(err.toString())

      this.emit('end')
    })
    .pipe(gulp.dest('./src/styles/'))
    .pipe(
      browserSync.reload({
        stream: true
      })
    )
})


gulp.task('watch', ['browserSync', 'sass', 'pug'], function() {
  gulp.watch('src/styles/sass/*.sass', ['sass'])
  gulp.watch('src/pug/*pug', ['pug'])
  gulp.watch('src/*.html').on('change', browserSync.reload)
  gulp.watch('src/js/**/*.js').on('change', browserSync.reload)
})

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'src'
    },
    notify: false
  })
})

gulp.task('pug', function() {
  return gulp
    .src('./src/includes/*.pug')
    .pipe(
      pug({
        doctype: 'html',
        pretty: true
      })
    )
    .pipe(gulp.dest('./src'))
})
