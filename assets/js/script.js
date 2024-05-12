const fetchButton = document.getElementById('search-btn');

function getApi() {
    const domainInputEl = document.getElementById('domainNameInput').value;
    console.log(domainInputEl);
    // replace `octocat` with anyone else's GitHub username
    const requestDomainAvailabilitytUrl = `https://domain-availability.whoisxmlapi.com/api/v1?apiKey=at_9KS02gBH2SXFd3z6A3DAisbYXKSBC&domainName=${domainInputEl}&credits=DA`;

    const requestDomainDataUrl = `https://www.whoisxmlapi.com/whoisserver/WhoisService?apiKey=at_9KS02gBH2SXFd3z6A3DAisbYXKSBC&domainName=${domainInputEl}&outputFormat=JSON`;

    fetch(requestDomainAvailabilitytUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
        });

    fetch(requestDomainDataUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(
                'Organization',
                data.WhoisRecord.administrativeContact.organization
            );
            console.log(data.WhoisRecord.administrativeContact.state);
            console.log(data.WhoisRecord.contactEmail);

            console.log(data);
        });
}

fetchButton.addEventListener('click', getApi);
