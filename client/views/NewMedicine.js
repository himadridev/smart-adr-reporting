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

});

Template.NewMedicine.events({

});

Template.NewMedicine.destroyed = function () {

};

var addNewMedicineFormHook = {
  before: {
    method: function (doc) {
      //console.log(doc);
      return doc;
    }
  },

  onSuccess: function (formType, res) {
    console.log("Medicine id - "+res);
  },

  onError: function (formType, error) {

  }
};

AutoForm.addHooks('addNewMedicineForm', addNewMedicineFormHook);