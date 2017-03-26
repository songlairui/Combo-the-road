var gulp = require('gulp')
var browserSync = require('browser-sync')
var reload = browserSync.reload
var sass = require('gulp-ruby-sass')

gulp.task('sass', function () {
  return sass('scss/styles.scss')
    .pipe(gulp.dest('app/css'))
    .pipe(reload({ stream:true }))
})

gulp.task('serve',['sass'], function(){
  browserSync({
    server: {
      baseDir: 'app'
    }
  })
 gulp.watch(['*.html', 'styles/**/*.css', 'scripts/**/*.js'], {cwd: 'app'}, reload)
})

