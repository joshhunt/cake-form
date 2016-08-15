const http = require('http');

const gulp = require('gulp');
const stylus = require('gulp-stylus');
const rename = require("gulp-rename");
const finalhandler = require('finalhandler');
const serveStatic = require('serve-static');

gulp.task('serve', () => {
  const serve = serveStatic('./');

  const server = http.createServer((req, res) => {
    serve(req, res, finalhandler(req, res));
  });

  server.listen(3000);
});

gulp.task('styles', function () {
  return gulp.src('./styles/_index.styl')
    .pipe(stylus())
    .pipe(rename('styles.css'))
    .pipe(gulp.dest('./dist'));
});

gulp.task('watch', () => {
  gulp.watch('./styles/**.styl', ['styles']);
});