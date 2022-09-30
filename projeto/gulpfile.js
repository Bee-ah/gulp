const gulp =require('gulp')
const concat = require('gulp-concat')
const cssmin = require('gulp-cssmin')
const rename = require('gulp-rename')
const uglify = require('gulp-uglify')
const image = require('gulp-imagemin')
function tarefaCSS(cb){
   return  gulp.src([ 
    './node_modules/bootstrap/dist/css/bootstrap.css',
   './vendor/owl/dist/assets/owl.carousel.css' ,
   './vendor/jquery-ui-1.13.2.custom/jquery-ui.css',
   './node_modules/@fortawesome/fontawesome-free/css/fontawesome.css',
    'css/style.css'                              ])
        .pipe(concat('styles.css'))
        .pipe(cssmin())
        .pipe(rename({suffix:'.min'}))
        .pipe(gulp.dest('./dist/css'))//metodos que fazem o tratamento de gulp, precisa passar o parâmetro


}
function tarefaJS(){
    return gulp.src(['node_modules/jquery/dist/jquery.js',
        'vendor/jquery-ui-1.13.2.custom/jquery-ui.js',
    './vendor/jquerymask/jquery.mask.js',
        './js/custom.js'  , 
     './node_modules/bootstrap/dist/js/bootstrap.js' ,
     './vendor/owl/dist/owl.carousel.js'
                                   ])
    .pipe(concat('scripts.js'))
    .pipe(uglify())
    .pipe(rename({suffix:'.min'}))
    .pipe(gulp.dest('./dist/js'))
}
function tarefaImagem(){
    return gulp.src('./images/*')
    .pipe(image({
        pngquant: true,
        optipng: false,
        zopflipng:true,
        jpegRecompress : false,
        mozjpeg: true,
        gifsicle:true,
        svgo: true,
        concurrent:10,
        quiet:true

    }))
    .pipe(gulp.dest('./dist/images'))
}


exports.styles = tarefaCSS
exports.scripts = tarefaJS
exports.imagens = tarefaImagem 