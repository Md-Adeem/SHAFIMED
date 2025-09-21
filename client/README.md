# 🏥 SHAFIMED - Frontend Application

## Overview

SHAFIMED is a comprehensive medical tourism platform that connects patients with world-class healthcare providers globally. This frontend application is built with modern React technologies to provide an intuitive, multilingual, and responsive user experience for patients seeking medical care abroad.

## 🚀 Technology Stack

### Core Technologies
- *React* ^19.1.1 - Modern UI library with latest features
- *Vite* ^7.1.2 - Fast build tool and development server
- *JavaScript (ES6+)* - Modern JavaScript with modules

### State Management
- *Redux Toolkit* ^2.2.6 - Predictable state container
- *React Redux* ^9.2.0 - React bindings for Redux

### Routing & Navigation
- *React Router DOM* ^7.8.2 - Declarative routing for React

### Styling & UI
- *Tailwind CSS* ^3.4.17 - Utility-first CSS framework
- *PostCSS* ^8.5.6 - CSS post-processor
- *Autoprefixer* ^10.4.21 - CSS vendor prefixing
- *Lucide React* ^0.544.0 - Beautiful & consistent icons
- *React Icons* ^5.5.0 - Popular icon libraries

### Internationalization (i18n)
- *react-i18next* ^15.7.3 - React integration for i18next
- *i18next* ^25.5.2 - Internationalization framework
- *i18next-browser-languagedetector* ^8.2.0 - Language detection

### HTTP Client & Notifications
- *Axios* ^1.11.0 - Promise-based HTTP client
- *React Hot Toast* ^2.6.0 - Notification system

### Development Tools
- *ESLint* ^9.33.0 - Code linting and quality
- *Vite React Plugin* ^5.0.0 - React support for Vite

## 🌍 Multilingual Support

The application supports 4 languages with RTL (Right-to-Left) support:

- *English (en)* - Primary language
- *Arabic (ar)* - RTL support
- *Urdu (ur)* - RTL support  
- *Hindi (hi)* - LTR support

### Translation Features
- Medical accuracy prioritized over automated translation
- Professional healthcare translations
- Instant language switching
- SEO-friendly URLs
- Offline support
- Privacy compliant (no external API calls)

## 📁 Project Structure


client/
├── public/                 # Static assets
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── landing/        # Landing page components
│   │   ├── Navbar.jsx      # Navigation component
│   │   ├── ProtectedRoute.jsx
│   │   └── LanguageSwitcher.jsx
│   ├── Features/           # Feature-based components
│   │   ├── Auth/           # Authentication components
│   │   ├── Patient/        # Patient dashboard & features
│   │   └── Facilitator/    # Facilitator features
│   ├── pages/              # Page components
│   │   └── Home.jsx        # Main landing page
│   ├── store/              # Redux store configuration
│   │   ├── index.js        # Store setup
│   │   └── authSlice.js    # Authentication slice
│   ├── i18n/               # Internationalization
│   │   ├── index.js        # i18n configuration
│   │   └── locales/        # Translation files
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Utility libraries
│   ├── assets/             # Images, fonts, etc.
│   ├── App.jsx             # Main App component
│   ├── main.jsx            # Application entry point
│   └── index.css           # Global styles
├── package.json            # Dependencies and scripts
├── vite.config.js          # Vite configuration
├── tailwind.config.js      # Tailwind CSS configuration
├── postcss.config.js       # PostCSS configuration
└── eslint.config.js        # ESLint configuration


## 🎯 Key Features

### Landing Page Components
- *Hero Section* - Dynamic hero with patient testimonials
- *MultiSpecialtyFocus* - Medical specialties showcase
- *TopHospitals* - Partner hospital listings
- *LowestQuotes* - Cost comparison tool
- *HowItWorks* - Process explanation
- *Services* - Comprehensive service overview
- *PatientTestimonials* - Real patient success stories
- *CaseStudies* - Detailed treatment case studies
- *NewsSection* - Latest medical tourism news
- *FAQSection* - Frequently asked questions

### User Features
- *Authentication System* - JWT-based secure login/signup
- *Patient Dashboard* - Case management and tracking
- *Profile Management* - Complete user profile system
- *Case Submission* - Medical case submission workflow
- *Facilitator Dashboard* - Healthcare facilitator tools

### Technical Features
- *Responsive Design* - Mobile-first approach
- *State Persistence* - Redux with localStorage
- *Protected Routes* - Role-based access control
- *Real-time Notifications* - Toast-based feedback
- *Form Validation* - Comprehensive input validation
- *Error Handling* - Graceful error management

## 🛠 Development Setup

### Prerequisites
- *Node.js* (v18+ recommended)
- *npm* or *yarn*
- *Git*

### Installation

1. *Clone the repository*
   bash
   git clone <repository-url>
   cd SHAFIMED/client
   

2. *Install dependencies*
   bash
   npm install
   

3. *Set up environment variables*
   bash
   # Create .env file in client directory
   VITE_API_URL=http://localhost:5000/api
   VITE_APP_NAME=SHAFIMED
   

4. *Start development server*
   bash
   npm run dev
   

   The application will be available at http://localhost:5173

## 📜 Available Scripts

### Development
bash
npm run dev          # Start development server with hot reload
npm run build        # Build for production
npm run preview      # Preview production build locally
npm run lint         # Run ESLint for code quality


### Build & Deployment
bash
npm run build        # Creates optimized production build in dist/


## 🎨 Styling Guide

### Tailwind CSS Configuration
The project uses Tailwind CSS with custom configurations:

- *Custom Colors* - Brand-specific color palette
- *Typography* - Consistent font scales and weights
- *Spacing* - Standardized spacing system
- *Responsive Breakpoints* - Mobile-first responsive design
- *Components* - Reusable component classes

### RTL Support
RTL support is implemented through:
- CSS direction properties
- Tailwind CSS RTL utilities
- Dynamic text alignment
- Responsive margin/padding adjustments

## 🔐 Authentication System

### Features
- *JWT Token Management* - Secure token-based authentication
- *Role-based Access* - Patient and Facilitator roles
- *Protected Routes* - Route-level protection
- *Persistent Sessions* - localStorage integration
- *Auto-logout* - Token expiration handling

### Redux State Management
javascript
// Authentication state structure
{
  user: {
    id: string,
    email: string,
    name: string,
    role: 'patient' | 'facilitator',
    profile: object
  },
  token: string,
  isAuthenticated: boolean,
  isLoading: boolean
}


## 🌐 API Integration

### HTTP Client Configuration
- *Base URL Configuration* - Environment-based API URLs
- *Request Interceptors* - Automatic token attachment
- *Response Interceptors* - Global error handling
- *Error Handling* - Consistent error management

### API Endpoints Integration
- *Authentication APIs* - Login, signup, profile management
- *Patient APIs* - Case submission, dashboard data
- *Hospital APIs* - Hospital listings, quotes
- *General APIs* - Countries, specialties, etc.

## 📱 Responsive Design

### Breakpoints
- *Mobile* - < 768px
- *Tablet* - 768px - 1024px
- *Desktop* - > 1024px

### Design Principles
- Mobile-first approach
- Progressive enhancement
- Touch-friendly interfaces
- Optimized loading performance

## 🧪 Testing & Quality

### Code Quality
- *ESLint Configuration* - Code linting and formatting
- *Component Standards* - Consistent component structure
- *Naming Conventions* - Clear and descriptive naming
- *Error Boundaries* - Graceful error handling

### Performance Optimization
- *Code Splitting* - Route-based code splitting
- *Lazy Loading* - Component lazy loading
- *Image Optimization* - Optimized image loading
- *Bundle Analysis* - Regular bundle size monitoring

## 🚀 Deployment

### Production Build
bash
npm run build


### Environment Configuration
bash
# Production environment variables
VITE_API_URL=https://api.shafimed.com
VITE_APP_NAME=SHAFIMED


### Deployment Platforms
- *Vercel* - Recommended for React applications
- *Netlify* - Alternative deployment platform
- *AWS S3 + CloudFront* - Enterprise deployment
- *Docker* - Containerized deployment

## 🔧 Configuration Files

### Vite Configuration (vite.config.js)
- React plugin configuration
- Build optimization settings
- Development server settings

### Tailwind Configuration (tailwind.config.js)
- Custom color palette
- Typography settings
- Responsive breakpoints
- Plugin configurations

### ESLint Configuration (eslint.config.js)
- React-specific rules
- Code quality standards
- Import/export rules

## 📚 Documentation

### Component Documentation
Each component follows these documentation standards:
- *Purpose* - What the component does
- *Props* - Expected props and types
- *Usage* - How to use the component
- *Examples* - Code examples

### API Documentation
- Endpoint descriptions
- Request/response formats
- Authentication requirements
- Error handling

## 🤝 Contributing

### Development Workflow
1. Create feature branch from main
2. Follow coding standards and conventions
3. Write/update tests for new features
4. Update documentation as needed
5. Submit pull request with clear description

### Code Standards
- Use functional components with hooks
- Follow React best practices
- Maintain consistent naming conventions
- Write self-documenting code
- Add comments for complex logic

## 📞 Support & Contact

For technical support or questions about the frontend application:

- *Development Team* - dev@shafimed.com
- *Documentation* - Internal wiki/confluence
- *Issue Tracking* - GitHub Issues or JIRA

## 📄 License

This project is proprietary software. All rights reserved.

---

*SHAFIMED Frontend Application* - Connecting patients with world-class healthcare providers globally.