/**
 * Created by himadri on 3/19/16.
 */

Template.AutoFormTypeahead.created = function() {

};

Template.AutoFormTypeahead.rendered = function() {
  Meteor.typeahead.inject();
};

Template.AutoFormTypeahead.helpers({
  'resultTemplate': function() {
    return this.atts.resultTemplate || 'default-suggestion-template';
  },
  opened: function(e) {

  },
  closed: function(e) {

  },
  selected: function(e, suggestion, dataset) {
    $(e.currentTarget).trigger('change');
  },
  autocompleted: function(e, suggestion, dataset) {

  }
});

Template.AutoFormTypeahead.events({

});






AutoForm.addInputType('autofrom_typeahead', {
  template: 'AutoFormTypeahead',
  valueOut: function() {
    val = this.typeahead('val');

    return val;
  },

  valueConverters: {
    'number': AutoForm.Utility.stringToNumber,
    'numberArray': function(val) {
      if (_.isArray(val)) {
        return _.map(val, function(item) {
          item = $.trim(item);
          return AutoForm.Utility.stringToNumber(item);
        });
      }
      return val;
    },
    'boolean': AutoForm.Utility.stringToBool,
    'booleanArray': function(val) {
      if (_.isArray(val)) {
        return _.map(val, function(item) {
          item = $.trim(item);
          return AutoForm.Utility.stringToBool(item);
        });
      }
      return val;
    },
    'date': AutoForm.Utility.stringToDate,
    'dateArray': function(val) {
      if (_.isArray(val)) {
        return _.map(val, function(item) {
          item = $.trim(item);
          return AutoForm.Utility.stringToDate(item);
        });
      }
      return val;
    }
  }
});