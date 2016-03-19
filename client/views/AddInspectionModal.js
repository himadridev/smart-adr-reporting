/**
 * Created by himadri on 3/19/16.
 */

Template.Inspector.created = function () {
  var template = this;
  template.DataContainer = new ReactiveDict();
};

Template.Inspector.rendered = function () {
  var instance = this;

};


Template.Inspector.helpers({
  searchManufacturer: function(query, sync, callback) {
    query = query.trim();
    var regex = Utility.getRegExQuery(query);
    sync(Manufacturer.find({name: {$regex:regex, $options: "i"}}).fetch());
  },

  searchMedicine: function(query, sync, callback) {
    query = query.trim();
    var regex = Utility.getRegExQuery(query);
    var queryObj = {};
    queryObj["name"] = {$regex:regex, $options: "i"};
    if(AutoForm && AutoForm.getFieldValue && AutoForm.getFieldValue("manufacturerName", "addInpectionDetails")){
      queryObj["manufacturer"] = AutoForm.getFieldValue("manufacturerName", "addInpectionDetails");
    }
    sync(Medicines.find(queryObj).fetch());
  }
});

Template.Inspector.events({
  'shown.bs.modal #addNewInspection' : function(event, template) {
    template.$('#tags-item').tagsinput({
      tagClass: function (item) {
        return 'label label-info';
      }
    });
  }
});

Template.Inspector.destroyed = function () {

};