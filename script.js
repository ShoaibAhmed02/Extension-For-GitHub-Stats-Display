// Function to fetch GitHub user and repository information
async function fetchGitHubData(username) {
    try {
        // Fetch user data
        const userResponse = await fetch(`https://api.github.com/users/${username}`);
        const userData = await userResponse.json();

        // Fetch repository data
        const repoResponse = await fetch(`https://api.github.com/users/${username}/repos`);
        let repoData = await repoResponse.json();

        // Sort repositories in descending order by creation date
        repoData.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

        // Display user information
        document.getElementById("githubUsername").innerHTML = userData.login;
        document.getElementById("githubName").innerHTML = userData.name;
        document.getElementById("githubFollowers").innerHTML = userData.followers;
        document.getElementById("githubRepos").innerHTML = repoData.length;

        // Display repository information in three columns
        const repoContainer = document.getElementById("githubRepositoriesList");
        repoContainer.innerHTML = ''; // Clear existing content

        // Create a row div to hold the columns
        const rowDiv = document.createElement("div");
        rowDiv.className = "row";

        // Calculate the width for each column (33.3%)
        const columnWidth = 100 / 3;

        repoData.forEach(repo => {
            // Create a column div for each repository
            const columnDiv = document.createElement("div");
            columnDiv.className = "col-md-4 border p-3"; // Bootstrap class for 33.3% width in a row, added border and padding
            columnDiv.style.backgroundColor = "#f0f8ff"; // Light blue background color
            columnDiv.style.color = "#333"; // Dark text color
            columnDiv.textContent = `${repo.name} (${new Date(repo.created_at).toLocaleDateString()})`;

            // Append the column to the row
            rowDiv.appendChild(columnDiv);
        });

        // Append the row to the container
        repoContainer.appendChild(rowDiv);
    } catch (error) {
        console.error("Error fetching GitHub data:", error);
    }
}

// Call the function with your GitHub username
fetchGitHubData("shoaibahmed02");
