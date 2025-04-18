// Mock API implementation for development
const API_BASE_URL = "https://api.ubertrial.example"; // This will be replaced with the actual API URL

// Mock data for development
const mockSites = [
  { id: "site_0", name: "City General Research Center", number: 0 },
  { id: "site_1", name: "Valley Clinical Trials", number: 1 },
  { id: "site_2", name: "Metro Medical Research", number: 2 },
  { id: "site_3", name: "Coastal Clinical Studies", number: 3 },
  { id: "site_4", name: "Highland Research Group", number: 4 },
  { id: "site_5", name: "Riverside Medical Center", number: 5 },
  { id: "site_6", name: "Summit Research Institute", number: 6 },
  { id: "site_7", name: "Pacific Research Network", number: 7 },
  { id: "site_8", name: "Harbor Clinical Trials", number: 8 },
  { id: "site_9", name: "Evergreen Medical Research", number: 9 },
];

const mockSponsors = [
  { id: "sponsor_0", name: "Nova Pharma", number: 0 },
  { id: "sponsor_1", name: "Helix Biotech", number: 1 },
  { id: "sponsor_2", name: "Quantum Therapeutics", number: 2 },
];

// Helper for simulating API delays
const simulateApiDelay = () => new Promise(resolve => setTimeout(resolve, 800));

// Type definitions
export type UserRole = "sponsor" | "site" | null;

// Login functions
export const loginSponsor = async (sponsorNumber: number) => {
  await simulateApiDelay();
  
  // In a real app, this would be an actual API call
  // GET /api/v1/sponsors/lookup/{sponsor_number}
  const sponsor = mockSponsors.find(s => s.number === sponsorNumber);
  
  if (!sponsor) {
    throw new Error("Invalid sponsor number");
  }
  
  return sponsor;
};

export const loginSite = async (siteNumber: number) => {
  await simulateApiDelay();
  
  // In a real app, this would be an actual API call
  // GET /api/v1/sites/lookup/{site_number}
  const site = mockSites.find(s => s.number === siteNumber);
  
  if (!site) {
    throw new Error("Invalid site number");
  }
  
  return site;
};

export const getUserRole = (): UserRole => {
  const savedUser = localStorage.getItem("uberTrialUser");
  if (!savedUser) return null;
  
  try {
    const userData = JSON.parse(savedUser);
    return userData.role || null;
  } catch (e) {
    console.error("Failed to parse saved user role", e);
    return null;
  }
};

// Fetch pending invitations for sponsors
export const getSponsorPendingInvitations = async (sponsorId: string) => {
  await simulateApiDelay();
  
  // GET /api/v1/sponsors/{sponsor_number}/pending_invitations
  return {
    sponsor_id: sponsorId,
    sponsor_name: mockSponsors.find(s => s.id === sponsorId)?.name,
    pending_invitations: [
      {
        trial_id: "trial_123",
        trial_name: "Phase 2 Oncology Study",
        site_id: "site_1",
        site_name: "Valley Clinical Trials",
        compatibility_score: 87,
        date_requested: new Date().toISOString(),
      }
    ],
    total_count: 1
  };
};

// Fetch pending invitations for sites
export const getSitePendingInvitations = async (siteId: string) => {
  await simulateApiDelay();
  
  // GET /api/v1/sites/{site_number}/pending_invitations
  return {
    site_id: siteId,
    site_name: mockSites.find(s => s.id === siteId)?.name,
    pending_invitations: [
      {
        trial_id: "trial_456",
        trial_name: "Phase 3 Cardiovascular Study",
        sponsor_id: "sponsor_0",
        sponsor_name: "Nova Pharma",
        compatibility_score: 92,
        date_requested: new Date().toISOString(),
      }
    ],
    total_count: 1
  };
};

// Get sponsor details
export const getSponsorDetails = async (sponsorId: string) => {
  await simulateApiDelay();
  
  // GET /api/v1/sponsors/{sponsor_id}
  return {
    id: sponsorId,
    name: mockSponsors.find(s => s.id === sponsorId)?.name,
    trials: [
      {
        id: "trial_123",
        name: "Phase 2 Oncology Study",
        status: "enrollment",
        participants_count: 15,
        target: 30,
        sites: ["site_1", "site_2"] // Two sites
      },
      {
        id: "trial_456",
        name: "Phase 3 Cardiovascular Study",
        status: "document_review",
        sites: ["site_4"] // One site
      },
      {
        id: "trial_789",
        name: "Phase 1 Diabetes Study",
        status: "idle",
        sites: [] // No sites
      }
    ]
  };
};

// Get site analytics
export const getSiteAnalytics = async (siteId: string) => {
  await simulateApiDelay();
  
  // GET /api/v1/sites/{site_id}/analytics
  return {
    site_id: "b31ddcea-554c-42f0-9096-fd5b5c1ee137",
    site_name: "Site 0",
    staff_statistics: {
      total_staff: 16,
      role_distribution: {
        "Principal Investigator": 1,
        "Sub-Investigator": 1,
        "Pharmacist": 2,
        "Sub-I": 3,
        "CRC": 2,
        "Lab": 6,
        "PI": 1
      },
      certification_status: {
        cv_uploaded: {
          count: 8,
          percentage: 50.0
        },
        gcp_certified: {
          count: 8,
          percentage: 50.0
        },
        medical_license: {
          count: 11,
          percentage: 68.8
        },
        delegation_of_authority: {
          count: 4,
          percentage: 25.0
        }
      },
      experience_by_role: {
        "PI": 12.0,
        "Sub-I": 16.7,
        "CRC": 10.0,
        "Pharmacist": 4.0,
        "Lab": 16.3
      },
      staff_requiring_attention: [
        {
          name: "Dr. John Smith",
          role: "Principal Investigator",
          needs: ["Role update or reassignment"]
        },
        {
          name: "Dr. Sarah Johnson",
          role: "Sub-Investigator",
          needs: ["Role update or reassignment"]
        },
        {
          name: "Staff Member 3",
          role: "Pharmacist",
          needs: ["GCP certification", "Role update or reassignment"]
        },
        {
          name: "Staff Member 7",
          role: "Pharmacist",
          needs: ["GCP certification", "Role update or reassignment"]
        },
        {
          name: "Staff Member 9",
          role: "Sub-I",
          needs: ["Role update or reassignment"]
        },
        {
          name: "Staff Member 10",
          role: "Sub-I",
          needs: ["GCP certification", "Role update or reassignment"]
        }
      ]
    },
    site_readiness: {
      data_privacy_policy: true,
      source_agreement: true,
      sops_storage_monitoring: "warning",
      eregulatory_binders: true,
      source_templates: false,
      iata_certification: true
    },
    patient_statistics: {
      total_patients: 300,
      age_distribution: {
        "10-19": { count: 5, percentage: 1.7 },
        "20-29": { count: 28, percentage: 9.3 },
        "30-39": { count: 49, percentage: 16.3 },
        "40-49": { count: 34, percentage: 11.3 },
        "50-59": { count: 40, percentage: 13.3 },
        "60-69": { count: 42, percentage: 14.0 },
        "70-79": { count: 35, percentage: 11.7 },
        "80-89": { count: 42, percentage: 14.0 },
        "90-99": { count: 25, percentage: 8.3 }
      },
      gender_distribution: {
        "female": { count: 144, percentage: 48.0 },
        "male": { count: 156, percentage: 52.0 }
      },
      ethnicity_distribution: {
        "middle_eastern": { count: 60, percentage: 20.0 },
        "asian": { count: 66, percentage: 22.0 },
        "white": { count: 60, percentage: 20.0 },
        "not_recorded": { count: 56, percentage: 18.7 },
        "native_american": { count: 63, percentage: 21.0 },
        "mixed_or_other": { count: 56, percentage: 18.7 },
        "pacific_islander": { count: 44, percentage: 14.7 },
        "site_does_not_track_ethnicity": { count: 69, percentage: 23.0 },
        "hispanic_or_latino": { count: 46, percentage: 15.3 },
        "black_or_african_american": { count: 66, percentage: 22.0 }
      },
      prior_therapies: {
        "biologics": { count: 74, percentage: 24.7 },
        "standard_of_care": { count: 86, percentage: 28.7 },
        "radiation": { count: 83, percentage: 27.7 },
        "surgery": { count: 91, percentage: 30.3 },
        "gene_therapy": { count: 90, percentage: 30.0 },
        "experimental_agents": { count: 87, percentage: 29.0 },
        "chemo": { count: 87, percentage: 29.0 },
        "oral_medications": { count: 92, percentage: 30.7 },
        "immunotherapy": { count: 81, percentage: 27.0 }
      },
      lab_results_distribution: {
        platelets: {
          "normal": { count: 99, percentage: 33.0 },
          "moderate_thrombocytopenia": { count: 92, percentage: 30.7 },
          "mild_thrombocytopenia": { count: 109, percentage: 36.3 }
        },
        hemoglobin: {
          "moderate_anemia": { count: 101, percentage: 33.7 },
          "normal": { count: 101, percentage: 33.7 },
          "mild_anemia": { count: 98, percentage: 32.7 }
        },
        neutrophils: {
          "mild_neutropenia": { count: 106, percentage: 35.3 },
          "moderate_neutropenia": { count: 110, percentage: 36.7 },
          "normal": { count: 84, percentage: 28.0 }
        },
        liver_function: {
          "normal": { count: 110, percentage: 36.7 },
          "mild_impairment": { count: 92, percentage: 30.7 },
          "moderate_impairment": { count: 98, percentage: 32.7 }
        },
        kidney_function: {
          "moderate_impairment": { count: 106, percentage: 35.3 },
          "normal": { count: 106, percentage: 35.3 },
          "mild_impairment": { count: 88, percentage: 29.3 }
        }
      }
    }
  };
};

// Get site trials
export const getSiteTrials = async (siteId: string) => {
  await simulateApiDelay();
  
  // GET /api/v1/relationships/sites/{site_id}/trials
  return {
    site_id: siteId,
    trials: [
      {
        id: "trial_123",
        name: "Phase 2 Oncology Study",
        status: "enrollment",
        sponsor_id: "sponsor_0",
        sponsor_name: "Nova Pharma",
        metrics: {
          enrolled: 8,
          target: 15,
          identified_leads: 32,
          prescreened: 18,
          qualified: 12,
          ongoing_outreach: 5
        }
      },
      {
        id: "trial_456",
        name: "Phase 3 Cardiovascular Study",
        status: "document_review",
        sponsor_id: "sponsor_1",
        sponsor_name: "Helix Biotech",
        documents: [
          { id: "doc_1", name: "Informed Consent Form", status: "pending_signature" },
          { id: "doc_2", name: "Site Agreement", status: "approved" }
        ]
      }
    ]
  };
};

// Get trial details
export const getTrialDetails = async (trialId: string) => {
  await simulateApiDelay();
  
  // GET /api/v1/trials/{trial_id}
  return {
    id: trialId,
    name: trialId === "trial_123" ? "Phase 2 Oncology Study" : 
          trialId === "trial_456" ? "Phase 3 Cardiovascular Study" : 
          "Phase 1 Diabetes Study",
    phase: trialId === "trial_123" ? 2 : 
           trialId === "trial_456" ? 3 : 1,
    status: trialId === "trial_123" ? "enrollment" : 
            trialId === "trial_456" ? "document_review" : "idle",
    therapeutic_area: trialId === "trial_123" ? "Oncology" : 
                       trialId === "trial_456" ? "Cardiovascular" : "Endocrinology",
    enrollment_target: 30,
    current_enrollment: 15,
    protocol_file: "protocol.pdf",
    start_date: "2023-01-15",
    end_date: "2024-06-30"
  };
};

// Get trial sites
export const getTrialSites = async (trialId: string) => {
  await simulateApiDelay();
  
  // GET /api/v1/relationships/trials/{trial_id}/sites
  return {
    trial_id: trialId,
    sites: [
      {
        id: "site_1",
        name: "Valley Clinical Trials",
        status: "active",
        enrollment: {
          identified: 18,
          prescreened: 12,
          qualified: 7,
          enrolled: 5
        }
      },
      {
        id: "site_3",
        name: "Coastal Clinical Studies",
        status: "active",
        enrollment: {
          identified: 26,
          prescreened: 15,
          qualified: 10,
          enrolled: 8
        }
      }
    ]
  };
};

// Find matching sites for a trial
export const findMatchingSites = async (trialId: string) => {
  await simulateApiDelay();
  
  // GET /api/v1/trials/{trial_id}/find-matching-sites
  return {
    trial_id: trialId,
    matching_sites: [
      {
        id: "site_2",
        name: "Metro Medical Research",
        location: { lat: 34.0522, lng: -118.2437 },
        compatibility_score: 94,
        eligible_patients: 28,
        total_patients: 300,
        compatible_features: ["procedures", "equipment", "facilities"],
        incompatible_features: [],
        rejection_reasons: {
          age: 10,
          diagnosis_date: 5,
          comorbidities: 3
        }
      },
      {
        id: "site_5",
        name: "Riverside Medical Center",
        location: { lat: 33.9806, lng: -117.3755 },
        compatibility_score: 82,
        eligible_patients: 19,
        total_patients: 265,
        compatible_features: ["procedures", "facilities"],
        incompatible_features: ["equipment"],
        rejection_reasons: {
          age: 8,
          lab_values: 12,
          prior_therapies: 7
        }
      }
    ]
  };
};

// Find matching trials for a site
export const findMatchingTrials = async (siteId: string) => {
  await simulateApiDelay();
  
  // GET /api/v1/sites/{site_id}/find-matching-trials
  return {
    site_id: siteId,
    matching_trials: [
      {
        id: "trial_789",
        name: "Phase 1 Diabetes Study",
        sponsor_id: "sponsor_2",
        sponsor_name: "Quantum Therapeutics",
        phase: 1,
        compatibility_score: 91,
        eligible_patients: 22,
        total_patients: 300,
        location: { lat: 37.7749, lng: -122.4194 },
        compatible_features: ["procedures", "equipment", "languages"],
        incompatible_features: [],
        rejection_reasons: {
          age: 8,
          lab_values: 12,
          diagnosis_stage: 5
        }
      },
      {
        id: "trial_101",
        name: "Phase 2 Rheumatoid Arthritis Study",
        sponsor_id: "sponsor_0",
        sponsor_name: "Nova Pharma",
        phase: 2,
        compatibility_score: 78,
        eligible_patients: 15,
        total_patients: 300,
        location: { lat: 40.7128, lng: -74.0060 },
        compatible_features: ["procedures", "languages"],
        incompatible_features: ["equipment", "payment_formats"],
        rejection_reasons: {
          comorbidities: 12,
          prior_therapies: 6
        },
        recommendations: [
          {
            type: "equipment",
            item: "High-resolution ultrasound",
            impact: {
              compatibility_increase: 12,
              additional_eligible_patients: 5
            }
          }
        ]
      },
      {
        id: "trial_102",
        name: "Phase 3 Cardiovascular Trial",
        sponsor_id: "sponsor_1", 
        sponsor_name: "Helix Biotech",
        phase: 3,
        compatibility_score: 85,
        eligible_patients: 18,
        total_patients: 300,
        location: { lat: 51.5074, lng: -0.1278 },
        compatible_features: ["procedures", "equipment", "facilities"],
        incompatible_features: ["payment_system"],
        rejection_reasons: {
          age: 10,
          comorbidities: 8
        }
      },
      {
        id: "trial_103",
        name: "Phase 2 Oncology Study",
        sponsor_id: "sponsor_2",
        sponsor_name: "Quantum Therapeutics",
        phase: 2,
        compatibility_score: 94,
        eligible_patients: 25,
        total_patients: 300,
        location: { lat: 48.8566, lng: 2.3522 },
        compatible_features: ["procedures", "equipment", "facilities", "lab_certifications", "languages"],
        incompatible_features: [],
        rejection_reasons: {
          diagnosis_date: 15
        }
      }
    ]
  };
};

// Invitation handling functions
export const sendTrialInviteToSite = async (trialId: string, siteId: string) => {
  await simulateApiDelay();
  // POST /api/v1/invitations/trial-invite-site/{trial_id}/{site_id}
  return { success: true, message: "Invitation sent successfully" };
};

export const sendSiteInviteToTrial = async (siteId: string, trialId: string) => {
  await simulateApiDelay();
  // POST /api/v1/invitations/site-invite-trial/{site_id}/{trial_id}
  return { success: true, message: "Invitation sent successfully" };
};

export const acceptTrialInvitation = async (siteId: string, trialId: string) => {
  await simulateApiDelay();
  // POST /api/v1/invitations/site-accept-trial/{site_id}/{trial_id}
  return { success: true, message: "Invitation accepted" };
};

export const declineTrialInvitation = async (siteId: string, trialId: string) => {
  await simulateApiDelay();
  // POST /api/v1/invitations/site-decline-trial/{site_id}/{trial_id}
  return { success: true, message: "Invitation declined" };
};

export const acceptSiteInvitation = async (trialId: string, siteId: string) => {
  await simulateApiDelay();
  // POST /api/v1/invitations/trial-accept-site/{trial_id}/{site_id}
  return { success: true, message: "Invitation accepted" };
};

export const declineSiteInvitation = async (trialId: string, siteId: string) => {
  await simulateApiDelay();
  // POST /api/v1/invitations/trial-decline-site/{trial_id}/{site_id}
  return { success: true, message: "Invitation declined" };
};
