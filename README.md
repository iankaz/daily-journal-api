# Daily Journal API

A RESTful API for managing daily journal entries with OAuth authentication using GitHub.

## Features

- **OAuth Authentication**: Secure login using GitHub OAuth
- **CRUD Operations**: Full Create, Read, Update, Delete functionality for journals and categories
- **Data Validation**: Comprehensive input validation using Joi
- **Error Handling**: Robust error handling with appropriate HTTP status codes
- **API Documentation**: Interactive Swagger documentation
- **MongoDB Integration**: Persistent data storage with MongoDB
- **User Isolation**: Each user can only access their own data

## Database Schema

### Collections

1. **Users** - Stores user information from GitHub OAuth
2. **Journals** - Main journal entries (7+ fields as required)
   - title, content, date, mood, weather, tags, isPrivate, category, location, userId, createdAt, updatedAt
3. **Categories** - Organization categories for journal entries

## Project Structure (MVC Pattern)

\`\`\`
daily-journal-api/
├── config/
│   ├── database.js          # Database connection configuration
│   └── passport.js          # Passport OAuth configuration
├── controllers/
│   ├── authController.js    # Authentication logic
│   ├── journalController.js # Journal business logic
│   └── categoryController.js # Category business logic
├── middleware/
│   └── auth.js              # Authentication middleware
├── models/
│   ├── User.js              # User data model
│   ├── Journal.js           # Journal data model
│   └── Category.js          # Category data model
├── routes/
│   ├── auth.js              # Authentication routes
│   ├── journals.js          # Journal routes
│   └── categories.js        # Category routes
├── validation/
│   ├── journalValidation.js # Journal input validation
│   └── categoryValidation.js # Category input validation
├── scripts/
│   └── seed-data.sql        # Database seeding script
├── server.js                # Application entry point
├── swagger.json             # API documentation
├── package.json             # Dependencies and scripts
├── .env.example             # Environment variables template
├── .gitignore               # Git ignore rules
└── README.md                # Project documentation
\`\`\`

### MVC Architecture

- **Models** (`/models`): Define data structure and database interactions
- **Views** (`swagger.json`): API documentation serves as the view layer
- **Controllers** (`/controllers`): Handle business logic and request processing
- **Routes** (`/routes`): Define API endpoints and route requests to controllers
- **Middleware** (`/middleware`): Handle cross-cutting concerns like authentication
- **Config** (`/config`): Application configuration and setup
- **Validation** (`/validation`): Input validation and sanitization

This structure provides:
- **Separation of Concerns**: Each layer has a specific responsibility
- **Maintainability**: Easy to locate and modify specific functionality
- **Scalability**: Easy to add new features following the established pattern
- **Testability**: Controllers and models can be easily unit tested

## API Endpoints

### Authentication
- `GET /auth/github` - Initiate GitHub OAuth
- `GET /auth/github/callback` - OAuth callback
- `POST /auth/logout` - Logout user
- `GET /auth/user` - Get current user info

### Journals (Protected Routes)
- `GET /api/journals` - Get all user's journals (with pagination and filtering)
- `GET /api/journals/:id` - Get specific journal
- `POST /api/journals` - Create new journal
- `PUT /api/journals/:id` - Update journal
- `DELETE /api/journals/:id` - Delete journal

### Categories (Protected Routes)
- `GET /api/categories` - Get all user's categories
- `GET /api/categories/:id` - Get specific category
- `POST /api/categories` - Create new category
- `PUT /api/categories/:id` - Update category
- `DELETE /api/categories/:id` - Delete category

## Setup Instructions

1. **Clone the repository**
   \`\`\`bash
   git clone <your-repo-url>
   cd daily-journal-api
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   \`\`\`

3. **Set up environment variables**
   - Copy `.env.example` to `.env`
   - Fill in your MongoDB URI, GitHub OAuth credentials, and session secret

4. **GitHub OAuth Setup**
   - Go to GitHub Settings > Developer settings > OAuth Apps
   - Create a new OAuth App
   - Set Authorization callback URL to: `https://your-domain.com/auth/github/callback`
   - Copy Client ID and Client Secret to your `.env` file

5. **Run the application**
   \`\`\`bash
   npm start
   \`\`\`

## Deployment

This API is designed to be deployed on Render.com:

1. Connect your GitHub repository to Render
2. Set environment variables in Render dashboard
3. Deploy the service

## API Documentation

Once running, visit `/api-docs` for interactive Swagger documentation where you can test all endpoints.

## Testing

The API includes comprehensive error handling and validation:
- All POST/PUT routes validate input data
- Protected routes require authentication
- Proper HTTP status codes are returned
- Database operations are wrapped in try-catch blocks

## Video Demonstration

For the project submission, create a 5-8 minute video demonstrating:
1. API endpoints working via Swagger documentation
2. Authentication flow (login/logout)
3. CRUD operations on both collections
4. Data validation and error handling
5. Database showing collections with data
6. Deployed application (not localhost)
