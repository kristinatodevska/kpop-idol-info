const cards = document.querySelector('#cards');
const message = document.querySelector('#search_message');

const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '8aabdb1f71msh0001558651e511ep196644jsn1663d13d578b',
        'X-RapidAPI-Host': 'k-pop.p.rapidapi.com'
    }
};

document.querySelector('#search_input').addEventListener('keydown', function(evt) {
    if (evt.keyCode == 13) {
        search(evt.target.value);
    }
});

function search(val) {
    fetchData(val);
}

function fetchData(q) {
    fetch(`https://k-pop.p.rapidapi.com/idols?q=${q}&by=Stage%20Name`, options)
        .then(response => response.json())
        .then(response => makeCards(response))
        .catch(err => printError);
}

function makeCards(response) {
    clearSearchResults();

    response.data.forEach(function(result, i) {
        let div = document.createElement('div');

        div.setAttribute('class', 'card');

        div.innerHTML = (`
            <span class="card-title">
                <h3>${result['Stage Name']}</h3>
            </span>

            <span class="card-text">
                Group:      
                <span class="card-result">
                    ${result['Group'] != null ? result['Group'] : 'Not in a group'}            
                </span>
            </span>

            <span class="card-text">
                Date of Birth:
                <span class="card-result">
                    ${result['Date of Birth'] != null ? result['Date of Birth'] : 'Not known'}            
                </span>
            </span>

            <span class="card-text">
                Full Name:
                <span class="card-result">
                    ${result['Full Name'] != null ? result['Full Name'] : 'Not known'}            
                </span>
            </span>

            <span class="card-text">
                Korean Name:
                <span class="card-result">
                    ${result['Korean Name'] != null ? result['Korean Name'] : 'Not known'}            
                </span>
            </span>

            <span class="card-text">
                Country:
                <span class="card-result">
                    ${result['Country'] != null ? result['Country'] : 'Not known'}            
                </span>
            </span>

            <span class="card-text">
                Birthplace:
                <span class="card-result">
                    ${result['Birthplace'] != null ? result['Birthplace'] : 'Not known'}            
                </span>
            </span>

            <span class="card-text">
                Gender:
                <span class="card-result">
                    ${result['Gender'] != null ? result['Gender'] : 'Not known'}            
                </span>
            </span>

        `);
        cards.appendChild(div);

        setTimeout(function() {
            div.className += ' card-show';
        }, i * 100);
    });
}

function clearSearchResults() {
    while (cards.firstChild) {
        cards.removeChild(cards.lastChild);
    }
}

function printError() {
    message.innerHTML = `
        <span>
            Sorry, the monthly query quota has been used up.
            <br>
            Come back and try again next month!
        </span>
    `;
}