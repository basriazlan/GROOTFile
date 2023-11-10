

function buttonClicked() {

    // Hide the thesaurus result container
    document.getElementById("ThesaurusMeaning").style.display = "none";

    // Show the dictionary result container
    document.getElementById("dictionaryMeaning").style.display = "block";

    var word = document.getElementById("searchData").value;

    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
        .then((response) => response.json())
        .then((data) => {
            displayDictionaryData(data);
        })
        .catch((error) => {
            console.error("Error fetching dictionary data: ", error);
            displayError("Word not found");
        });
}

function displayDictionaryData(data) {
    var dictionaryMeaningsContainer = document.getElementById("dictionaryMeaning");

    // Clear the existing content
    dictionaryMeaningsContainer.innerHTML = "";

    if (Array.isArray(data) && data.length > 0) {
        data.forEach((entry) => {
            var dictionaryContainer = document.createElement("div");
            dictionaryContainer.classList.add("dictionary-container");


            var horizontalRule = document.createElement("hr");
            dictionaryMeaningsContainer.appendChild(horizontalRule);



            // Create the "Add to Word of the Day" button
            var addToWordOfTheDayButton = document.createElement("button");
            addToWordOfTheDayButton.textContent = "Add to Word of the Day";
            addToWordOfTheDayButton.addEventListener("click", function () {
                // Implement the logic to add the word to the Word of the Day list
                // You can use the 'entry.word' to add the word.

                // Navigate to the Word of the Day page
                window.location.href = "crud.html";
            });


            // Append the button next to the definition
            dictionaryContainer.appendChild(addToWordOfTheDayButton);


            var phoneticElement = document.createElement("div");
            phoneticElement.classList.add("phonetic");
            phoneticElement.textContent = `Phonetic: ${entry.phonetic || "Not available"}`;
            dictionaryContainer.appendChild(phoneticElement);

        

            // Create elements for phonetics information
            var phoneticsContainer = document.createElement("div");
            var phoneticsTitle = document.createElement("div");
            phoneticsTitle.classList.add("phonetics-title");
            phoneticsTitle.textContent = "Phonetics:";
            phoneticsContainer.appendChild(phoneticsTitle);

            entry.phonetics.forEach((phonetic) => {
                var phoneticItem = document.createElement("div");
                phoneticItem.classList.add("phonetic-item");
                var audioElement = document.createElement("p");


                if (phonetic.text) {
                    audioElement.innerHTML = `<p><span class="part-of-speech">Text:</span> ${phonetic.text}</p>`;
                    phoneticItem.appendChild(audioElement);
                }

                if (phonetic.audio) {
                    audioElement.innerHTML = `<p><span class="part-of-speech">Audio:</span> <audio controls><source src="${phonetic.audio}" type="audio/mpeg"></audio></p>`;
                    phoneticItem.appendChild(audioElement);
                }

                if (phonetic.sourceUrl) {
                    var sourceUrlElement = document.createElement("p");
                    sourceUrlElement.innerHTML = `<span class="part-of-speech">Source URL:</span> <a href="${phonetic.sourceUrl}" target="_blank">${phonetic.sourceUrl}</a>`;
                    phoneticItem.appendChild(sourceUrlElement);
                }

                if (phonetic.license && phonetic.license.name) {
                    var licenseElement = document.createElement("p");
                    licenseElement.innerHTML = `<span class="part-of-speech">License:</span> ${phonetic.license.name} (<a href="${phonetic.license.url}" target="_blank">${phonetic.license.url}</a>)`;
                    phoneticItem.appendChild(licenseElement);
                }

                phoneticsContainer.appendChild(phoneticItem);
            });

            dictionaryContainer.appendChild(phoneticsContainer);


            // Create a set to keep track of displayed synonyms and antonyms
            var displayedSynonyms = new Set();
            var displayedAntonyms = new Set();

            // Create elements for meanings
            entry.meanings.forEach((meaning) => {
                var partOfSpeechElement = document.createElement("p");
                partOfSpeechElement.classList.add("part-of-speech");
                partOfSpeechElement.textContent = `Part of Speech: ${meaning.partOfSpeech}`;
                dictionaryContainer.appendChild(partOfSpeechElement);


                meaning.definitions.forEach((definition) => {
                    var definitionElement = document.createElement("p");
                    definitionElement.classList.add("definition");
                    definitionElement.textContent = `Definition: ${definition.definition}`;
                    dictionaryContainer.appendChild(definitionElement);

                    if (definition.example) {
                        var exampleElement = document.createElement("p");
                        exampleElement.classList.add("example");
                        exampleElement.textContent = `Example: ${definition.example}`;
                        dictionaryContainer.appendChild(exampleElement);
                    }


                    // Display synonyms if not already displayed
                    if (meaning.synonyms.length > 0 && !displayedSynonyms.has(entry.word)) {
                        var synonymsElement = document.createElement("p");
                        synonymsElement.classList.add("synonyms");
                        synonymsElement.textContent = `Synonyms: ${meaning.synonyms.join(', ')}`;
                        dictionaryContainer.appendChild(synonymsElement);
                        displayedSynonyms.add(entry.word);
                    }

                    // Display antonyms if not already displayed
                    if (meaning.antonyms.length > 0 && !displayedAntonyms.has(entry.word)) {
                        var antonymsElement = document.createElement("p");
                        antonymsElement.classList.add("antonyms");
                        antonymsElement.textContent = `Antonyms: ${meaning.antonyms.join(', ')}`;
                        dictionaryContainer.appendChild(antonymsElement);
                        displayedAntonyms.add(entry.word);
                    }


                
            });

                    

            });

            dictionaryMeaningsContainer.appendChild(dictionaryContainer);

            

        });
    } else {
        displayError("Word not found");
    }
}


function displayError(message) {
    var dictionaryMeaningsContainer = document.getElementById("dictionaryMeaning");
    dictionaryMeaningsContainer.innerHTML = message;
}

function showThesaurus() {
    // Hide the dictionary result container
    document.getElementById("dictionaryMeaning").style.display = "none";

    // Show the thesaurus result container
    document.getElementById("ThesaurusMeaning").style.display = "block";

    var synonyms = document.getElementById("searchData").value;
    fetchThesaurusData(synonyms);
}

function fetchThesaurusData(synonyms) {
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${synonyms}`)
        .then((response) => response.json())
        .then((data) => {
            displayThesaurusData(data);
        })
        .catch((error) => {
            console.error("Error fetching Thesaurus data: ", error);
            displayError("Word not found in the thesaurus");
        });
}

function displayThesaurusData(data) {
    var thesaurusMeaningContainer = document.getElementById("ThesaurusMeaning");

    // Clear the existing content
    thesaurusMeaningContainer.innerHTML = "";

    if (Array.isArray(data) && data.length > 0) {
        data.forEach((entry) => {
            var thesaurusContainer = document.createElement("div");
            thesaurusContainer.classList.add("thesaurus-container");


            // Create elements to display word and synonym information
            var wordElement = document.createElement("h2");
            wordElement.classList.add("word");
            wordElement.textContent = `Word: ${entry.word}`;
            thesaurusContainer.appendChild(wordElement);

            // Create a set to keep track of displayed synonyms and antonyms
            var displayedSynonyms = new Set();
            var displayedAntonyms = new Set();

            entry.meanings.forEach((meaning) => {
                if (meaning.synonyms.length > 0 && !displayedSynonyms.has(entry.word)) {
                    var synonymsElement = document.createElement("p");
                    synonymsElement.classList.add("synonyms");
                    synonymsElement.textContent = `Synonyms: ${meaning.synonyms.join(', ')}`;
                    thesaurusContainer.appendChild(synonymsElement);
                    displayedSynonyms.add(entry.word);
                }

                if (meaning.antonyms.length > 0 && !displayedAntonyms.has(entry.word)) {
                    var antonymsElement = document.createElement("p");
                    antonymsElement.classList.add("antonyms");
                    antonymsElement.textContent = `Antonyms: ${meaning.antonyms.join(', ')}`;
                    thesaurusContainer.appendChild(antonymsElement);
                    displayedAntonyms.add(entry.word);
                }
            });

            thesaurusMeaningContainer.appendChild(thesaurusContainer);
        });
    } else {
        displayError("Word not found in the thesaurus");
    }
}




