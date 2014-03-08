//initialize application
require(['Application', 'knockout', 'jquery'], function(ApplicationViewModel, ko) {
  var applicationViewModel = new ApplicationViewModel(json);
  ko.applyBindings(applicationViewModel);
  jQuery.fx.interval = 40;
});
