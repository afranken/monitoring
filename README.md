Simon JS - Simple Monitoring Page
=================================

[![Build Status](https://travis-ci.org/afranken/simon.png?branch=master)](https://travis-ci.org/afranken/simon)
[![Versioneye Status](https://www.versioneye.com/user/projects/531b9194ec1375cd39000d44/badge.png)](https://www.versioneye.com/user/projects/531b9194ec1375cd39000d44)

[ ![Codeship Status for afranken/monitoring](https://www.codeship.io/projects/64c9cad0-8936-0131-4e0b-4a78b72f738d/status?branch=master)](https://www.codeship.io/projects/15549)

An easy to use Single Page Application to monitor your build infrastructure.

Currently supported:

* Jenkins Jobs
* Sonar Modules
* Nagios Hosts

#Attention

This is the development repository for Simon JS.

The Releases are located in another [Github Repository](https://github.com/afranken/simon-releases/tree/gh-pages/release)

**Visit [SimonJS.org](http://www.simonjs.org) for a description on how to use this library.**

#Development

Simon JS is built using [Typescript](http://www.typescriptlang.org/) that is compiled using [Grunt](http://gruntjs.com/).

The software can be compiled to JavaScript by running `grunt compile`, unit tests can be executed with `grunt test`.
Running `grunt package` will minify and merge the compiled JavaScript.

## Using Grunt

### grunt compile
When running `grunt compile`, the TypeScript classes will be compiled to JavaScript and written to `<project-root>/target-<version>/app`.

HTML files, vendor JavaScript libraries and CSS files will also be copied to the target directory.

Running `index-debug.html` will use the JavaScript files.

### grunt test
When running `grunt test`, the TypeScript classes will be compiled again (since a Jasmine template is used that tracks test coverage).
These files and the compiled tests will be written to  `<project-root>/target/js-test/`.

### grunt package
When running `grunt package`, the files already compiled using `grunt compile` will be merged and uglified.

Running `index.html` will use the resulting `simon.min.js`.

### grunt clean
When running `grunt clean`, the target directory will be deleted.

### grunt watch
When running `grunt watch`, grunt will watch TypeScript, HTML and CSS files and compile / copy them to the appropriate folders.
(Functionality is similar to `grunt compile`)



#Other

###Jenkins returns 403 to JSONP Get requests by default.
Errormessage:

`Exception: jsonp forbidden; can use -Dhudson.model.Api.INSECURE=true if you run without security`

From [Jenkins Security Advisory 2013-02-16](https://wiki.jenkins-ci.org/display/SECURITY/Jenkins+Security+Advisory+2013-02-16):

JSONP support in Remote access API is removed. If you have other programs that depend on this behavior,
you can set the hudson.model.Api.INSECURE system property to true, to resurrect behaviour.
However, this is highly discouraged.

###Nagios JSON Responses
Nagios does not support JSON but gives XML responses.

Use [this simple JSON cgi controller](https://github.com/afranken/status-json) to get Nagios to work with this application.

###Used Third Party Libraries / Software:

Software:

* [Require JS](http://requirejs.org/)
* [Knockout](http://knockoutjs.com/)
* [jQuery](http://jquery.com/)
* [Moment.js](http://momentjs.com/)
* [Twitter Bootstrap](http://getbootstrap.com/)

Testing only:

* [Jasmine](http://jasmine.github.io/)
* [Jasmine Istanbul](https://github.com/gotwarlost/istanbul)
