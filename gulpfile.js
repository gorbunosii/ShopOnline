import gulp from 'gulp';
import browserSync from 'browser-sync';
import * as sassPkg from 'sass'
import gulpSass from 'gulp-sass';
import cssImport from 'gulp-cssimport';
import { deleteSync } from 'del';
import htmlmin from 'gulp-htmlmin';
import cleanCSS from 'gulp-clean-css';
import terser from 'gulp-terser';
import concat from 'gulp-concat';
import sourcemaps from 'gulp-sourcemaps';
import gulpImg from 'gulp-image';
import gulpWebp from 'gulp-webp';
import gulpAvif from 'gulp-avif';
import {stream as critical} from 'critical';
import gulpIf from 'gulp-if';

const prepros = true;

let dev = false;

const sass = gulpSass(sassPkg);

const  allJS = [
    "src/libs/jquery-3.7.1.min.js",
    "src/libs/jquery-ui.min.js",
    "src/script/js.js",
];

export const html = () => gulp
.src('src/*.html')
.pipe(htmlmin({
    removeComments: true,
    collapseWhitespace: true,
}))
.pipe(gulp.dest('dist'))
.pipe(browserSync.stream());

export const style = () => {
    if (prepros) {
        return gulp
            .src('src/style/**/*.scss')
            .pipe(gulpIf(dev, sourcemaps.init()))
            .pipe(sass().on('error', sass.logError))
            .pipe(cleanCSS({
                2: {specialComments: 0,}
            }))
            .pipe(gulpIf(dev,sourcemaps.write('../maps')))
            .pipe(gulp.dest('dist/css'))
            .pipe(browserSync.stream());
    }
    return gulp
    .src('src/style/style.css')
    .pipe(gulpIf(dev,sourcemaps.init()))
    .pipe(cssImport({
        extensions: ['css'],
    }))
    .pipe(cleanCSS({
        2: {specialComments: 0,}
    }))
    .pipe(gulpIf(dev,sourcemaps.write('../maps')))
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.stream());
}

export const js = () => gulp
.src([...allJS, 'src/script/**/*.js'])
.pipe(gulpIf(dev,sourcemaps.init()))
.pipe(terser())
.pipe(concat(`index.min.js`))
.pipe(gulpIf(dev,sourcemaps.write('../maps')))
.pipe(gulp.dest('dist/js'))
.pipe(browserSync.stream());

export const img = () => gulp
.src('src/picture/**/*')
.pipe(gulpIf(!dev, gulpImg({
    optipng: ['-i 1', '-strip all', '-fix', '-o7', '-force'],
    pngquant: ['--speed=1', '--force', 256],
    zopflipng: ['-y', '--lossy_8bit', '--lossy_transparent'],
    jpegRecompress: ['--strip', '--quality', 'medium', '--min', 40, '--max', 80],
    mozjpeg: ['-optimize', '-progressive'],
    gifsicle: ['--optimize'],
    svgo: true,
  })))
.pipe(gulp.dest('dist/picture'))
.pipe(browserSync.stream({
    once: true,
}));

export const webp = () => gulp
.src('src/picture/**/*')
.pipe(gulpWebp({
    quality: 60,
}))
.pipe(gulp.dest('dist/picture'))
.pipe(browserSync.stream());

export const avif = () => gulp
.src('src/picture/**/*')
.pipe(gulpAvif({
    quality: 50,
}))
.pipe(gulp.dest('dist/picture'))
.pipe(browserSync.stream());

export const critCSS = () => gulp
.src('dist/*.html')
.pipe(critical({
    base: 'dist/',
    inline: true,
    css: ['dist/css/style.css']
}))
.on('error', err => {
    console.error(err.massange)
})
.pipe(gulp.dest('dist'))

export const copy = () => gulp
.src([
    'src/fonts/**/*',
], {
    base: 'src'
})
.pipe(gulp.dest('dist'))
.pipe(browserSync.stream({
    once: true,
}));

export const server = () => {
    browserSync.init({
        ui: false,
        notify: false,
        server: {
            baseDir: 'dist',
        },
    });

    gulp.watch('src/*.html', html);
    gulp.watch(prepros ? 'src/style/**/*.scss' : 'src/style/**/*.css', style);
    gulp.watch('src/picture/**/*', img);
    gulp.watch('src/script/js.js', js);
    gulp.watch('src/fonts/**/*', copy);
    gulp.watch('src/picture/**/*', webp);
    gulp.watch('src/picture/**/*', avif);
}

export const develop = async() => {
    dev = true;
};
export const clear = () => deleteSync('dist/**/*', {forse: true,});
export const base = gulp.parallel(html, style, js, img, webp, avif, copy);
export const build = gulp.series(clear, base, critCSS);

export default gulp.series(develop, base, server);