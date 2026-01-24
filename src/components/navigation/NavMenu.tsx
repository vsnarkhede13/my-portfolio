const menuItems = {
  "2026": {
    "January": ["Week 1", "Week 2", "Week 3"],
    "February": ["Week 1"]
  },
  "2025": { /* ... */ }
};

// Inside your Navbar:
// Map over Object.keys(menuItems) for the first dropdown level.
// When hovered, show Month keys.
// When Month is hovered, show Week array.