/*
* @Author: Administrator
* @Date:   2017-12-13 11:35:52
* @Last Modified by:   Administrator
* @Last Modified time: 2017-12-13 12:11:44
*/
var gulp = require("gulp");
var cssmin = require("gulp-clean-css");
var uglify = require("gulp-uglify");
var connect = require("gulp-connect");
/*任务1 打包index.html到dist文件夹根目录下*/
gulp.task("index",function(){
	gulp.src("src/index.html").pipe(gulp.dest("./dist"));
})


/*任务2 打包文件html下的所有html页面到dist的子文件夹html下*/
gulp.task("html",function(){
	gulp.src("src/html/*.html").pipe(gulp.dest("./dist/html"));
})


/*打包css文件 到dist的css文件夹中 并且进行压缩*/
gulp.task("css",function(){
	gulp.src("src/css/*.css").pipe(cssmin()).pipe(gulp.dest("./dist/css"));
})

/*打包js文件 到dist的js文件夹中，进行压缩*/
gulp.task("script",function(){
	gulp.src("src/js/*.js").pipe(uglify()).pipe(gulp.dest("./dist/js"));
})

/*创建本地服务器，进行监听*/
gulp.task("http",function(){
	connect.server({
		root:"dist",//映射到dist目录下，直接监视生成的文件，由于文件自动生成，因此只要src文件发生变化，原文件也会发生变化，从而触发自动刷新
		port:1200,//窗口：localhost:1200
		livereload: true
	})
})

/*reload*/
gulp.task("reload",function(){
	gulp.src("src/**/*").pipe(connect.reload());
})

gulp.task("default",function(){
	gulp.run("index","html","css","script","http");
	/*监控src下的所有文件，只要发生改变就会执行重新编码*/
	gulp.watch("src/**/*",function(){
		gulp.run("index","html","css","script","reload");
	})
})