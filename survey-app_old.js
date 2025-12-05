// Survey Application Logic
let currentCategory = null;
let currentSectionIndex = 0;
let sections = [];
let responses = {};
let metadata = {
    startTime: null,
    endTime: null,
    category: null,
    userAgent: navigator.userAgent,
    timestamp: new Date().toISOString()
};

// Initialize survey for selected category
function startSurvey(category) {
    currentCategory = category;
    metadata.category = category;
    metadata.startTime = new Date().toISOString();
    
    // Build sections array based on category
    sections = [
        { name: 'intro', data: surveyData.intro },
        { name: 'university', data: surveyData.university[category] },
        { name: 'industry', data: surveyData.industry[category] },
        { name: 'government', data: surveyData.government[category] },
        { name: 'society', data: surveyData.society[category] },
        { name: 'qh', data: surveyData.qh },
        { name: 'closing', data: surveyData.closing }
    ];
    
    currentSectionIndex = 0;
    
    // Show survey screen
    document.getElementById('welcome-screen').classList.add('hidden');
    document.getElementById('survey-screen').classList.remove('hidden');
    document.getElementById('progress-container').classList.remove('hidden');
    
    // Load first section
    loadSection(0);
    updateProgress();
}

// Load a specific section
function loadSection(index) {
    if (index < 0 || index >= sections.length) return;
    
    currentSectionIndex = index;
    const section = sections[index];
    const sectionData = section.data;
    
    // Update section title
    const titleElement = document.getElementById('section-title');
    titleElement.innerHTML = `
        <i class="fas ${sectionData.icon} mr-3"></i>
        ${sectionData.title}
    `;
    
    // Render questions
    const container = document.getElementById('questions-container');
    container.innerHTML = '';
    
    sectionData.questions.forEach((question, qIndex) => {
        const questionCard = createQuestionCard(question, qIndex);
        container.appendChild(questionCard);
    });
    
    // Update navigation buttons
    updateNavigationButtons();
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Create question card element
function createQuestionCard(question, index) {
    const card = document.createElement('div');
    const sectorColor = sectorColors[sections[currentSectionIndex].data.sector];
    
    card.className = `question-card bg-white border-l-4 ${sectorColor.border} rounded-lg p-6 shadow-md`;
    
    const questionNumber = index + 1;
    const totalQuestions = sections[currentSectionIndex].data.questions.length;
    
    card.innerHTML = `
        <div class="flex items-start justify-between mb-3">
            <div class="flex-1">
                <div class="flex items-center gap-2 mb-2">
                    <span class="text-xs font-mono ${sectorColor.text} bg-gray-100 px-2 py-1 rounded">
                        ${question.code || question.id}
                    </span>
                    ${question.required ? 
                        '<span class="text-xs text-red-600 font-semibold">* Kötelező</span>' : 
                        '<span class="text-xs text-gray-500">Opcionális</span>'
                    }
                </div>
                <label class="block text-gray-800 font-medium mb-2">
                    ${questionNumber}. ${question.text}
                </label>
            </div>
            <span class="text-xs text-gray-400 ml-4">${questionNumber}/${totalQuestions}</span>
        </div>
        
        ${question.type === 'textarea' ? `
            <textarea 
                id="${question.id}"
                class="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200 min-h-32 resize-y"
                placeholder="Írja be válaszát..."
                ${question.required ? 'required' : ''}
            >${responses[question.id] || ''}</textarea>
            <div class="mt-2 text-xs text-gray-500 flex items-center justify-between">
                <span><i class="fas fa-info-circle mr-1"></i>Részletes válasz segíti az elemzést</span>
                <span id="char-count-${question.id}" class="font-mono">0 karakter</span>
            </div>
        ` : ''}
    `;
    
    // Add character counter
    if (question.type === 'textarea') {
        const textarea = card.querySelector(`#${question.id}`);
        const charCount = card.querySelector(`#char-count-${question.id}`);
        
        textarea.addEventListener('input', (e) => {
            charCount.textContent = `${e.target.value.length} karakter`;
            responses[question.id] = e.target.value;
            updateProgress();
        });
        
        // Initialize character count
        charCount.textContent = `${textarea.value.length} karakter`;
    }
    
    return card;
}

// Update navigation buttons
function updateNavigationButtons() {
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const submitBtn = document.getElementById('submit-btn');
    
    // Previous button
    prevBtn.disabled = currentSectionIndex === 0;
    
    // Next/Submit buttons
    if (currentSectionIndex === sections.length - 1) {
        nextBtn.classList.add('hidden');
        submitBtn.classList.remove('hidden');
    } else {
        nextBtn.classList.remove('hidden');
        submitBtn.classList.add('hidden');
    }
}

// Navigate to previous section
function previousSection() {
    if (currentSectionIndex > 0) {
        loadSection(currentSectionIndex - 1);
    }
}

// Navigate to next section
function nextSection() {
    // Validate required fields
    const currentSection = sections[currentSectionIndex];
    const requiredQuestions = currentSection.data.questions.filter(q => q.required);
    const missingAnswers = requiredQuestions.filter(q => !responses[q.id] || responses[q.id].trim() === '');
    
    if (missingAnswers.length > 0) {
        alert(`Kérjük, válaszoljon a kötelező kérdésekre (${missingAnswers.length} hiányzik)!`);
        // Highlight missing fields
        missingAnswers.forEach(q => {
            const element = document.getElementById(q.id);
            if (element) {
                element.classList.add('border-red-500', 'ring-2', 'ring-red-200');
                setTimeout(() => {
                    element.classList.remove('border-red-500', 'ring-2', 'ring-red-200');
                }, 3000);
            }
        });
        return;
    }
    
    if (currentSectionIndex < sections.length - 1) {
        loadSection(currentSectionIndex + 1);
    }
}

// Update progress bar
function updateProgress() {
    const allQuestions = [];
    sections.forEach(section => {
        section.data.questions.forEach(q => {
            allQuestions.push(q.id);
        });
    });
    
    const answeredQuestions = allQuestions.filter(id => 
        responses[id] && responses[id].trim() !== ''
    );
    
    const progress = Math.round((answeredQuestions.length / allQuestions.length) * 100);
    
    document.getElementById('progress-bar').style.width = `${progress}%`;
    document.getElementById('progress-text').textContent = `${progress}%`;
    document.getElementById('answered-count').textContent = answeredQuestions.length;
    document.getElementById('total-count').textContent = allQuestions.length;
}

// Submit survey
function submitSurvey() {
    // Validate all required fields
    const allRequiredQuestions = [];
    sections.forEach(section => {
        section.data.questions.filter(q => q.required).forEach(q => {
            allRequiredQuestions.push(q);
        });
    });
    
    const missingAnswers = allRequiredQuestions.filter(q => 
        !responses[q.id] || responses[q.id].trim() === ''
    );
    
    if (missingAnswers.length > 0) {
        alert(`Kérjük, válaszoljon az összes kötelező kérdésre! (${missingAnswers.length} hiányzik)`);
        return;
    }
    
    // Confirm submission
    if (!confirm('Biztosan be szeretné küldeni a kérdőívet? A válaszok később nem módosíthatók.')) {
        return;
    }
    
    // Prepare final data
    metadata.endTime = new Date().toISOString();
    const duration = new Date(metadata.endTime) - new Date(metadata.startTime);
    metadata.durationMinutes = Math.round(duration / 60000);
    
    const finalData = {
        metadata: metadata,
        responses: responses,
        sections: sections.map(s => ({
            name: s.name,
            title: s.data.title,
            questionCount: s.data.questions.length
        }))
    };
    
    // Download as JSON
    downloadJSON(finalData);
    
    // Show thank you screen
    document.getElementById('survey-screen').classList.add('hidden');
    document.getElementById('thankyou-screen').classList.remove('hidden');
    document.getElementById('progress-container').classList.add('hidden');
}

// Download responses as JSON
function downloadJSON(data) {
    const dataStr = JSON.stringify(data, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `quadruple_helix_survey_${metadata.category}_${Date.now()}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

// Show welcome screen
function showWelcome() {
    if (confirm('Biztosan megszakítja a kitöltést? A válaszai elvesznek.')) {
        location.reload();
    }
}

// Auto-save functionality (to localStorage)
function autoSave() {
    const saveData = {
        category: currentCategory,
        sectionIndex: currentSectionIndex,
        responses: responses,
        metadata: metadata
    };
    localStorage.setItem('qh_survey_autosave', JSON.stringify(saveData));
}

// Load auto-saved data
function loadAutoSave() {
    const saved = localStorage.getItem('qh_survey_autosave');
    if (saved) {
        try {
            const data = JSON.parse(saved);
            if (confirm('Találtunk egy korábban megkezdett kérdőívet. Szeretné folytatni?')) {
                currentCategory = data.category;
                currentSectionIndex = data.sectionIndex;
                responses = data.responses;
                metadata = data.metadata;
                startSurvey(currentCategory);
                loadSection(currentSectionIndex);
            } else {
                localStorage.removeItem('qh_survey_autosave');
            }
        } catch (e) {
            console.error('Error loading autosave:', e);
        }
    }
}

// Periodic auto-save (every 30 seconds)
setInterval(() => {
    if (currentCategory) {
        autoSave();
    }
}, 30000);

// Load autosave on page load
window.addEventListener('load', () => {
    loadAutoSave();
});

// Warn before leaving page
window.addEventListener('beforeunload', (e) => {
    if (currentCategory && document.getElementById('survey-screen').classList.contains('hidden') === false) {
        e.preventDefault();
        e.returnValue = '';
    }
});