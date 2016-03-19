/**
 * Created by himadri on 3/19/16.
 */

InspectionFormSchema = new SimpleSchema({
  manufacturerName : {
    type: String,
    label: "Manufacture Name",
    autoform: {
      afFormGroup: {
        label: false
      }
    }
  },

  medicineName: {
    type: String,
    label: "Medicine Name",
    autoform: {
      afFormGroup: {
        label: false
      }
    }
  },

  tags: {
    type: [String],
    label: "Tags",
    autoform: {
      type: "hidden"
    }
  }
});