Template.UpdateReTweetUsers.created = function () {
  var template = this;
  template.UpdateReTweetUsersData = new ReactiveDict();
  template.UpdateReTweetUsersData.set("users", []);
  Meteor.call("getReTweetAllowedUsers", function(err, res) {
    if(res && res.users) {
      template.UpdateReTweetUsersData.set("users", res.users);
    }
  });
};

Template.UpdateReTweetUsers.rendered = function () {

};

Template.UpdateReTweetUsers.helpers({
  getUsers: function() {
    return Template.instance().UpdateReTweetUsersData.get("users");
  }
});

Template.UpdateReTweetUsers.events({
  'click .js-add-handler': function(e, t) {
    var value = t.$("#add-handler").val();
    var handlers = t.UpdateReTweetUsersData.get("users");
    value = value.trim();
    if(value) {
      handlers.push(value);
      Meteor.call("setReTweetAllowedUsers", handlers, function(err, res) {
        if(res) {
          t.UpdateReTweetUsersData.set("users", handlers);
          t.$("#add-handler").val('');
        }
      });
    }
  },

  'click .js-remove-handler': function(e, t) {
    var value = this.valueOf();
    var handlers = t.UpdateReTweetUsersData.get("users");
    var index = handlers.indexOf(value);

    if(index != -1) {
      handlers.splice(index, 1);
      Meteor.call("setReTweetAllowedUsers", handlers, function(err, res) {
        if(res) {
          t.UpdateReTweetUsersData.set("users", handlers);
        }
      });
    }
  }
});

Template.UpdateReTweetUsers.destroyed = function () {

};