import Portfolio from '../models/Portfolio.js';

const getPortfolios = async (req, res) => {
  try {
    const items = await Portfolio.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getPortfolioById = async (req, res) => {
  try {
    const item = await Portfolio.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Portfolio item not found' });
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createPortfolio = async (req, res) => {
  try {
    const { title, description, technologies, liveUrl } = req.body;
    const imageUrl = req.file ? req.file.path : null;

    if (!title) return res.status(400).json({ message: 'Title required' });

    const item = await Portfolio.create({ title, description, imageUrl, technologies, liveUrl });
    res.status(201).json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updatePortfolio = async (req, res) => {
  try {
    // If a new image is uploaded, its URL will be in req.file.path. Otherwise, keep existing image.
    if (req.file) {
      item.imageUrl = req.file.path;
      
    }
    const item = await Portfolio.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!item) return res.status(404).json({ message: 'Portfolio item not found' });
    
    
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deletePortfolio = async (req, res) => {
  try {
    const item = await Portfolio.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ message: 'Portfolio item not found' });
    res.json({ message: 'Portfolio item deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export { getPortfolios, getPortfolioById, createPortfolio, updatePortfolio, deletePortfolio };