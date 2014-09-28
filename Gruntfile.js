module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),

    notify: {
      jasmine_node: {
        options: {
          title: "Unit tests complete"
        }
      },

      cucumberjs: {
        options: {
          title: "Acceptance tests complete"
        }
      }
    },

    watch: {
      unit: {
        files: [
          "lib/*.js", "lib/consecution/*.js",
          "spec/*.js", "spec/**/*.js"
        ],
        tasks: ["jasmine_node"]
      },

      acceptance: {
        files: [
          "index.js", "lib/*.js", "lib/consecution/*.js",
          "features/*.feature", "features/step_definitions/*.js"
        ],
        tasks: ["cucumberjs"]
      }
    },

    jasmine_node: {
      options: {
        forceExit: true,
        match: ".",
        matchall: false,
        extensions: "js",
        specNameMatcher: "spec",
        jUnit: {
          report: true,
          savePath: "./build/reports/jasmine/",
          useDotNotation: true,
          consolidate: true
        }
      },
      all: ["spec/"]
    },

    cucumberjs: {
      src: 'features',
      options: {
        steps: "features/step_definitions"
      }
    }
  });

  require("matchdep").filterDev(["grunt-*", "!grunt-cli"]).forEach(grunt.loadNpmTasks);

  grunt.registerTask("default", ["test"]);
  grunt.registerTask("test", ["jasmine_node", "cucumberjs"]);
  grunt.registerTask("unit", ["watch:unit", "notify:unit"]);
  grunt.registerTask("acceptance", ["watch:acceptance", "notify:acceptance"]);
};
