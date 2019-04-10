module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        concat: {
            options: {
                separator: ""
            },
            polyfillJs: {
                src: ["src/core/foundation.js", "src/polyfill/**/*.js"],
                dest: "dist/polyfill.js"
            },
            coreJs: {
                src: [
                    "src/core/foundation.js",
                    "src/core/lodash.js",
                    // 'src/core/mvc/**/*.js',
                    "src/core/base.js",
                    "src/core/ob.js",
                    "src/core/widget.js",
                    // 'src/core/model.js',
                    // 'src/core/view.js',
                    "src/core/shortcut.js",
                    "src/core/utils/**/*.js",
                    "src/core/behavior/behavior.js",
                    "src/core/wrapper/layout.js",
                    "src/core/plugin.js",
                    "src/core/**/*.js",

                    "src/data/data.js",
                    "src/data/**/*.js"
                ],
                dest: "dist/core.js"
            },

            // 最基础的控件
            baseJs: {
                src: [
                    "src/third/**/*.js",
                    "src/base/pane.js",
                    "src/base/single/single.js",
                    "src/base/single/text.js",
                    "src/base/single/button/button.basic.js",
                    "src/base/single/button/button.node.js",
                    "src/base/single/tip/tip.js",
                    "src/base/combination/group.button.js",
                    "src/base/combination/tree.button.js",
                    "src/base/tree/ztree/treeview.js",
                    "src/base/tree/ztree/asynctree.js",
                    "src/base/tree/ztree/parttree.js",
                    "src/base/**/*.js"
                ],
                dest: "dist/base.js"
            },
            // 实现好的一些基础实例
            caseJs: {
                src: [
                    "src/case/combo/popup.bubble.js",
                    "src/case/**/*.js"
                ],
                dest: "dist/case.js"
            },
            widgetJs: {
                src: [
                    "src/widget/**/*.js",
                    "src/component/**/*.js"
                ],
                dest: "dist/widget.js"
            },
            routerJs: {
                src: [
                    "src/router/**/*.js"
                ],
                dest: "dist/router.js"
            },
            coreCss: {
                src: ["src/css/core/**/*.css", "src/css/theme/**/*.css"],
                dest: "dist/core.css"
            },
            coreWithoutNormalizeCss: {
                src: ["src/css/core/**/*.css", "src/css/theme/**/*.css", "!src/css/core/normalize.css", "!src/css/core/normalize2.css"],
                dest: "dist/core_without_normalize.css"
            },
            baseCss: {
                src: ["src/css/base/**/*.css"],
                dest: "dist/base.css"
            },
            widgetCss: {
                src: ["src/css/widget/**/*.css"],
                dest: "dist/widget.css"
            },
            resourceCss: {
                src: ["src/css/resource/**/*.css"],
                dest: "dist/resource.css"
            },

            bundleJs: {
                src: ["dist/core.js", "dist/fix/fix.js", "dist/base.js", "dist/case.js", "dist/widget.js", "dist/fix/fix.compact.js", "dist/router.js", "public/js/**/*.js", "public/js/index.js", "i18n/i18n.cn.js"],
                dest: "dist/bundle.js"
            },

            versionFineuiJs: {
                src: ["dist/bundle.js"],
                dest: "dist/2.0/fineui.js"
            },

            bundleIEJs: {
                src: ["dist/core.js", "dist/fix/fix.ie.js", "dist/base.js", "dist/case.js", "dist/widget.js", "dist/fix/fix.compact.ie.js", "dist/router.js", "public/js/**/*.js", "public/js/index.js", "i18n/i18n.cn.js"],
                dest: "dist/bundle.ie.js"
            },

            versionFineuiIEJs: {
                src: ["dist/bundle.ie.js"],
                dest: "dist/2.0/fineui.ie.js"
            },

            bundleCss: {
                src: ["dist/core.css", "dist/base.css", "dist/widget.css", "public/css/app.css", "public/css/**/*.css"],
                dest: "dist/bundle.css"
            },

            versionFineuiCss: {
                src: ["dist/bundle.css"],
                dest: "dist/2.0/fineui.css"
            },

            fineuiJs: {
                src: ["dist/polyfill.js", "dist/core.js", "dist/fix/fix.js", "dist/base.js",
                    "dist/case.js", "dist/widget.js", "dist/router.js", "dist/fix/fix.compact.js", "ui/js/**/*.js"],
                dest: "dist/fineui.js"
            },

            fineuiIEJs: {
                src: ["dist/polyfill.js", "dist/core.js", "dist/fix/fix.ie.js", "dist/base.js",
                    "dist/case.js", "dist/widget.js", "dist/router.js", "dist/fix/fix.compact.ie.js", "ui/js/**/*.js"],
                dest: "dist/fineui.ie.js"
            },

            fineuiWithoutJqueryAndPolyfillJs: {
                src: ["src/core/foundation.js",
                    "src/core/lodash.js",
                    // 'src/core/mvc/**/*.js',
                    "src/core/base.js",
                    "src/core/ob.js",
                    "src/core/widget.js",
                    // 'src/core/model.js',
                    // 'src/core/view.js',
                    "src/core/shortcut.js",
                    "src/core/utils/*.js",
                    "src/core/behavior/behavior.js",
                    "src/core/wrapper/layout.js",
                    "src/core/plugin.js",
                    "src/core/**/*.js",
                    "!src/core/platform/web/**/*.js",

                    "src/data/data.js",
                    "src/data/**/*.js",

                    "dist/fix/fix.js",
                    "src/base/pane.js",
                    "src/base/single/single.js",
                    "src/base/single/text.js",
                    "src/base/single/button/button.basic.js",
                    "src/base/single/button/button.node.js",
                    "src/base/single/tip/tip.js",
                    "src/base/combination/group.button.js",
                    "src/base/combination/tree.button.js",
                    "src/base/combination/map.button.js",
                    "src/base/**/*.js",
                    "!src/base/tree/ztree/**/*.js",
                    "!src/base/single/input/file.js",

                    "src/case/combo/popup.bubble.js",
                    "src/case/**/*.js",
                    "!src/case/colorchooser/**/*.js",
                    "!src/case/tree/ztree/**/*.js",

                    "dist/widget.js", "dist/fix/fix.compact.js", "ui/js/**/*.js"],
                dest: "dist/fineui_without_jquery_polyfill.js"
            },

            fineuiCss: {
                src: ["dist/core.css", "dist/base.css", "dist/widget.css", "ui/css/app.css", "ui/css/**/*.css"],
                dest: "dist/fineui.css"
            },

            configJs: {
                src: ["demo/version.js", "i18n/i18n.cn.js"],
                dest: "dist/config.js"
            },
            demoJs: {
                src: ["demo/app.js", "demo/js/**/*.js", "demo/config.js"],
                dest: "dist/demo.js"
            },
            demoCss: {
                src: ["demo/css/**/*.css"],
                dest: "dist/demo.css"
            },
            utilsJs: {
                src: [
                    "src/core/foundation.js",
                    "src/core/lodash.js",
                    "src/core/var.js",
                    "src/core/func/array.js",
                    "src/core/func/number.js",
                    "src/core/func/string.js",
                    "src/core/func/date.js",
                    "src/core/func/function.js",
                    "src/core/base.js",
                    "src/core/ob.js",
                    "src/core/alias.js",
                    "src/core/inject.js",
                    "src/core/i18n.js",
                    "src/core/utils/*.js",
                    "i18n/i18n.cn.js",
                    "_mobile/date.i18n.cn.js",
                    "src/data/data.js",
                    "src/data/**/*.js"
                ],
                dest: "dist/utils.js"
            }
        },


        less: {
            demo: {
                expand: true,
                cwd: "demo/less",
                src: ["**/*.less"],
                dest: "demo/css/",
                ext: ".css"
            },
            main: {
                expand: true,
                cwd: "public/less",
                src: ["**/*.less"],
                dest: "public/css",
                ext: ".css"
            },
            ui: {
                expand: true,
                cwd: "ui/less",
                src: ["**/*.less"],
                dest: "ui/css",
                ext: ".css"
            },
            src: {
                expand: true,
                cwd: "src/less",
                src: ["**/*.less"],
                dest: "src/css",
                ext: ".css"
            },
            dev: {
                options: {
                    compress: true,
                    yuicompress: false
                }
            }
        },

        uglify: {
            options: {
                banner: "/*! <%= pkg.name %> <%= grunt.template.today(\"yyyy-mm-dd HH:MM:ss\") %> */\n"
            },
            dist: {
                files: {
                    "dist/bundle.min.js": ["<%= concat.bundleJs.dest %>"],
                    "dist/bundle.ie.min.js": ["<%= concat.bundleIEJs.dest %>"],
                    "dist/utils.min.js": ["<%= concat.utilsJs.dest %>"],
                    "dist/fineui.min.js": ["<%= concat.fineuiJs.dest %>"],
                    "dist/fineui.ie.min.js": ["<%= concat.fineuiIEJs.dest %>"],
                    "dist/2.0/fineui.min.js": ["<%= concat.versionFineuiJs.dest %>"],
                    "dist/2.0/fineui.ie.min.js": ["<%= concat.versionFineuiIEJs.dest %>"]
                }
            }
        },

        cssmin: {

            bundleCss: {

                src: "<%= concat.bundleCss.dest %>",

                dest: "dist/bundle.min.css"

            },
            fineuiCss: {

                src: "<%= concat.fineuiCss.dest %>",

                dest: "dist/fineui.min.css"

            },

            versionFineuiMinCss: {
                src: "<%= concat.versionFineuiCss.dest %>",

                dest: "dist/2.0/fineui.min.css"
            }
        },

        jshint: {
            files: ["Gruntfile.js", "src/**/*.js"],
            options: {
                globals: {
                    jQuery: true,
                    console: true,
                    module: true,
                    document: true
                }
            }
        },
        copy: {
            js: {
                files: [
                    {
                        expand: true,
                        cwd: "dist",
                        src: [
                            "fineui.js"
                        ],
                        dest: "dist/",
                        rename: function (dest, src) {
                            return dest + src.replace(".js", ".min.js");
                        }
                    }
                ]
            }
        },
        watch: {
            scripts: {
                files: ["src/**/*.js", "src/**/*.less", "demo/js/**/*.js", "demo/app.js", "demo/version.js", "demo/config.js", "demo/less/**/*.less"],
                tasks: ["less", "concat"],
                options: {
                    spanw: true,
                    interrupt: true
                }
            },
            livereload: {
                options: {
                    livereload: "<%= connect.options.livereload %>"
                },
                files: ["src/**/*.js", "src/**/*.less"]
            }
        },
        connect: {
            options: {
                port: 9000,
                open: true,
                livereload: 35729,
                // Change this to '0.0.0.0' to access the server from outside
                hostname: "0.0.0.0"
            },
            server: {
                options: {
                    port: 9001
                }
            }
        },
        clean: ["src/css", "demo/css"]
    });

    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks("grunt-contrib-less");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-contrib-concat");
    grunt.loadNpmTasks("grunt-contrib-cssmin");
    grunt.loadNpmTasks("grunt-contrib-connect");
    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks("grunt-contrib-copy");

    var defaultTask = ["clean", "less", "concat", "connect", "watch"];
    grunt.registerTask("default", defaultTask);
    grunt.registerTask("compile", function () {
        grunt.config.set("connect.options.open", false);
        grunt.task.run(defaultTask);
    });
    grunt.registerTask("build", ["clean", "less", "cssmin", "concat", "uglify"]);
    grunt.registerTask("fake-build", ["clean", "less", "cssmin", "concat", "copy"]);
};
