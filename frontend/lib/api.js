import api from "./axios";

// <-- Auth API --->
// Admin Login
export const loginAdmin = (data) => api.post("/auth/login", data);
// Get admin profile
export const getAdminProfile = () => api.get("/auth/me");



// <-- Services API --->
// Get active services
export const getServices = () => api.get("/services");
// Get service by ID
export const getServiceById = (id) => api.get(`/services/${id}`);
// Create new service
export const createService = (data) =>
  api.post("/services", data);
// Get all services (admin)
export const getAllServices = () => api.get("/services/all");
// Update service by ID
export const updateService = (id, data) =>
  api.put(`/services/${id}`, data);
// Delete service by ID
export const deleteService = (id) =>
  api.delete(`/services/${id}`);

// <-- Portfolio API --->
// Get all portfolio
export const getPortfolios = () => api.get("/portfolio");
// Get portfolio by ID
export const getPortfolioById = (id) => api.get(`/portfolio/${id}`); 
// Create new portfolio
export const createPortfolio = (data) =>
  api.post("/portfolio", data);
// Update portfolio by ID
export const updatePortfolio = (id, data) =>
  api.put(`/portfolio/${id}`, data);
// Delete portfolio by ID
export const deletePortfolio = (id) =>
  api.delete(`/portfolio/${id}`);

// <-- Blogs API --->
// Get all blogs
export const getBlogs = () => api.get("/blog/all");
// Get published blogs
export const getPublishedBlogs = () => api.get("/blog");
// Get blog by ID
export const getBlogById = (id) => api.get(`/blog/${id}`);
// Create new blog
export const createBlog = (data) =>
  api.post("/blog", data);
// Update blog by ID
export const updateBlog = (id, data) =>
  api.put(`/blog/${id}`, data);
// Delete blog by ID
export const deleteBlog = (id) =>
  api.delete(`/blog/${id}`);



// <-- Leads API -->
// Create new lead
export const createLead = (data) => api.post("/leads", data);
// Get all leads (admin)
export const getLeads = () => api.get("/leads");
// Update lead status (admin)
export const updateLeadStatus = (id, status) =>
  api.patch(`/leads/${id}/status`, { status });
// Delete lead (admin)
export const deleteLead = (id) => api.delete(`/leads/${id}`);



// <-- Bookings API -->
// Create new booking
export const createBooking = (data) => api.post("/meetings", data);
// Get all bookings
export const getBookings = () => api.get("/meetings");
// Update booking status
export const updateBookingStatus = (id, status) =>
  api.patch(`/meetings/${id}/status`, { status });
// Delete booking
export const deleteBooking = (id) => api.delete(`/meetings/${id}`);
