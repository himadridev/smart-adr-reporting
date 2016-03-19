Template.ProductDetail.created = function () {
  var tmpl = this;
  tmpl.productData = new ReactiveDict();

  Meteor.call('fetchProductDetail', function(resp){
    if(resp){
      tmpl.productData = resp;
    }
  });
};