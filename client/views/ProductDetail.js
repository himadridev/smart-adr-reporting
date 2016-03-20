Template.ProductDetail.created = function () {
  var tmpl = this;
  tmpl.productData = new ReactiveDict();
  this.autorun(function(){
    var prodid = Router.current().params.shortid;
    tmpl.productData.set('data', Medicines.findOne({shortid : prodid}))  ;
  })
};

Template.ProductDetail.helpers({
  prodname: function () {
    return Template.instance().productData.get('data') ? Template.instance().productData.get('data').drugName : 'Fetching...';
  },

  manufacturer: function(){
    return Template.instance().productData.get('data') ? Template.instance().productData.get('data').manufacturerName : '...';
  },

  manAddress: function(){
    return Template.instance().productData.get('data') ? Template.instance().productData.get('data').manufacturerAddress : '...';
  },

  drugDescription: function(){
    return Template.instance().productData.get('data') ? Template.instance().productData.get('data').drugDescription : false; 
  }
});