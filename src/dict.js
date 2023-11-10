// DICTIONARY
function buttonClicked() {
    document.getElementById("dictionaryMeaning").style.display = "none";
    document.getElementById("error").style.display = "none";
    document.getElementById("audioContainer").style.display = "none";
    document.getElementById("sourceUrlContainer").style.display = "none";
    document.getElementById("phoneticContainer").style.display = "none";
    document.getElementById("nounContainer").style.display = "none"; 
    document.getElementById("verbContainer").style.display = "none";
    document.getElementById("adjectiveContainer").style.display = "none";

    var word = document.getElementById("searchData").value;




    displayWordOfTheDayButton();

    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
        .then((response) => response.json())
        .then((data) => {
            if (data.length > 0) {
                displayWord(word);
                displayAudio(data[0]);
                displaySourceUrl(data[0]);
                displayPhonetic(data[0]);
                displayPartOfSpeechNoun(data[0]);
                displayPartOfSpeechVerb(data[0]);
                displayPartOfSpeechAdjective(data[0]); // Add this line
                displayDictionaryData(data[0]);
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

// FETCH PHONETIC
function displayPhonetic(data) {
    const phoneticContainer = document.getElementById("phoneticContainer");
    const phoneticTextElement = document.getElementById("phoneticText");

    if (data.phonetics && data.phonetics.length > 0) {
        const phonetics = data.phonetics[0];
        if (phonetics.text) {
            phoneticContainer.style.display = "block";
            phoneticTextElement.textContent = `Phonetic: ${phonetics.text}`;
        }
    }
}

// FETCH AUDIO
function displayAudio(data) {
    const audioContainer = document.getElementById("audioContainer");
    const audioElement = document.getElementById("audio");

    if (data.phonetics && data.phonetics.length > 0) {
        const phonetics = data.phonetics[0];
        if (phonetics.audio) {
            audioContainer.style.display = "block";
            audioElement.src = phonetics.audio;
        }
    }
}

// FETCH SOURCE URL
function displaySourceUrl(data) {
    const sourceUrlContainer = document.getElementById("sourceUrlContainer");
    const sourceUrlElement = document.getElementById("sourceUrl");

    if (data.phonetics && data.phonetics.length > 0) {
        const phonetics = data.phonetics[0];
        if (phonetics.sourceUrl) { // Use sourceUrl, not text
            sourceUrlContainer.style.display = "block";
            sourceUrlElement.href = phonetics.sourceUrl;
            sourceUrlElement.textContent = "Source";
        }
    }
}

// FETCH DEFINITION
function displayDictionaryData(data) {
    const dictionaryDefinitions = document.getElementById("dictionaryDefinitions");
    dictionaryDefinitions.innerHTML = "";

    document.getElementById("dictionaryMeaning").style.display = "block";

    for (let i = 0; i < 4; i++) {
        const definition = data.meanings[0].definitions[i];
        if (definition) {
            const li = document.createElement("li");
            li.textContent = `Definition: ${definition.definition}`;
            dictionaryDefinitions.appendChild(li);

            if (definition.example) {
                const exampleLi = document.createElement("li");
                exampleLi.textContent = `Example: ${definition.example}`;
                dictionaryDefinitions.appendChild(exampleLi);
            }
        }
    }
}







// FETCH PART OF SPEECH NOUN
function displayPartOfSpeechNoun(data) {
    const nounContainer = document.getElementById("nounContainer");
    const nounDefinitions = document.getElementById("nounDefinitions");

    const nounMeanings = data.meanings.find((meaning) => meaning.partOfSpeech === "noun");

    if (nounMeanings) {
        nounContainer.style.display = "block";
        nounDefinitions.innerHTML = ""; 

        const ul = document.createElement("ul");

        for (let i = 0; i < 3 && i < nounMeanings.definitions.length; i++) {
            const definition = nounMeanings.definitions[i];
            const li = document.createElement("li");
            li.textContent = `Definition: ${definition.definition}`;

            if (definition.example) {
                const exampleLi = document.createElement("li");
                exampleLi.textContent = `Example: ${definition.example}`;
                li.appendChild(exampleLi);
            }

            ul.appendChild(li);
        }

        nounDefinitions.appendChild(ul);
    }
}


displayPartOfSpeechNoun(data);



// FETCH PART OF SPEECH VERB
function displayPartOfSpeechVerb(data) {
    const verbContainer = document.getElementById("verbContainer");
    const verbDefinitions = document.getElementById("verbDefinitions");

    const verbMeanings = data.meanings.find((meaning) => meaning.partOfSpeech === "verb");

    if (verbMeanings) {
        verbContainer.style.display = "block";
        verbDefinitions.innerHTML = "";

        const ul = document.createElement("ul");

        for (let i = 0; i < 3 && i < verbMeanings.definitions.length; i++) {
            const definition = verbMeanings.definitions[i];
            const li = document.createElement("li");
            li.textContent = `Definition: ${definition.definition}`;

            if (definition.example) {
                const exampleLi = document.createElement("li");
                exampleLi.textContent = `Example: ${definition.example}`;
                li.appendChild(exampleLi);
            }

            ul.appendChild(li);
        }

        verbDefinitions.appendChild(ul);
    }
}

// FETCH PART OF SPEECH ADJECTIVE
function displayPartOfSpeechAdjective(data) {
    const adjectiveContainer = document.getElementById("adjectiveContainer");
    const adjectiveDefinitions = document.getElementById("adjectiveDefinitions");

    const adjectiveMeanings = data.meanings.find((meaning) => meaning.partOfSpeech === "adjective");

    if (adjectiveMeanings) {
        adjectiveContainer.style.display = "block";
        adjectiveDefinitions.innerHTML = "";

        const ul = document.createElement("ul");

        for (let i = 0; i < 3 && i < adjectiveMeanings.definitions.length; i++) {
            const definition = adjectiveMeanings.definitions[i];
            const li = document.createElement("li");
            li.textContent = `Definition: ${definition.definition}`;

            if (definition.example) {
                const exampleLi = document.createElement("li");
                exampleLi.textContent = `Example: ${definition.example}`;
                li.appendChild(exampleLi);
            }

            ul.appendChild(li);
        }

        adjectiveDefinitions.appendChild(ul);
    }
}


function displayError(message) {
    document.getElementById("error").style.display = "block";
    document.getElementById("errorMessage").textContent = message;

}



function navigateToCRUDPage() {
    window.location.href = 'wotd.html';
}

function displayWordOfTheDayButton() {
    const addToWordOfDayContainer = document.getElementById("addToWordOfDayContainer");
    addToWordOfDayContainer.style.display = "block";
}

