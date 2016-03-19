/**
 * Created by himadri on 3/19/16.
 */

Meteor.startup(function () {
  var medicinesCollectionCount = Medicines.find().count();
  if(medicinesCollectionCount === 0) {
    console.log("Inserting...");
    var products = [
      {
        ApplNo: "087082",
        ProductNo: "001",
        drugName: "Esmolol Hydrochloride Injection",
        manufacturerName: "Baxter Healthcare S.A.",
        manufacturerAddress: "Moneen Road, Castlebar, County Mayo , Ireland (IRL)"
      },
      {
        ApplNo: "087082",
        ProductNo: "001",
        drugName: "Tylenol",
        manufacturerName: "Jhonson and Jhonson",
        manufacturerAddress: "New Brunswick, New Jersey"
      }
    ];

    for(var i = 0; i < products.length; i++){
      Medicines.insert(products[i]);
    }
  }
  console.log(Medicines.find().count());
});