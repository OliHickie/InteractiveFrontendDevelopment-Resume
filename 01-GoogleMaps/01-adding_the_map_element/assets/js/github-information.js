function userInformationHTML(user) {  // console.log(user) will show all the objects you could display.
    return `<h2>${user.name}
                <span class="small-name">
                (@<a href="${user.html_url}" target="_blank">${user.login}</a>) 
                </span> 
            </h2>
            <div class="gh-content">
                <div class="gh-avatar">
                    <a href="${user.html_url} target="_blank">
                    <img src="${user.avatar_url}" width="80" height="80" alt="${user.login}"/>
                </div> 
                <p>Followers: ${user.followers} - Following ${user.following} <br> Repos:${user.public_repos}</p>
            </div>`; // The above is showing data and linking to github repo. 
}

function repoInformationHTML(repos) {
    if (repos.length == 0) {
        return `<div class="clearfix repo-list">No Repos!</div>`;
    }

    var listItemsHTML = repos.map(function(repo){
        return `<li>
                    <a href="${repo.html_url}" target="_blank">${repo.name}</a>
                </li>`;
    });

    return `<div class="clearfix repo-list">
                <p>
                    <strong>Repo List:</strong>
                </p>
                <ul>
                    ${listItemsHTML.join("\n")}
                </ul>
            </div>`
}

function fetchGitHubInformation(event) {
    $("#gh-user-data").html(""); // When function called sets to an empty string
    $("#gh-repo-data").html("");

    var username = $("#gh-username").val();

    if (!username) {
        $("#gh-user-data").html(`<h2>Please enter a GitHub username</h2>`); // This appears if no text in box
        return; // return out of the function to stop any search in github.
    }

    $("#gh-user-data").html(
        `<div id=loader"> <img src="assets/css/loader.gif" alt="loading..." /> </div>` // when typing in username, this loader.gif appears in empty div
    );

    $.when( // JQ promise
        $.getJSON(`https://api.github.com/users/${username}`),
        $.getJSON(`https://api.github.com/users/${username}/repos`) // function to retrieve github info
    ).then(
        function (firstResponse, secondResponse) { // two JSON = two responses
            var userData = firstResponse[0]; // show response in user data div
            var repoData = secondResponse[0]; //two resp gets packed as an array, so need the [0]. 
            $("#gh-user-data").html(userInformationHTML(userData));
            $("#gh-repo-data").html(repoInformationHTML(repoData));
        }, function (errorResponse) {
            if (errorResponse.status === 404) {
                $("gh-user-data").html(`<h2>No info found for user ${username}</h2>`); // if response is 404 the return text
            } else {
                console.log(errorResponse);
                $("#gh-user-data").html(
                    `<h2>Error: ${errorResponse.responseJSON.message}</h2>`); // if the error isn't a 404 error, then this will display the returned error message.
            }
        })
}

$(document).ready(fetchGitHubInformation); // When page is ready, fetch fct is called.