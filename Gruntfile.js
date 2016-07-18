/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
      ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
    // Task configuration.
    clean: {
            all: ['dist/hrapp/*', 'dist/**/*','dist/*.*'],
            image: 'dist/hrapp/images',
            css: 'dist/hrapp/css/*',
            html: 'dist/hrapp/**/*'
      },
    copy: {
      src: {
        files: [
          {expand: true, cwd: '.', src: ['*.html','fonts/**/*','sound/**/*'], dest: 'dist/hrapp'}
        ]
      },
      image: {
        files: [
          {expand: true, cwd: '.', src: ['images/*.{png,jpg,jpeg,gif,webp,svg}','images/*/*.{png,jpg,jpeg,gif,webp,svg}'], dest: 'dist/hrapp'}
        ]
      }
    },
    concat: {
      options: {
        banner: '<%= banner %>',
        stripBanners: true
      },
      js: {
        src: [
          'bower_components/jquery/dist/jquery.js',
          'bower_components/Swiper/dist/js/swiper.jquery.js',
          'js/*.js',
          'app.js'],
        dest: 'dist/hrapp/js/app.build.js'
      },
      css:{
        src: [
            'bower_components/bootstrap/dist/css/bootstrap.css',
            'bower_components/animate.css/animate.css',
            'bower_components/Swiper/dist/css/swiper.css',
            'css/*.css'
        ],
        dest: "dist/hrapp/css/app.build.css"
      }
    },
    //压缩JS
    uglify: {
      prod: {
        options: {
          mangle: {
            except: ['require', 'exports', 'module', 'window']
          },
          compress: {
            global_defs: {
              PROD: true
            },
            dead_code: true,
            pure_funcs: [
              "console.log",
              "console.info"
            ]
          }
        },

        files: [{
          expand: true,
          cwd: 'dist/hrapp',
          src: ['js/*.js', '!js/*.min.js'],
          dest: 'dist/hrapp'
        }]
      }
    },

    //压缩CSS
    cssmin: {
      prod: {
        options: {
          report: 'gzip'
        },
        files: [
          {
            expand: true,
            cwd: 'dist/hrapp',
            src: ['css/*.css'],
            dest: 'dist/hrapp'
          }
        ]
      }
    },

    //压缩图片
    imagemin: {
      prod: {
        options: {
          optimizationLevel: 7,
          pngquant: true
        },
        files: [
          {expand: true,
            cwd: 'dist/hrapp',
            src: ['images/*.{png,jpg,jpeg,gif,webp,svg}','images/**/*.{png,jpg,jpeg,gif,webp,svg}'],
            dest: 'dist/hrapp'}
        ]
      }
    },
    // 处理html中css、js 引入合并问题
    usemin: {
      html: 'dist/hrapp/*.html'
    },

    //压缩HTML
    htmlmin: {
      options: {
        removeComments: true,
        removeCommentsFromCDATA: true,
        collapseWhitespace: true,
        collapseBooleanAttributes: true,
        removeAttributeQuotes: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeOptionalTags: true
      },
      html: {
        files: [
          {expand: true, cwd: 'dist/hrapp', src: ['*.html'], dest: 'dist/hrapp'}
        ]
      }
    }

  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-usemin');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  // Default task.
  grunt.registerTask('default', ['prod']);
  grunt.registerTask('prod', [
    'copy',                 //复制文件
    'concat',               //合并文件
    'imagemin',             //图片压缩
    'cssmin',               //CSS压缩
    'uglify',               //JS压缩
    'usemin',               //HTML处理
    'htmlmin'               //HTML压缩
  ]);
  grunt.registerTask('default', ['prod']);
  grunt.registerTask('publish', ['clean', 'prod']);
};

