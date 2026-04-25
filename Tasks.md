## Task List
- [x] Landing Page
- [x] About Page
- [x] Authentication Page (keep track of every signed up user)
  - [ ] Separate between Admin Access & Student Access
- [ ] Search Page
  - [ ] Scrape agent for gaining access to all faculty per department
  - [ ] Search feature to go through specific professors
  - [ ] (Later) Search feature to go through specific classes
    - [ ] Per selected class, show grade distribution [A, B, C, D, F]
  - [x] Specific ratings per professor from AOC students
  - [x] Page for students to pick professor/class and choose rating
- [ ] Course Catalog (setup server endpoint)
  - [ ] Import from COC's API directly with easy search features
    - [ ] Filters: Course, Semester, Date (M/W vs T/TH)
    - [ ] Pull up similar data to display over tabs (Overview, Ratings, Grade)
  
### Tech Stack
- Frontend: Tailwind, Next, UI Plugins
- Backend: Firebase, Redis Caching
  
### Pitch to AOC
- [ ] Course Scheduler for AOC (use COCs API/Scrape) for Grijalva to use for online tracking
  - [ ] Create multiple different schedules saved as tabs
  - [ ] Add in specific COC + AOC courses scheduled to take (Academic Plans Saved Online)
  - [ ] Admin side, sorted by grade & alphabetical order when they have Grijalva appointment
  - [ ] Export & Share options