# Citizen Appeal Management System

A professional web frontend application for the Traffic and Accident Detection System, built with React. This system allows citizens to submit appeals for traffic violations and enables administrators to review and manage these appeals through a modern, responsive web interface.

## Features

### Citizen Features
- **Landing Page**: Informative homepage with "How It Works" section
- **User Registration**: Complete registration form with validation
- **User Login**: Secure login interface
- **Citizen Dashboard**: View appeal statistics and recent appeals
- **Submit Appeal**: Submit new appeals with evidence upload
- **Appeal Status Tracking**: Track appeal progress with step-by-step visualization
- **Violation Details**: View detailed violation information

### Admin Features
- **Admin Dashboard**: Overview of all appeals with statistics and charts
- **Appeal Review**: Review appeals with ML confidence scores and make decisions

## Technology Stack

- **React 18.2.0**: Frontend framework
- **React Router DOM 6.20.0**: Routing and navigation
- **CSS3**: Custom styling with blue theme
- **Public Sans Font**: Professional typography

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd Traffic-and-Accident-Detection-System
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The application will open at `http://localhost:3000`

## Project Structure

```
src/
├── components/
│   ├── Header.js              # Top navigation header
│   ├── Header.css
│   ├── Footer.js              # Professional web footer
│   └── Footer.css
├── pages/
│   ├── LandingPage.js         # Public landing page
│   ├── LandingPage.css
│   ├── LoginPage.js           # User login
│   ├── LoginPage.css
│   ├── RegisterPage.js        # User registration
│   ├── RegisterPage.css
│   ├── CitizenDashboard.js    # Citizen dashboard
│   ├── CitizenDashboard.css
│   ├── SubmitAppeal.js        # Submit appeal form
│   ├── SubmitAppeal.css
│   ├── AppealStatus.js        # Appeal status tracking
│   ├── AppealStatus.css
│   ├── ViolationDetails.js    # Violation details view
│   ├── ViolationDetails.css
│   ├── AdminDashboard.js      # Admin dashboard
│   ├── AdminDashboard.css
│   ├── AppealReview.js        # Admin appeal review
│   └── AppealReview.css
├── App.js                     # Main app component with routing
├── App.css                    # Global styles and theme variables
├── index.js                   # Entry point
└── index.css                  # Base styles
```

## Color Theme

The application uses a professional blue theme:

- **Primary Blue**: `#1280ED`
- **Primary Blue Dark**: `#0A73D9`
- **Secondary Blue**: `#E8EDF2`
- **Text Primary**: `#0D141C`
- **Text Secondary**: `#4D7399`
- **Background White**: `#FFFFFF`
- **Background Light**: `#F7FAFC`
- **Border Color**: `#CFDBE8`
- **Success Green**: `#088738`

## Routes

- `/` - Landing page
- `/login` - User login
- `/register` - User registration
- `/dashboard` - Citizen dashboard
- `/submit-appeal` - Submit new appeal
- `/appeal-status/:id` - View appeal status
- `/violation-details/:id` - View violation details
- `/admin/dashboard` - Admin dashboard
- `/admin/appeal-review/:id` - Admin appeal review

## Development

### Available Scripts

- `npm start`: Runs the app in development mode
- `npm build`: Builds the app for production
- `npm test`: Launches the test runner

## Design

The UI design is optimized for web development with:
- Clean, modern web interface
- Professional top navigation header
- Comprehensive footer with links and contact information
- Responsive design that works on all screen sizes
- Professional blue color scheme (#1280ED)
- Desktop-first approach with mobile responsiveness
- Card-based layouts with shadows and borders
- Professional images and visual elements
- Intuitive navigation and user-friendly forms

## Future Enhancements

- Backend API integration
- Authentication and authorization
- Real-time updates
- File upload functionality
- Email notifications
- Advanced filtering and search
- Analytics and reporting

## License

This project is part of a Research Project year 4.

## Contributors

- Development Team

---

© 2024 City Traffic Department. All rights reserved.
