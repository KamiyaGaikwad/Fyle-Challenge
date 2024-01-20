let githubIdName = "johnpapa";
const apiUrl = `https://api.github.com/users/${githubIdName}/repos?per_page=100`;
let repositories = [];
let currentPage = 1;
const reposPerPage = 10;
let avatarImage = document.getElementById("avatar-image");
let userName = document.getElementById("user-name");
let userBio = document.getElementById("user-bio");
let userLocation = document.getElementById("user-location");
let userGithub = document.getElementById("user-github");
let userTwitter = document.getElementById("user-twitter");
const olderButton = document.getElementById('older-button');
const newerButton = document.getElementById('newer-button');
const paginationButtons = document.getElementById('pagination-buttons');
let repoListLength = 0;

  function showLoader() {
    document.getElementById('loader').style.display = 'block';
  }

  function hideLoader() {
    document.getElementById('loader').style.display = 'none';
  }

  function fetchUserDetails() {
    fetch(`https://api.github.com/users/${githubIdName}`)
      .then(response => response.json())
      .then(user => {
        avatarImage.src = `${user.avatar_url}`;
        userName.innerText = `${user.name}`;
        userBio.innerText = `${user.bio}`;
        userLocation.innerText = `${user.location}`;
        userGithub.href = `${user.html_url}`;
        userGithub.innerText = `${user.login}`;
        userTwitter.href = `https://twitter.com/${user.twitter_username}`;
        userTwitter.innerText = `${user.twitter_username}`;
      }
      );
  }

  function fetchRepositories() {
    showLoader();
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
          var elements = document.querySelectorAll('.toggle-up');
  
          elements.forEach(function(element) {
            element.classList.remove('toggle-up');
            element.classList.add('toggle-down');
          });
        repositories = data;
        hideLoader();
        displayRepos(currentPage);
        displayPagination();
      });
  }

  function filterRepositories() {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredRepos = repositories.filter(repo => repo.name.toLowerCase().includes(searchTerm));
    currentPage = 1;
    displayRepos(currentPage, filteredRepos);
    displayPagination();
  }

   function displayRepos(page, reposToDisplay) {
    const startIndex = (page - 1) * reposPerPage;
    const endIndex = startIndex + reposPerPage;
    const repos = reposToDisplay || repositories;
    const reposToDisplayOnPage = repos.slice(startIndex, endIndex);

    let repoList = '';
    let norepo = '<h2>No repositories found</h2>';
    let repoData='';
    reposToDisplayOnPage.forEach(repo => {
      repoList += `
        <div class="mb-3 d-flex flex-column border border-dark repo-div p-3">
          <h3 class="repo-name" title="${repo.name}">${repo.name}</h3>
          <p>${repo.description || ""}</p>
          <div class="d-flex flex-wrap gap-2">
            ${repo.topics.map(topic => `<h4><span class="badge text-bg-primary p-2 pt-1">${topic}</span></h4>`).join('')}
          </div>
        </div>
      `;
    });
    repoListLength = repoList.length;
    repoData = repoList.length == 0? norepo:repoList;

    document.getElementById('repo-list').innerHTML = repoData;
  }

  function displayPagination() {
    const totalPages = Math.ceil(repositories.length / reposPerPage);
    const pagination = document.getElementById('pagination');

    let paginationHtml = `
      <ul class="pagination justify-content-center ${window.innerWidth <= 576 ? 'pagination-sm' : ''}">
        <li class="page-item ${currentPage === 1 ? 'disabled' : ''}">
          <a class="page-link" href="#" onclick="changePage(${currentPage - 1})" aria-label="Previous">
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
    `;

    for (let i = 1; i <= totalPages; i++) {
      paginationHtml += `
        <li class="page-item ${currentPage === i ? 'active' : ''}">
          <a class="page-link" href="#" onclick="changePage(${i})">${i}</a>
        </li>
      `;
    }

    paginationHtml += `
        <li class="page-item ${currentPage === totalPages ? 'disabled' : ''}">
          <a class="page-link" href="#" onclick="changePage(${currentPage + 1})" aria-label="Next">
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    `;

    pagination.innerHTML = paginationHtml;
    olderButton.disabled = (currentPage === 1);
    newerButton.disabled = (currentPage === totalPages);
    pagination.style.display = repoListLength == 0? 'none':'block';
    olderButton.style.display = repoListLength == 0? 'none':'flex';
    newerButton.style.display = repoListLength == 0? 'none':'flex';
  }

  function changePage(page) {
    if (page >= 1 && page <= Math.ceil(repositories.length / reposPerPage)) {
      currentPage = page;
      displayRepos(currentPage);
      displayPagination();
    }
  }

  window.addEventListener('resize', function () {
    displayPagination();
  });

  document.addEventListener('DOMContentLoaded', function () {
    fetchUserDetails();
    fetchRepositories();
  });