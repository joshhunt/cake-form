const http = require('http');

const gulp = require('gulp');
const stylus = require('gulp-stylus');
const rename = require('gulp-rename');
const finalhandler = require('finalhandler');
const serveStatic = require('serve-static');

gulp.task('serve', () => {
  const serve = serveStatic('./');

  const server = http.createServer((req, res) => {
    serve(req, res, finalhandler(req, res));
  });

  server.listen(3000);
  console.log('==> Serving on localhost:3000');
});

gulp.task('scripts', () => {
  return gulp.src('./scripts/**.js')
    .pipe(gulp.dest('./dist'));
});

gulp.task('styles', () => {
  return gulp.src('./styles/_index.styl')
    .pipe(stylus())
    .pipe(rename('styles.css'))
    .pipe(gulp.dest('./dist'));
});

gulp.task('watch', () => {
  gulp.watch('./styles/**.styl', ['styles']);
  gulp.watch('./scripts/**.js', ['scripts']);
});

gulp.task('default', ['styles', 'scripts', 'serve', 'watch']);
