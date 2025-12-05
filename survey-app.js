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

// Sector color mappings (BIZTOSÍTÁS: Ha valamiért ez a survey-data.js-ből hiányozna, ne törjön el)
// Mivel a survey-data.js-t Ön töltötte fel, feltételezzük, hogy ez ott definiálva van.
// Ha mégsem, akkor a kód hibára fut. Ha a globális változók nincsenek definiálva, ez a leggyakoribb hiba.
if (typeof surveyData === 'undefined') {
    console.error("KRITIKUS HIBA: A 'survey-data.js' fájl nem töltődött be a 'survey-app.js' ELŐTT, VAGY HIÁNYZIK A 'surveyData' VÁLTOZÓ DEFINÍCIÓJA!");
    alert("Kérjük, ellenőrizze a konzolt és az index.html betöltési sorrendjét.");
}


// Initialize survey for selected category
function startSurvey(category) {
    currentCategory = category;
    metadata.category = category;
    metadata.startTime = new Date().toISOString();
    
    // A legbiztosabb szekció felépítés, ami figyelembe veszi a kategória-függő hiányokat.
    const allSections = [
        { name: 'intro', data: surveyData.intro },
        { name: 'university', data: surveyData.university ? surveyData.university[category] : undefined },
        { name: 'industry', data: surveyData.industry ? surveyData.industry[category] : undefined },
        { name: 'government', data: surveyData.government ? surveyData.government[category] : undefined },
        { name: 'society', data: surveyData.society ? surveyData.society[category] : undefined },
        { name: 'qh', data: surveyData.qh },
        { name: 'closing', data: surveyData.closing }
    ];

    // JAVÍTVA: Csak azokat a szekciókat vesszük figyelembe, amelyeknek van 'data' objektumuk, 
    // ÉS van bennük kérdés ('questions' tömb). Ez megakadályozza a progress bar és a loadSection összeomlását.
    sections = allSections.filter(s => s.data && s.data.questions && s.data.questions.length > 0);
    
    // HIBA ELLENŐRZÉS: Ha az intro kérdések nincsenek betöltve, azonnal jelzi
    if (sections.length === 0 || sections[0].name !== 'intro') {
        alert("HIBA: Az Intro szekció kérdései nem töltődtek be. Ellenőrizze a survey-data.js fájlt!");
        console.error("Az Intro szekció hiányzik vagy nem tartalmaz kérdést. Sections array:", sections);
        return;
    }
    
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
    
    // Hibaellenőrzés
    if (!sectionData || !sectionData.questions) {
        console.error('Hiányzó szekció adatok vagy kérdések:', section.name);
        // Megpróbáljuk a következő szekciót betölteni, ha ez üres.
        if (index < sections.length - 1) {
             loadSection(index + 1);
        }
        return;
    }
    
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
    const sectionData = sections[currentSectionIndex].data;
    
    // JAVÍTVA: Robusztus ellenőrzés a sectorColor-ra és a globális 'sectorColors' objektumra
    const sectorColor = (typeof sectorColors !== 'undefined' && sectionData && sectionData.sector && sectorColors[sectionData.sector]) 
                        ? sectorColors[sectionData.sector] 
                        : { border: 'border-gray-400', text: 'text-gray-700' }; // Fallback

    
    card.className = `question-card bg-white border-l-4 ${sectorColor.border} rounded-lg p-6 shadow-md`;
    
    // BIZTOSÍTÁS: Ellenőrzés, hogy a question tömb létezik-e a szekcióban
    const totalQuestions = sectionData && sectionData.questions 
                            ? sectionData.questions.length 
                            : 0;

    const questionNumber = index + 1;
    
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
        const textarea = card.querySelector(`#${question.id.replace(/\./g, '\\.')}`);
        const charCount = card.querySelector(`#char-count-${question.id.replace(/\./g, '\\.')}`);
        
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
    
    // BIZTOSÍTÁS: Ellenőrzés, hogy a questions tömb létezik-e
    const requiredQuestions = currentSection.data.questions 
                                ? currentSection.data.questions.filter(q => q.required) 
                                : [];

    const missingAnswers = requiredQuestions.filter(q => !responses[q.id] || responses[q.id].trim() === '');
    
    if (missingAnswers.length > 0) {
        alert(`Kérjük, válaszoljon a kötelező kérdésekre (${missingAnswers.length} hiányzik)!`);
        // Highlight missing fields
        missingAnswers.forEach(q => {
            const element = document.querySelector(`#${q.id.replace(/\./g, '\\.')}`);
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
        // JAVÍTVA: Ellenőrzés, hogy a section.data és section.data.questions létezik-e, 
        // mielőtt a ciklusba lépünk. Ez a legvalószínűbb oka a futásidejű hibáknak.
        if (section.data && section.data.questions) {
            section.data.questions.forEach(q => {
                allQuestions.push(q.id);
            });
        }
    });
    
    const answeredQuestions = allQuestions.filter(id => 
        responses[id] && responses[id].trim() !== ''
    );
    
    const totalCount = allQuestions.length;
    const progress = totalCount > 0 ? Math.round((answeredQuestions.length / totalCount) * 100) : 0;
    
    document.getElementById('progress-bar').style.width = `${progress}%`;
    document.getElementById('progress-text').textContent = `${progress}%`;
    document.getElementById('answered-count').textContent = answeredQuestions.length;
    document.getElementById('total-count').textContent = totalCount;
}

// Submit survey
function submitSurvey() {
    // Validate all required fields
    const allRequiredQuestions = [];
    sections.forEach(section => {
        // BIZTOSÍTÁS: Ellenőrzés, hogy a questions tömb létezik-e
        if (section.data && section.data.questions) {
            section.data.questions.filter(q => q.required).forEach(q => {
                allRequiredQuestions.push(q);
            });
        }
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
        sections: sections
                    .filter(s => s.data && s.data.questions) // Csak a kérdéseket tartalmazó szekciók
                    .map(s => ({
                        name: s.name,
                        title: s.data.title,
                        questionCount: s.data.questions.length
                    }))
    };
    
    // Submit to Google Drive via Apps Script
    submitSurveyToGoogleDrive(finalData);
}

// Alias for finishSurvey (called from HTML button)
function finishSurvey() {
    submitSurvey();
}

// Configuration for Google Apps Script
const GOOGLE_APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbz2IIip0uIX7DGEYPE4dRn_IziScmSX9fUJvtxPjB9dtPxNbg97ryC9BaNB7vZnvWmB5w/exec'; // Replace with your deployed script URL

// Submit survey data to Google Drive via Google Apps Script
async function submitSurveyToGoogleDrive(data) {
    try {
        // Show loading state
        showLoadingState(true);
        
        // Check if Google Apps Script URL is configured
        if (!GOOGLE_APPS_SCRIPT_URL || GOOGLE_APPS_SCRIPT_URL === 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE') {
            throw new Error('Backend configuration missing');
        }

        // Use JSONP to avoid CORS issues completely
        const encodedData = encodeURIComponent(JSON.stringify(data));
        const callbackName = 'jsonp_callback_' + Date.now();
        
        console.log('Attempting to submit via JSONP...', GOOGLE_APPS_SCRIPT_URL);
        
        return new Promise((resolve, reject) => {
            // Create callback function
            window[callbackName] = function(response) {
                console.log('JSONP response received:', response);
                // Clean up
                if (script && script.parentNode) {
                    script.parentNode.removeChild(script);
                }
                delete window[callbackName];
                
                if (response && response.success) {
                    console.log('Survey submitted successfully to Google Drive:', response);
                    
                    // Show success message
                    showSuccessMessage('A kérdőív sikeresen elküldve!');
                    
                    // Clear auto-saved data since survey was successfully submitted
                    localStorage.removeItem('qh_survey_autosave');
                    
                    // Show thank you screen
                    document.getElementById('survey-screen').classList.add('hidden');
                    document.getElementById('thankyou-screen').classList.remove('hidden');
                    document.getElementById('progress-container').classList.add('hidden');
                    
                    resolve(response);
                } else {
                    // Google Drive mentés sikertelen, de lokális letöltést biztosítunk
                    console.error('Google Drive mentés sikertelen:', response ? (response.error || 'Backend service returned an error') : 'Invalid response');
                    
                    // Hibaüzenet megjelenítése
                    showErrorMessage('A Google Drive kapcsolat jelenleg nem elérhető. A kérdőív automatikusan letöltésre kerül biztonsági másolatként.');
                    
                    // Automatikus letöltés 2 másodperc után
                    setTimeout(() => {
                        downloadJSON(data);
                    }, 2000);
                    
                    // Thank you screen megjelenítése 3 másodperc után
                    setTimeout(() => {
                        document.getElementById('survey-screen').classList.add('hidden');
                        document.getElementById('thankyou-screen').classList.remove('hidden');
                        document.getElementById('progress-container').classList.add('hidden');
                    }, 3000);
                    
                    // Promise sikeresként resolve-oljuk, mert a lokális letöltés megtörtént
                    resolve({ success: false, fallback: true });
                }
            };
            
            // Create script tag for JSONP
            const script = document.createElement('script');
            script.src = `${GOOGLE_APPS_SCRIPT_URL}?data=${encodedData}&callback=${callbackName}`;
            
            // Add timeout
            const timeout = setTimeout(() => {
                if (script && script.parentNode) {
                    script.parentNode.removeChild(script);
                }
                delete window[callbackName];
                
                console.error('Google Drive kapcsolat időtúllépés');
                showErrorMessage('A Google Drive kapcsolat időtúllépés miatt sikertelen. A kérdőív automatikusan letöltésre kerül biztonsági másolatként.');
                
                // Automatikus letöltés időtúllépés esetén
                setTimeout(() => {
                    downloadJSON(data);
                }, 2000);
                
                // Thank you screen megjelenítése
                setTimeout(() => {
                    document.getElementById('survey-screen').classList.add('hidden');
                    document.getElementById('thankyou-screen').classList.remove('hidden');
                    document.getElementById('progress-container').classList.add('hidden');
                }, 3000);
                
                resolve({ success: false, fallback: true, reason: 'timeout' });
            }, 30000); // 30 seconds timeout
            
            script.onload = function() {
                clearTimeout(timeout);
                // Response should be handled by the callback
            };
            
            script.onerror = function() {
                clearTimeout(timeout);
                console.error('JSONP script failed to load:', script.src);
                // Clean up
                if (script && script.parentNode) {
                    script.parentNode.removeChild(script);
                }
                delete window[callbackName];
                
                showErrorMessage('A Google Drive kapcsolat jelenleg nem elérhető. A kérdőív automatikusan letöltésre kerül biztonsági másolatként.');
                
                // Automatikus letöltés script error esetén
                setTimeout(() => {
                    downloadJSON(data);
                }, 2000);
                
                // Thank you screen megjelenítése
                setTimeout(() => {
                    document.getElementById('survey-screen').classList.add('hidden');
                    document.getElementById('thankyou-screen').classList.remove('hidden');
                    document.getElementById('progress-container').classList.add('hidden');
                }, 3000);
                
                resolve({ success: false, fallback: true, reason: 'script_error' });
            };
            
            // Add script to page
            console.log('Loading JSONP script:', script.src);
            document.head.appendChild(script);
        });
        
    } catch (error) {
        console.error('Error submitting survey to Google Drive:', error);
        
        // Fallback error handling for configuration issues
        const errorMessage = error.message || 'Unknown error';
        if (errorMessage.includes('Backend configuration missing')) {
            showErrorMessage('A Google Drive kapcsolat nincs beállítva. A kérdőív automatikusan letöltésre kerül biztonsági másolatként.');
        } else {
            showErrorMessage('Hiba történt a kérdőív mentése során. A rendszer automatikusan letölti a válaszait biztonsági másolatként.');
        }
        
        // Fallback: automatically download the data
        setTimeout(() => {
            downloadJSON(data);
        }, 2000);
        
        // Show thank you screen even if upload failed
        setTimeout(() => {
            document.getElementById('survey-screen').classList.add('hidden');
            document.getElementById('thankyou-screen').classList.remove('hidden');
            document.getElementById('progress-container').classList.add('hidden');
        }, 3000);
    } finally {
        showLoadingState(false);
    }
}

// Show welcome screen
function showWelcome() {
    if (confirm('Biztosan megszakítja a kitöltést? A válaszai elvesznek.')) {
        location.reload();
    }
}

// Keep the original download function as fallback
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

// Show loading state during submission
function showLoadingState(isLoading) {
    const submitBtn = document.querySelector('button[onclick="finishSurvey()"]');
    if (submitBtn) {
        if (isLoading) {
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Küldés...';
        } else {
            submitBtn.disabled = false;
            submitBtn.innerHTML = '<i class="fas fa-check mr-2"></i>Kérdőív befejezése';
        }
    }
}

// Show success message
function showSuccessMessage(message) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'fixed top-4 right-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded z-50';
    messageDiv.innerHTML = `
        <div class="flex items-center">
            <i class="fas fa-check-circle mr-2"></i>
            ${message}
        </div>
    `;
    document.body.appendChild(messageDiv);
    
    // Remove after 5 seconds
    setTimeout(() => {
        if (messageDiv.parentNode) {
            messageDiv.parentNode.removeChild(messageDiv);
        }
    }, 5000);
}

// Show error message
function showErrorMessage(message) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'fixed top-4 right-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded z-50 max-w-md';
    messageDiv.innerHTML = `
        <div class="flex items-center">
            <i class="fas fa-exclamation-triangle mr-2"></i>
            <span>${message}</span>
            <button onclick="this.parentNode.parentNode.remove()" class="ml-2 text-red-500 hover:text-red-700">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    document.body.appendChild(messageDiv);
}

// Fallback download option when GitHub submission fails
function offerDownloadFallback(data) {
    // Automatically download as fallback
    downloadJSON(data);
    showSuccessMessage('Válaszai letöltésre kerültek biztonsági másolatként.');
}

// Keep the original download function as fallback
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