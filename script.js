
const jobs = [
  {
    id: 1,
    companyName: "Mobile First Corp",
    position: "React Native Developer",
    location: "Remote",
    type: "Full-time",
    salary: "$130,000 - $170,000",
    description: "Build cross-platform mobile applications using React Native. Work on products used by millions of users worldwide.",
    status: "not-applied"
  },
  {
    id: 2,
    companyName: "WebFlow Agency",
    position: "Web Designer & Developer",
    location: "Los Angeles, CA",
    type: "Part-time",
    salary: "$80,000 - $120,000",
    description: "Create stunning web experiences for high-profile clients. Bring modern design trends and clean frontend code together.",
    status: "not-applied"
  },
  {
    id: 3,
    companyName: "DataViz Solutions",
    position: "Data Visualization Specialist",
    location: "Boston, MA",
    type: "Full-time",
    salary: "$115,000 - $155,000",
    description: "Transform complex data into compelling visualizations using D3.js and React.",
    status: "not-applied"
  },
  {
    id: 4,
    companyName: "CloudFirst Inc",
    position: "Backend Developer",
    location: "Seattle, WA",
    type: "Full-time",
    salary: "$140,000 - $180,000",
    description: "Design and maintain scalable backend systems using Python and AWS.",
    status: "not-applied"
  },
  {
    id: 5,
    companyName: "Innovation Labs",
    position: "UI/UX Engineer",
    location: "Austin, TX",
    type: "Full-time",
    salary: "$100,000 - $150,000",
    description: "Create beautiful and functional user interfaces for modern digital products.",
    status: "not-applied"
  },
  {
    id: 6,
    companyName: "TechNova",
    position: "Frontend Developer",
    location: "New York, NY",
    type: "Remote",
    salary: "$95,000 - $135,000",
    description: "Develop responsive web interfaces with JavaScript, HTML, CSS, and React.",
    status: "not-applied"
  },
  {
    id: 7,
    companyName: "PixelCraft Studio",
    position: "Junior Graphic Designer",
    location: "Chicago, IL",
    type: "Contract",
    salary: "$55,000 - $75,000",
    description: "Design digital experiences, marketing materials, and visual assets.",
    status: "not-applied"
  },
  {
    id: 8,
    companyName: "NextGen Systems",
    position: "Software Engineer",
    location: "Denver, CO",
    type: "Full-time",
    salary: "$110,000 - $160,000",
    description: "Build and test reliable software features and improve application performance.",
    status: "not-applied"
  }
];


// Active filter
let activeFilter = "all";


// jobs list
const jobsList = document.getElementById("jobs-list");


//  dashboard counts
function getCounts() {

  return {
    all: jobs.length,

    interview: jobs.filter(
      job => job.status === "interview"
    ).length,

    rejected: jobs.filter(
      job => job.status === "rejected"
    ).length
  };

}


// new dashboard
function updateDashboard() {

  const counts = getCounts();

  document.getElementById("total-count").textContent =
    counts.all;

  document.getElementById("interview-count").textContent =
    counts.interview;

  document.getElementById("rejected-count").textContent =
    counts.rejected;


  // new  tab counts
  document.getElementById("all-tab-count").textContent =
    counts.all;

  document.getElementById("interview-tab-count").textContent =
    counts.interview;

  document.getElementById("rejected-tab-count").textContent =
    counts.rejected;

}


// Create job card
function createJobCard(job) {

  const statusText = {
    "not-applied": "Not Applied",
    interview: "Interview",
    rejected: "Rejected"
  }[job.status];


  return `
  <article class="job-card border-b border-slate-200 p-5 md:p-6"
    data-job-id="${job.id}">

    <div class="flex justify-between items-start gap-4">

      <div class="job-main flex-1">

        <h3 class="company-name text-lg font-bold text-slate-800">
          ${job.companyName}
        </h3>

        <p class="position text-sm text-slate-600 mt-1">
          ${job.position}
        </p>

        <div class="job-meta flex flex-wrap gap-4 text-xs text-slate-500 mt-4">
          <span> ${job.location}</span>
          <span>◷ ${job.type}</span>
          <span>▣ ${job.salary}</span>
        </div>

        <p class="job-description text-sm text-slate-600 mt-4">
          ${job.description}
        </p>

        <div class="status-line mt-4">
          <span class="status-badge inline-block rounded-full px-3 py-1 text-xs font-semibold
            ${
              job.status === "interview"
                ? "bg-green-100 text-green-700"
                : job.status === "rejected"
                ? "bg-red-100 text-red-700"
                : "bg-blue-100 text-blue-700"
            }">
            ${statusText}
          </span>
        </div>

        <div class="job-actions flex flex-wrap gap-3 mt-5">

          <button
            class="btn btn-sm ${
              job.status === "interview"
                ? "btn-success"
                : "btn-outline btn-success"
            }"
            data-action="interview"
            type="button">
            Interview
          </button>

          <button
            class="btn btn-sm ${
              job.status === "rejected"
                ? "btn-error"
                : "btn-outline btn-error"
            }"
            data-action="rejected"
            type="button">
            Rejected
          </button>

        </div>

      </div>

      <!-- Delete Button at Right Side -->
      <button
        class="btn btn-ghost btn-sm text-red-500 shrink-0"
        data-action="delete"
        type="button"
        aria-label="Delete job">
        🗑
      </button>

    </div>

  </article>
`;   }

// Render jobs
function renderJobs() {

  const filteredJobs = activeFilter === "all"
    ? jobs
    : jobs.filter(
        job => job.status === activeFilter
      );


  // Update visible count
  document.getElementById("visible-count").textContent =
    filteredJobs.length;


  // Empty state
  if (filteredJobs.length === 0) {

    const message = activeFilter === "interview"
      ? "No interview applications yet"
      : activeFilter === "rejected"
      ? "No rejected applications"
      : "No jobs available";


    const subtitle = activeFilter === "interview"
      ? "Jobs you move to Interview will appear here."
      : activeFilter === "rejected"
      ? "Applications marked Rejected will appear here."
      : "Your job opportunities will appear here.";


    jobsList.innerHTML = `
      <div class="empty-state text-center py-16 px-4">

        <div class="empty-icon text-4xl mb-4">
          📄
        </div>

        <h3 class="text-lg font-bold text-slate-700">
          ${message}
        </h3>

        <p class="text-sm text-slate-500 mt-2">
          ${subtitle}
        </p>

      </div>
    `;

    return;

  }


  // job cards
  jobsList.innerHTML = filteredJobs
    .map(createJobCard)
    .join("");

}

//  filter
function setFilter(filter) {

  activeFilter = filter;


  document.querySelectorAll("[data-filter]").forEach(tab => {

    const isActive = tab.dataset.filter === filter;

    tab.classList.toggle("tab-active", isActive);

    tab.setAttribute(
      "aria-selected",
      String(isActive)
    );

  });


  renderJobs();

}


// Tab event listener
// Tab Event Listener
document.querySelector(".job-tabs").addEventListener("click", event => {

      const tab = event.target.closest("[data-filter]");

  if (tab) {
    setFilter(tab.dataset.filter);
  }

});


// Event delegation for job cards
jobsList.addEventListener("click", event => {

  const button = event.target.closest("[data-action]");

  if (!button) 
    return;


  const card = button.closest("[data-job-id]");

  if (!card)
     return;


  const jobId = Number(card.dataset.jobId);


  const jobIndex = jobs.findIndex(
    job => job.id === jobId
  );

  if (jobIndex === -1) return;


  const action = button.dataset.action;


  // Delete job
  if (action === "delete") {

    jobs.splice(jobIndex, 1);

  }


  //interview r rejected
  else if (
    action === "interview" ||
    action === "rejected"
  ) {

    if (jobs[jobIndex].status === action) {

      jobs[jobIndex].status = "not-applied";

    } else {

      jobs[jobIndex].status = action;

    }

  }

  updateDashboard();

  renderJobs();

});



updateDashboard();

renderJobs();

