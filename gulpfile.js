import gulp from 'gulp';
import browserSync from 'browser-sync';
import cssImport from 'gulp-cssimport';
import { deleteSync } from 'del'

export const html = () => gulp
.src('src/*.html')
.pipe(gulp.dest('dist'))
.pipe(browserSync.stream());

export const css = () => gulp
.src('src/style/style.css')
.pipe(cssImport({
    extensions: ['css'],
}))
.pipe(gulp.dest('dist/css'))
.pipe(browserSync.stream());

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
    gulp.watch('./src/style/style.css', css);
    gulp.watch('./src/script/js.js', js);
    gulp.watch(['./src/picrure/**/*'], copy);
}

export const clear = () => deleteSync('dist/**/*', {forse: true,});
export const base = gulp.parallel(html, css, js, copy);
export const build = gulp.series(clear, base);

export default gulp.series(base, server);