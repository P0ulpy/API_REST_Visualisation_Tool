const DOM = 
{
    table : document.getElementById('table'),

    addClient : {
        id: document.getElementById('addClient-id'),
        nom: document.getElementById('addClient-nom'),
        prenom: document.getElementById('addClient-prenom'),
        telephone: document.getElementById('addClient-telephone'),
        button: document.getElementById('addClient-button'),
    },

    alterClient : {
        id: document.getElementById('alterClient-id'),
        nom: document.getElementById('alterClient-nom'),
        prenom: document.getElementById('alterClient-prenom'),
        button: document.getElementById('alterClient-button'),
    },
}

DOM.addClient.addEventListenner('click', addClient);
DOM.alterClient.addEventListenner('click', alterClient);


async function start()
{
    buildTable();
} 

async function buildTable()
{
    DOM.table.innerHTML = 
    `<tr>
        <td>id</td>
        <td>nom</td>
        <td>prenom</td>
        <td>telephone</td>
    </tr>`;

    const response = await fetch('http://127.0.0.1:8080/api_rest/webapi/clients');
    const text = await response.text();
    const clients = await JSON.parse(text);
    
    for(const client of clients)
    {
        DOM.table.innerHTML += 
        `<tr>
            <td>${client.id}</td>
            <td>${client.nom}</td>
            <td>${client.prenom}</td>
            <td>${client.telephone}</td>
        </tr>`;
    }
}

async function addClient()
{
    fetch('http://127.0.0.1:8080/api_rest/webapi/addClient', 
    {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body : JSON.stringify({
            id: DOM.addClient.id.value,
            nom: DOM.addClient.id.nom,
            prenom: DOM.addClient.id.prenom,
            telephone: DOM.addClient.id.telephone,
        })
    });
    
    buildTable();
}

async function alterClient()
{
    fetch(`http://127.0.0.1:8080/api_rest/webapi/alterClient/${DOM.alterClient.id.value}`, 
    {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body : JSON.stringify({
            nom: DOM.alterClient.id.nom,
            prenom: DOM.alterClient.id.prenom,
            telephone: DOM.alterClient.id.telephone,
        })
    });

    buildTable();
}

start();