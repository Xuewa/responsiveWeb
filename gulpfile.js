/**
 * Created by Administrator on 2016/11/14 0014.
 */
var gulp=require('gulp');
var rev=require('gulp-rev');//index中引用的动态资源文件名称改变，使用哈希码
var revReplace=require('gulp-rev-replace');//替换index中引用的名称
var useref=require('gulp-useref');
var filter=require('gulp-filter');//过滤
var uglify=require('gulp-uglify');//压缩js代码
var csso=require('gulp-csso');//压缩css代码

gulp.task('default',function(){
   var jsFilter=filter('**/*.js',{restore:true});
   var cssFilter=filter('**/*.css',{restore:true});
   var indexHtmlFilter=filter(['**/*','!**/index.html'],{restore:true});

   return gulp.src('src/index.html')
       .pipe(useref())
       .pipe(jsFilter)
       .pipe(uglify())
       .pipe(jsFilter.restore)
       .pipe(cssFilter)
       .pipe(csso())
       .pipe(cssFilter.restore)
       .pipe(indexHtmlFilter)
       .pipe(rev())
       .pipe(indexHtmlFilter.restore)
       .pipe(revReplace())
       .pipe(gulp.dest('dist'));

});
