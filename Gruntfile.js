module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.initConfig({
        concat: {
            options: {
                separator: ';',
            },
            dist: {
                src: ['src/cache.js', 'src/cache_local.js', 'src/cache_session.js'],
                dest: 'dist/cache.js',
            },
        },

        uglify: {
            dist: {
                files: {
                    'dist/cache.min.js': ['dist/cache.js']
                }
            }
        }
    })


    grunt.registerTask('default', ['prod'])
    grunt.registerTask('prod', ['concat', 'uglify::dist'])

}
