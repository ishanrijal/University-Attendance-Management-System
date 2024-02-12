const sass = require("node-sass");

module.exports = function (grunt) {
  //Configuration
  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),
    sass: {
      options: {
        implementation: sass,
        sourceMap: true,
      },
      build: {
        files: [
          {
            src: "./src/assets/scss/index.scss",
            dest: "./src/assets/css/style.css",
          },
        ],
      },
    },
    watch: {
      sass: {
        files: ["./src/assets/scss/*.scss", "./src/assets/scss/*/*.scss"],
        tasks: ["sass"],
      },
    },
  });

  //Load Plugins

  grunt.loadNpmTasks("grunt-sass"); //compile sass
  grunt.loadNpmTasks("grunt-contrib-watch"); //watch changes in sass files

  //Register Tasks
  grunt.registerTask("default", ["watch", "sass"]);
};
