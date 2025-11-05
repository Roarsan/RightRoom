// validateEnv.js
module.exports = function validateEnv() {
  const requiredVars = ['MONGO_URL', 'SESSION_SECRET', 'MAPS_API_KEY'];

  requiredVars.forEach((key) => {
    if (!process.env[key]) {
      console.error(`❌ Missing required environment variable: ${key}`);
      process.exit(1); // Stop the app immediately
    }
  });
};
