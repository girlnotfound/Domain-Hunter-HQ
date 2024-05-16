const apiKey = `at_9KS02gBH2SXFd3z6A3DAisbYXKSBC`;

function checkDomain() {
    const domain = document.getElementById(`domainInput`).value.trim();
    console.log('domain: ' + domain);
    if (!domain) {
        showModal(`<strong>Please enter a domain name.</strong>`);
        return;
    }

    fetch(
        `https://domain-availability.whoisxmlapi.com/api/v1?apiKey=${apiKey}&domainName=${domain}&outputFormat=JSON`
    )
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            console.log(
                `data.DomainInfo.domainAvailability: ` +
                    data.DomainInfo.domainAvailability
            );
            if (data.DomainInfo.domainAvailability === `UNAVAILABLE`) {
                getRegistrantInfo(domain);
            } else {
                showModal(
                    `<strong>Domain <h2>"${domain}"</h2> is available.</strong>`
                );
            }
        })
        .catch((error) => console.error(`Error:`, error));
}

function getRegistrantInfo(domain) {
    fetch(
        `https://www.whoisxmlapi.com/whoisserver/WhoisService?apiKey=${apiKey}&domainName=${domain}&da=2&outputFormat=JSON`
    )
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            console.log(`
        Domain name: ${data.WhoisRecord.domainName}
        Domain availability: ${data.WhoisRecord.domainAvailability}

        Created date: ${data.WhoisRecord.createdDateNormalized}
        Expires date: ${data.WhoisRecord.expiresDateNormalized}

        ====================
        WhoisRecord.rawText: 
        ${data.WhoisRecord.rawText}
        
        ====================
        WhoisRecord.registryData.createdDateNormalized: ${data.WhoisRecord.registryData.createdDateNormalized}
        WhoisRecord.registryData.expiresDateNormalized: ${data.WhoisRecord.registryData.expiresDateNormalized}
        WhoisRecord.registryData.updatedDateNormalized: ${data.WhoisRecord.registryData.updatedDateNormalized}

        ====================
        WhoisRecord.registryData.rawText: 
        ${data.WhoisRecord.registryData.rawText}

        ====================
        WhoisRecord.registrant.rawText: 
        ${data.WhoisRecord.registrant.rawText}

        ====================
        WhoisRecord.administrativeContact.rawText: 
        ${data.WhoisRecord.administrativeContact.rawText}
        `);
            const registrantInfo = data?.WhoisRecord?.registrant;
            if (registrantInfo) {
                // Replace \n with <br> in raw text data
                // let registrantInfo = data.WhoisRecord.registrant.rawText;
                // registrantInfo = registrantInfo.replace(/(?:\r\n|\r|\n)/g, "<br>");
                // let registryData = data.WhoisRecord.registryData.rawText;
                // registryData = registryData.replace(/(?:\r\n|\r|\n)/g, "<br>");

                // Replace \n with <br><h3> and colon with </h3> in raw text data
                // let registrantInfo = data.WhoisRecord.registrant.rawText;
                // registrantInfo =
                //   "<h3>" +
                //   registrantInfo.replace(/\n/g, "<br><h3>").replace(/:/g, "</h3>");
                // let registryData = data.WhoisRecord.registryData.rawText;
                // registryData =
                //   "<h3>" +
                //   registryData.replace(/\n/g, "<br><h3>").replace(/:/g, "</h3>");

                // Replace \n with <br><strong> and colon with :</strong> in raw text data
                let registrantInfo = data.WhoisRecord.registrant.rawText;
                registrantInfo =
                    '<strong>' +
                    registrantInfo
                        .replace(/\n/g, '<br><strong>')
                        .replace(/:/g, ':</strong>');
                let registryData = data.WhoisRecord.registryData.rawText;
                registryData =
                    '<strong>' +
                    registryData
                        .replace(/\n/g, '<br><strong>')
                        .replace(/:/g, ':</strong>');

                const info = `
          <h2>Registration Availability:</h2>
          <strong>Domain Name:</strong> ${data.WhoisRecord.domainName}<br>
          <strong>Domain Availability:</strong> ${data.WhoisRecord.domainAvailability}<br>
          <br>
          <h2>Registrant info:</h2>
          ${registrantInfo}<br>
          <br>
          <h2>Registry data:</h2>
          ${registryData}<br>
          <br>
        `;
                showModal(info);
                saveToLocalStorage(domain, registrantInfo);
            } else {
                showModal(
                    `<strong>Registrant information not available.</strong>`
                );
            }
        })
        .catch((error) => console.error(`Error:`, error));
}

function showModal(content) {
    const modal = document.getElementById(`domainInfoModal`);
    const domainInfo = document.getElementById(`domainInfo`);
    domainInfo.innerHTML = content;
    modal.classList.add(`is-active`);
}

function closeModal() {
    const modal = document.getElementById(`domainInfoModal`);
    modal.classList.remove(`is-active`);
    document.getElementById(`domainInput`).value = ``;
}

// Need more details
function saveToLocalStorage(domain, registrantInfo) {
    const domainData = {
        name: registrantInfo.name,
        email: registrantInfo.email,
        phone: registrantInfo.telephone,
    };
    localStorage.setItem(domain, JSON.stringify(domainData));
}
