var fs = require('fs'),
    gulp = require('gulp'),
    estarify = require('gulp-estarify');

gulp.task('estarify',function(){
  var jsxPath = __dirname+'/<%= src_dir %>/*.jsx';
  return gulp.src(jsxPath)
    .pipe(estarify({encoding:'utf8'}))
    .pipe(gulp.dest('<%= out_dir %>'));
});
