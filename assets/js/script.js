const repoList = document.querySelector('ul');
const fetchButton = document.getElementById('search-btn');

function getApi() {
    const domainInputEl = document.getElementById('domainNameInput').value;
    console.log(domainInputEl);
    // replace `octocat` with anyone else's GitHub username
    const requestUrl = `https://domain-availability.whoisxmlapi.com/api/v1?apiKey=at_9KS02gBH2SXFd3z6A3DAisbYXKSBC&domainName=${domainInputEl}&credits=DA`;

    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
        });

    // fetch(requestUrl)
    //     .then(function (response) {
    //         return response.json();
    //     })
    //     .then(function (data) {
    //         console.log(data);
    //     });
}

fetchButton.addEventListener('click', getApi);
