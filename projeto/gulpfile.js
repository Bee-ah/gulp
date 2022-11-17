const {parallel , series} = require ('gulp')
const gulp =require('gulp')
const concat = require('gulp-concat')
const cssmin = require('gulp-cssmin')
const rename = require('gulp-rename')
const uglify = require('gulp-uglify')
const image = require('gulp-imagemin')
const htmlmin = require('gulp-htmlmin')
const clean = require('gulp-clean')
const babel = require('gulp-babel')
const browserSync = require('browser-sync').create()
const reload = browserSync.reload
const sass = require('gulp-sass')(require('node-sass'))

function tarefaCSS(cb){
    gulp.src([ 
    './node_modules/bootstrap/dist/css/bootstrap.css',
   './vendor/owl/dist/assets/owl.carousel.css' ,
   './vendor/jquery-ui-1.13.2.custom/jquery-ui.css',
   './node_modules/@fortawesome/fontawesome-free/css/fontawesome.css'                              ])//mudou o caminho do diretório

        .pipe(concat('libs.css'))//mescla arquivos
        .pipe(cssmin())//minifica css
        .pipe(rename({suffix:'.min'}))//libs.min.css
        .pipe(gulp.dest('./dist/css'))//metodos que fazem o tratamento de gulp, precisa passar o parâmetro
     cb()    

}
function tarefaJS(callback){
    gulp.src(['node_modules/jquery/dist/jquery.js',
        'vendor/jquery-ui-1.13.2.custom/jquery-ui.js',
    './vendor/jquerymask/jquery.mask.js',
        './src/js/custom.js'  , //mudou o caminho da pasta
     './node_modules/bootstrap/dist/js/bootstrap.js' ,
     './vendor/owl/dist/owl.carousel.js'
                                   ])

    .pipe(babel({
            comments:false, //remove comentários
            presets : ['@babel/env']
        }))                               
    .pipe(concat('scripts.js'))
    .pipe(uglify())
    .pipe(rename({suffix:'.min'}))
    .pipe(gulp.dest('./dist/js'))
    callback()
}
function tarefaImagem(){
    return gulp.src('./src/images/*')//mudança docaminho do diretório
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
//tratameto de arquivo html
function tarefaHTML(callback){
    gulp.src('./src/**/*.html')
    .pipe(htmlmin({collapseWhitespace : true }))
    .pipe(gulp.dest('./dist'))
    return callback()// permite realizar várias tarefas em cascata
}

function tarefaSASS(cb){
    gulp.src('./src/scss/**/*.scss')
    .pipe(sass())//transforma sass para css
    .pipe(gulp.dest('./dist/css'))
    cb()
}


gulp.task('server',function(){
    browserSync.init({
        server:{
            baseDir:"./dist"
        } //objeto com parametro server
    })
    //a cada alteração da pasta dist, já altera o servidor
    gulp.watch('./src/**/*').on('change',process) // repete o processo quando altera algo em src
    gulp.watch('./src/**/*').on('change',reload)

})

exports.html = tarefaHTML
exports.sass = tarefaSASS
exports.styles = tarefaCSS
exports.scripts = tarefaJS
exports.imagens = tarefaImagem 
const process =series(tarefaHTML, tarefaJS, tarefaCSS)
//para atualizar com a mudança no src
exports.default =process// operações executadas simultaneamente
//o ideal é usar clean , deu erro: the following task did not complete, did you forget to signal async