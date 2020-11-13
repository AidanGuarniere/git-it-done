//reference to ussues container
var issueContainerEl = document.querySelector('#issues-container')

// get issues for selected repository 
var getRepoIssues = function(repo){
    var apiUrl = " https://api.github.com/repos/" + repo + "/issues?direction=asc";

    // fetch issue data 
    fetch(apiUrl).then(function(response) {
        // request was successful
        if (response.ok) {
            response.json().then(function(data) {
                // pass response data to DOM function
                displayIssues(data);
            });
        }
        // request failed 
        else {
            alert("There was a problem with your request!")
        }
    });
};
// call function
getRepoIssues("facebook/react");

var displayIssues = function(issues) {
    for (let i = 0; i < issues.length; i++) {
        
       // check for no issues
       if (issues.length === 0) {
           issueContainerEl.textContent = "This repo has no open issues!";
           return;
       }

       // create a link element to take users to the issue on GitHub
       var issueEl = document.createElement('a');
       issueEl.classList = "list-item flex-row justify-space-between align-center";
       issueEl.setAttribute("href", issues[i].html_url);
       issueEl.setAttribute("target", "_blank")

       // create  span to hold the issue title
       var titleEl = document.createElement("span");
       titleEl.textContent = issues[i].title;

       // append to container 
       issueEl.appendChild(titleEl);
       
       //create a type element
       var typeEl = document.createElement("span");
    
       // check if issue is an actual issue or a pull request
       if (issues[i].pull_request) {
           typeEl.textContent = "(Pull request)";
       } else {
           typeEl.textContent = "(Issue)";
       }

       // append to span
       issueEl.appendChild(typeEl)
       
       // append to container
       issueContainerEl.appendChild(issueEl);
       
    }
};

