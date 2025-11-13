# 🏠 SpareRoom Clone - Developer Notes

## 📋 Project Overview
A modern property listings web application inspired by SpareRoom.co.uk, built with Node.js, Express, MongoDB, and EJS templating. The application follows clean MVC architecture and provides comprehensive CRUD operations for property listings with responsive design, error handling, and input validation.

## 🔍 Branch Review Findings (`work`)

The latest review of the `work` branch surfaced the following actionable items:

- **Import omissions in `reviewService`** — The service throws `ExpressError` with `httpStatus` codes but never imports either dependency. Import them or replace the guard with a simple falsy check to avoid a `ReferenceError` when the guard executes.
- **Average rating guard rail** — `reviewService.getReviews` divides the sum of ratings by `reviewCount`. When there are no reviews the code returns `NaN`, which bubbles into `profile/profile.ejs`. Add a zero-review fallback to keep the UI predictable.
- **Remove unused session import** — `controllers/reviewController.js` requires `express-session` even though the configured session middleware already injects `req.session`. Drop the unused import to silence linter warnings.
- **Profile error short-circuit** — `profileController.renderProfile` fetches reviews immediately after loading a user. When `profileService` throws a 404 the second query still runs. Early-return after the throw or wrap the fetches in `Promise.allSettled` to avoid redundant work.
- **Docs needed refresh** — README/notes previously referenced `CODE_REVIEW_CURRENT.md` (no longer in the repo) and omitted the new profile/review flow. Both documents now reflect the active implementation.

## 🏗️ Architecture & Tech Stack

### Backend
- **Node.js 18+** - JavaScript runtime
- **Express.js 5.1.0** - Web framework
- **Mongoose 8.18.0** - MongoDB ODM
- **express-session 1.18.2** - Session management
- **connect-mongo 5.1.0** - MongoDB session store
- **method-override 3.0.0** - PUT/DELETE support
- **Joi 18.0.1** - Data validation
- **dotenv 17.2.3** - Environment variables

### Frontend Technologies
- **EJS 3.1.10** - Server-side templating engine
- **Bootstrap 5.3.3** - CSS framework for responsive design
- **Custom CSS** - SpareRoom-inspired styling with blue/white theme
- **Vanilla JavaScript** - Form validation and client-side interactions

### Database
- **MongoDB** - NoSQL database
- **Default Connection**: `mongodb://127.0.0.1:27017/spare_room`

## 📁 Project Structure

```
SpareRoomClone/
├── app.js                      # Main application entry point
├── config/
│   ├── connectDB.js           # MongoDB connection
│   ├── flash.js               # Flash messages setup
│   ├── session.js             # Session configuration
│   └── validateEnv.js         # Environment variable validation
├── controllers/
│   ├── authController.js      # Auth views and session control
│   ├── listController.js      # Listing business logic
│   ├── profileController.js   # Profile page aggregation (user + reviews)
│   └── reviewController.js    # Review submission workflow
├── initDB/
│   └── initDB.js              # DB seed script
├── joiSchemas/
│   ├── listSchema.js          # Listing validation
│   ├── reviewSchema.js        # Review validation rules
│   └── userSchema.js          # User validation
├── middleware/
│   ├── auth.js                # isLoggedIn, isOwner
│   └── validateSchema.js      # Joi validator factory
├── models/
│   ├── listModel.js           # Listing schema
│   ├── reviewModel.js         # Review schema with reviewer references
│   ├── sampleData/
│   │   └── sampleData.js      # Seed data
│   └── userModel.js           # User schema
├── public/                    # Static assets
│   ├── css/
│   │   └── main.css           # Custom styling
│   └── js/
│       ├── map.js             # Google Maps integration
│       └── script.js          # Client-side JavaScript
├── routes/
│   ├── authRoutes.js          # Auth routes
│   ├── listRoutes.js          # Listing routes
│   └── profileRoutes.js       # Profile + review routes
├── services/
│   ├── authService.js         # Auth logic (bcrypt)
│   ├── listService.js         # Listing DB ops
│   ├── profileService.js      # User lookup utilities
│   └── reviewService.js       # Review aggregation + persistence
├── utils/
│   ├── ExpressError.js        # Custom error class
│   ├── httpStatus.js          # HTTP status helpers
│   └── wrapAsync.js           # Async wrapper
└── views/
    ├── auth/
    │   ├── login.ejs          # Login view
    │   └── register.ejs       # Register view
    ├── error.ejs              # Error page
    ├── listings/
    │   ├── createlisting.ejs
    │   ├── deletelisting.ejs
    │   ├── listingDetail.ejs
    │   ├── listings.ejs
    │   └── updatelisting.ejs
    ├── partials/
    │   ├── footer.ejs
    │   └── navbar.ejs
    └── profile/
        ├── profile.ejs        # Profile overview + aggregated reviews
        └── reviewProfile.ejs  # Review submission form (modal)
```

## 🗄️ Database Schema

### ListModel Schema
```javascript
{
  image: String (required)     // Property image URL
  title: String (required)    // Property title
  address: String (required)  // Property address
  description: String (required) // Property description
  price: Number (required, min: 0) // Monthly rent
  owner: ObjectId (required)   // Reference to User who created the listing
  createdAt: Date (auto)      // Creation timestamp
  updatedAt: Date (auto)      // Update timestamp
}
```

### UserModel Schema
```javascript
{
  username: String (required, unique, trimmed)  // User's username
  email: String (required, unique, lowercase, trimmed)  // User's email
  password: String (required)  // Hashed password (bcrypt, 12 salt rounds)
  createdAt: Date (auto)      // Creation timestamp
  updatedAt: Date (auto)      // Update timestamp
}
```

## 🛣️ API Routes

### Listing Routes
| Method | Route | Handler | Middleware | Description |
|--------|-------|---------|------------|-------------|
| GET | `/list/listing` | getAllListings | - | Display all property listings |
| GET | `/list/newlisting` | newListing | isLoggedIn | Show create listing form |
| POST | `/list/createlisting` | createListing | isLoggedIn, validate(listSchema) | Create new listing |
| GET | `/list/:id` | showListingDetails | - | Show single listing details |
| GET | `/list/:id/editlisting` | editListing | isLoggedIn, isOwner | Show edit listing form |
| PUT | `/list/:id` | updateListing | isLoggedIn, isOwner, validate(listSchema) | Update existing listing |
| DELETE | `/list/:id` | deleteListing | isLoggedIn, isOwner | Delete listing |

### Auth Routes
| Method | Route | Handler | Middleware | Description |
|--------|-------|---------|------------|-------------|
| GET | `/auth/register` | renderRegister | - | Render registration page |
| POST | `/auth/registerUser` | registerUser | validate(registerSchema) | Register a new user |
| GET | `/auth/login` | renderLogin | - | Render login page |
| POST | `/auth/loginUser` | loginUser | validate(loginSchema) | Authenticate user |
| POST | `/auth/logout` | logout | - | Logout current user |

### Profile & Review Routes
| Method | Route | Handler | Middleware | Description |
|--------|-------|---------|------------|-------------|
| GET | `/profile/:id` | renderProfile | - | Render a user's public profile with aggregated review data |
| POST | `/profile/reviews/:id` | submitReviews | isLoggedIn, validate(reviewSchema) | Create a review targeting the specified user |

## 🔧 Key Components

### Error Handling System
- **ExpressError Class**: Custom error class with status codes and messages
- **wrapAsync**: Utility function to catch async errors and pass to error middleware
- **Global Error Handler**: Centralized error handling in app.js with user-friendly messages
- **404 Handler**: Catches undefined routes and redirects to error page
- **Validation Errors**: Joi schema validation with detailed error messages

### Session Management
- **MongoDB Store**: Sessions persisted in MongoDB using `connect-mongo`
- **Security Features**:
  - `httpOnly: true` - Prevents client-side JavaScript access
  - `secure: true` - Only sent over HTTPS in production (`NODE_ENV=production`)
  - `sameSite: 'strict'` - CSRF protection
  - Custom session name: `spare.sid`
- **Configuration**: 7-day session duration (604800000 ms)
- **Touch After**: Sessions touched after 24 hours to reduce database writes


### Input Validation
- **Joi Schemas**: Server-side validation for all form inputs
  - `listSchema.js` - Validates listing data (title, image, address, price, description)
  - `userSchema.js` - Validates user registration and login data
  - `reviewSchema.js` - Validates review submission payloads
- **Validation Rules**:
  - Listing: title (min 3 chars), image (URI), price (min 0), required fields
  - User: username (3-30 chars), email (valid format), password (min 6 chars)
- **Error Handling**: Validation errors thrown as `ExpressError` with 400 status
- **Middleware**: `validateSchema.js` middleware applies Joi validation before route handlers

### XSS Prevention
- **EJS Escaping**: EJS automatically escapes HTML when using `<%=` syntax
- **Safe Usage**: `<%= userInput %>` - HTML is escaped (use for all user content)
- **Unsafe Usage**: `<%- userInput %>` - HTML is NOT escaped (use only for trusted content)
- **Best Practice**: Always use `<%=` for user-generated content to prevent XSS attacks

## 🎨 Frontend Features

### UI Components
- **Responsive Navigation**: Bootstrap navbar with mobile toggle and brand styling
- **Property Cards**: Grid layout for listing display with hover effects
- **Map Integration**: Google Maps modal for property location display
  - `map.ejs` - Bootstrap modal partial for displaying property location
  - Uses Google Maps JavaScript API with geocoding
  - Address geocoding to display property location on map
  - Modal-based map display triggered from listing detail page
- **Form Validation**: Client-side validation with Bootstrap classes and server-side validation
- **Error Pages**: Custom error handling with user-friendly messages and proper status codes
- **Loading States**: Smooth transitions and responsive design

### Styling System
- **Color Scheme**: SpareRoom-inspired blue (#004a99) and white theme
- **Typography**: Inter font family for modern, clean appearance
- **Layout**: Bootstrap grid system with custom spacing and responsive breakpoints
- **Responsive Design**: Mobile-first approach with proper breakpoints
- **Custom CSS**: Professional styling with hover effects and smooth transitions

### Template Structure
- **Partials**: 
  - Reusable navbar and footer components
  - Alert partial for flash messages
- **EJS Templates**: Server-side rendering with dynamic content
- **Form Handling**: Proper form submission with method override for PUT/DELETE
- **Error Handling**: Dedicated error template with consistent styling

### Google Maps Integration
- **Map Feature**: Interactive map modal for viewing property locations
- **Implementation**:
  - `map.ejs` - Bootstrap modal component included in `listingDetail.ejs`
  - `map.js` - Client-side JavaScript for Google Maps integration
  - Uses Google Maps JavaScript API with Geocoding API
- **Functionality**:
  - Address geocoding from property address to coordinates
  - Map initialization when modal is opened
  - Marker placement on property location
  - Responsive map display in modal
- **API Key**: Requires `MAPS_API_KEY` environment variable
- **Security Note**: API key is exposed client-side - restrict in Google Cloud Console

## 🚀 Development Setup

### Prerequisites
- **Node.js 18+** - Download from [nodejs.org](https://nodejs.org/)
- **MongoDB** - Running locally or MongoDB Atlas connection
- **npm** - Comes with Node.js
- **Git** - For version control

### Installation Steps
```bash
# Clone and install
git clone <repository-url>
cd SpareRoomClone
npm install

# Environment setup
# Create .env file with required variables (see below)

# Database setup
npm run init-db

# Start development server
npm run dev

# Or start production server
npm start
```

### Environment Variables
#### Required Variables
The application validates these at startup and will exit if missing:
```bash
PORT=8080                                    # Server port (defaults to 8080 if not set)
MONGO_URL=mongodb://127.0.0.1:27017/spare_room  # MongoDB connection string
SESSION_SECRET=your-super-secret-session-key-change-this-in-production  # Session encryption key
MAPS_API_KEY=your-google-maps-api-key-here  # Google Maps API key for map feature
```

#### Optional Variables
```bash
NODE_ENV=development  # Environment mode (development or production)
```

**Environment Validation**: The `validateEnv.js` module checks for required variables at application startup and exits with clear error messages if any are missing.

### Development Workflow
1. **Environment Setup**: Create `.env` file with required variables
2. **Database Setup**: Run `npm run init-db` to populate with sample data
3. **Start Server**: Use `npm run dev` for development with auto-restart
4. **Access Application**: Navigate to http://localhost:8080
5. **Test Features**: Verify all CRUD operations and authentication work correctly

### Available npm Scripts
- `npm start` - Run application in production mode
- `npm run dev` - Run application in development mode with nodemon (auto-restart)
- `npm run init-db` - Seed database with sample listings

### Current Security Features
- **Session Security**: 
  - HttpOnly cookies prevent client-side access
  - Secure flag enabled in production (HTTPS only)
  - SameSite strict for CSRF protection
  - Sessions stored in MongoDB for persistence
- **Authentication**: 
  - User registration with email uniqueness check
  - Password hashing with bcrypt (12 salt rounds)
  - Session-based authentication
  - Authorization middleware (`isOwner`) for listing ownership
- **Input Validation**: 
  - Joi schema validation for all user inputs
  - Server-side validation before database operations
- **XSS Prevention**: 
  - EJS automatic HTML escaping with `<%=` syntax
  - All user-generated content properly escaped
- **Error Handling**: 
  - Custom ExpressError class for consistent error responses
  - Prevents information leakage through error messages
  - Global error handler with user-friendly error pages
- **Environment Variables**: 
  - Validation at startup prevents runtime errors
  - Secure configuration management with dotenv

### MVC Architecture Implementation
- **Model**: 
  - `listModel.js` - Mongoose schema for property listings with validation and timestamps
  - `userModel.js` - Mongoose schema for users with unique constraints
- **View**: 
  - EJS templates in `views/` directory with partials for reusability
  - Server-side rendering with dynamic content
  - Automatic HTML escaping for XSS prevention
- **Controller**: 
  - `listController.js` - Business logic for listing operations
  - `authController.js` - Authentication and session management
- **Service Layer**: 
  - `listService.js` - Database operations for listings with error handling
  - `userService.js` - User authentication logic with bcrypt password hashing

### Error Handling Patterns
- **Async Error Wrapper**: All async controller functions wrapped with `wrapAsync()` utility
  - Automatically catches promise rejections and passes to error middleware
  - Prevents unhandled promise rejections
- **Custom Error Class**: `ExpressError` class for consistent error responses
  - Includes statusCode and message properties
  - Used throughout services and controllers
- **HTTP Status Codes**: Centralized status codes in `httpStatus.js` utility
  - Consistent status codes across the application
- **Error Middleware**: 
  - Global error handler in `app.js` renders user-friendly error pages
  - 404 handler catches undefined routes
  - Proper error status codes sent to client
- **Service Layer Errors**: Services throw `ExpressError` which propagate through middleware

### Code Organization
- **Separation of Concerns**: 
  - Controllers handle HTTP requests/responses
  - Services contain business logic and database operations
  - Models define data structure and validation
  - Routes define endpoints and middleware chain
- **Reusable Components**: 
  - Navbar and footer partials for consistent UI
  - Alert partial for flash messages
  - Error page template for consistent error display
- **Utility Functions**: 
  - `wrapAsync.js` - Async error handling wrapper
  - `ExpressError.js` - Custom error class
  - `httpStatus.js` - HTTP status code constants
- **Middleware Chain**: 
  - Authentication middleware (`isLoggedIn`, `isOwner`)
  - Validation middleware (`validateSchema`)
  - Error handling middleware
- **Clean Routing**: RESTful route structure with proper HTTP methods and middleware

### Validation Strategy
- **Client-side**: Bootstrap form validation classes for immediate user feedback
- **Server-side**: 
  - Joi schema validation with detailed error messages
  - Validation middleware runs before route handlers
  - Errors thrown as ExpressError with 400 status
- **Database**: 
  - Mongoose schema validation with required fields
  - Unique constraints on email and username
  - Data type validation and constraints
- **Service Layer**: 
  - Additional validation in services (e.g., email uniqueness)
  - Business logic validation (e.g., listing ownership)
- **Error Recovery**: 
  - Graceful error handling with user-friendly messages
  - Flash messages for user feedback
  - Redirects to appropriate pages on errors

## 🐛 Known Issues & Limitations

### Current Limitations
1. **No Image Upload**: Only URL-based image storage (no file upload)
2. **No Search/Filter**: Basic listing display without search functionality
3. **No Pagination**: All listings displayed on single page
4. **No Rate Limiting**: Authentication endpoints vulnerable to brute force attacks
5. **No API Documentation**: No Swagger/OpenAPI documentation
6. **No Testing**: No unit or integration tests
7. **API Key Exposure**: Google Maps API key exposed client-side (should be restricted in Google Cloud Console)
8. **Review Aggregation Edge Case**: Profiles without reviews surface `NaN` average ratings until a guard is added

### Technical Debt
- **Code Duplication**: Some template code is duplicated in listings.ejs
- **Error Handling**: Could be more granular for different error types
- **Validation**: Could include more sophisticated validation rules
- **Performance**: No caching or database optimization
- **Import Hygiene**: Missing imports in `reviewService.js` cause runtime risk when guards execute

### Potential Improvements
1. **Rate Limiting**: Add express-rate-limit to authentication endpoints
2. **Image Upload**: Add file upload for property images with multer
3. **Search & Filters**: Implement search by location, price range, property type
4. **Pagination**: Add pagination for large datasets
5. **Database Indexing**: Add indexes for frequently queried fields (owner, price, createdAt)
6. **API Documentation**: Add Swagger/OpenAPI documentation
7. **Testing**: Add unit and integration tests with Jest
8. **Logging**: Implement proper logging with winston/morgan
9. **Security Headers**: Add Helmet.js for security headers
10. **CSRF Protection**: Add CSRF protection for state-changing operations
11. **API Key Restrictions**: Document and enforce Google Maps API key restrictions
12. **Password Strength**: Add password strength requirements to Joi schema

## 🔒 Security Considerations

### Current Security Measures
- **Session Security**: 
  - HttpOnly cookies prevent XSS via document.cookie
  - Secure flag enabled in production (HTTPS only)
  - SameSite strict provides CSRF protection
  - MongoDB session store for persistence
- **Authentication**: 
  - User registration with email uniqueness validation
  - Password hashing with bcrypt (12 salt rounds)
  - Session-based authentication
  - Authorization middleware for resource ownership
- **Input Validation**: 
  - Joi schema validation prevents malformed data
  - Server-side validation before database operations
- **XSS Prevention**: 
  - EJS automatic HTML escaping with `<%=` syntax
  - All user-generated content properly escaped
- **Error Handling**: 
  - Prevents information leakage through proper error messages
  - Custom error pages don't expose stack traces
- **MongoDB Injection**: 
  - Mongoose ODM prevents NoSQL injection attacks
  - Parameterized queries prevent injection
- **Environment Variables**: 
  - Validation at startup prevents runtime errors
  - Secure configuration management with dotenv

### Security Improvements Needed
1. **Rate Limiting**: Add express-rate-limit to authentication endpoints (high priority)
2. **API Key Restrictions**: Document Google Maps API key restrictions in Google Cloud Console
3. **Security Headers**: Add Helmet.js for additional security headers
4. **CSRF Protection**: Add CSRF tokens for state-changing operations
5. **Password Strength**: Add password strength requirements to Joi schema
6. **Input Length Limits**: Add max length validation to Joi schemas
7. **HTTPS**: Ensure SSL/TLS encryption in production
8. **CORS Configuration**: Configure CORS if API endpoints are needed

## 📊 Performance Considerations

### Current Performance Features
- **Direct MongoDB Queries**: Efficient database operations
- **Static File Serving**: Express static middleware for assets
- **Bootstrap CDN**: External CSS framework for faster loading
- **Minimal Dependencies**: Lightweight package.json

### Performance Optimizations Needed
1. **Database Indexing**: 
   - Add indexes for frequently queried fields (owner, price, createdAt)
   - Index on email for user lookups
   - Index on username for user lookups
2. **Pagination**: Implement pagination for listings to avoid loading all data at once
3. **Caching**: Implement Redis for session/data caching
4. **CDN**: Use CDN for static assets and images
5. **Compression**: Enable gzip compression with compression middleware
6. **Database Connection Pooling**: Configure MongoDB connection pool size
7. **Image Optimization**: Compress and resize images
8. **Lazy Loading**: Implement lazy loading for images
9. **Query Optimization**: Use select() to limit fields returned from database

## 🧪 Testing Strategy

### Recommended Testing Approach
1. **Unit Tests**: Test individual controller functions and utilities
2. **Integration Tests**: Test database operations and API endpoints
3. **E2E Tests**: Test complete user workflows with Playwright/Cypress
4. **API Tests**: Test all route endpoints with Supertest

### Testing Tools
- **Jest**: Unit testing framework with mocking capabilities
- **Supertest**: HTTP assertion library for API testing
- **MongoDB Memory Server**: In-memory database for testing
- **Playwright/Cypress**: End-to-end testing frameworks

### Test Coverage Goals
- Controllers: 100% CRUD operations
- Models: Schema validation
- Routes: All endpoints
- Utilities: Error handling

## 🚀 Deployment



## 📝 Development Guidelines

### Code Standards
- 2-space indentation
- ES6+ features (async/await, arrow functions)
- Meaningful variable names
- Comments for complex logic
- Graceful error handling

### Git Workflow
- Feature branches for development
- Descriptive commit messages
- Atomic commits
- Pull requests for review
- Branch protection on main

---

**Version**: 1.0.0  
**Last Updated**: March 2025
**Node.js**: 18+  
**MongoDB**: Latest