const questionBank = {
    column1Opt1: { question: '¡Hola! Me llamo Eric.', answer: 'Hello! You can call me Eric.' },
    column1Opt2: { question: 'Eric es inteligente y está treste.', answer: 'Eric is intelligent and is feeling sad.' },
    column1Opt3: { question: 'Eric es treste porque su perro está emfermo y mal.', answer: 'Eric is sad because his dog is sick.' },
    column1Opt4: { question: 'Te presento a perro se llama Gandalf. Gandalf es el perro de Eric.', answer: 'I\'d like to introduce you to this dog. His name is Gandalf. Gandalf is Eric\'s dog.' },
    column1Opt5: { question: 'Eric tiene que ir a casa de su tío.', answer: 'Eric has to go to his uncle\'s house.' },
    column2Opt1: { question: 'Did Mexico break away from Spain?', answer: 'Yes!' },
    column2Opt2: { question: 'Spain is the bigest producer of what product?', answer: 'Olive oil. Spain make 45% of the worlds olive oil.' },
    column2Opt3: { question: 'Why do people talk El Camino de Santiago?', answer: 'For spirtiual reasons.' },
    column2Opt4: { question: 'What is the capital of Spain?', answer: 'Es Madrid.' },
    column2Opt5: { question: 'What is El Grito de Dolores?', answer: 'The start of Mexican independence' },
    column3Opt1: { question: 'What is the differnce between tú and usted?', answer: 'Formal: usted, and informal: tú.' },
    column3Opt2: { question: 'How do you say the exit in spanish?', answer: 'La salida.' },
    column3Opt3: { question: '¿Que es \'que onda\'?', answer: 'What\'s up.' },
    column3Opt4: { question: 'What is the largest Spanish speaking country?', answer: 'Mexico (120 million).' },
    column3Opt5: { question: '¿What is the offical name of Mexico?', answer: 'Los Estados Unidos Mexicanos.' },
    column4Opt1: { question: '¿Discribe Carlos?', answer: 'El no dige la veredad y está aburrido que en su casa.' },
    column4Opt2: { question: '¿Discribe Rufi y Rafi (Los perros de Felipe)', answer: 'les gusta comer mucha paella.' },
    column4Opt3: { question: '¿Discribe Paquita?', answer: 'Ella es una Youtubera famosa.' },
    column4Opt4: { question: '¿Discribe Felipe?', answer: 'Le gustan cocinar muchas comidas.' },
    column4Opt5: { question: '¿Detras de fútbol, Carlos tiene hambre, si él va a comer que?', answer: 'Él va a comer 37 sandwiches.' },
    column5Opt1: { question: '¿Quien es el amigo de José?', answer: 'Fransisco.' },
    column5Opt2: { question: '¿De dónde es Ana y Conchita?', answer: 'Spain.' },
    column5Opt3: { question: '¿Quien vive con José?', answer: 'Don Pedro.' },
    column5Opt4: { question: '¿Cuando es el conerto de Conchita?', answer: 'El concerto es en cuatro semanas.' },
    column5Opt5: { question: '¿Que es en el cuartro misterioso?', answer: '¡Muchas ratas son en el cuartro misterioso!' }
};

const defaultValues = {};

var points = {
    0: 0,
    1: 0,
    2: 0,
    3: 0
};

var currentTeamOnDeck = 0;

function setDefaultButtonValues() {
    const buttons = document.querySelectorAll('#options button');

    buttons.forEach((button) => {
        const id = button.id;
        const value = button.textContent.trim();
        defaultValues[id] = value;
        button.dataset.originalValue = value;
    });
}

const resetBtn = document.getElementById("resetBtn");

resetBtn.addEventListener("click", resetGame);

function resetGame() {
    const buttons = document.querySelectorAll('#options button');

    buttons.forEach((button) => {
        const id = button.id;
        const value = button.dataset.originalValue || defaultValues[id] || button.textContent.trim();
        defaultValues[id] = value;
        button.dataset.originalValue = value;
        button.textContent = value;
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
    question.textContent = item.question;
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
        }

        if (clickedButton) {
            clickedButton.disabled = true;
            clickedButton.classList.add('used');
            clickedButton.classList.remove('available');
            clickedButton.style.opacity = '0.9';

            //points[currentTeamOnDeck] = value;
        }

        answerText.textContent = item.answer;
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

    revealButton.addEventListener('click', revealAnswer());
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
    const buttons = document.querySelectorAll('#options button');

    setDefaultButtonValues();

    buttons.forEach((button) => {
        button.classList.add('available');
        button.addEventListener('click', () => {
            if (button.disabled) {
                return;
            }

            const item = questionBank[button.id] || {
                question: 'ERROR!',
                answer: 'ERROR!'
            };

            askQuestion(item, button);
        });
    });
});
