
// global variables 
let userFormEl = document.querySelector("#user-form");
let nameInputEl = document.querySelector("#username");
let repoContainerEl = document.querySelector("#repos-container");
let repoSearchTerm = document.querySelector("#repo-search-term");

// find GitHub user repositories based off of user variable
var getUserRepos = function(user) {
        // format the github api url
        var apiUrl = "https://api.github.com/users/" + user + "/repos";
        // make a request to the url
        fetch(apiUrl)
            .then(function(response) {
                if (response.ok) {
                response.json().then(function(data) {
                    displayRepos(data, user);
                });
                } else {
                alert("Error: " + response.statusText);
                }
            })
            .catch(function(error) {
                alert("Unable to connect to GitHub")
            });
        };

getUserRepos();

// form submit handler
var formSubmitHandler = function(event) {
    event.preventDefault();
    // get value from input element 
    let username = nameInputEl.value.trim();

    if(username){
        getUserRepos(username);
        nameInputEl.value
      } else {
        alert("Please enter a GitHub username")
        
    }
};



userFormEl.addEventListener("submit", formSubmitHandler);

// display repository data
let displayRepos = function(repos, searchTerm) {
    // check if api returned any repos
    if (repos.length === 0) {
    repoContainerEl.textContent = "No repositories found.";
    return;
    }
    // clear old content
    repoContainerEl.innerHTML = "";
    // display search term
    repoSearchTerm.textContent = searchTerm;
    // loop over repos
    for (var i = 0; i < repos.length; i++) {
        // format repo name 
        var repoName = repos[i].owner.login + "/" + repos[i].name;

        // create container for each repo
        var repoEl = document.createElement("div");
        repoEl.classList = "list-item flex-row justify-space-between align-center";

        //create a span element to hold repository name 
        let titleEl = document.createElement("span");
        titleEl.textContent = repoName;

        // append to container 
        repoEl.appendChild(titleEl);
        
        // create a status element 
        var statusEl = document.createElement("span");
        statusEl.classList = "flex-row align-center";

        //check if current repo has issues or not
        if (repos[i].open_issues_count > 0) {
            statusEl.innerHTML = 
            "<i class = ' fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + " issue(s)";
        } else {
            statusEl.innerHTML = "<i class = 'fas fa-check-square status-icon icon-success'></i>"
        }

        // append to container
        repoEl.appendChild(statusEl);

        // append container to the DOM
        repoContainerEl.appendChild(repoEl);
    }
};







// var repoContainerEl = document.querySelector('#repos-container');
// var repoSearchTerm = document.querySelector('#repo-search-term');
// var userFormEl =document.querySelector('#user-form');
// var nameInputEl=document.querySelector('#username');
// var displayRepos = function(repos, searchTerm){
//   console.log(repos);
//   console.log(searchTerm);
//   //clear old content
//   repoContainerEl.textContent = '';
//   repoSearchTerm.textContent = searchTerm;
//   //loop over repos
//   for(var i=0; i < repos.length; i++){
//     //format repo name
//     var repoName = repos[i].owner.login + '/' + repos[i].name;
//     //create a container for each repo
//     var repoEl = document.createElement('div');
//     repoEl.classList = 'list-item flex-row justify-space-between align-center';
//     //create a span element to hold repository name
//     var titleEl = document.createElement('span');
//     titleEl.textContent = repoName;
//     //append to container
//     repoEl.appendChild(titleEl);
//     //append container to the dom
//     repoContainerEl.appendChild(repoEl);
//   }
// }
// var formSubmitHandler = function(event){
//   event.preventDefault();
//   //get value from input element
//   var username = nameInputEl.value.trim();
//   if(username){
//     getUserRepos(username);
//     nameInputEl.value
//   } else{
//     alert('please enter a GitHub username');
//   }
//   console.log(event)
// };
// var getUserRepos = function(user) {
//     // format the github api url
//     var apiUrl = "https://api.github.com/users/" + user + "/repos";
//     // make a request to the url
//     fetch(apiUrl).then(function(response) {
//       return(response.json());
//     })
//     .then(function(data) {
//       displayRepos(data, user);
//     });
//   };
// userFormEl.addEventListener('submit', formSubmitHandler);













 
