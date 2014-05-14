'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');


var ExtendscriptGenerator = yeoman.generators.Base.extend({
  init: function () {
    this.pkg = require('../package.json');

    this.on('end', function () {
      if (!this.options['skip-install']) {
        this.installDependencies();
      }
    });
  },

  askFor: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay('Welcome to the marvelous Extendscript generator!'));
    var d = path.basename(process.cwd());

    var prompts = [
      {
        name: 'name',
        message: 'Project Name',
        default: d
      },
      {
        name: 'src_dir',
        message: 'ExtendScript Source Directory',
        default: 'src'
      },
      {
        type: 'confirm',
        name: 'entry_point',
        message: 'Create Entry Point index.jsx?',
        default: true
      },
      {
        name: 'out_dir',
        message: 'Merged ExtendScript Source Directory',
        default: 'build'
      },
      {
        type: 'confirm',
        name: 'lodash',
        message: 'Use lodash?',
        default: true
      },
      {
        type: 'confirm',
        name: 'jsonizer',
        message: 'Use jsonizer.jsx?',
        default: true
      }
    ];

    this.prompt(prompts, function (props) {
      this.name = props.name;
      this.src_dir = props.src_dir;
      this.entry_point = props.entry_point;
      this.out_dir = props.out_dir;
      this.lodash = props.lodash;
      this.jsonizer = props.jsonizer;
      done();
    }.bind(this));
  },

  app: function () {
    var done = this.async();

    this.mkdir(this.src_dir);
    this.mkdir(this.out_dir);

    if(this.entry_point){
      this.copy('_index.jsx', this.src_dir+'/index.jsx');
    }

    if(this.jsonizer){
      this.copy('util/_jsonizer.jsx', this.src_dir+'/util/jsonizer.jsx');
    }

    this.copy('_package.json', 'package.json');
    this.copy('_gulpfile.js', 'gulpfile.js');
    this.copy('_README.md', 'README.md');

    if(this.lodash){
      var lodash_url = "https://raw.github.com/lodash/lodash/2.4.1/dist/lodash.compat.js";
      this.fetch(lodash_url,this.src_dir+'/util',done);
    }else{
      done();
    }
  },

  projectfiles: function () {
    this.copy('gitignore','.gitignore');
  }
});

module.exports = ExtendscriptGenerator;
