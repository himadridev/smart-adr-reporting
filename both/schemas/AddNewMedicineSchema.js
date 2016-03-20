/**
 * Created by himadri on 3/19/16.
 */

AddNewMedicineSchema = new SimpleSchema({
  shortid: {
    type : String,
    label : "Drug Identification Number"
  },

  drugName : {
    type : String,
    label : "Brand Name"
  },

  genericName : {
    type : String,
    label : "Generic Name"
  },

  compositions : {
    type: String,
    label: "Compositions"
  },

  manufacturerName : {
    type: String,
    label: "Manufacturer Name"
  },

  manufacturerEmail : {
    type: String,
    label: "Manufacturer Email"
  },

  manufacturerMobile : {
    type: String,
    label: "Manufacturer Mobile"
  },

  manufacturerAdderss : {
    type: String,
    label: "Manufacturer Address"
  },

  keywords : {
    type: String,
    label: "Tags"
  },

  "feedback" : {
    type: Object
  },

  "feedback.negative" : {
    type: Number
  },

  "feedback.positive" : {
    type: Number
  }
});