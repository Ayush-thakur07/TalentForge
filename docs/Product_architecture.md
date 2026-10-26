# TalentForge Product Architecture

## 1. Product Vision

TalentForge is an evidence-first university talent intelligence
platform connecting student projects, artifacts, evaluations,
verified skills, and career opportunities.

TalentForge is designed to move beyond self-declared skills and
traditional resumes by connecting skills to demonstrable evidence.

---

## 2. Core Product Principle

TalentForge follows the evidence chain:

Student
→ Project
→ Submission
→ Artifact
→ Evidence
→ Evaluation
→ Verified Skill
→ Opportunity

A student's skill should become stronger as trustworthy evidence
and evaluations accumulate.

---

## 3. Primary Actors

### Student

Students use TalentForge to:

- create and participate in projects
- submit project work
- build evidence of their abilities
- receive faculty evaluations
- develop verified skills
- maintain their professional talent profile
- discover opportunities

### Faculty

Faculty use TalentForge to:

- manage courses and assignments
- review student projects
- inspect project evidence
- evaluate submissions using rubrics
- provide feedback
- verify demonstrated skills
- perform re-evaluations

### Recruiter

Recruiters use TalentForge to:

- define talent requirements
- discover relevant candidates
- search verified skills
- inspect project evidence
- view candidate proof dossiers
- shortlist candidates
- manage opportunities

### University Administrator

University administrators use TalentForge to:

- manage institutional data
- monitor student development
- monitor faculty evaluation activity
- analyze skill distributions
- identify skill gaps
- monitor employability trends
- generate institutional reports

---

## 4. Core Domains

TalentForge consists of the following domains:

### Identity & Access

Responsible for:

- users
- authentication
- roles
- permissions
- institutional membership

### Academic

Responsible for:

- institutions
- departments
- courses
- enrollments
- assignments

### Projects

Responsible for:

- projects
- project members
- project roles
- project lifecycle

### Submissions & Artifacts

Responsible for:

- project submissions
- versions
- repositories
- documentation
- demonstrations
- technical artifacts

### Evaluation

Responsible for:

- rubrics
- rubric criteria
- evaluation levels
- faculty evaluations
- evaluation feedback
- re-evaluations

### Evidence

Responsible for:

- evidence generated from student work
- faculty evidence
- project evidence
- Git evidence
- testing evidence
- verification history

### Skills & Verification

Responsible for:

- skill taxonomy
- demonstrated skills
- verification
- proficiency
- evidence-to-skill relationships

### Recruitment

Responsible for:

- opportunities
- recruiter requirements
- candidate discovery
- shortlists
- applications

### Governance & Audit

Responsible for:

- audit history
- important system events
- evaluation history
- data access
- institutional boundaries

---

## 5. Core Evidence Model

The central TalentForge relationship is:

Student
→ creates/joins Project
→ produces Submission
→ produces Artifacts
→ generates Evidence
→ receives Evaluation
→ demonstrates Skill
→ becomes discoverable for Opportunities

Evidence must remain distinguishable from evaluation.

For example:

"42 Git commits" is evidence.

It does not automatically mean that the student is an
excellent developer.

Faculty evaluation and other trusted verification mechanisms
provide additional evidence about competency.

---

## 6. Initial Core Entities

### Identity

- User
- Institution
- Department
- Student Profile
- Faculty Profile
- Recruiter Profile

### Academic

- Course
- Course Enrollment
- Assignment

### Projects

- Project
- Project Member
- Project Role

### Submissions

- Submission
- Artifact

### Evaluation

- Rubric
- Rubric Criterion
- Rubric Level
- Evaluation
- Evaluation Score
- Evaluation Feedback

### Evidence

- Evidence
- Skill
- Skill Evidence
- Skill Verification

### Recruitment

- Opportunity
- Opportunity Requirement
- Application
- Shortlist

### Governance

- Audit Log

---

## 7. Architectural Principle

TalentForge should be designed so that the user interfaces
are consumers of the underlying evidence and evaluation system.

The system should not depend on manually entered dashboard
statistics.

For example:

Faculty Dashboard
← Evaluation Data

Student Skill Profile
← Evidence + Verification Data

Recruiter Talent Search
← Verified Skills + Evidence

University Analytics
← Aggregated Institutional Data

---

## 8. Product Evolution

### V1 — Core TalentForge

Focus on:

- authentication
- student profiles
- faculty profiles
- courses
- projects
- submissions
- artifacts
- rubrics
- evaluations
- evidence
- skills

### V2 — Evidence Intelligence

Introduce:

- Git integration
- CI/test evidence
- contribution analysis
- evidence timeline
- AI review assistance

### V3 — Talent Intelligence

Introduce:

- recruiter search
- candidate proof dossier
- opportunity matching
- talent pools
- recruiter workflows

### V4 — University Intelligence

Introduce:

- institutional analytics
- skill gap analysis
- employability intelligence
- accreditation/reporting support

### V5 — Advanced Ecosystem

Potential future capabilities:

- advanced AI
- cross-institution talent discovery
- industry verification
- external benchmarks
- LMS integrations
- advanced talent graph capabilities