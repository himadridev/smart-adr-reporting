/**
 * Created by himadri on 3/19/16.
 */

Template.NewMedicine.created = function () {
  var template = this;
  template.DataContainer = new ReactiveDict();
};

Template.NewMedicine.rendered = function () {

};

Template.NewMedicine.helpers({
  doc: function() {
    return {
      shortid : ShortId.generate()
    }
  }
});

Template.NewMedicine.events({

});

Template.NewMedicine.destroyed = function () {

};

var addNewMedicineFormHook = {
  before: {
    method: function (doc) {
      doc.feedback = {
          "positive" : 0,
          "negative" : 0
      };
      
      return doc;
    }
  },

  onSuccess: function (formType, res) {
    if(res){
      Router.go("Dashboard", {type : "manufacturer"});
    }
  },

  onError: function (formType, error) {

  }
};

AutoForm.addHooks('addNewMedicineForm', addNewMedicineFormHook);