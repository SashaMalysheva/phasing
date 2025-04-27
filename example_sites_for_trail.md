uber_trial % cd /Users/sashamalysheva/uber_trial/backend && python -m app.scripts.find_matching_sites_for_trial_with_patients
/Users/sashamalysheva/uber_trial/.venv/lib/python3.11/site-packages/pydantic/_internal/_generate_schema.py:386: UserWarning: <built-in function any> is not a Python type (it may be an instance of an object), Pydantic will allow any object with no validation since we cannot even enforce that the input is an instance of the given type. To get rid of this error wrap the type with `pydantic.SkipValidation`.
  warn(

Analyzing sites for trial: Phase 2 Study in Advanced Solid Tumors
================================================================================

Analyzed 10 sites:
================================================================================

Site: Site 0
Compatibility Score: 100.0%

Compatible Features:
  ✓ procedures
  ✓ equipment
  ✓ facilities
  ✓ lab_certifications
  ✓ languages
  ✓ icf_localization
  ✓ budget_per_patient
  ✓ payment_format
  ✓ payment_system
  ✓ trial_countries

Eligible Patients: 15/300 (5.0%)

Rejection reasons at this site:
  - diagnosis_date: 235 patients (78.3%)
  - performance_status: 68 patients (22.7%)
  - ethnicity: 39 patients (13.0%)
  - comorbidities: 103 patients (34.3%)
  - lab_values: 38 patients (12.7%)
  - age: 51 patients (17.0%)

--------------------------------------------------------------------------------
Site: Site 5
Compatibility Score: 100.0%

Compatible Features:
  ✓ procedures
  ✓ equipment
  ✓ facilities
  ✓ lab_certifications
  ✓ languages
  ✓ icf_localization
  ✓ budget_per_patient
  ✓ payment_format
  ✓ payment_system
  ✓ trial_countries

Eligible Patients: 25/300 (8.3%)

Rejection reasons at this site:
  - age: 59 patients (19.7%)
  - diagnosis_date: 234 patients (78.0%)
  - performance_status: 58 patients (19.3%)
  - lab_values: 34 patients (11.3%)
  - comorbidities: 99 patients (33.0%)
  - ethnicity: 30 patients (10.0%)

--------------------------------------------------------------------------------
Site: Site 6
Compatibility Score: 100.0%

Compatible Features:
  ✓ procedures
  ✓ equipment
  ✓ facilities
  ✓ lab_certifications
  ✓ languages
  ✓ icf_localization
  ✓ budget_per_patient
  ✓ payment_format
  ✓ payment_system
  ✓ trial_countries

Eligible Patients: 22/300 (7.3%)

Rejection reasons at this site:
  - diagnosis_date: 239 patients (79.7%)
  - comorbidities: 98 patients (32.7%)
  - performance_status: 78 patients (26.0%)
  - age: 53 patients (17.7%)
  - ethnicity: 37 patients (12.3%)
  - lab_values: 31 patients (10.3%)

--------------------------------------------------------------------------------
Site: Site 7
Compatibility Score: 100.0%

Compatible Features:
  ✓ procedures
  ✓ equipment
  ✓ facilities
  ✓ lab_certifications
  ✓ languages
  ✓ icf_localization
  ✓ budget_per_patient
  ✓ payment_format
  ✓ payment_system
  ✓ trial_countries

Eligible Patients: 22/300 (7.3%)

Rejection reasons at this site:
  - age: 64 patients (21.3%)
  - diagnosis_date: 245 patients (81.7%)
  - performance_status: 85 patients (28.3%)
  - lab_values: 41 patients (13.7%)
  - comorbidities: 94 patients (31.3%)
  - ethnicity: 36 patients (12.0%)

--------------------------------------------------------------------------------
Site: Site 8
Compatibility Score: 100.0%

Compatible Features:
  ✓ procedures
  ✓ equipment
  ✓ facilities
  ✓ lab_certifications
  ✓ languages
  ✓ icf_localization
  ✓ budget_per_patient
  ✓ payment_format
  ✓ payment_system
  ✓ trial_countries

Eligible Patients: 19/300 (6.3%)

Rejection reasons at this site:
  - age: 47 patients (15.7%)
  - diagnosis_date: 237 patients (79.0%)
  - comorbidities: 101 patients (33.7%)
  - ethnicity: 36 patients (12.0%)
  - performance_status: 76 patients (25.3%)
  - lab_values: 39 patients (13.0%)

--------------------------------------------------------------------------------
Site: Site 9
Compatibility Score: 100.0%

Compatible Features:
  ✓ procedures
  ✓ equipment
  ✓ facilities
  ✓ lab_certifications
  ✓ languages
  ✓ icf_localization
  ✓ budget_per_patient
  ✓ payment_format
  ✓ payment_system
  ✓ trial_countries

Eligible Patients: 23/300 (7.7%)

Rejection reasons at this site:
  - age: 54 patients (18.0%)
  - diagnosis_date: 238 patients (79.3%)
  - performance_status: 87 patients (29.0%)
  - comorbidities: 99 patients (33.0%)
  - ethnicity: 32 patients (10.7%)
  - lab_values: 46 patients (15.3%)

--------------------------------------------------------------------------------
Site: Site 1
Compatibility Score: 67.0%

Compatible Features:
  ✓ procedures
  ✓ lab_certifications
  ✓ languages
  ✓ icf_localization
  ✓ payment_format
  ✓ payment_system
  ✓ trial_countries

Incompatible Features:
  ✗ equipment: Missing required items: centrifuge, fridge_2to8c, infusion_pump, barcode_scanner
    Site has: spirometer, vitals_monitor, balance_scale, temperature_logger, ecg_machine
    Trial needs: centrifuge, ecg_machine, fridge_2to8c, vitals_monitor, infusion_pump, balance_scale, spirometer, temperature_logger, barcode_scanner
  ✗ facilities: Missing required items: storage_room, secure_drug_cabinet, temperature_controlled_room, archive_room, locked_document_storage
    Site has: procedure_room, patient_waiting_area, sample_prep_area, emergency_equipment_area
    Trial needs: storage_room, procedure_room, secure_drug_cabinet, temperature_controlled_room, archive_room, locked_document_storage, patient_waiting_area, sample_prep_area
  ✗ budget_per_patient: Site value 3500.0 is less than required 5000.0
    Site value: 3500
    Trial value: 5000

Eligible Patients: 16/300 (5.3%)

Rejection reasons at this site:
  - lab_values: 38 patients (12.7%)
  - ethnicity: 39 patients (13.0%)
  - diagnosis_date: 241 patients (80.3%)
  - comorbidities: 105 patients (35.0%)
  - age: 64 patients (21.3%)
  - performance_status: 80 patients (26.7%)

--------------------------------------------------------------------------------
Site: Site 3
Compatibility Score: 67.0%

Compatible Features:
  ✓ procedures
  ✓ lab_certifications
  ✓ languages
  ✓ icf_localization
  ✓ payment_format
  ✓ payment_system
  ✓ trial_countries

Incompatible Features:
  ✗ equipment: Missing required items: centrifuge, fridge_2to8c, infusion_pump, barcode_scanner
    Site has: spirometer, vitals_monitor, balance_scale, temperature_logger, ecg_machine
    Trial needs: centrifuge, ecg_machine, fridge_2to8c, vitals_monitor, infusion_pump, balance_scale, spirometer, temperature_logger, barcode_scanner
  ✗ facilities: Missing required items: storage_room, secure_drug_cabinet, temperature_controlled_room, archive_room, locked_document_storage
    Site has: procedure_room, patient_waiting_area, sample_prep_area, emergency_equipment_area
    Trial needs: storage_room, procedure_room, secure_drug_cabinet, temperature_controlled_room, archive_room, locked_document_storage, patient_waiting_area, sample_prep_area
  ✗ budget_per_patient: Site value 4000.0 is less than required 5000.0
    Site value: 4000
    Trial value: 5000

Eligible Patients: 16/300 (5.3%)

Rejection reasons at this site:
  - age: 58 patients (19.3%)
  - diagnosis_date: 239 patients (79.7%)
  - comorbidities: 114 patients (38.0%)
  - ethnicity: 37 patients (12.3%)
  - performance_status: 84 patients (28.0%)
  - lab_values: 39 patients (13.0%)

--------------------------------------------------------------------------------
Site: Site 4
Compatibility Score: 67.0%

Compatible Features:
  ✓ procedures
  ✓ lab_certifications
  ✓ languages
  ✓ icf_localization
  ✓ payment_format
  ✓ payment_system
  ✓ trial_countries

Incompatible Features:
  ✗ equipment: Missing required items: balance_scale, spirometer, temperature_logger, barcode_scanner
    Site has: freezer_-80c, centrifuge, ecg_machine, fridge_2to8c, vitals_monitor, infusion_pump
    Trial needs: centrifuge, ecg_machine, fridge_2to8c, vitals_monitor, infusion_pump, balance_scale, spirometer, temperature_logger, barcode_scanner
  ✗ facilities: Missing required items: locked_document_storage, patient_waiting_area, sample_prep_area
    Site has: storage_room, procedure_room, secure_drug_cabinet, temperature_controlled_room, archive_room
    Trial needs: storage_room, procedure_room, secure_drug_cabinet, temperature_controlled_room, archive_room, locked_document_storage, patient_waiting_area, sample_prep_area
  ✗ budget_per_patient: Site value 3000.0 is less than required 5000.0
    Site value: 3000
    Trial value: 5000

Eligible Patients: 22/300 (7.3%)

Rejection reasons at this site:
  - diagnosis_date: 245 patients (81.7%)
  - comorbidities: 98 patients (32.7%)
  - lab_values: 33 patients (11.0%)
  - age: 54 patients (18.0%)
  - performance_status: 82 patients (27.3%)
  - ethnicity: 32 patients (10.7%)

--------------------------------------------------------------------------------
Site: Site 2
Compatibility Score: 50.5%

Compatible Features:
  ✓ procedures
  ✓ languages
  ✓ budget_per_patient
  ✓ payment_format
  ✓ payment_system

Incompatible Features:
  ✗ equipment: Missing required items: ecg_machine, infusion_pump, balance_scale, spirometer, temperature_logger
    Site has: freezer_-80c, centrifuge, fridge_2to8c, barcode_scanner, vitals_monitor
    Trial needs: centrifuge, ecg_machine, fridge_2to8c, vitals_monitor, infusion_pump, balance_scale, spirometer, temperature_logger, barcode_scanner
  ✗ facilities: Missing required items: procedure_room, locked_document_storage, patient_waiting_area
    Site has: storage_room, secure_drug_cabinet, temperature_controlled_room, archive_room, sample_prep_area
    Trial needs: storage_room, procedure_room, secure_drug_cabinet, temperature_controlled_room, archive_room, locked_document_storage, patient_waiting_area, sample_prep_area
  ✗ lab_certifications: Site value 0.0 is less than required 1.0
    Site value: False
    Trial value: True
  ✗ icf_localization: Site value 0.0 is less than required 1.0
    Site value: False
    Trial value: True
  ✗ trial_countries: No matching values found between site and trial
    Site has: japan, south_korea
    Trial needs: united_states, canada, germany, france, united_kingdom, spain, italy, brazil, india, australia

Eligible Patients: 22/300 (7.3%)

Rejection reasons at this site:
  - diagnosis_date: 240 patients (80.0%)
  - comorbidities: 114 patients (38.0%)
  - performance_status: 77 patients (25.7%)
  - lab_values: 39 patients (13.0%)
  - ethnicity: 40 patients (13.3%)
  - age: 51 patients (17.0%)

--------------------------------------------------------------------------------

Overall Statistics:
Total patients across all sites: 3000
Total eligible patients: 202 (6.7%)

Total rejection reasons across all sites:
  - diagnosis_date: 2393 patients (79.8%)
  - comorbidities: 1025 patients (34.2%)
  - performance_status: 775 patients (25.8%)
  - age: 555 patients (18.5%)
  - lab_values: 378 patients (12.6%)
  - ethnicity: 358 patients (11.9%)
(.venv) (base) sashamalysheva@Sashas-Air backend % 