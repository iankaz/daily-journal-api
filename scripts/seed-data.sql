-- This is a MongoDB seeding script (JavaScript format for MongoDB)
-- Run this in MongoDB Compass or MongoDB shell

// Create default categories for testing
db.categories.insertMany([
  {
    name: "Personal",
    description: "Personal thoughts and experiences",
    color: "#3B82F6",
    isDefault: true,
    userId: ObjectId("your_user_id_here"),
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Work",
    description: "Work-related entries",
    color: "#10B981",
    isDefault: false,
    userId: ObjectId("your_user_id_here"),
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Travel",
    description: "Travel experiences and memories",
    color: "#F59E0B",
    isDefault: false,
    userId: ObjectId("your_user_id_here"),
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Health",
    description: "Health and wellness tracking",
    color: "#EF4444",
    isDefault: false,
    userId: ObjectId("your_user_id_here"),
    createdAt: new Date(),
    updatedAt: new Date()
  }
]);

// Create sample journal entries
db.journals.insertMany([
  {
    title: "First Day of the New Year",
    content: "Today marks the beginning of a new year and I'm feeling optimistic about what's to come. I've set some goals for myself and I'm excited to work towards them. The weather is beautiful and I spent some time reflecting on the past year.",
    date: new Date("2024-01-01"),
    mood: "excited",
    weather: "sunny",
    tags: ["new-year", "goals", "reflection"],
    isPrivate: true,
    category: ObjectId("category_id_here"),
    location: "Home",
    userId: ObjectId("your_user_id_here"),
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: "Productive Work Day",
    content: "Had a really productive day at work today. Completed the project I've been working on for weeks and received great feedback from my team. Feeling accomplished and ready for the next challenge.",
    date: new Date("2024-01-15"),
    mood: "happy",
    weather: "cloudy",
    tags: ["work", "productivity", "achievement"],
    isPrivate: false,
    category: ObjectId("work_category_id_here"),
    location: "Office",
    userId: ObjectId("your_user_id_here"),
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: "Weekend Hiking Adventure",
    content: "Went on an amazing hike today with friends. The trail was challenging but the views at the top were absolutely breathtaking. Nature has a way of putting everything into perspective. Feeling grateful for good friends and beautiful scenery.",
    date: new Date("2024-01-20"),
    mood: "grateful",
    weather: "sunny",
    tags: ["hiking", "nature", "friends", "adventure"],
    isPrivate: false,
    category: ObjectId("personal_category_id_here"),
    location: "Mountain Trail",
    userId: ObjectId("your_user_id_here"),
    createdAt: new Date(),
    updatedAt: new Date()
  }
]);
