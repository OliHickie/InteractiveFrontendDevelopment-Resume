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

function fetchGitHubInformation(event) {

    var username = $("#gh-username").val();

    if (!username) {
        $("#gh-user-data").html(`<h2>Please enter a GitHub username</h2>`); // This appears if no text in box
        return; // return out of the function to stop any search in github.
    }

    $("#gh-user-data").html(
        `<div id=loader"> <img src="assets/css/loader.gif" alt="loading..." /> </div>` // when typing in username, this loader.gif appears in empty div
    );

    $.when( // JQ promise
        $.getJSON(`https://api.github.com/users/${username}`) // function to retrieve github info
    ).then(
        function (response) {
            var userData = response; // show response in user data div
            $("#gh-user-data").html(userInformationHTML(userData));
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