const mongoose = require('mongoose');

const academicSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    image: String,

    // 🔥 Levels (Pre-primary, Middle, etc.)
    levels: [
      {
        title: String,
        description: String,
      }
    ],

    // 🔥 Methodology
    methodology: [
      {
        title: String,
        description: String,
      }
    ],

    // 🔥 Curriculum highlights
    curriculum: [String],

    // 🔥 Results
    results: {
      class10: String,
      class12: String,
    },

    // 🔥 Exams
    exams: [
      {
        name: String,
        schedule: String,
        classes: String,
      }
    ]

  },
  { timestamps: true }
);

module.exports = mongoose.model('academic', academicSchema);


