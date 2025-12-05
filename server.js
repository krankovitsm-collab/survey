const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.static(__dirname));

// Create surveys directory if it doesn't exist
const surveysDir = path.join(__dirname, 'surveys');
if (!fs.existsSync(surveysDir)) {
    fs.mkdirSync(surveysDir, { recursive: true });
}

// Serve static files (HTML, CSS, JS)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Submit survey endpoint
app.post('/api/submit-survey', (req, res) => {
    try {
        const surveyData = req.body;
        
        // Validate required data
        if (!surveyData || !surveyData.metadata || !surveyData.metadata.category) {
            return res.status(400).json({ 
                success: false, 
                message: 'Invalid survey data: missing metadata or category' 
            });
        }

        // Generate filename
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const category = surveyData.metadata.category;
        const filename = `quadruple_helix_survey_${category}_${timestamp}.json`;
        const filePath = path.join(surveysDir, filename);

        // Save survey data to file
        fs.writeFileSync(filePath, JSON.stringify(surveyData, null, 2), 'utf8');

        console.log(`Survey saved: ${filename}`);
        
        res.json({ 
            success: true, 
            message: 'Survey submitted successfully!',
            filename: filename,
            timestamp: new Date().toISOString()
        });

    } catch (error) {
        console.error('Error saving survey:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Failed to save survey data',
            error: error.message 
        });
    }
});

// Get list of saved surveys endpoint (optional - for admin dashboard)
app.get('/api/surveys', (req, res) => {
    try {
        const files = fs.readdirSync(surveysDir)
            .filter(file => file.endsWith('.json'))
            .map(file => {
                const filePath = path.join(surveysDir, file);
                const stats = fs.statSync(filePath);
                return {
                    filename: file,
                    created: stats.birthtime,
                    size: stats.size
                };
            })
            .sort((a, b) => new Date(b.created) - new Date(a.created));

        res.json({ success: true, surveys: files });
    } catch (error) {
        console.error('Error listing surveys:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Failed to list surveys',
            error: error.message 
        });
    }
});

// Get specific survey data endpoint (optional - for admin dashboard)
app.get('/api/surveys/:filename', (req, res) => {
    try {
        const filename = req.params.filename;
        const filePath = path.join(surveysDir, filename);

        if (!fs.existsSync(filePath)) {
            return res.status(404).json({ 
                success: false, 
                message: 'Survey not found' 
            });
        }

        const surveyData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        res.json({ success: true, data: surveyData });

    } catch (error) {
        console.error('Error reading survey:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Failed to read survey data',
            error: error.message 
        });
    }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ 
        success: true, 
        message: 'Server is running',
        timestamp: new Date().toISOString()
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Survey server running on http://localhost:${PORT}`);
    console.log(`Surveys will be saved to: ${surveysDir}`);
});

module.exports = app;
