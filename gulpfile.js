import gulp from 'gulp';
import browserSync from 'browser-sync';
import sassPkg from 'sass';
import gulpSass from 'gulp-sass';
import cssImport from 'gulp-cssimport';
import { deleteSync } from 'del';

const prepros = true;

const sass = gulpSass(sassPkg);

export const html = () => gulp
.src('src/*.html')
.pipe(gulp.dest('dist'))
.pipe(browserSync.stream());

export const style = () => {
    if (prepros) {
        return gulp
            .src('src/style/**/*.scss')
            .pipe(sass().on('error', sass.logError))
            .pipe(gulp.dest('dist/css'))
            .pipe(browserSync.stream());
    }
    return gulp
    .src('src/style/style.css')
    .pipe(cssImport({
        extensions: ['css'],
    }))
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.stream());
}

export const js = () => gulp
.src('src/script/js.js')
.pipe(gulp.dest('dist/js'))
.pipe(browserSync.stream());

const copy = () => gulp
.src([
    'src/picture/**/*'
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

    gulp.watch('./src/*.html', html);
    gulp.watch(prepros ? './src/style/**/*.scss' : './src/style/**/*.css', style);
    gulp.watch('./src/script/js.js', js);
    gulp.watch(['./src/picrure/**/*'], copy);
}

export const clear = () => deleteSync('dist/**/*', {forse: true,});
export const base = gulp.parallel(html, style, js, copy);
export const build = gulp.series(clear, base);

export default gulp.series(base, server);