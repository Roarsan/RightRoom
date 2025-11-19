# 🏠 RightRoom

A modern property listings platform inspired by SpareRoom, built with Node.js, Express, MongoDB, and EJS following a  MVC + Services architecture.
RightRoom enables users to create listings, manage profiles, leave reviews, and explore locations with Google Maps integration.

## ✨ Live Demo
Visit `http://localhost:8080` after running the application to see the live demo.
or Visit `https://rightroom.onrender.com` to see it live on render.

## 🚀 Tech Stack

### Backend
- **Node.js 18+** — JavaScript runtime
- **Express.js 5.1.0** — Web framework and routing
- **Mongoose 8.18.0** — MongoDB ODM for database operations
- **express-session 1.18.2** — Session management
- **connect-mongo 5.1.0** — MongoDB session store
- **bcrypt 6.0.0** — Password Encryption
- **connect-flash 0.1.1* - Flash Messages
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
- **MongoDB** — NoSQL database for storing property listings,reviews and users info.
- **MongoAtlas** — NoSQL Cloud database for storing property listings,reviews and users info.


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

## ✅ Prerequisites

- **Node.js 18+** — Download from [nodejs.org](https://nodejs.org/)
- **MongoDB** — Running locally or MongoDB Atlas connection
- **npm** — Comes with Node.js

### MongoDB Setup Options

1. **Local MongoDB**: Install MongoDB locally and run `mongod`

## 🧰 Installation & Setup

### 1. Clone and Install
```bash
git clone <repository-url>
cd RightRoom
npm install
```

### 2. Environment Setup
Create a `.env` file in the root directory:
```bash
# Server Configuration
PORT=8080 || Prefered Port

# Database Configuration
MONGO_URL=mongodb://your mongodb connection/

# Session Configuration
SESSION_SECRET=your-super-secret-session-key

# Environment
NODE_ENV=development

# Optional: Google Maps API Key (for map feature)
# Get your key from: https://console.cloud.google.com/google/maps-apis
# If not provided, the map feature will be disabled
MAPS_API_KEY=your-google-maps-api-key
```

**Note**: The application validates required environment variables (`MONGO_URL`, `SESSION_SECRET`) at startup. If any are missing, the app will exit with an error message.

### 3. Seed Database (Optional)
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
npm run dev || nodemon app.js


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
  role: String,enum: ['tenant', 'landlord'](required)
  avgRating: Number (required, min: 0)
  reviewCount: Number (required, min: 0)
  comment:String (required)
  createdAt: Date (auto-generated)      // Creation timestamp
  updatedAt: Date (auto-generated)      // Last update timestamp
}
```
### Review Model

```javascript
{
reviewer: ObjectId (required)      // Reference to User who reviewed the listing
reviewed: ObjectId (required)      // Reference to User who created the listing
rating: Number(required)
comment : String (required)
createdAt: Date (auto-generated)      // Creation timestamp
updatedAt: Date (auto-generated)      // Last update timestamp
}
```
### Sample Data
The application comes with 3 sample listings:
- Spacious Two-Bedroom Flat in Manchester (£950/month)
- Luxury Ensuite Room in Oxford (£850/month)
- Cozy Room with Balcony in Bristol (£780/month)

## 🌐 API Routes

| Method | Route | Handler | Description |
|--------|-------|---------|-------------|
| GET | `/` | inline | Welcome page with navigation |
| GET | `/list/listing` | `getAllListings` | Display all property listings |
| GET | `/list/newlisting` | `newListing` | Show create listing form |
| POST | `/list/createlisting` | `createListing` | Create new listing |
| GET | `/list/:id` | `showListingDetails` | Show single listing details |
| GET | `/list/:id/editlisting` | `editListing` | Show edit listing form |
| PUT | `/list/:id` | `updateListing` | Update existing listing |
| DELETE | `/list/:id` | `deleteListing` | Delete listing |

### Auth Routes
| Method | Route | Handler | Description |
|--------|-------|---------|-------------|
| GET | `/auth/register` | `renderRegister` | Render register page |
| POST | `/auth/registerUser` | `registerUser` | Register a new user |
| GET | `/auth/login` | `renderLogin` | Render login page |
| POST | `/auth/loginUser` | `loginUser` | Login a user |
| POST | `/auth/logout` | `logout` | Logout current user |

### Profile & Review Routes
| Method | Route | Handler | Middleware | Description |
|--------|-------|---------|------------|-------------|
| GET | `/profile/:id` | renderProfile | - | Render a user's public profile with aggregated review data |
| POST | `/profile/reviews/:id` | submitReviews | isLoggedIn, validate(reviewSchema) | Create a review targeting the specified user |

## 🧱 Project Structure

```
RightRoom/
├── app.js                      # Main application entry point
├── package.json                # Dependencies and scripts
├── config/
│   ├── connectDB.js           # MongoDB connection configuration
│   ├── session.js             # Session configuration
│   ├── flash.js               # Flash messages setup
│   └── validateEnv.js         # Environment variable validation
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
│       └── script.js          # Client-side Validation JavaScript
├── routes/
│   ├── authRoutes.js          # Auth routes
│   └── listRoutes.js          # Listing routes
├── services/
│   ├── listService.js         # Listing DB operations
│   ├── profileService.js      # Profile lookups
│   └── reviewService.js       # Review aggregation and persistence
├── utils/
│   ├── ExpressError.js        # Custom error class
│   ├── httpStatus.js          # HTTP status helpers
│   └── wrapAsync.js           # Async error handling wrapper
└── views/
    ├── error.ejs              # Error page template
    ├── partials/
    │   ├── navbar.ejs         # Navigation component
    │   └── footer.ejs         # Footer component
    ├── auth/
    │   ├── login.ejs          # Login view
    │   └── register.ejs       # Register view
    └── listings/
    │   ├── listings.ejs       # All listings grid view
    │   ├── listingDetail.ejs  # Single listing detail view
    │   ├── createlisting.ejs  # Create listing form
    │   ├── updatelisting.ejs  # Edit listing form
    │   ├── deletelisting.ejs  # Delete confirmation view
    │   └── map.ejs            # Map modal partial for property location
    └── profile/
        ├── profile.ejs        # Profile detail view
        └── reviewProfile.ejs  # Review submission view
```

## 🔧 Architecture & Patterns

### MVC Architecture
- **Model**: Mongoose models in  `models/` directory — Schemas and mongoose validation
- **View**: EJS templates in `views/` directory — User interface
- **Controller**: Request handling in `controllers/` directory — Request handling
- **Services**: Business logic in `servies/` directory — Business logic 

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
- `PORT` — Server port (Preferred Port)
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
- Sessions are stored in MongoDB || MongoAtlas for persistence dependes upon development || production
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
- Review security recommendations in `CODE_REVIEW_CURRENT.md`

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
