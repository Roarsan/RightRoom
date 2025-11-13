# 🏠 SpareRoom Clone

A modern property listings web application inspired by [SpareRoom.co.uk](https://www.spareroom.co.uk).  
Built with **Express.js**, **MongoDB**, and **EJS**, following clean MVC architecture with **Bootstrap 5** styling and custom CSS.  
A fully functional CRUD application for managing property listings with responsive design and comprehensive error handling.

## ✨ Live Demo
Visit `http://localhost:8080` after running the application to see the live demo.

## 🚀 Tech Stack

### Backend
- **Node.js 18+** — JavaScript runtime
- **Express.js 5.1.0** — Web framework and routing
- **Mongoose 8.18.0** — MongoDB ODM for database operations
- **express-session 1.18.2** — Session management
- **connect-mongo 5.1.0** — MongoDB session store
- **method-override 3.0.0** — Support for PUT and DELETE HTTP methods
- **Joi 18.0.1** — Data validation and schema validation
- **dotenv 17.2.3** — Environment variable management

### Frontend
- **EJS 3.1.10** — Server-side templating engine
- **Bootstrap 5.3.3** — CSS framework for responsive design
- **Custom CSS** — SpareRoom-inspired styling with blue/white theme
- **Vanilla JavaScript** — Client-side interactions and form validation
- **Google Maps JavaScript API** — Interactive map display for property locations

### Database
- **MongoDB** — NoSQL database for storing property listings
- **Default Connection**: `mongodb://127.0.0.1:27017/spare_room`

## 🧩 Features

### Core Functionality
- ✅ **View All Listings** — Grid layout with property cards
- ✅ **View Single Listing** — Detailed property information with optional map view
- ✅ **Create New Listing** — Add properties with form validation
- ✅ **Edit Listing** — Update existing property information
- ✅ **Delete Listing** — Remove properties with confirmation
- ✅ **User Authentication** — Register, login, and logout functionality
- ✅ **Authorization** — Owner-only access to modify listings
- ✅ **Session Management** — Secure session handling with MongoDB store
- ✅ **Environment Configuration** — Secure environment variable validation
- ✅ **Responsive Design** — Mobile-first Bootstrap layout
- ✅ **Error Handling** — Comprehensive error management with custom error pages
- ✅ **Input Validation** — Server-side validation with Joi schemas
- ✅ **User Profiles** — View public landlord/tenant profiles populated from MongoDB
- ✅ **Peer Reviews** — Authenticated users can leave 1–5 star reviews with comments

### UI/UX Features
- 🎨 **Modern Design** — Clean, SpareRoom-inspired interface
- 📱 **Responsive Layout** — Works on all device sizes
- 🖼️ **Property Cards** — Beautiful card-based listing display
- 🗺️ **Interactive Maps** — Google Maps integration for property locations
- 🎯 **Intuitive Navigation** — Easy-to-use navigation system
- ⚡ **Fast Loading** — Optimized for performance
- 🎨 **Custom Styling** — Professional blue/white color scheme
## 🔍 Branch Review Summary (`work`)

The current branch was reviewed to surface high-priority technical findings for the next iteration:

- ⚠️ **Missing error imports in review services** — `services/reviewService.js` references `ExpressError` and `httpStatus` without importing them, which will raise a `ReferenceError` the first time that branch executes (for example, if no reviews are returned). A guard clause or proper import should be added.
- ⚠️ **Average rating can become `NaN`** — When a profile has zero reviews, `total / reviewCount` divides by zero and EJS receives `NaN`. Add a fallback of `0` (or `null`) before rendering to avoid confusing UI output.
- ⚠️ **Unused dependency** — `controllers/reviewController.js` imports `express-session` but never uses it; remove the import to keep bundle size lean.
- ⚠️ **Profile fetch is unguarded** — `controllers/profileController.js` calls `reviewService.getReviews` immediately after fetching a user; if the user lookup fails, the second query still runs. Exit early after throwing the 404 from `profileService` to prevent double queries.
- 📝 **Documentation drift** — Prior README sections referenced a `CODE_REVIEW_CURRENT.md` file that no longer exists and omitted newly added profile/review endpoints. This document now reflects the active routes and dependencies.


## ✅ Prerequisites

- **Node.js 18+** — Download from [nodejs.org](https://nodejs.org/)
- **MongoDB** — Running locally or MongoDB Atlas connection
- **npm** — Comes with Node.js

### MongoDB Setup Options

1. **Local MongoDB**: Install MongoDB locally and run `mongod`


Default connection string: `mongodb://127.0.0.1:27017/spare_room`

## 🧰 Installation & Setup

### 1. Clone and Install
```bash
git clone <repository-url>
cd SpareRoomClone
npm install
```

### 2. Environment Setup
Create a `.env` file in the root directory:
```bash
# Server Configuration
PORT=8080

# Database Configuration
MONGO_URL=mongodb://127.0.0.1:27017/spare_room

# Session Configuration
SESSION_SECRET=your-super-secret-session-key-change-this-in-production

# Environment
NODE_ENV=development

# Google Maps API Key (required by validateEnv.js)
# Get your key from: https://console.cloud.google.com/google/maps-apis
# Use a dummy value during local development if the map feature is disabled
MAPS_API_KEY=your-google-maps-api-key-here
```

**Note**: The application validates required environment variables (`MONGO_URL`, `SESSION_SECRET`, `MAPS_API_KEY`) at startup. If any are missing, the app will exit with an error message.

### 3. Database Setup
This clears the collection and inserts a few sample listings.
```bash
# Using npm script
npm run init-db

# Or directly with node
node initDB/initDB.js
```

This clears the collection and inserts a few sample listings.

### 4. Start the Application
```bash
# Development mode with auto-restart (recommended)
npm run dev

# Production mode
npm start
```

### 5. Access the Application
Open your browser and navigate to: `http://localhost:8080`

## 🗄️ Database Schema

### Property Listing Model
```javascript
{
  image: String (required)        // Property image URL
  title: String (required)        // Property title
  address: String (required)      // Property address
  description: String (required)  // Property description
  price: Number (required, min: 0) // Monthly rent price
  owner: ObjectId (required)      // Reference to User who created the listing
  createdAt: Date (auto-generated) // Creation timestamp
  updatedAt: Date (auto-generated) // Last update timestamp
}
```

### User Model
```javascript
{
  username: String (required, unique)  // User's username
  email: String (required, unique)      // User's email (lowercase, trimmed)
  password: String (required)           // Hashed password (bcrypt)
  createdAt: Date (auto-generated)      // Creation timestamp
  updatedAt: Date (auto-generated)      // Last update timestamp
}
```

### Sample Data
The application comes with 3 sample listings:
- Spacious Two-Bedroom Flat in Manchester (£950/month)
- Luxury Ensuite Room in Oxford (£850/month)
- Cozy Room with Balcony in Bristol (£780/month)

## 🌐 Routes Overview

| Method | Route | Handler | Middleware | Description |
|--------|-------|---------|------------|-------------|
| GET | `/` | inline | – | Welcome page with navigation |
| GET | `/list/listing` | `getAllListings` | – | Display all property listings |
| GET | `/list/newlisting` | `newListing` | `isLoggedIn` | Show create listing form |
| POST | `/list/createlisting` | `createListing` | `isLoggedIn`, `validate(listSchema)` | Create new listing |
| GET | `/list/:id` | `showListingDetails` | – | Show single listing details |
| GET | `/list/:id/editlisting` | `editListing` | `isLoggedIn`, `isOwner` | Show edit listing form |
| PUT | `/list/:id` | `updateListing` | `isLoggedIn`, `isOwner`, `validate(listSchema)` | Update listing |
| DELETE | `/list/:id` | `deleteListing` | `isLoggedIn`, `isOwner` | Delete listing |
| GET | `/auth/register` | `renderRegister` | – | Render register page |
| POST | `/auth/registerUser` | `registerUser` | `validate(registerSchema)` | Register a new user |
| GET | `/auth/login` | `renderLogin` | – | Render login page |
| POST | `/auth/loginUser` | `loginUser` | `validate(loginSchema)` | Login a user |
| POST | `/auth/logout` | `logout` | – | Logout current user |
| GET | `/profile/:id` | `renderProfile` | – | Show landlord/tenant profile with aggregated reviews |
| POST | `/profile/reviews/:id` | `submitReviews` | `isLoggedIn`, `validate(reviewSchema)` | Submit a review for the specified user |

## 🧱 Project Structure

```
SpareRoomClone/
├── app.js                      # Main application entry point
├── package.json                # Dependencies and scripts
├── config/
│   ├── connectDB.js           # MongoDB connection configuration
│   ├── flash.js               # Flash messages setup
│   ├── session.js             # Session configuration
│   └── validateEnv.js         # Environment variable validation (requires MAPS_API_KEY)
├── controllers/
│   ├── authController.js      # Auth views and session control
│   ├── listController.js      # Listing operations
│   ├── profileController.js   # Profile aggregation
│   └── reviewController.js    # Review submission flow
├── initDB/
│   └── initDB.js              # Database initialization script
├── joiSchemas/
│   ├── listSchema.js          # Joi validation schema for listings
│   ├── reviewSchema.js        # Joi validation schema for reviews
│   └── userSchema.js          # Joi validation schema for users
├── middleware/
│   ├── auth.js                # isLoggedIn and isOwner guards
│   └── validateSchema.js      # Generic Joi validator
├── models/
│   ├── listModel.js           # Mongoose schema for listings
│   ├── reviewModel.js         # Mongoose schema for reviews
│   ├── sampleData/
│   │   └── sampleData.js      # Sample property data
│   └── userModel.js           # Mongoose schema for users
├── public/
│   ├── css/
│   │   └── main.css           # Custom styling
│   └── js/
│       ├── map.js             # Google Maps integration
│       └── script.js          # Client-side JavaScript
├── routes/
│   ├── authRoutes.js          # Auth routes
│   ├── listRoutes.js          # Listing routes
│   └── profileRoutes.js       # Profile and review routes
├── services/
│   ├── authService.js         # User auth logic
│   ├── listService.js         # Listing DB operations
│   ├── profileService.js      # Profile lookups
│   └── reviewService.js       # Review aggregation and persistence
├── utils/
│   ├── ExpressError.js        # Custom error class
│   ├── httpStatus.js          # HTTP status helpers
│   └── wrapAsync.js           # Async error handling wrapper
└── views/
    ├── auth/
    │   ├── login.ejs          # Login view
    │   └── register.ejs       # Register view
    ├── error.ejs              # Error page template
    ├── listings/
    │   ├── createlisting.ejs  # Create listing form
    │   ├── deletelisting.ejs  # Delete confirmation view
    │   ├── listingDetail.ejs  # Single listing detail view
    │   ├── listings.ejs       # All listings grid view
    │   └── updatelisting.ejs  # Edit listing form
    ├── partials/
    │   ├── navbar.ejs         # Navigation component
    │   └── footer.ejs         # Footer component
    └── profile/
        ├── profile.ejs        # Profile detail view
        └── reviewProfile.ejs  # Review submission view
```

## 🔧 Architecture & Patterns

### MVC Architecture
- **Model**: `models/listModel.js` — Data structure and validation
- **View**: EJS templates in `views/` directory — User interface
- **Controller**: `controllers/listController.js` — Business logic and request handling

### Error Handling
- **Custom Error Class**: `ExpressError` for consistent error responses
- **Async Error Wrapper**: `wrapAsync` utility for catching async errors
- **Global Error Handler**: Centralized error handling in app.js
- **404 Handler**: Catches undefined routes

### Middleware Stack
1. `express.urlencoded()` — Parse form data
2. `express.json()` — Parse JSON bodies
3. `express.static()` — Serve static files
4. `methodOverride()` — Enable PUT/DELETE methods
5. Session setup via `config/session.js`
6. Flash messages via `config/flash.js`
7. Route handlers
8. 404 handler
9. Global error handler

## 🎨 Styling & Design

### Color Scheme
- **Primary Blue**: #004a99 (SpareRoom-inspired)
- **Secondary Blue**: #0073e6 (Hover states)
- **Background**: #f5f7fa (Light gray)
- **Text**: #333 (Dark gray)

### Typography
- **Font Family**: Inter, Segoe UI, Roboto, Arial
- **Font Weights**: 400 (normal), 500 (medium), 600 (semibold)

### Responsive Design
- **Mobile First**: Bootstrap's mobile-first approach
- **Breakpoints**: xs, sm, md, lg, xl
- **Grid System**: Bootstrap's 12-column grid

## 🚀 Development

### Environment Variables

#### Required Variables
- `PORT` — Server port (defaults to 8080 if not set)
- `MONGO_URL` — MongoDB connection string
- `SESSION_SECRET` — Secret key for session encryption
- `MAPS_API_KEY` — Google Maps API key for map feature 

#### Optional Variables
- `NODE_ENV` — Environment mode (`development` or `production`)

**Note**: The application validates required environment variables at startup. If `MONGO_URL`,`MAPS_API_KEY` and `SESSION_SECRET` are missing, the app will exit with an error message.

**Security Note**: 
- In production, set `NODE_ENV=production` to enable secure session cookies
- The `MAPS_API_KEY` is exposed client-side. If using Google Maps, restrict the API key in Google Cloud Console to your domain only.

### Available npm Scripts
```bash
# Install dependencies
npm install

# Start development server (with auto-restart)
npm run dev

# Start production server
npm start

# Seed database with sample data
npm run init-db
```

### Development Scripts
The application uses npm scripts for consistency. All scripts are defined in `package.json`:
- `npm start` — Run in production mode
- `npm run dev` — Run in development mode with nodemon
- `npm run init-db` — Seed database with sample listings

## 🔒 Security Considerations

### Session Security
- Sessions are stored in MongoDB for persistence
- Secure cookies are enabled in production (`NODE_ENV=production`)
- `httpOnly` flag prevents client-side JavaScript access
- `sameSite: 'strict'` provides CSRF protection

### Input Validation
- All user input is validated using Joi schemas
- EJS templates automatically escape HTML to prevent XSS attacks
- Password hashing uses bcrypt with 12 salt rounds

### API Key Security
- If using Google Maps API key, **restrict it in Google Cloud Console**:
  - Set HTTP referrer restrictions to your domain
  - Limit API usage to prevent abuse
  - Monitor usage in Google Cloud Console

### Best Practices
- Never commit `.env` files to version control
- Use strong, unique `SESSION_SECRET` in production
- Keep dependencies updated regularly
- Track open review items in the "Branch Review Summary" above

## 📞 Support

For questions or issues:
- Check the [Developer Notes](DEVELOPER_NOTES.md) for technical details
- Open an issue on GitHub
- Review the code documentation

---

**Version**: 1.0.0  
**Last Updated**: March 2025
**Node.js**: 18+  
**MongoDB**: Latest
