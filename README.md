# Fyle-Challenge - Github Repositories listing page

This simple web application fetches and displays GitHub repositories for a specified user. It includes features like pagination, loader display, and repository filtering.

## Getting Started

1. Clone or download the repository to your local machine.

```
git clone https://github.com/KamiyaGaikwad/Fyle-Challenge.git
```

2. Navigate to the project directory.

```
cd Fyle-Challenge
```

3. Open the `index.html` file in your preferred web browser.

## Features

- **User Details:** Displayed at the top of the page, including avatar, name, bio, location, GitHub profile link, and Twitter link.
- **Repository List:** Displayed in a responsive manner, showing repository name, description, and topics.
- **Pagination:** Allows navigation through multiple pages of repositories.
- **Loader:** Displays a loader while repositories are being fetched.
- **Filtering:** Includes a search bar to filter repositories by name.

## Usage

1. Open the `index.html` file in a web browser.
2. View the user details, repositories, and pagination buttons.
3. Use the search bar to filter repositories based on their names.
4. Navigate through pages using the pagination buttons.

## Customization

- Adjust the `reposPerPage` variable to control the number of repositories displayed per page.
- Change the `githubIdName` variable with the desired GitHub username.

## Important Notes

- GitHub API requests are subject to rate limits. Be mindful of these limits to avoid disruptions.
- The code uses pagination to handle a large number of repositories.

## Acknowledgments

- Inspired by GitHub REST API v3 documentation.
