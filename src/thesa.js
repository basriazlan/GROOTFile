
// THESAURUS
function searchThesaurus() {
    document.getElementById("error").style.display = "none";
    document.getElementById("synonymNounContainer").style.display = "none";
    document.getElementById("antonymNounContainer").style.display = "none";
    document.getElementById("synonymVerbContainer").style.display = "none";
    document.getElementById("antonymVerbContainer").style.display = "none";
    document.getElementById("synonymAdjectiveContainer").style.display = "none";
    document.getElementById("antonymAdjectiveContainer").style.display = "none";
    document.getElementById("synonymAdverbContainer").style.display = "none";
    document.getElementById("antonymAdverbContainer").style.display = "none";
 

    var word = document.getElementById("searchData").value;

    displayWordOfTheDayButton();

    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
        .then((response) => response.json())
        .then((data) => {
            if (data.length > 0) {
                displayWord(word);
                displaySynonymNoun(data[0]);
                displayAntonymNoun(data[0]);
                displaySynonymVerb(data[0]);
                displayAntonymVerb(data[0]);
                displaySynonymAdjective(data[0]);
                displayAntonymAdjective(data[0]);
                displaySynonymAdverb(data[0]);
                displayAntonymAdverb(data[0]);
            } else {
                displayError("Word not found");
            }
        })
        .catch((error) => {
            console.error("Error fetching dictionary data: ", error);
            displayError("Word not found");
        });
}

// FETCH WORD
function displayWord(word) {
    document.getElementById("wordContainer").style.display = "block";
    document.getElementById("word").textContent = word;
}



//FETCH SYNONYM Noun
function displaySynonymNoun(data) {
    const synonymNounContainer = document.getElementById("synonymNounContainer");
    const nounMeanings = data.meanings.find((meaning) => meaning.partOfSpeech === "noun");

    if (nounMeanings) {
        const synonyms = nounMeanings.synonyms;

        if (synonyms && synonyms.length > 0) {
            synonymNounContainer.style.display = "block";
            const ul = document.createElement("ul");

            for (let i = 0; i < 3 && i < synonyms.length; i++) {
                const synonym = synonyms[i];
                const li = document.createElement("li");
                li.textContent = `${synonym}`;
                ul.appendChild(li);
            }

            const synonymNounListContainer = document.getElementById("synonymNounList");
            synonymNounListContainer.innerHTML = "";
            synonymNounListContainer.appendChild(ul);
        }

     else {
        const li = document.createElement("li");
        li.textContent = "No Synonym found.";
        ul.appendChild(li);
    }
    }
}


displaySynonymNoun(data);


// FETCH ANTONYM PART OF SPEECH NOUN
function displayAntonymNoun(data) {
    const antonymNounContainer = document.getElementById("antonymNounContainer");
    const antonymNounList = document.getElementById("antonymNounList");

    const nounMeanings = data.meanings.find((meaning) => meaning.partOfSpeech === "noun");

    if (nounMeanings) {
        antonymNounContainer.style.display = "block";
        antonymNounList.innerHTML = ""; 


        if (nounMeanings.antonyms.length > 0) {
            const antonymsUl = document.createElement("ul");

            for (const antonyms of nounMeanings.antonyms) {
                const li = document.createElement("li");
                li.textContent = `${antonyms}`;
                antonymsUl.appendChild(li);
            }

            antonymNounList.appendChild(antonymsUl);
        } else {
            const noantonymsUl = document.createElement("ul");
            noantonymsUl.textContent = "No Antonyms found.";
            antonymNounList.appendChild(noantonymsUl);
        }
    }
}

displayAntonymNoun(data);


// FETCH SYNONYM PART OF SPEECH VERB
function displaySynonymVerb(data) {
    const synonymVerbContainer = document.getElementById("synonymVerbContainer");
    const synonymVerbList = document.getElementById("synonymVerbList");

    const verbMeanings = data.meanings.find((meaning) => meaning.partOfSpeech === "verb");

    if (verbMeanings) {
        synonymVerbContainer.style.display = "block";
        synonymVerbList.innerHTML = ""; 

        if (verbMeanings.synonyms.length > 0) {
            const synonymsUl = document.createElement("ul");

            for (let i = 0; i < 4 && i < verbMeanings.synonyms.length; i++) {
                const synonym = verbMeanings.synonyms[i];
                const li = document.createElement("li");
                li.textContent = ` ${synonym}`;
                synonymsUl.appendChild(li);
            }

            synonymVerbList.appendChild(synonymsUl);
        } else {
            const noSynonymsUl = document.createElement("ul");
            noSynonymsUl.textContent = "No Synonyms found.";
            synonymVerbList.appendChild(noSynonymsUl);
        }
    }
}


displaySynonymVerb(data);

// FETCH ANTONYM PART OF SPEECH VERB
function displayAntonymVerb(data) {
    const antonymVerbContainer = document.getElementById("antonymVerbContainer");
    const antonymVerbList = document.getElementById("antonymVerbList");

    const verbMeanings = data.meanings.find((meaning) => meaning.partOfSpeech === "verb");

    if (verbMeanings) {
        antonymVerbContainer.style.display = "block";
        antonymVerbList.innerHTML = ""; 

        if (verbMeanings.antonyms.length > 0) {
            const antonymsUl = document.createElement("ul");

            for (const antonyms of verbMeanings.antonyms) {
                const li = document.createElement("li");
                li.textContent = `${antonyms}`;
                antonymsUl.appendChild(li);
            }

            antonymVerbList.appendChild(antonymsUl);
        } else {
            const noantonymsUl = document.createElement("ul");
            noantonymsUl.textContent = "No Antonyms found.";
            antonymVerbList.appendChild(noantonymsUl);
        }
    }
}

displayAntonymVerb(data);


// FETCH SYNONYM PART OF SPEECH ADJECTIVE
function displaySynonymAdjective(data) {
    const synonymAdjectiveContainer = document.getElementById("synonymAdjectiveContainer");
    const synonymAdjectiveList = document.getElementById("synonymAdjectiveList");

    const adjectiveMeanings = data.meanings.find((meaning) => meaning.partOfSpeech === "adjective");

    if (adjectiveMeanings) {
        synonymAdjectiveContainer.style.display = "block";
        synonymAdjectiveList.innerHTML = "";

        if (adjectiveMeanings.synonyms.length > 0) {
            const synonymsUl = document.createElement("ul");

            for (let i = 0; i < 4 && i < adjectiveMeanings.synonyms.length; i++) {
                const synonym = adjectiveMeanings.synonyms[i];
                const li = document.createElement("li");
                li.textContent = `${synonym}`;
                synonymsUl.appendChild(li);
            }

            synonymAdjectiveList.appendChild(synonymsUl);
        } else {
            const noSynonymsUl = document.createElement("ul");
            noSynonymsUl.textContent = "No Synonyms found.";
            synonymAdjectiveList.appendChild(noSynonymsUl);
        }
    } else {

        synonymAdjectiveContainer.style.display = "block";
        synonymAdjectiveList.innerHTML = "No Synonyms found.";
    }
}

displaySynonymAdjective(data);


// FETCH ANTONYM PART OF SPEECH ADJECTIVE
function displayAntonymAdjective(data) {
    const antonymAdjectiveContainer = document.getElementById("antonymAdjectiveContainer");
    const antonymAdjectiveList = document.getElementById("antonymAdjectiveList");

    const adjectiveMeanings = data.meanings.find((meaning) => meaning.partOfSpeech === "adjective");

    if (adjectiveMeanings) {
        antonymAdjectiveContainer.style.display = "block";
        antonymAdjectiveList.innerHTML = "";

        if (adjectiveMeanings.antonyms.length > 0) {
            const antonymsUl = document.createElement("ul");

            for (const antonyms of adjectiveMeanings.antonyms) {
                const li = document.createElement("li");
                li.textContent = `${antonyms}`;
                antonymsUl.appendChild(li);
            }

            antonymAdjectiveList.appendChild(antonymsUl);
        } else {
            const noAntonymsUl = document.createElement("ul");
            noAntonymsUl.textContent = "No Antonyms found.";
            antonymAdjectiveList.appendChild(noAntonymsUl);
        }
    } else {

        antonymAdjectiveContainer.style.display = "block";
        antonymAdjectiveList.innerHTML = "No Antonyms found.";
    }
}

displayAntonymAdjective(data);

// FETCH SYNONYM PART OF SPEECH ADVERB
function displaySynonymAdverb(data) {
    const synonymAdverbContainer = document.getElementById("synonymAdverbContainer");
    const synonymAdverbList = document.getElementById("synonymAdverbList");

    const adverbMeanings = data.meanings.find((meaning) => meaning.partOfSpeech === "adverb");

    if (adverbMeanings) {
        synonymAdverbContainer.style.display = "block";
        synonymAdverbList.innerHTML = "";

        if (adverbMeanings.synonyms.length > 0) {
            const synonymsUl = document.createElement("ul");

            for (let i = 0; i < 4 && i < adverbMeanings.synonyms.length; i++) {
                const synonym = adverbMeanings.synonyms[i];
                const li = document.createElement("li");
                li.textContent = `${synonym}`;
                synonymsUl.appendChild(li);
            }

            synonymAdverbList.appendChild(synonymsUl);
        } else {
            const noSynonymsUl = document.createElement("ul");
            noSynonymsUl.textContent = "No Synonyms found.";
            synonymAdverbList.appendChild(noSynonymsUl);
        }
    } else {
        // Handle the case where adverbs are not found.
        synonymAdverbContainer.style.display = "block";
        synonymAdverbList.innerHTML = "No Synonyms found.";
    }
}

// FETCH ANTONYM PART OF SPEECH ADVERB
function displayAntonymAdverb(data) {
    const antonymAdverbContainer = document.getElementById("antonymAdverbContainer");
    const antonymAdverbList = document.getElementById("antonymAdverbList");

    const adverbMeanings = data.meanings.find((meaning) => meaning.partOfSpeech === "adverb");

    if (adverbMeanings) {
        antonymAdverbContainer.style.display = "block";
        antonymAdverbList.innerHTML = "";

        if (adverbMeanings.antonyms.length > 0) {
            const antonymsUl = document.createElement("ul");

            for (const antonyms of adverbMeanings.antonyms) {
                const li = document.createElement("li");
                li.textContent = `${antonyms}`;
                antonymsUl.appendChild(li);
            }

            antonymAdverbList.appendChild(antonymsUl);
        } else {
            const noAntonymsUl = document.createElement("ul");
            noAntonymsUl.textContent = "No Antonyms found.";
            antonymAdverbList.appendChild(noAntonymsUl);
        }
    } else {
        // Handle the case where adverbs are not found.
        antonymAdverbContainer.style.display = "block";
        antonymAdverbList.innerHTML = "No Antonyms found.";
    }
}


function navigateToCRUDPage() {
    window.location.href = 'wotd.html';
}

function displayWordOfTheDayButton() {
    const addToWordOfDayContainer = document.getElementById("addToWordOfDayContainer");
    addToWordOfDayContainer.style.display = "block";
}


