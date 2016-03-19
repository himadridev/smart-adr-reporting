/**
 * Created by himadri on 3/19/16.
 */

Template.ReactionScale.created = function () {
  var template = this;
  template.DataContainer = new ReactiveDict();
  template.DataContainer.set("doc", {});
};

Template.ReactionScale.rendered = function () {

  var template = this;

  template.autorun(function(){
    if(Router.current && Router.current() && Router.current().data && Router.current().data()){
      var data = Router.current().data();
      template.$('.typeahead[name=drugName]').typeahead('val', data.drugName);
      template.DataContainer.set("doc", {manufacturerName : data.manufacturerName});
    }
  })
};


Template.ReactionScale.helpers({
  doc: function(){
    return Template.instance().DataContainer.get("doc");
  }
});

Template.ReactionScale.events({

});

Template.ReactionScale.destroyed = function () {

};

var drugReactionProbabilityFormHook = {
  before: {
    method: function (doc) {
      console.log(doc);
      return doc;
    }
  },

  onSuccess: function (formType, res) {

  },

  onError: function (formType, error) {

  }
};

AutoForm.addHooks('drugReactionProbabilityForm', drugReactionProbabilityFormHook);