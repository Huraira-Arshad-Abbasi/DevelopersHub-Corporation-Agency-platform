import Lead from '../models/Lead.js';

// POST /api/leads  (public — contact form submission)
const submitLead = async (req, res) => {
  try {
    const { name, email, phone, serviceInterested, details } = req.body;
    if (!name || !email || !details)
      return res.status(400).json({ message: 'Name, email and details required' });

    const lead = await Lead.create({ name, email, phone, serviceInterested, details });
    res.status(201).json({ message: 'Inquiry submitted successfully', lead });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /api/leads  (admin)
const getLeads = async (req, res) => {
  try {
    const leads = await Lead.find().sort({ createdAt: -1 });
    res.json(leads);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PATCH /api/leads/:id/status  (admin — update status only)
const updateLeadStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const allowed = ['new', 'contacted', 'closed'];
    if (!allowed.includes(status))
      return res.status(400).json({ message: 'Invalid status' });

    const lead = await Lead.findByIdAndUpdate(
      req.params.id, { status }, { new: true }
    );
    if (!lead) return res.status(404).json({ message: 'Lead not found' });
    res.json(lead);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE /api/leads/:id  (admin)
const deleteLead = async (req, res) => {
  try {
    const lead = await Lead.findByIdAndDelete(req.params.id);
    if (!lead) return res.status(404).json({ message: 'Lead not found' });
    res.json({ message: 'Lead deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export { submitLead, getLeads, updateLeadStatus, deleteLead };