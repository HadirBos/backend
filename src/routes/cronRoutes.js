const express = require('express');
const router = express.Router();
const { autoPayroll } = require('../scheduler/autoPayroll');
const { autoAbsent } = require('../scheduler/autoAbsent');

router.get('/auto-payroll', async (req, res) => {
    try {
        if (req.headers.authorization !== `Bearer ${process.env.CRON_SECRET}`) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        await autoPayroll();
        res.json({ success: true, message: 'Auto payroll executed successfully' });
    } catch (error) {
        console.error('Cron job error:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

router.get('/auto-absent', async (req, res) => {
    try {
        if (req.headers.authorization !== `Bearer ${process.env.CRON_SECRET}`) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        await autoAbsent();
        res.json({ success: true, message: 'Auto absent executed successfully' });
    } catch (error) {
        console.error('Cron job error:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

module.exports = router;