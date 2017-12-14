var $  = require("gulp-load-plugins")();
import gulp from "gulp";
import cssmin from "gulp-clean-css";
/*添加任务 使用es6语法 进行书写js文件*/
import browserify from "browserify";
import babelify from "babelify";
import source from "vinyl-source-stream";
import es from "event-stream";

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

/*打包less*/
gulp.task("less",function(){
	gulp.src("src/css/*.less").pipe($.less()).pipe(cssmin()).pipe(gulp.dest("./dist/css"));
})

/*把需要使用es6支持的js文件写入路径，并使用相应插件进行任务流的写入编译为es5*/
gulp.task("es6",function(){
	var entries = [{
		entry:"./src/js/es6/index.js",
		source:"./js/index.js"
	},{
		entry:"./src/js/es6/page.js",
		source:"./js/page.js"
	}];
	var tasks = entries.map(function(entry){
		return browserify({
				entries: entry["entry"],
		        debug: true
			})
			.transform(babelify.configure({presets:['es2015']}))
		    .bundle()
		    .pipe(source(entry["source"]))
		    .pipe(gulp.dest('./dist'));	
	})
	return es.merge.apply(null, tasks);
})

/*压缩打包后的编译的es6文件*/
gulp.task("ug_es6",["es6"],function(){
	gulp.src("./dist/js/*.js").pipe($.uglify()).pipe(gulp.dest("./dist/js"));
})

/*压缩打包正常的js文件*/
gulp.task("script",function(){
	gulp.src("./src/js/*.js").pipe($.uglify()).pipe(gulp.dest("./dist/js"));
})

/*创建本地服务器，进行监听*/
gulp.task("http",function(){
	$.connect.server({
		root:"dist",//映射到dist目录下，直接监视生成的文件，由于文件自动生成，因此只要src文件发生变化，原文件也会发生变化，从而触发自动刷新
		port:1200,//窗口：localhost:1200
		livereload: true
	})
})

/*reload*/
gulp.task("reload",function(){
	gulp.src("src/**/*").pipe($.connect.reload());
})

gulp.task("default",function(){
	gulp.run("index","html","css","script","http","es6","ug_es6","less");
	/*监控src下的所有文件，只要发生改变就会执行重新编码*/
	gulp.watch("src/**/*",function(){
		gulp.run("index","html","css","script","reload","es6","ug_es6","less");
	})
})