Template.ProductDetail.created = function () {
  var tmpl = this;
  tmpl.productData = new ReactiveDict();
  tmpl.dataReady = new ReactiveVar(false);

  this.autorun(function(){
    var prodid = Router.current().params.shortid;
    if (Medicines.findOne({shortid : prodid})){
      tmpl.productData.set('data', Medicines.findOne({shortid : prodid}))  ;
      tmpl.dataReady.set(true); 
    }
    
  });
};

Template.ProductDetail.rendered = function () {
  var _this = this;
  
  this.autorun(function(){
    if (_this.dataReady.get()){
      
      var seriesData = _this.productData.get('data').feedback ;
      var sum = function(a, b) { return a.value + b.value };

      var chartData = {
        series : [{
          value: parseInt(seriesData.positive),
          className : 'positive-class'
        },{
          value: parseInt(seriesData.negative),
          className : 'negative-class'
        }]
      };
      
      if (seriesData.positive + seriesData.negative){
        
        new Chartist.Pie('.ct-chart', chartData, {
          labelInterpolationFnc: function(value) {
            return Math.round(value / chartData.series.reduce(sum) * 100) + '%';
          },
          width: '300px',
          height: '300px',
          labelOffset: 40,
          labelDirection: 'explode'
        });  

        _this.dataReady.set(false);  
      }
      
    }
    

  });

};

Template.ProductDetail.events({
  'click .btn-fetch-sentiment': function (event, template) {
    event.target.disabled = true;
    Meteor.call('fetchTweetsFromTwitter', template.productData.get('data').keywords);
    setTimeout(function(){
      event.target.removeAttribute('disabled');
    }, 2000);
  }
});

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
  },
  keywords: function(){
    return Template.instance().productData.get('data') ? Template.instance().productData.get('data').keywords : false; 
  },
  chartDataAvailable: function(){
    var data;
    if (!Template.instance().productData.get('data')){
      return false;
    }
    data = Template.instance().productData.get('data').feedback;
    return (data.positive + data.negative) 
  },

  tweets: function(){
    return TweetSentiment.find({'shortid' : Router.current().params.shortid }).fetch();
  }
});