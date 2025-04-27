**Frontend Technical Specification for Uber Trial Platform**


### Page Flow & Module Structure

#### 0. Login
- User selects either **Sponsor** or **Site** mode
- Enters ordinal number (0–2 for sponsors, 0–9 for sites)
- On submit, performs one of:
  - `GET /api/v1/sites/lookup/{site_number}`
  - `GET /api/v1/sponsors/lookup/{sponsor_number}`
- Stores `site_id` or `sponsor_id` in session context
- Redirects to appropriate dashboard (Sponsor or Site)



Uber Trial’s core advantage is maintaining research sites in a state of constant readiness — just like Uber drivers have their license and car ready, our sites keep documents updated, staff certified, and infrastructure compliant at all times.
This allows startup times to shrink from months to days.
The system highlights any missing or expiring credentials so sites can proactively fix blockers — ensuring immediate responsiveness when sponsors reach out.

On the **Login screen**, consider including this tagline when a user selects a role:
> “Sites on Uber Trial stay ready to start — so startup takes days, not months.”


#### 1. Sponsor Mode
- **Landing (Sponsor Dashboard)**
  - Checks for invitations: `GET /api/v1/sponsors/{sponsor_number}/pending_invitations`
  - Displays modal if pending
  - Renders list of sponsor’s trials
- **Trial View**
  - Shows trial documents, enrollment stats, site statuses
  - Can open:
    - Site Matching (2.2)
    - Trial Creation (2.3)

#### 2. Site Mode
- **Landing (Site Dashboard)**
  - Checks for invitations: `GET /api/v1/sites/{site_number}/pending_invitations`
  - Displays modal if pending
  - Loads site-specific stats: `GET /api/v1/sites/{site_id}/analytics`
  - Renders trials the site is part of
- **Trial View**
  - If enrollment: opens Enrollment Board (3.1)
  - If document phase: opens document editor
  - If idle: option to find compatible trials (3.2)

#### 3. Shared Modal Flow
- Invitation acceptance/decline dialog uses POST endpoints from section 4
- New invitations from matching flows also use section 4

### UI Style Guidelines

The overall look and feel should evoke a modern, clean, and professional experience, similar in spirit to high-end AI platforms with elegant, futuristic design. While avoiding dark themes, the interface should maintain a sleek and sophisticated aesthetic.

Design principles:

- Use light backgrounds with subtle shadows and card-based layout
- Apply gentle gradients and translucent layers for overlays and modals (glass-like panels)
- Rounded corners and consistent spacing for a soft, user-friendly interface
- Color palette: calm neutrals and light cool tones (sky blue, pale gray, mint green) with accent colors for actions (blue for primary, green for success, red for alerts). Deep purples and soft violets may be used as accent colors for highlights, buttons, or navigation to create a sense of premium sophistication and align visually with our brand direction. (sky blue, pale gray, mint green) with accent colors for actions (blue for primary, green for success, red for alerts)
- Microinteractions and animations should feel smooth and natural but not distracting
- Minimalist iconography, high readability, and clinical typography — crisp sans-serif fonts with clear hierarchy

Typography, spacing, and interactions should all feel clinical but elegant, avoiding over-decoration and favoring data readability.

### 1. General Overview

This application is built using a modern React-based frontend stack, ideal for complex, data-driven interfaces with interactive workflows.

**Frontend Tech Stack Recommendation:**
- **React**: Core UI library
- **TypeScript**: Type-safe application development
- **Vite**: Fast development and optimized builds
- **TanStack Query (React Query)**: Efficient server state management and data fetching
- **Tailwind CSS**: Utility-first styling
- **Lucide React**: Modern iconography

This combination allows for real-time updates (e.g., auto-refresh in enrollment boards), modular component architecture (cards, modals, maps), and a clean, accessible UI with advanced filtering, transitions, and matching interactivity.


This frontend application is a clinical trial collaboration interface between sponsors and sites. There are two login modes:

- **Sponsor Login**: Authenticate with sponsor number (0-2)
- **Site Login**: Authenticate with site number (0-9)

Login is handled via:

```
GET /api/v1/sites/lookup/{site_number}
GET /api/v1/sponsors/lookup/{sponsor_number}
```

The `site_id` or `sponsor_id` from the response is stored as the user session context.

---

### 2. Sponsor Dashboard

Pending invitations are checked at login and periodically via:

```
GET /api/v1/sponsors/{sponsor_number}/pending_invitations
```

Returns:

- `sponsor_id`, `sponsor_name`
- `pending_invitations`: list of pending site requests with trial and site details
- `total_count`: for badge count or top bar indicator

Display:

- A modal or top-bar banner shows when new invitations are available
- Clicking it opens a dialog with each request, including:
  - Trial name
  - Site name
  - Option to approve or decline participation
    After login, the sponsor sees:
- **Top bar** with any new pending invitations from sites to join trials (modal UI for approval/rejection)
- **List of trials owned by the sponsor** (from `/api/v1/sponsors/{sponsor_id}`), shown as a compact summary list just under the dashboard header. Each entry shows:
  - Trial name
  - Trial status
  - Number of current participants (if any)

Hovering over a trial expands its preview with:

- If `status = enrollment`, show enrollment stats and growth chart
- If `status = document_review`, show editable document list with signature status and chat/comment thread
- If `status = idle`, allow sponsor to initiate site search

When a trial is clicked, full trial view opens (see 2.1), including detailed views for all participating sites (expect two sites per trial, both shown).

#### 2.1 Trial Detail View

Includes:

- Trial metadata (`GET /api/v1/trials/{trial_id}`)
- Trial document status and comment threads (custom components)
- Enrollment statistics:
  - Identified leads
  - Prescreened
  - Qualified
  - Enrolled
  - From `/api/v1/relationships/trials/{trial_id}/sites`
- List of all participating sites in the trial and their individual enrollment/contribution stats

#### 2.2 Site Matching

From trial view:

- Button to "Find Matching Sites"
- View powered by `/api/v1/trials/{trial_id}/find-matching-sites`
- Default view is a geographic **map** of candidate sites:
  - Each site displays total number of eligible patients (e.g., "25/300") directly on the map marker
  - On hover: show full compatibility score (percentage), breakdown of matched features, and summary of rejection reasons (e.g., diagnosis\_date, comorbidities)
  - Show pass/fail status for each feature group (procedures, equipment, etc.)
- Optional toggle button to switch to a **list view**:
  - Each site entry includes:
    - Compatibility score
    - List of compatible and incompatible features
    - Count of eligible vs total patients
    - Breakdown of rejection reasons by category (age, lab values, etc.)
- In both views (map or list), user can click to **send an invitation** for site participation

#### 2.3 Create New Trial

- Button "Create New Trial" appears below the list of sponsor trials
- Clicking it opens a dialog for uploading a **protocol PDF**
- After upload, the interface transitions to a two-pane layout:
  - **Left pane**: map view (like site matching)
    - Shows candidate sites with patient counts based on current trial criteria
    - Hover shows more info about the site
    - Toggle to switch to list view with more site details
  - **Right pane**: interactive trial feature editor
    - Based on `/api/v1/trials/{trial_id}/features`
    - Feature structure includes:
      - Procedures
      - Equipment
      - Facilities
      - Trial Countries
      - Languages
      - Payment Formats
      - Payment Systems
      - Inclusion/Exclusion Criteria (with nested values like age, gender, ethnicity, diagnosis stage, prior therapies, comorbidities, biomarkers, lab ranges, etc.)
    - All feature fields are booleans, ranges, or selection flags as in the JSON schema
    - Changing feature fields dynamically recalculates and updates site compatibility map or list

#### 2.4 Sponsor View: Site Matching Popups

When hovering or clicking on a site card (map or list), a dialog displays:

**Header:**
> “This site maintains constant readiness. Average startup time: 2 days.”

**Readiness Checklist:**
- `data_privacy_policy`: ✅
- `source_agreement`: ✅
- `sops_storage_monitoring`: ⚠️
- `eregulatory_binders`: ✅
- `source_templates`: ❌
- `iata_certification`: ✅

**Staff Readiness:**
- Total Staff: 16
- Ready Staff: 9/16 (56.3%)
- Checklist: CV, GCP, Medical License, Delegation of Authority
- Summary:
  - PI: 12 yrs, Sub-I: 16.7 yrs, CRC: 10 yrs, Pharmacist: 4 yrs, Lab: 16.3 yrs

**Patient Pool Summary:**
- Eligible: 25/300
- Age/Gender/Ethnicity breakdown
- Prior therapies: surgery, chemo, etc.
- Lab markers: neutrophils, hemoglobin, liver/kidney function


---

### 3. Site Dashboard

Pending invitations are checked at login and periodically via:

```
GET /api/v1/sites/{site_number}/pending_invitations
```

Returns:

- `site_id`, `site_name`
- `pending_invitations`: list of pending trial invites with sponsor and trial details
- `total_count`: for badge indicator or modal trigger

Display:

- On login, if any invitations exist, a **modal dialog** is shown listing each:
  - Trial title
  - Sponsor name
  - Compatibility score (if available)
  - Buttons: **Accept** or **Decline** invitation
- If skipped or postponed, re-accessible from a banner or top-right menu dropdown

Site-specific analytics are provided via:

```
GET /api/v1/sites/{site_id}/analytics
```

Includes:

- **Staff Statistics**
  - Total staff and role breakdown (PI, Sub-I, CRC, Lab, Pharmacist, etc.)
  - Certification status (CV, GCP, License, Delegation)
  - Average experience by role (in years)
  - List of staff members needing updates (certifications or role assignment)
- **Patient Statistics**
  - Age distribution by decade
  - Gender and ethnicity breakdown
  - Prior therapies distribution (e.g., surgery, chemo, immunotherapy)
  - Lab results (platelets, hemoglobin, neutrophils, liver/kidney function)

Displayed in a dashboard section at the top of the screen, with cards or expandable panels per category (staff, patients, labs, therapies, etc.)
After site login, the site sees:

- **Top section**: Incomplete staff credentials, missing equipment, etc. from `/api/v1/sites/{site_id}/analytics`

- **List of trials site is involved in** from `/api/v1/relationships/sites/{site_id}/trials`

  - For trials with `status = enrollment`, show enrollment board (see section 3.1)
  - For trials in `document_review`, show documents with editable fields and signature state
  - For idle or past trials, allow to search for new trials

Sidebar Navigation when we login to site:
📋 Trials
📈 Analytics
⚙️ Settings
👥 Staff Panel
📘 Site Readiness Details



#### 3.1 Enrollment Board

Used when site is actively recruiting:

- **Tabs**: Enrollment board is one of multiple tabs for an active trial (alongside Metrics & Analytics, Call Logs, and Settings)
- **Top Metrics Section**:
  - Enrolled Participants: Count and change indicator
  - Enrollment Target
  - Enrollment Progress (percent)
  - Identified Leads (w/ recent change)
  - Ongoing Outreach (in-progress contacts)
  - Prescreened count (initial filter complete)
- **Candidate Columns**:
  - Candidates are grouped into four stages:
    - **Not Eligible**: Manually marked or system-filtered out
    - **Identified Lead**: Discovered via EHR, referrals, or other intake channels (e.g., portal, social media)
    - **Qualified**: Approved by site staff, eligible for contact
    - **Ongoing Outreach**: Contact underway (call history, scheduled callbacks)
  - Each candidate card shows:
    - Full name
    - Source (e.g. "Patient Portal", "EHR")
    - Status tags: Prescreened, Visited, etc.
    - Interaction timeline:
      - Last contact attempt (timestamp)
      - Next scheduled call
      - Total prior calls/contacts
    - Action buttons:
      - Approve / Reject (in Identified Lead)
      - Start Outreach (in Qualified)
      - Call (in Outreach)
  - Dynamic refresh + filter tools (e.g., by source, status)
  - `GET /api/v1/relationships/sites/{site_id}/trials/{trial_id}` used to fetch all counts and candidate breakdowns

#### 3.2 Trial Matching View

- List of compatible trials from `/api/v1/sites/{site_id}/find-matching-trials`
- Each trial shows:
  - Trial name and phase
  - Compatibility score (percentage)
  - Count of eligible patients vs total (e.g., "15/300")
  - List of compatible features
  - List of incompatible features with detailed explanation (e.g., missing equipment, unsupported payment format, etc.)
  - Rejection reasons for patients grouped by cause (e.g., age, diagnosis date, gender)
- Allow applying to trial directly from the list
- If there are close-to-compatible trials, system should suggest **what equipment, facilities, or certifications the site can add** to become compatible ("recommendations to qualify")
- Add a "what-if" tool:
  - Toggle feature switches to simulate eligibility changes in real time
  - Updates count of eligible patients instantly
- Display trial map and allow switching to list mode (like site matching)
- Trial entries can also be filtered by therapeutic area, required budget, or country
- Allow sorting trials by match score or potential patient count`/api/v1/sites/{site_id}/find-matching-trials`
- Each trial shows how many patients match, what’s missing
- Allow applying to trial
- Add "what-if" tool: simulate adding equipment/certifications to see trial eligibility change
- Option to install additional hardware/tech shown to increase eligibility on trials where current match is low

---

### 4. Invitation API Usage

Invitation relationships between trials and sites are established and modified using the following endpoints:

#### Initiating Invitations
- `POST /api/v1/invitations/trial-invite-site/{trial_id}/{site_id}` — Sponsor invites site to join trial
- `POST /api/v1/invitations/site-invite-trial/{site_id}/{trial_id}` — Site expresses interest in joining a trial

#### Responding to Invitations (via modal UI)
- `POST /api/v1/invitations/trial-accept-site/{trial_id}/{site_id}` — Sponsor accepts site's request
- `POST /api/v1/invitations/site-accept-trial/{site_id}/{trial_id}` — Site accepts sponsor's invitation
- `POST /api/v1/invitations/trial-decline-site/{trial_id}/{site_id}` — Sponsor declines site's request
- `POST /api/v1/invitations/site-decline-trial/{site_id}/{trial_id}` — Site declines sponsor's invitation

These are used in modal dialogs shown upon login or notification triggers. Specifically:
- When a sponsor or site receives a new invitation (displayed at the top of the dashboard), they respond using these endpoints to **accept** or **decline**.
- When browsing matching sites or trials (e.g., via site matching or trial matching flows), the relevant invite endpoint is used to **send** a new invitation to the other party.

---

### 5. Shared Functionalities

#### Behavior After Accepting or Declining Invitations
- **When accepted**:
  - Sponsor: the site is added to the trial’s site list in Trial View
  - Site: the trial appears in the list of active trials
  - Both: auto-navigation opens the relevant trial view (Sponsor: site context visible, Site: trial-specific screen)
- **When invitation was sent but no response yet**:
  - Invitation remains in `pending` status for both parties
  - Trial/Site marked visually as "waiting for response"
- **When declined**:
  - Invitation is removed from both dashboards
  - Optional historical list (or status tag = Declined) may be retained for audit or retry later

#### Login Error Handling
- If entered ID is invalid or missing: display error message "Incorrect code, please try again"
- User remains on login screen with inputs preserved

#### Profile Management & Logout
- Both sponsor and site dashboards include an Account/Settings page
- For **Sites**, includes:
  - Site name, description, address, editable fields
- For **Sponsors**, includes:
  - Sponsor organization name, description, public contact info
- **Logout button** allows switching user type (returns to role select screen)

#### Trial Protocol File
- During trial creation, the protocol PDF is stored as part of the trial metadata
- No validation on content (can upload any PDF)
- The uploaded protocol is always accessible:
  - In sponsor view of the trial (persistent panel or sidebar button)
  - In site’s view when participating in that trial
- Clicking protocol opens embedded viewer or external tab download link


- Global filter and refresh components for each page
- Role-based routing and page rendering
- Local storage of login context (site/sponsor + ID)

---

### 6. API Summary by Feature

**Detailed Usage Notes**:

1. `GET /api/v1/relationships/sites/{site_id}/trials/{trial_id}`
   - This endpoint powers the enrollment board, document tabs, and the site-specific call log tabs within trial view.

2. `GET /api/v1/documents/sites/{site_id}/trials/{trial_id}`
   - Used in the document editor during the `document_review` phase to retrieve and track site-trial documents.

3. `GET /api/v1/relationships/trials/{trial_id}/sites`
   - Powers sponsor trial view: displays summary data and performance stats per participating site.

4. Advanced analytics endpoints (not required for MVP but reserved for future use):
   - `/api/v1/sites/analytics/staff`
   - `/api/v1/sites/analytics/patients`
   - `/api/v1/sites/analytics/certifications`
   - `/api/v1/sites/analytics/equipment`

   These can support future dashboard modules for advanced staff/patient/compliance breakdowns.


**Login**:

- `GET /api/v1/sites/lookup/{site_number}`
- `GET /api/v1/sponsors/lookup/{sponsor_number}`

**Trial & Site Info**:

- `GET /api/v1/relationships/sites/{site_id}/trials`
- `GET /api/v1/relationships/trials/{trial_id}/sites`
- `GET /api/v1/relationships/sites/{site_id}/trials/{trial_id}`

**Matching & Analytics**:

- `GET /api/v1/trials/{trial_id}/find-matching-sites`
- `GET /api/v1/sites/{site_id}/find-matching-trials`
- `GET /api/v1/sites/{site_id}/analytics`

**Sponsor Data**:

- `GET /api/v1/sponsors/{sponsor_id}`

**Trial Creation**:

- `POST /api/v1/trials/create`
- `GET /api/v1/trials/{trial_id}/features`

---

### 7. UX Enhancements & Design Additions

#### Empty States
- For dashboards and list pages with no data, display helpful and friendly messages:
  - "No invitations at the moment. You’ll see new requests here."
  - "You are not participating in any trials yet."
  - "Adjust filters to discover more matches."

#### Unified Modal Styling
- All modals (e.g., invitations, PDF viewer, trial creation) should follow a consistent design system:
  - Frosted-glass or light blur background
  - Centered card with rounded corners
  - Prominent title and clear call-to-action buttons (CTA)

#### Sidebar Navigation
- Introduce persistent left sidebar with key navigation icons:
  - 📋 Trials
  - 📈 Analytics
  - ⚙️ Settings
- Highlights active section and supports responsive collapse

#### Inline PDF Protocol Viewer
- Instead of downloading, protocol PDFs should be viewable inline within the trial screen
- Viewer includes:
  - Scrollable embedded panel
  - Sidebar with metadata: upload date, uploader, file size

#### Branded Purple CTA Components
- Establish a visually distinct action button style across the app using brand-consistent purple gradient
- Used for high-priority actions such as:
  - “Find Sites”
  - “Create Trial”
  - “Submit Matching Request”

### 8. Mock Components and Layouts

Please refer to attached design mockups:

- Enrollment Board screenshot
- Trial creation and editing UI (w/ compatibility impact)
- Site map/list view for sponsor matching

