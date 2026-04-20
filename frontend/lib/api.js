import api from "./axios";

// Leads API
export const createLead = (data) => api.post("/leads", data);
// Get all leads (admin)
export const getLeads = () => api.get("/leads");
// Update lead status (admin)
export const updateLeadStatus = (id, status) =>
  api.patch(`/leads/${id}/status`, { status });
// Delete lead (admin)
export const deleteLead = (id) => api.delete(`/leads/${id}`);



// Bookings API
export const createBooking = (data) => api.post("/meetings", data);

// Get all bookings
export const getBookings = () => api.get("/meetings");

// Update booking status
export const updateBookingStatus = (id, status) =>
  api.patch(`/meetings/${id}`, { status });

// Delete booking
export const deleteBooking = (id) => api.delete(`/meetings/${id}`);
