//initialize application
require(['Application', 'knockout'], function(ApplicationViewModel, ko) {
  var applicationViewModel = new ApplicationViewModel(json);
  ko.applyBindings(applicationViewModel);
});
