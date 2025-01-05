const { series, src, dest, parallel, watch } = require("gulp");
const browsersync = require("browser-sync");
const concat = require("gulp-concat");
const cleanCSS = require("clean-css");
const del = require("del");
const fileinclude = require("gulp-file-include");
const imagemin = require("gulp-imagemin");
const npmdist = require("gulp-npm-dist");
const newer = require("gulp-newer");
const rename = require("gulp-rename");
const sourcemaps = require("gulp-sourcemaps");
const sass = require("gulp-sass")(require("sass"));
const uglify = require("gulp-uglify");
const postcss = require('gulp-postcss');
const autoprefixer = require("autoprefixer");
const gulpautoprefixer = require("gulp-autoprefixer");
const tailwindcss = require('tailwindcss');

const paths = {
    baseSrc: "src/",                         // source directory
    baseDist: "dist/",                       // build directory
    baseSrcAssets: "src/assets/",            // source assets directory
    baseDistAssets: "dist/assets/",          // build assets directory
    configTailwind: "./tailwind.config.js",  // tailwind.config.js file
};

const clean = function (done) {
    del.sync(paths.baseDist, done());
};

const vendor = function () {
    const out = paths.baseDistAssets + "libs/";
    return src(npmdist(), { base: "./node_modules" })
        .pipe(rename(function (path) {
            path.dirname = path.dirname.replace(/\/dist/, '').replace(/\\dist/, '');
        }))
        .pipe(dest(out));
};

const html = function () {
    const srcPath = paths.baseSrc + "/";
    const out = paths.baseDist;
    return src([
        srcPath + "*.html",
        srcPath + "*.ico", // favicons
        srcPath + "*.png",
    ])
        .pipe(
            fileinclude({
                prefix: "@@",
                basepath: "@file",
                indent: true,
            })
        )
        .pipe(dest(out));
};

const data = function () {
    const out = paths.baseDistAssets + "data/";
    return src(paths.baseSrcAssets + "data/**/*")
        .pipe(dest(out));
};

const fonts = function () {
    const out = paths.baseDistAssets + "fonts/";
    return src(paths.baseSrcAssets + "fonts/**/*")
        .pipe(newer(out))
        .pipe(dest(out));
};

const images = function () {
    var out = paths.baseDistAssets + "images";
    return src(paths.baseSrcAssets + "images/**/*")
        .pipe(newer(out))
        .pipe(imagemin())
        .pipe(dest(out));
};

const javascript = function () {
    const out = paths.baseDistAssets + "js/";

    // copying and minifying all other js
    return src(paths.baseSrcAssets + "js/**/*.js")
        .pipe(dest(out))
        .pipe(uglify())
        .pipe(rename({ suffix: ".min" }))
        .pipe(dest(out));
};

const style = function () {
    const out = paths.baseDistAssets + "css/";

    return src(paths.baseSrcAssets + "scss/*.scss")
        .pipe(sourcemaps.init())
        .pipe(sass.sync()) // scss to css
        .pipe(postcss([
            tailwindcss(paths.configTailwind),
            autoprefixer()
        ]))
        .pipe(dest(out))
        .on("data", function (file) {
            const buferFile = new cleanCSS({ compatibility: "*", inline: ["all"], level: 2, }).minify(file.contents);
            return (file.contents = Buffer.from(buferFile.styles));
        })
        .pipe(rename({ suffix: ".min" }))
        .pipe(sourcemaps.write("./"))
        .pipe(dest(out));
};


// live browser loading
const initBrowserSync = function (done) {
    const startPath = "/";
    const redirectPath = startPath === "/" ? "/index-2.html" : startPath;
    browsersync.init({
        startPath: redirectPath,
        server: {
            baseDir: paths.baseDist,
            middleware: [
                function (req, res, next) {
                    req.method = "GET";
                    next();
                },
            ],
        },
    });
    done();
}

const reloadBrowserSync = function (done) {
    browsersync.reload();
    done();
}

function watchFiles() {
    watch(paths.baseSrc + "**/*.html", series([html, style], reloadBrowserSync));
    watch(paths.baseSrcAssets + "data/**/*", series(data, reloadBrowserSync));
    watch(paths.baseSrcAssets + "fonts/**/*", series(fonts, reloadBrowserSync));
    watch(paths.baseSrcAssets + "images/**/*", series(images, reloadBrowserSync));
    watch(paths.baseSrcAssets + "js/**/*", series(javascript, reloadBrowserSync));
    watch([paths.baseSrcAssets + "scss/**/*.scss", paths.configTailwind], series(style, reloadBrowserSync));
}

// Producaton Tasks
exports.default = series(
    html,
    vendor,
    parallel(data, fonts, images, javascript, style),
    parallel(watchFiles, initBrowserSync)
);

// Clean Tasks
exports.clean = series(
    clean
);

// Build Tasks
exports.build = series(
    clean,
    html,
    vendor,
    parallel(data, fonts, images, javascript, style)
);