/**
 * Created by himadri on 3/19/16.
 */

UserFeedbackSchema = new SimpleSchema({
  userType: {
    type: String,
    
    autoform: {
      afFormGroup: {
        label: false
      },
      type: 'select',
      options: function () {
        return [
          {label: "Patient", value: "patient"},
          {label: "Doctor", value: "Doctor"}
        ];
      },
      afFieldInput: {
        firstOption: 'Select...'
      }
    }
  },

  medicineName: {
    type: String,
    autoform: {
      afFormGroup: {
        label: false
      }
    }
  },

  patientName: {
    type: String,
    autoform:{
      afFormGroup: {
        label: false
      }
    }
  },

  patientSex: {
    type: String,
    autoform: {
      afFormGroup: {
        label: false
      },
      type: "select-radio-inline",
      options: function () {
        return [
          {label: "Male", value: "Male"},
          {label: "Female", value: "Female"}
        ];
      }
    }
  },

  patientAge: {
    type: String,
    autoform: {
      afFormGroup: {
        label: false
      }
    }
  },

  effects: {
    type: String,
    optional: true,
    autoform: {
      type: "select-checkbox",
      afFormGroup: {
        label: false
      },
      options: function () {
        return [
          {label: "Headache", value: "Headache"},
          {label: "Shock / Anaphylaxis", value: "Shock"},
          {label: "Skin Rash", value: "Skin Rash"},
          {label: "Diarrhoea", value: "Diarrhoea"},
          {label: "Nausea or vomiting", value: "Nausea or vomiting"},
          {label: "Others", value: "Others"}
        ];
      }
    }
  },

  otherDetails: {
    type: String,
    label: "Other Information",
    optional: true,
    autoform: {
      afFormGroup: {
        label: false
      }
    },
    custom: function(){
      if(this.field('effects').value === "Others" && !this.isSet){
        return 'required'
      }
    }
  },

  startDate: {
    type: String,
    autoform: {
      afFieldInput: {
        type: "bootstrap-datepicker"
      }
    }
  },

  endDate: {
    type: String,
    autoform: {
      afFieldInput: {
        type: "bootstrap-datepicker"
      }
    }
  },

  reactionAbated: {
    type: String,
    optional: true,
    autoform: {
      type: "select-radio-inline",
      afFormGroup: {
        label: false
      },
      options: function () {
        return [
          {label: "Yes", value: "Yes"},
          {label: "No", value: "No"},
          {label: "Unknown", value: "Unknown"}
        ];
      }
    }
  },

  reappearedReaction: {
    type: String,
    optional: true,
    autoform: {
      type: "select-radio-inline",
      afFormGroup: {
        label: false
      },
      options: function () {
        return [
          {label: "Yes", value: "Yes"},
          {label: "No", value: "No"},
          {label: "Unknown", value: "Unknown"}
        ];
      }
    }
  },

  isItSerious: {
    type: String,
    optional: true,
    autoform: {
      type: "select-radio-inline",
      afFormGroup: {
        label: false
      },
      options: function () {
        return [
          {label: "Yes", value: "Yes"},
          {label: "No", value: "No"}
        ];
      }
    }
  },

  whySerious: {
    type: [String],
    optional: true,
    autoform: {
      type: "select-checkbox",
      afFormGroup: {
        label: false
      },
      options: function () {
        return [
          {label: "Patient died due to reaction", value: "Patient died due to reaction"},
          {label: "Required prolonged hospitalization", value: "Required prolonged hospitalization"},
          {label: "Causes irreversible disability", value: "Causes irreversible disability"},
          {label: "Causes a congenital anomaly", value: "Causes a congenital anomaly"},
          {label: "Is life threatening", value: "Is life threatening"},
          {label: "Other", value: "Other"}
        ];
      }
    }
  },

  seriousDetails: {
    type: String,
    optional: true,
    autoform: {
      afFormGroup: {
        label: false
      }
    }
  },

  treatmentOfReaction: {
    type: String,
    optional: true,
    autoform: {
      type: "select-radio-inline",
      afFormGroup: {
        label: false
      },
      options: function () {
        return [
          {label: "Yes", value: "Yes"},
          {label: "No", value: "No"}
        ];
      }
    }
  },

  reactionTreatmentDetails: {
    type: String,
    optional: true,
    autoform: {
      afFormGroup: {
        label: false
      }
    }
  }
});
