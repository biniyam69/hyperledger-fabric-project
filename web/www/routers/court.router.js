import express from 'express';
import * as CourtPeer from '../blockchain/courtPeer';

const router = express.Router();

// Render main page
router.get('/', (req, res) => {
  res.render('court-main', { courtActive: true });
});

// Case Management

router.post('/api/cases', async (req, res) => {
  try {
    let cases = await CourtPeer.getAllCases();
    res.json(cases);
  } catch (e) {
    res.json({ error: 'Error accessing blockchain.' });
  }
});

router.post('/api/create-case', async (req, res) => {
  let { caseDetails } = req.body;
  try {
    const uuid = await CourtPeer.createCase(caseDetails);
    res.json({ success: true, uuid });
  } catch (e) {
    res.json({ error: 'Error accessing blockchain.' });
  }
});

router.post('/api/add-party-to-case', async (req, res) => {
  let { caseNumber, partyName } = req.body;
  try {
    const success = await CourtPeer.addPartyToCase(caseNumber, partyName);
    res.json({ success });
  } catch (e) {
    res.json({ error: 'Error accessing blockchain.' });
  }
});

router.post('/api/schedule-hearing', async (req, res) => {
  let { caseNumber, hearingDate, hearingLocation } = req.body;
  try {
    const success = await CourtPeer.scheduleHearing(caseNumber, hearingDate, hearingLocation);
    res.json({ success });
  } catch (e) {
    res.json({ error: 'Error accessing blockchain.' });
  }
});

router.post('/api/update-case-status', async (req, res) => {
  let { caseNumber, newStatus } = req.body;
  try {
    const success = await CourtPeer.updateCaseStatus(caseNumber, newStatus);
    res.json({ success });
  } catch (e) {
    res.json({ error: 'Error accessing blockchain.' });
  }
});

// Otherwise redirect to the main page
router.get('*', (req, res) => {
  res.render('court', {
    courtActive: true,
    // Add other page active flags here
  });
});

function wsConfig(io) {
  CourtPeer.on('block', block => {
    io.emit('block', block);
  });
}

export default router;
export { wsConfig };