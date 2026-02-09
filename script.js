// EmailJS Configuration
const EMAILJS_CONFIG = {
    serviceId: 'service_30bsiaa',
    templateId: 'template_1zhuayo',
    publicKey: 'h-INOgtIAD9T-cFDh'
};

const questions = [
    "Will you be my Valentine?"
];

const responses = {};
let userName = '';
let userEmail = '';
let noButtonClickCount = 0;

const comicMessages = [
    "Wait! Before you say no... imagine all the beautiful moments we could share together! 🌹💕",
    "My heart skips a beat every time I see you. Please give us a chance? 💓✨",
    "You're the reason I believe in love at first sight. Say YES? �💖",
    "Life is too short to say NO to happiness! Let's create memories together! 🌟💞",
    "I promise to make you smile every single day. Will you be mine? �💐",
    "The stars aligned for us to meet. Don't let this moment slip away! ⭐💘",
    "You make my world brighter just by existing. Please say YES! ☀️💝",
    "I've been waiting for someone like you my whole life. Be my Valentine? 🌹💗",
    "Every love story is beautiful, but ours could be my favorite! 💫💜",
    "You're not just special, you're irreplaceable. Give me a chance? 💎💕",
    "I promise to cherish every moment with you. Will you say YES? �💓",
    "My heart chose you before my mind could. Please choose me too? 💖✨",
    "You're the missing piece to my puzzle. Complete me by saying YES! 🧩💞",
    "I'll be your biggest fan, your best friend, and your forever love! 🌟💘",
    "Let's write our own fairy tale together. It starts with YES! 📖💗"
];

function initializeQuestions() {
    const container = document.getElementById('questionsContainer');
    
    questions.forEach((question, index) => {
        const questionCard = document.createElement('div');
        questionCard.className = 'question-card';
        questionCard.innerHTML = `
            <div class="question-text">${index + 1}. ${question}</div>
            <div class="button-group">
                <button class="answer-btn yes-btn" onclick="handleAnswer(${index}, 'yes', this)">
                    Yes
                </button>
                <button class="answer-btn no-btn" onclick="handleAnswer(${index}, 'no', this)">
                    No
                </button>
            </div>
        `;
        container.appendChild(questionCard);
    });
}

function handleAnswer(questionIndex, answer, button) {
    // If NO button clicked, show comic message and prevent action
    if (answer === 'no') {
        showComicMessage();
        moveNoButton(button);
        return;
    }
    
    const questionCard = button.closest('.question-card');
    const buttons = questionCard.querySelectorAll('.answer-btn');
    
    buttons.forEach(btn => {
        btn.classList.remove('selected');
        btn.disabled = true;
    });
    
    button.classList.add('selected');
    
    responses[questionIndex] = {
        question: questions[questionIndex],
        answer: answer
    };
    
    if (Object.keys(responses).length === questions.length) {
        setTimeout(submitAllAnswers, 500);
    }
}

function showComicMessage() {
    const messageEl = document.getElementById('comicMessage');
    const message = comicMessages[noButtonClickCount % comicMessages.length];
    
    messageEl.textContent = message;
    messageEl.classList.remove('hidden');
    
    noButtonClickCount++;
    
    // Show message for 10 seconds
    setTimeout(() => {
        messageEl.classList.add('hidden');
    }, 1000);
}

function moveNoButton(button) {
    // Get window dimensions
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const buttonRect = button.getBoundingClientRect();
    
    // Calculate random position anywhere in the window
    const maxX = windowWidth - buttonRect.width - 20;
    const maxY = windowHeight - buttonRect.height - 20;
    
    const randomX = Math.random() * maxX;
    const randomY = Math.random() * maxY;
    
    // Apply random position (fixed to window)
    button.style.position = 'fixed';
    button.style.left = randomX + 'px';
    button.style.top = randomY + 'px';
    button.style.transition = 'all 0.3s ease';
    button.style.zIndex = '999';
}

async function submitAllAnswers() {
    const finalUserName = userName || 'Anonymous';
    
    showLoading();
    
    const allAnswers = Object.keys(responses).map(index => ({
        questionNumber: parseInt(index) + 1,
        question: responses[index].question,
        answer: responses[index].answer
    }));
    
    // Format answers for email
    const answersText = allAnswers.map(item => 
        `Question ${item.questionNumber}: ${item.question}\nAnswer: ${item.answer.toUpperCase()}`
    ).join('\n\n');
    
    const templateParams = {
        submitter_name: finalUserName,
        submitter_email: userEmail || 'Not provided',
        timestamp: new Date().toLocaleString(),
        answers: answersText,
        answer_1: allAnswers[0]?.answer || 'N/A',
        question_1: allAnswers[0]?.question || 'N/A'
    };
    
    try {
        // Initialize EmailJS (only needed once)
        if (typeof emailjs !== 'undefined' && EMAILJS_CONFIG.publicKey !== 'YOUR_PUBLIC_KEY') {
            emailjs.init(EMAILJS_CONFIG.publicKey);
            
            const response = await emailjs.send(
                EMAILJS_CONFIG.serviceId,
                EMAILJS_CONFIG.templateId,
                templateParams
            );
            
            console.log('Email sent successfully:', response);
            submitted = true;
            setTimeout(() => {
                hideLoading();
                showThankYou();
            }, 800);
        } else {
            // If EmailJS not configured, just show the thank you message
            console.warn('EmailJS not configured. Skipping email notification.');
            submitted = true;
            setTimeout(() => {
                hideLoading();
                showThankYou();
            }, 800);
        }
    } catch (error) {
        hideLoading();
        console.error('Error sending email:', error);
        // Still show thank you message even if email fails
        submitted = true;
        showThankYou();
    }
}

function showLoading() {
    document.getElementById('surveyHeader').style.display = 'none';
    document.getElementById('questionsContainer').style.display = 'none';
    document.getElementById('loadingSpinner').classList.remove('hidden');
}

function hideLoading() {
    document.getElementById('loadingSpinner').classList.add('hidden');
}

function showThankYou() {
    document.getElementById('questionsContainer').style.display = 'none';
    const answer = responses[0].answer;
    
    if (answer === 'yes') {
        document.getElementById('yesMessage').classList.remove('hidden');
    } else {
        document.getElementById('noMessage').classList.remove('hidden');
    }
}

let submitted = false;

window.addEventListener('beforeunload', function (e) {
    if (!submitted) {
        e.preventDefault();
        e.returnValue = '';
    }
});

if (window.history && window.history.pushState) {
    window.history.pushState('forward', null, window.location.href);
    window.addEventListener('popstate', function() {
        window.history.pushState('forward', null, window.location.href);
    });
}

function handleProceed() {
    const nameInput = document.getElementById('userName');
    const emailInput = document.getElementById('userEmail');
    const nameError = document.getElementById('nameError');
    const userInfoSection = document.getElementById('userInfoSection');
    const questionsContainer = document.getElementById('questionsContainer');
    
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    
    if (name === '' || email === '') {
        nameError.classList.remove('hidden');
        if (name === '') {
            nameInput.focus();
        } else {
            emailInput.focus();
        }
        return;
    }
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        nameError.textContent = 'Please enter a valid email address';
        nameError.classList.remove('hidden');
        emailInput.focus();
        return;
    }
    
    userName = name;
    userEmail = email;
    nameError.classList.add('hidden');
    userInfoSection.classList.add('hidden');
    questionsContainer.classList.remove('hidden');
}

document.addEventListener('DOMContentLoaded', function() {
    initializeQuestions();
    
    const proceedBtn = document.getElementById('proceedBtn');
    const nameInput = document.getElementById('userName');
    
    proceedBtn.addEventListener('click', handleProceed);
    
    nameInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            handleProceed();
        }
    });
});
