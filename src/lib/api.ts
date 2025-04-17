
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
        sites: ["site_1", "site_3"]
      },
      {
        id: "trial_456",
        name: "Phase 3 Cardiovascular Study",
        status: "document_review",
        sites: ["site_2", "site_4"]
      },
      {
        id: "trial_789",
        name: "Phase 1 Diabetes Study",
        status: "idle",
        sites: []
      }
    ]
  };
};

// Get site analytics
export const getSiteAnalytics = async (siteId: string) => {
  await simulateApiDelay();
  
  // GET /api/v1/sites/{site_id}/analytics
  return {
    site_id: siteId,
    site_name: mockSites.find(s => s.id === siteId)?.name,
    staff_statistics: {
      total_staff: 16,
      ready_staff: 9,
      staff_by_role: {
        PI: { count: 2, avg_experience: 12 },
        "Sub-I": { count: 3, avg_experience: 16.7 },
        CRC: { count: 5, avg_experience: 10 },
        Pharmacist: { count: 2, avg_experience: 4 },
        Lab: { count: 4, avg_experience: 16.3 }
      },
      certifications: {
        CV: { complete: 13, total: 16 },
        GCP: { complete: 11, total: 16 },
        "Medical License": { complete: 7, total: 7 },
        "Delegation of Authority": { complete: 9, total: 16 }
      },
      incomplete_staff: [
        { name: "Dr. Johnson", role: "PI", missing: ["GCP"] },
        { name: "Sarah Miller", role: "CRC", missing: ["CV", "GCP"] }
      ]
    },
    patient_statistics: {
      total_patients: 300,
      age_distribution: {
        "18-30": 45,
        "31-40": 62,
        "41-50": 83,
        "51-60": 65,
        "61-70": 35,
        "71+": 10
      },
      gender: { male: 140, female: 160 },
      ethnicity: {
        "White": 180,
        "Black": 50,
        "Hispanic": 40,
        "Asian": 25,
        "Other": 5
      },
      prior_therapies: {
        "Surgery": 120,
        "Chemotherapy": 80,
        "Radiotherapy": 65,
        "Immunotherapy": 30,
        "None": 70
      },
      lab_values: {
        "Platelets": { normal: 260, low: 25, high: 15 },
        "Hemoglobin": { normal: 240, low: 50, high: 10 },
        "Neutrophils": { normal: 270, low: 20, high: 10 },
        "Liver Function": { normal: 245, abnormal: 55 },
        "Kidney Function": { normal: 260, abnormal: 40 }
      }
    },
    site_readiness: {
      data_privacy_policy: true,
      source_agreement: true,
      sops_storage_monitoring: "warning",
      eregulatory_binders: true,
      source_templates: false,
      iata_certification: true
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
