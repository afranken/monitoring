//configure requirejs with application and dependencies.
requirejs.config({
  paths: {
    'Application': './Application',
    'jquery': "./vendor/jquery-2.0.3",
    'knockout': "./vendor/knockout-3.0.0"
  }
});

//initialize application
require(["Application", "knockout"], function(ApplicationViewModel, ko) {
  var applicationViewModel = new ApplicationViewModel(json);
  ko.applyBindings(applicationViewModel);
});

//
require(["jquery"], function(jQuery){
  jQuery(function(){

  });
});



