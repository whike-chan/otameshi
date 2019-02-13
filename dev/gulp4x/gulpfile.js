//プラグイン
const gulp = require('gulp'),
	pug = require('gulp-pug'),
	plumber = require('gulp-plumber')//エラー出てもタスク続行
	browserSync = require('browser-sync'),
	lec = require('gulp-line-ending-corrector'),//文字コード,改行コード指定
	notify  = require('gulp-notify'),
	changed  = require('gulp-changed');//変更監視部分指定

//プラグイン - sass
const sass = require('gulp-sass'),
	autoprefixer  = require('gulp-autoprefixer'),
	sassGlob = require('gulp-sass-glob'),//フォルダ単位でインポートできるようにする
	gcmq = require('gulp-group-css-media-queries'),// 複数個所のmedia-queryをグルーピング
	cleanCSS = require('gulp-clean-css');//CSS圧縮

//プラグイン - 画像圧縮
const imgmin = require('gulp-imagemin'),
	imgminPNG = require('imagemin-pngquant'),
	imgminJPG = require('imagemin-jpeg-recompress'),
	imgminGIF = require('imagemin-gifsicle'),
	imgminSVG = require('gulp-svgmin');

//- 変数定義 -//
//各ファイル
const files = {
	'SCSS': ['_resources/sass/**/*.scss', '!_resources/sass/**/_*.scss','_resources/sass/**/*.sass', '!_resources/sass/**/_*.sass'],
	'RE_SCSS': ['_resources/sass/**/_*.scss', '_resources/sass/**/_*.sass'],
	'SCSS_ALL': ['_resources/sass/**/*.scss', '_resources/sass/**/*.sass'],
	'CSS': 'dist/css/**/*.css',
	'PUG': ['_resources/pug/**/*.pug', '!_resources/pug/**/_*.pug'],
	'PUG_ALL': '_resources/pug/**/*.pug',
	'HTML': 'dist/**/*.html',
	'RE_JS': '_resources/js/**/*.js',
	'JS': 'dist/js/**/*.js',
	'IMG': '_resources/img/**/*.+(jpg|jpeg|png|gif|svg)'
}
//各フォルダー
const folder = {
	'IMG': 'dist/img/',
	'CSS': 'dist/css/',
	'HTML': 'dist/',
	'JS': 'dist/js/'
}
//フォルダの位置指定
var place = {
	'PUG': '_resources/pug/'
}

/**
 * sassタスク
 */
gulp.task('sass', () => {
	return gulp.src(files.SCSS)
	.pipe(plumber({
		errorHandler: notify.onError('Error: <%= error.message %>')
	}))
	// Sassのglobを有効にする
	.pipe(sassGlob())
	//CSSに変換
	.pipe(sass.sync().on('error', sass.logError))
	//ベンダープレフィックス付与
	.pipe(autoprefixer({
			browsers: ['last 2 version'],
			cascade: false
	}))
	// 複数個所のmedia-queryを一つにまとめる
	.pipe(gcmq())
	// 改行コード 文字コード指定
	.pipe(lec({verbose:true, eolc: 'CRLF', encoding:'utf8'}))
	// CSSのコンパイル先
	.pipe(gulp.dest(folder.CSS));
});

/**
 * cssタスク
 */
gulp.task('css', () => {
	return gulp.src(files.CSS)
	//圧縮
	// .pipe(cleanCSS())
	// CSSのコンパイル先
	.pipe(gulp.dest(folder.CSS));
});

/**
 * pugタスク
 */
gulp.task('pug', () => {
	return gulp.src(files.PUG)
	//整形
	.pipe(pug({
		//ルート相対パス可
		basedir: place.PUG,
		//整形
		pretty: true
	}))
	// 改行コード 文字コード指定
	.pipe(lec({verbose:true, eolc: 'CRLF', encoding:'utf8'}))
	// htmlのコンパイル先
	.pipe(gulp.dest(folder.HTML));
});

/**
 * jsタスク
 */
gulp.task('js', () => {
	return gulp.src(files.RE_JS)
	// js出力先
	.pipe(gulp.dest(folder.JS));
});

/**
 * Browsersyncタスク
 */
gulp.task('browserSync', () => {
	browserSync.init({
		server: {
			baseDir: folder.HTML,
			index: "index.html"
		}
	});
});

/**
 * ブラウザリロードタスク
 */
gulp.task('bsReload', () => {
	browserSync.reload();
});

/**
 * 画像圧縮タスク
 */
gulp.task('imagemin', () => {
	return gulp.src(files.IMG)
	.pipe(changed(folder.IMG))//変更されたものだけ適用
	.pipe(imgmin([
		imgminPNG({quality: '60-80', speed: 1}),
		imgminJPG(),
		imgminGIF({
			interlaced: false,
			optimizationLevel: 3,
			colors:180
        }),
        imgminSVG()
	]))
	.pipe(imgmin())//pngquantで暗くなる現象対応
	//img出力先
	.pipe(gulp.dest(folder.IMG));
});

/**
 * watch
 */
gulp.task('watch', () => {
	// ファイル変更時
	gulp.watch(files.RE_SCSS, gulp.series('sass','css'));
	gulp.watch(files.CSS, gulp.series(gulp.parallel('bsReload','watch')));
	gulp.watch(files.PUG_ALL, gulp.series('pug'));
	gulp.watch(files.HTML, gulp.series(gulp.parallel('bsReload','watch')));
	gulp.watch(files.RE_JS, gulp.series('js', gulp.parallel('bsReload','watch')));
	gulp.watch(files.IMG, gulp.series('imagemin'));
});

gulp.task('default',
  gulp.series(
		gulp.parallel('sass','pug','js','imagemin'),
		'css',
		gulp.parallel('browserSync','watch'),
		() => {}
	)
);
