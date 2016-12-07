var glob = require("glob");

module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-postcss');

    grunt.initConfig({
        clean: ["build"],
        copy: {
            main: {
                expand: true,
                cwd: 'css/',
                src: '*.css',
                dest: 'build/'
            },
        },
        postcss: {
            options: {
                map: true,
                processors: [
                    require('autoprefixer')({
                        browsers: ['last 10 version']
                    })
                ]
            }
        },
        autoprefixLoop: []
    });

    grunt.registerTask('prepareAutoprefixer', function() {
        var files = glob.sync("build/*.css"); // you can use lodash to chunckify
        
        grunt.config('autoprefixLoop', files);
        
        console.log('add autoprefixLoop', files);
    });
    
    grunt.registerMultiTask('autoprefixLoop', function() {
        grunt.config('postcss.dist.src', this.data);
        
        console.log('CHANGEEEE',grunt.config('postcss.dist.src'));

        grunt.task.run('postcss');
    });

    grunt.registerTask('default', ['clean','copy', 'prepareAutoprefixer', 'autoprefixLoop']);
}