const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema(
  {
    // 🔹 Page title section
    title: String,
    description: String,
    image: String,

    // 🔥 Activities cards
    activities: [
      {
        title: String,
        description: String,
        icon: String, // store icon name like "Trophy"
      }
    ],

    // 🔥 Spotlight section
    spotlight: {
      title: String,
      description: String,
      image: String
    },

    // 🔥 Events calendar
    events: [
      {
        date: String,
        title: String
      }
    ],

    // 🔥 Stats section
    stats: [
      {
        value: String,
        label: String
      }
    ]

  },
  { timestamps: true }
);

module.exports = mongoose.model('activity', activitySchema);