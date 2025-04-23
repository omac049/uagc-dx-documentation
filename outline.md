#UAGC Digital Experience (DX) — Documentation Server Outline

A lightweight roadmap for creating, curating, and growing a self‑service hub that helps our small—but mighty—DX crew ship work faster and answer fewer "how do you guys do…?" pings.

##1 · Why This Exists ✅
    - Purpose: Central home for every repeatable task that keeps uagc.edu running—edits, launches, experiments, SEO, tracking.
    - Audience: Jason, Will, Brian, Anthony, Omar, Brandy, Thomas + anyone we onboard next.
    - Success Looks Like  ↘ time‑to‑answer, ↘ QA slips, ↘ Slack back‑and‑forth; ↗ first‑call resolution.

##2 · Who Does What — Roles, Responsibilities & Contacts ✅
    - Leadership & Governance
        - Person
          - Thomas
        - Title
          - DX Director / Product Owner
        - Core Responsibilities
          - Sets roadmap & priorities; leads weekly DX stand‑ups; final release approver; escalation point
        - Person
          - Brandy
        - Title
          - Digital Marketing & Web Operations Manager
        - Core Responsibilities
          - Owns DX governance; manages Asana board hygiene; CMS permissions & training, implement roadmap guides

    - Drupal Engineering
        - Person
          - Jason
        - Title
          - Senior Backend Drupal Engineer
        - Core Responsibilities
          - Drupal architecture & custom modules; configuration management & env parity; performance/security remediation
        - Person
          - Will
        - Title
          - Backend Engineer
        - Core Responsibilities
          - Implements API endpoints & unit tests; maintains CI jobs; hotfix/patch pipeline; regression‑test liaison

      - Front‑End, QA & Experimentation
        - Person
          - Brian
        - Title
          - Front‑End Dev & QA Lead
        - Core Responsibilities
          - Component library & global styles; WCAG 2.2 AA accessibility; QA test plans; visual regression & device farm
        - Person
          - Anthony
        - Title
          - Front‑End Developer & Experiment Engineer
        - Core Responsibilities
          - Builds Optimizely tests & templates; maintains dataLayer pushes; coordinates pre‑launch QA & analytics

    - SEO & Analytics
        - Person
          - Omar
        - Title
          - SEO & Tracking Manager
        - Core Responsibilities
          - Technical & content SEO; keyword & URL taxonomy; GA4 & GTM governance; BigQuery pipelines; event tag validation, RFI to Lead API documentation, overall strategy, lead mapping 

##3 · Asana ✅
    - Pick a template
      - Page Update 
      - Delete/Redirect
      - New Feature
      - Bug
      - Documentation
    - Fill the basics
        - Title
        - URL(s)
        - What‑success‑looks‑like 
        - Priority 
        - due date
    - Auto‑assign  Asana rules drop the task into the right board column and ping Thomas/Brandy for triage
    - Flow  Backlog → In Progress → Peer Review → Staging QA → Done → Deploy note posted in #groupchat

##4 · "Request Information" Form (Quick‑Guide) ✅
    - How lead forms (RFI) operate, and what data pass to LEAD_API 
    - Why it matters  Biggest source of inquiries → $$$  - Enrollments
    - Owners  Anthony (front‑end) · Omar (tracking/SEO)
    - Change request checklist
        - Log an Asana "RF Change" task
        - Describe the tweak (label, field, validation, tracking)   
    - Anthony prototypes → Brian QA's → Omar checks data layer → Brandy schedules publish
    - Post‑launch: verify leads + GA event in dashboard
    - Deep‑dive  Link out to detailed tech spec (lives in "Dev Reference" folder)

##5 · Day‑to‑Day Ops (High Level) ✅
    - Content Edits  Dx Team member updates via Drupal admin, Brian QA, publishes
    - Experiments  Anthony creates → Brian QA → Omar veries GA events→ Go live → Add to changelog
    - SEO Sweeps  Omar runs a monthly audit → logs tasks for fixes/redirects
    - List of redirects  
    - Schema mark up (Json) errors
    - Broken links
    - Releases  Monday, week of deployment cut-off; Jason owns backend deploy, Thomas signs off

##6 · Docs We'll Write First (and Next) ✅
    - MVP — First Five
        1. Getting Started — ✅
            a. access the doc platform, 
            b. Use a template, open an Asana "Doc Request" task 
        2. Add / Remove / Redirect a Page — 5‑step checklist ✅
        3. Spin Up an Optimizely Test — Strategy brief → ticket →Build→Track→QA→ launch ✅
        4. Basic SEO Hygiene — Onpage, technical seo ✅
        5. QA Smoke Test — links, forms, console errors ✅
    - Next Wave 
        6. Accessibility & Inclusive Design — WCAG 2.2 AA quick reference ✅
            a. Website brand guidelines 
            b. Website design blocks
            c. Form blocks
        7. Drupal Coding Standards & Snippet Library ✅
        8. SEO Redirect Decision Tree — when & how to 301 vs. canonical ✅
        9. Analytics Tagging Cookbook — GA4 event + GTM dataLayer recipes ✅
        10. Performance & Core Web Vitals Playbook — monitoring + fixes ✅
        11. Privacy, Consent & Cookie Governance ✅
        12. Release Checklist & Incident Rollback Procedure ✅
        13. Glossary of Internal Acronyms & Naming Conventions ✅

## 7 · Publish & Keep Fresh ✅
    - Workflow ✅
    - Quality Guardrails ✅
    - Quarterly "Docs Day" ✅ Block 2 hrs; each owner reviews their section, retires stale bits

##8 · Growth Roadmap ✅

### Phase
1 · MVP ✅
2 · Team Onboard ✅
3 · Automation ✅
4 · Insights ✅

### Goal
1. Home page, templates, top‑5 guides ✅
2. Asana form live, everyone writes one doc ✅
3. Linting, search, Slack bots ✅
4. GA dashboard for doc usage, feedback widget ✅

### When
1. Weeks 1‑2 ✅
2. Weeks 3‑4 ✅
3. Month 2 ✅
4. Month 3+ ✅


