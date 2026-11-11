const defaultBank = [
    "Jeopardy - Spainsh",

    ["Translation", "History", "Answer It", "Berto Y Sus Amigos", "Cuartro Misterioso"],

    [
        [
            ["¡Hola! Me llamo Eric.", "Hello! You can call me Eric."],
            ["Eric es inteligente y está treste.", "Eric is intelligent and is feeling sad."],
            ["Eric es treste porque su perro está emfermo y mal.", "Eric is sad because his dog is sick."],
            ["Te presento a perro se llama Gandalf. Gandalf es el perro de Eric.", "I'd like to introduce you to this dog. His name is Gandalf. Gandalf is Eric's dog."],
            ["Eric tiene que ir a casa de su tío.", "Eric has to go to his uncle's house."]
        ],
        [
            ["Did Mexico break away from Spain?", "Yes!"],
            ["Spain is the bigest producer of what product?", "Olive oil. Spain make 45% of the worlds olive oil."],
            ["Why do people talk El Camino de Santiago?", "For spirtiual reasons."],
            ["What is the capital of Spain?", "Es Madrid."],
            ["What is El Grito de Dolores?", "The start of Mexican independence."]
        ],
        [
            ["What is the differnce between tú and usted?", "Formal: usted, and informal: tú."],
            ["How do you say the exit in spanish?", "La salida."],
            ["¿Que es 'que onda'?", "What's up."],
            ["What is the largest Spanish speaking country?", "Mexico (120 million)."],
            ["¿What is the offical name of Mexico?", "Los Estados Unidos Mexicanos."]
        ],
        [
            ["¿Como es Carlos?", "El no dige la veredad and está aburrido que en su casa."],
            ["¿Como es Rufi y Rafi (Los perros de Felipe)?", "les gusta comer mucha paella."],
            ["¿Como es Paquita?", "Ella es una Youtubera famosa."],
            ["¿Como es Felipe?", "Le gustan cocinar muchas comidas."],
            ["¿Detras de fútbol, Carlos tiene hambre, si él va a comer que?", "Él va a comer 37 sandwiches."]
        ],
        [
            ["¿Quien es el amigo de José?", "Fransisco."],
            ["¿De dónde es Ana y Conchita?", "Spain."],
            ["¿Quien vive con José?", "Don Pedro."],
            ["¿Cuando es el conerto de Conchita?", "El concerto es en cuatro semanas."],
            ["¿Que es en el cuartro misterioso?", "¡Muchas ratas son en el cuartro misterioso!"]
        ]
    ]
];


let bank;

const urlParams = new URLSearchParams(window.location.search);
const compressedGame = urlParams.get('g');

if (!compressedGame) {
    console.error("No custom game found in the URL. :(");
    bank = defaultBank;
} else {
    try {
        const decompressedJSON = LZString.decompressFromEncodedURIComponent(compressedGame);

        bank = JSON.parse(decompressedJSON);

        console.log("Loaded questions and column titles from url");
        console.log(bank);
    } catch (error) {
        console.error("Failed to parse or decompress game data:", error);
        bank = defaultBank;
    }
}

const compressedString = LZString.compressToEncodedURIComponent(JSON.stringify(bank));
const shareableLink = "https://iannpdx5.github.io/Spanish-Jeopardy?g=" + compressedString;
console.log(shareableLink);

const jName = bank[0];
const titlestxt = bank[1];
const qAndA = bank[2];
const values = [100, 200, 300, 400, 500];

function resetGame() {
    const buttons = document.querySelectorAll('#options button');

    buttons.forEach((button) => {
        const row = button.dataset.row;
        button.textContent = values[row];
        button.disabled = false;
        button.classList.add('available');
        button.classList.remove('used');
        button.style.opacity = '1';
    });

    const overlay = document.getElementById('questionOverlay');
    if (overlay) {
        overlay.remove();
    }
}

const resetBtn = document.getElementById("resetBtn");

resetBtn.addEventListener("click", resetGame);

function askQuestion(item, clickedButton) {
    const existingOverlay = document.getElementById('questionOverlay');
    if (existingOverlay) {
        existingOverlay.remove();
    }

    const overlay = document.createElement('div');
    overlay.id = 'questionOverlay';
    overlay.style.position = 'fixed';
    overlay.style.inset = '0';
    overlay.style.background = 'rgba(0, 0, 0, 0.58)';
    overlay.style.display = 'flex';
    overlay.style.alignItems = 'center';
    overlay.style.justifyContent = 'center';
    overlay.style.zIndex = '9999';
    overlay.style.padding = '20px';

    const modal = document.createElement('div');
    modal.style.background = '#ffffff';
    modal.style.border = '2px solid #101010';
    modal.style.width = '100%';
    modal.style.maxWidth = '440px';
    modal.style.padding = '28px 24px';
    modal.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.2)';
    modal.style.color = '#0d0d0d';
    modal.style.fontFamily = 'Orbitron, Arial, sans-serif';

    const label = document.createElement('p');
    label.textContent = 'Question';
    label.style.margin = '0 0 18px';
    label.style.fontSize = '0.8rem';
    label.style.letterSpacing = '0.12em';
    label.style.textTransform = 'uppercase';

    const question = document.createElement('h2');
    question.textContent = item[0];
    question.style.margin = '0 0 18px';
    question.style.fontSize = '1.3rem';
    question.style.lineHeight = '1.5';
    question.style.fontWeight = '600';
    question.style.color = '#111111';

    const answerWrap = document.createElement('div');
    answerWrap.style.marginBottom = '22px';
    answerWrap.style.padding = '12px 14px';
    answerWrap.style.background = '#ececec';
    answerWrap.style.border = '1px solid #0b0b0b';

    const answerLabel = document.createElement('div');
    answerLabel.textContent = 'Answer';
    answerLabel.style.fontSize = '0.7rem';
    answerLabel.style.letterSpacing = '0.12em';
    answerLabel.style.textTransform = 'uppercase';
    answerLabel.style.marginBottom = '8px';
    answerLabel.style.color = '#111111';

    const answerText = document.createElement('div');
    answerText.textContent = 'Press space to reveal the answer';
    answerText.style.minHeight = '1.6em';
    answerText.style.fontSize = '1.1rem';
    answerText.style.fontWeight = '700';
    answerText.style.color = '#111111';
    answerText.style.transition = 'all 0.2s ease';

    const hint = document.createElement('p');
    hint.textContent = 'Press space for the answer';
    hint.style.margin = '0 0 18px';
    hint.style.fontSize = '0.76rem';
    hint.style.textAlign = 'center';
    hint.style.color = '#111111';

    const buttonRow = document.createElement('div');
    buttonRow.style.display = 'flex';
    buttonRow.style.justifyContent = 'space-between';
    buttonRow.style.gap = '12px';

    const backButton = document.createElement('button');
    backButton.type = 'button';
    backButton.textContent = 'Back';
    backButton.style.flex = '1';
    backButton.style.padding = '10px 14px';
    backButton.style.border = '2px solid #0a0a0a';
    backButton.style.background = '#b6b6b6';
    backButton.style.color = '#050505';
    backButton.style.cursor = 'pointer';
    backButton.style.fontFamily = 'inherit';
    backButton.style.fontSize = '0.9rem';

    const revealButton = document.createElement('button');
    revealButton.type = 'button';
    revealButton.textContent = 'Reveal';
    revealButton.style.flex = '1';
    revealButton.style.padding = '10px 14px';
    revealButton.style.border = '2px solid #0a0a0a';
    revealButton.style.background = '#0d0d0d';
    revealButton.style.color = '#f3f3f3';
    revealButton.style.cursor = 'pointer';
    revealButton.style.fontFamily = 'inherit';
    revealButton.style.fontSize = '0.9rem';

    const closeOverlay = () => {
        document.removeEventListener('keydown', handleKeydown);
        overlay.remove();
    };

    /**
     * Reveals answer
     *  
     * @returns 
     */

    const revealAnswer = () => {
        if (revealButton.disabled) {
            return;
        } else if (clickedButton) {
            clickedButton.disabled = true;
            clickedButton.classList.add('used');
            clickedButton.classList.remove('available');
            clickedButton.style.opacity = '0.9';
        }

        answerText.textContent = item[1];
        answerText.style.filter = 'none';
        answerText.style.opacity = '1';
        hint.textContent = 'Answer revealed';
        revealButton.textContent = 'Revealed';
        revealButton.disabled = true;
        revealButton.style.cursor = 'not-allowed';
        revealButton.style.opacity = '0.8';
    };

    const handleKeydown = (event) => {
        if (event.code === 'Space') {
            event.preventDefault();
            revealAnswer();
        }

        if (event.key === 'Escape') {
            closeOverlay();
        }
    };

    revealButton.addEventListener('click', revealAnswer);
    backButton.addEventListener('click', closeOverlay);
    overlay.addEventListener('click', (event) => {
        if (event.target === overlay) {
            closeOverlay();
        }
    });

    document.addEventListener('keydown', handleKeydown);

    answerWrap.appendChild(answerLabel);
    answerWrap.appendChild(answerText);
    buttonRow.appendChild(backButton);
    buttonRow.appendChild(revealButton);
    modal.appendChild(label);
    modal.appendChild(question);
    modal.appendChild(answerWrap);
    modal.appendChild(hint);
    modal.appendChild(buttonRow);
    overlay.appendChild(modal);
    document.body.appendChild(overlay);
}

$(function () {
    document.title = jName;
    
    document.querySelector('#resetBtn').textContent = jName || "ERROR!";

    const titles = document.querySelectorAll('#options h3');

    titles.forEach((title) => {
        const n = title.dataset.col;
        title.textContent = titlestxt[n] || "ERROR!";
    });

    const buttons = document.querySelectorAll('#options button');

    buttons.forEach((button) => {
        const nColumn = button.dataset.col;
        const nRow = button.dataset.row;
        button.textContent = values[nRow];
        button.classList.add('available');
        button.addEventListener('click', () => {
            if (button.disabled) {
                return;
            }
            const item = qAndA[nColumn][nRow] || ['ERROR!', 'ERROR!'];

            askQuestion(item, button);
        });
    });
});