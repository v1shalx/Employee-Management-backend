const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  employeeId: { type: String, unique: true }, // Add unique employeeId field
  name: { type: String, required: true },
  mobile: { type: String, required: true },
  email: { type: String, required: true },
  position: { type: String, required: true },
  salary: { type: Number, required: true }
});

employeeSchema.pre('save', async function (next) {
  if (!this.isNew) {
    return next();
  }

  try {
    const lastEmployee = await mongoose.model('Employee').findOne().sort({ _id: -1 }).exec();
    if (!lastEmployee || !lastEmployee.employeeId) {
      this.employeeId = 'Emp-1'; // Initialize to Emp-1 if no previous employee exists
    } else {
      const lastEmployeeId = lastEmployee.employeeId;
      const lastIdNumber = parseInt(lastEmployeeId.split('-')[1]);
      this.employeeId = `Emp-${lastIdNumber + 1}`;
    }
    next();
  } catch (err) {
    next(err);
  }
});

module.exports = mongoose.model('Employee', employeeSchema);
