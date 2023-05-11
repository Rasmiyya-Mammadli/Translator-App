/* Add a class to the input field */
let inpt = document.querySelector('input');
inpt.classList.add('search-input');

/* Add a class to the results div */
let results = document.querySelector('.results');
results.classList.add('results-container');

/* Add a class to the search-info div */
let info = document.querySelector('.search-info');
info.classList.add('search-info-text');

/* Add some CSS styles */
let style = document.createElement('style');
style.innerHTML = `
.search-input {
    padding: 10px;
    font-size: 18px;
    border: none;
    border-radius: 5px;
    margin-bottom: 10px;
}

.results-container {
    padding: 20px;
    background-color: #f5f5f5;
    border-radius: 10px;
}

.search-info-text {
    text-align: center;
    font-size: 18px;
    margin-bottom: 10px;
}
`;
document.head.appendChild(style);


inpt.addEventListener('keyup', (e) => {
    if (e.key === 'Enter' && e.target.value) {
        results.innerHTML = '';
        getApi(e.target.value);
    }
});

function getApi(api) {
    info.innerHTML = `Searching ${api}`;
    let url = `https://api.dictionaryapi.dev/api/v2/entries/en/${api}`;
    fetch(url)
        .then((response) => response.json())
        .then((result) => {
            if (!result.length) {
                info.innerHTML = `Not found: ${api}`;
                return;
            }
            else if(result.length){
                info.innerHTML = `Here is the result for: ${api}`;
                let word = result[0];
                let definition = word.meanings[0].definitions[0].definition;
                let pronunciation = word.phonetics[0].text;
                let audio = word.phonetics[0].audio;
                let synonym = word.meanings[0].synonyms;
                let antonym = word.meanings[0].antonyms;
                let total = [definition, pronunciation, audio,synonym, antonym];
                results.innerHTML = `<div><strong>Definition:</strong> ${definition}</div>`;
                results.innerHTML += `<div><strong>Pronunciation:</strong> ${pronunciation}</div>`;
                results.innerHTML += `<div class='audioDiv'><strong>Audio:</strong> <audio class='audio'src='${audio}' controls></audio></div>`;
                results.innerHTML += `<div><strong>Synonym:</strong> ${synonym}</div>`;
                results.innerHTML += `<div><strong>Antonym:</strong> ${antonym}</div>`;
                
            }
         
        });
}