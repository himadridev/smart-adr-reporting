/**
 * Created by himadri on 3/19/16.
 */

Template.UserFeedback.created = function () {
  var template = this;
  template.DataContainer = new ReactiveDict();
};

Template.UserFeedback.rendered = function () {

};


Template.UserFeedback.helpers({
  doc: function() {
    var doc = {};
    var feedbackId = Router.current().params.id;
    var feedbackObj = Feedback.findOne({_id : feedbackId});
    doc['id'] = feedbackId;
    doc['drugName'] = feedbackObj.drugName;
    doc['patientName'] = feedbackObj.userName;
    return doc;
  },

  "searchMedicine" : function(query, sync, callback) {
    query = query.trim();
    var regex = Utility.getRegExQuery(query);
    sync(Medicines.find({name: {$regex:regex, $options: "i"}}).fetch());
  }
});

Template.UserFeedback.events({

});

Template.UserFeedback.destroyed = function () {

};

var userFeedBackFormHook = {
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

AutoForm.addHooks('userFeedBackForm', userFeedBackFormHook);