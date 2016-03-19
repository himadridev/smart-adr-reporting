/**
 * Created by himadri on 3/19/16.
 */

Template.Home.created = function () {
  var template = this;
  template.DataContainer = new ReactiveDict();
};

Template.Home.rendered = function () {

};


Template.Home.helpers({

});

Template.Home.events({
  'click .js-route' : function(e, t) {
    var routeTo = e.currentTarget.dataset.route;
    Router.go(routeTo);
  }
});

Template.Home.destroyed = function () {

};