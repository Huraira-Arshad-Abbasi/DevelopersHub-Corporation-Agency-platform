import Meeting from '../models/Meeting.js';

// POST /api/meetings  (public — book a slot)
const bookMeeting = async (req, res) => {
  try {
    const { clientName, email, phone, service, dateTime, note } = req.body;
    if (!clientName || !email || !dateTime)
      return res.status(400).json({ message: 'Name, email and dateTime required' });

    // prevent double-booking same slot
    const conflict = await Meeting.findOne({
      dateTime: new Date(dateTime),
      status: { $ne: 'cancelled' }
    });
    if (conflict)
      return res.status(409).json({ message: 'This time slot is already booked' });

    const meeting = await Meeting.create({ clientName, email, phone, service, dateTime, note });
    res.status(201).json({ message: 'Meeting booked successfully', meeting });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /api/meetings  (admin)
const getMeetings = async (req, res) => {
  try {
    const meetings = await Meeting.find().sort({ dateTime: 1 }); // soonest first
    res.json(meetings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PATCH /api/meetings/:id/status  (admin)
const updateMeetingStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const allowed = ['pending', 'confirmed', 'cancelled'];
    if (!allowed.includes(status))
      return res.status(400).json({ message: 'Invalid status' });

    const meeting = await Meeting.findByIdAndUpdate(
      req.params.id, { status }, { new: true }
    );
    if (!meeting) return res.status(404).json({ message: 'Meeting not found' });
    res.json(meeting);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// DELETE /api/meetings/:id  (admin)
const deleteMeeting = async (req, res) => {
  try {
    const meeting = await Meeting.findByIdAndDelete(req.params.id);
    if (!meeting) return res.status(404).json({ message: 'Meeting not found' });
    res.json({ message: 'Meeting deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export { bookMeeting, getMeetings, updateMeetingStatus, deleteMeeting };

