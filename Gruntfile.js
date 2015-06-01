module.exports = function (grunt) {
    'use strict';

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        clean: {
            unzip: ['modules'],
            modules: ['example/modules'],
            app: ['example/build']
        },
        titanium: {
            ios: {
                options: {
                    command: 'build',
                    logLevel: 'debug',
                    projectDir: './example',
                    platform: 'ios'
                }
            }
        },
        titaniumifier: {
            module: {
                src: '.',
                dest: '.'
            }
        },
        unzip: {
            module: {
                src: 'com.magana.betteroptiondialog-commonjs-<%= pkg.version %>.zip',
                dest: 'example'
            }
        }
    });


    // "Add this line to your Gruntfile which will run grunt.loadNpmTasks on
    // each grunt plugin found in your package.json."
    // http://chrisawren.com/posts/Advanced-Grunt-tooling
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);


    grunt.registerTask('build', ['titaniumifier:module']);
    grunt.registerTask('test', ['unzip:module', 'titanium:ios', 'clean:unzip']);
    grunt.registerTask('ios', ['clean', 'build', 'test']);
    grunt.registerTask('default', ['ios']);
};
