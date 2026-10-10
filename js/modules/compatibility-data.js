window.BloodRadar = window.BloodRadar || {};

window.BloodRadar.COMPATIBILITY_DATA = {
  WHOLE_BLOOD: {
    'A+': {
      canDonateTo: ['A+', 'AB+'],
      canReceiveFrom: ['A+', 'A-', 'O+', 'O-'],
      note: 'As an A+ whole blood donor, your red blood cells can help A+ and AB+ patients. You can safely receive blood from A+, A-, O+, and O-.'
    },
    'A-': {
      canDonateTo: ['A+', 'A-', 'AB+', 'AB-'],
      canReceiveFrom: ['A-', 'O-'],
      note: 'A- whole blood is in critical need for Rh-negative recipients. You can donate red cells to all A and AB groups, and receive from A- and O-.'
    },
    'B+': {
      canDonateTo: ['B+', 'AB+'],
      canReceiveFrom: ['B+', 'B-', 'O+', 'O-'],
      note: 'As a B+ donor, you can give red cells to B+ and AB+ recipients. You can receive from B+, B-, O+, and O- (covers 35% of Indian hospital needs).'
    },
    'B-': {
      canDonateTo: ['B+', 'B-', 'AB+', 'AB-'],
      canReceiveFrom: ['B-', 'O-'],
      note: 'B- is a scarce blood type in Indian blood banks. You can donate red cells to all B and AB groups, and receive from B- and O-.'
    },
    'O+': {
      canDonateTo: ['O+', 'A+', 'B+', 'AB+'],
      canReceiveFrom: ['O+', 'O-'],
      note: 'O+ is India\'s primary clinical reserve (37% of population). Can give red blood cells to any Rh-positive patient in an emergency.'
    },
    'O-': {
      canDonateTo: ['All Groups (Universal RBC Donor)'],
      canReceiveFrom: ['O-'],
      note: 'Universal Red Blood Cell Donor. Your red cells can be transfused to any patient in acute hemorrhage prior to laboratory cross-matching.'
    },
    'AB+': {
      canDonateTo: ['AB+'],
      canReceiveFrom: ['All Groups (Universal RBC Recipient)'],
      note: 'Universal Red Blood Cell Recipient. In an emergency, you can safely receive red blood cells from any blood type.'
    },
    'AB-': {
      canDonateTo: ['AB+', 'AB-'],
      canReceiveFrom: ['AB-', 'A-', 'B-', 'O-'],
      note: 'One of the rarest ABO blood groups in India (<0.5%). Can donate red cells to AB- and AB+, and receive from any Rh-negative group.'
    },
    'Bombay (hh)': {
      canDonateTo: ['All ABO Blood Groups'],
      canReceiveFrom: ['Bombay (hh) Only'],
      note: 'Extremely rare phenotype (1 in 10,000 in Mumbai). Can donate red cells to all ABO groups, but can ONLY safely receive from another Bombay donor.'
    },
    'Rh-null': {
      canDonateTo: ['All Rh Variant Patients'],
      canReceiveFrom: ['Rh-null Only'],
      note: 'The "Golden Blood" (<50 cases known globally). Lacks all 61 Rh antigens. Universal donor for rare Rh variants, but can only receive Rh-null blood.'
    }
  },
  PLATELETS_SDP: {
    'A+': {
      canDonateTo: ['A+', 'A-', 'AB+', 'AB-'],
      canReceiveFrom: ['A+', 'A-', 'O+', 'O-'],
      note: 'In platelet apheresis, A platelets are safe for A and AB patients. High demand for recurring cancer chemotherapy protocols.'
    },
    'A-': {
      canDonateTo: ['A+', 'A-', 'AB+', 'AB-'],
      canReceiveFrom: ['A-', 'O-'],
      note: 'Safe platelet donor for all A and AB recipients. Red blood cells are returned to you during the procedure.'
    },
    'B+': {
      canDonateTo: ['B+', 'B-', 'AB+', 'AB-'],
      canReceiveFrom: ['B+', 'B-', 'O+', 'O-'],
      note: 'B platelets are compatible with B and AB patients. Vital for dengue fever thrombocytopenia and surgical reserves.'
    },
    'B-': {
      canDonateTo: ['B+', 'B-', 'AB+', 'AB-'],
      canReceiveFrom: ['B-', 'O-'],
      note: 'Essential platelet donor for scarce B and AB emergencies across both Rh polarities.'
    },
    'O+': {
      canDonateTo: ['O+', 'O-'],
      canReceiveFrom: ['All Groups (Universal Platelet Recipient)'],
      note: 'O plasma contains anti-A and anti-B antibodies, so O platelets are given to O patients. However, O patients can receive platelets from any group!'
    },
    'O-': {
      canDonateTo: ['O-', 'O+'],
      canReceiveFrom: ['All Groups (Universal Platelet Recipient)'],
      note: 'O- donors can give platelets to O patients. In platelets, O patients are Universal Recipients!'
    },
    'AB+': {
      canDonateTo: ['All Groups (Universal Platelet Donor)'],
      canReceiveFrom: ['AB+'],
      note: 'Universal Platelet & Plasma Donor! AB plasma contains zero anti-A or anti-B antibodies, making it universally safe for all trauma and dengue cases.'
    },
    'AB-': {
      canDonateTo: ['All Groups (Universal Platelet Donor)'],
      canReceiveFrom: ['AB-', 'A-', 'B-', 'O-'],
      note: 'Universal Platelet Donor across all ABO patient categories. Vitally needed for severe burns and intensive care trauma.'
    },
    'Bombay (hh)': {
      canDonateTo: ['Bombay (hh)'],
      canReceiveFrom: ['Bombay (hh)'],
      note: 'Due to anti-H antibodies in plasma, Bombay platelets are managed specifically for Bombay phenotype patients.'
    },
    'Rh-null': {
      canDonateTo: ['Rh-null'],
      canReceiveFrom: ['Rh-null'],
      note: 'Rare donor platelet apheresis protocols require coordination with certified transfusion registries.'
    }
  }
};
