# grunt-wavy [![Build Status](https://travis-ci.org/matthewgovaere/grunt-wavy.svg?branch=master)](https://travis-ci.org/matthewgovaere/grunt-wavy)

> Convert [Wavy](http://wavy.it) to HTML

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-wavy --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-wavy');
```

## The "wavy" task

### Overview
In your project's Gruntfile, add a section named `wavy` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  wavy: {
    options: {
      config: 'your_config.wavy'
    },
    files: {
      'output-path': ['your-template.html.wavy']
    },
  },
});
```

### Options

#### options.config (Required)
Type: `String`

A string to the path of your main Wavy configuration file.

### Usage Examples

#### Default Options
In this example, the configuration file is set to `site.wavy`, and `home.html.wavy` will get compiled to `build/templates/home.html`.

```js
grunt.initConfig({
  wavy: {
    options: {
      config: 'site.wavy'
    },
    files: {
      'build/templates': ['home.html.wavy'],
    },
  },
});
```

#### Entire Directory
In this example, the configuration file is set to `site.wavy`, and of all Wavy templates within `src/templates` will get recursively compiled to `build/templates`.

```js
grunt.initConfig({
  wavy: {
    options: {
      config: 'site.wavy'
    },
    files: {
      'build/templates': ['src/templates'],
    },
  },
});
```