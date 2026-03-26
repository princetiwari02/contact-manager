const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  firstName: { type: String, required: true, trim: true },
  lastName: { type: String, default: '', trim: true },
  email: [{ type: String, lowercase: true, trim: true }],
  phone: [{ label: { type: String, default: 'mobile' }, number: String }],
  address: {
    street: String, city: String, state: String, zip: String, country: String,
  },
  company: { type: String, default: '' },
  jobTitle: { type: String, default: '' },
  group: { type: String, default: 'General' },
  tags: [{ type: String, lowercase: true }],
  notes: { type: String, default: '' },
  isFavorite: { type: Boolean, default: false },
  avatar: { type: String, default: '' },
}, { timestamps: true });

contactSchema.index({ firstName: 'text', lastName: 'text', email: 'text', company: 'text' });
contactSchema.virtual('fullName').get(function () {
  return `${this.firstName} ${this.lastName}`.trim();
});

module.exports = mongoose.model('Contact', contactSchema);
