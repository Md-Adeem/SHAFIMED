# SHAFIMED Backend API

🏥 **Healthcare Platform Backend** - RESTful API for SHAFIMED medical consultation platform

## 🚀 Deployment Status

- **Production URL**: https://shafimed.onrender.com
- **Health Check**: GET `/` - Returns server status
- **API Base**: `/api`

## 📋 Environment Variables Required

```env
PORT=5000
MONGO_URI=mongodb+srv://...
JWT_SECRET=your_jwt_secret_key
NODE_ENV=production
```

## 🛠 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user

### Users
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID

### Profiles
- `GET /api/profile` - Get user profile
- `PUT /api/profile` - Update user profile

### Queries
- `GET /api/queries` - Get all queries
- `POST /api/queries` - Create new query

## 🔧 Deployment Instructions

### For Render.com:
1. Connect GitHub repository
2. Set build command: `npm install`
3. Set start command: `npm start`
4. Add environment variables in dashboard
5. Deploy

### Local Development:
```bash
npm install
npm run dev
```

## 🔐 Security Features

- JWT Authentication
- Password hashing with bcrypt
- CORS configuration
- Input validation
- Error handling middleware

## 📊 Health Monitoring

The server includes:
- Health check endpoint (`/`)
- Database connection monitoring
- Error logging
- Graceful shutdown handling

## 🎨 Frontend Integration

Configured CORS for:
- Local development (localhost:5173, localhost:5174)
- Production frontend (https://shafimed.vercel.app)
- Vercel preview deployments

---

**Last Updated**: 2024-09-30  
**Version**: 1.0.0  
**Node.js**: >=18.0.0