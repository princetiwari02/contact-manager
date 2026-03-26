const Contact = require('../models/contact.model');

exports.getContacts = async (req, res) => {
  try {
    const { search, group, tag, favorite, page = 1, limit = 20 } = req.query;
    const query = { user: req.user.id };
    if (search) query.$text = { $search: search };
    if (group) query.group = group;
    if (tag) query.tags = tag.toLowerCase();
    if (favorite === 'true') query.isFavorite = true;

    const contacts = await Contact.find(query)
      .sort({ firstName: 1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await Contact.countDocuments(query);
    res.json({ total, page: Number(page), contacts });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.getContactById = async (req, res) => {
  try {
    const contact = await Contact.findOne({ _id: req.params.id, user: req.user.id });
    if (!contact) return res.status(404).json({ message: 'Contact not found' });
    res.json(contact);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.createContact = async (req, res) => {
  try {
    const contact = await Contact.create({ ...req.body, user: req.user.id });
    res.status(201).json(contact);
  } catch (err) { res.status(400).json({ message: err.message }); }
};

exports.updateContact = async (req, res) => {
  try {
    const contact = await Contact.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      req.body, { new: true, runValidators: true }
    );
    if (!contact) return res.status(404).json({ message: 'Contact not found' });
    res.json(contact);
  } catch (err) { res.status(400).json({ message: err.message }); }
};

exports.deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    if (!contact) return res.status(404).json({ message: 'Contact not found' });
    res.json({ message: 'Contact deleted' });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.toggleFavorite = async (req, res) => {
  try {
    const contact = await Contact.findOne({ _id: req.params.id, user: req.user.id });
    if (!contact) return res.status(404).json({ message: 'Contact not found' });
    contact.isFavorite = !contact.isFavorite;
    await contact.save();
    res.json({ isFavorite: contact.isFavorite });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.getGroups = async (req, res) => {
  try {
    const groups = await Contact.distinct('group', { user: req.user.id });
    res.json(groups);
  } catch (err) { res.status(500).json({ message: err.message }); }
};
