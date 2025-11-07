# 🏨 Future Hotel Booking System - Backend API

A comprehensive RESTful API for hotel booking management system built with Node.js, Express, and MongoDB.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
- [Authentication](#authentication)
- [Frontend Integration with Axios](#frontend-integration-with-axios)
- [Error Handling](#error-handling)
- [Usage Examples](#usage-examples)

## ✨ Features

- 🔐 **User Authentication & Authorization** (JWT-based)
- 🏠 **Room Management** (CRUD operations)
- 📅 **Booking System** with date validation
- 💳 **Payment Integration** (Stripe)
- 📧 **Email Notifications** (Password reset)
- 🛡️ **Security Features** (Password hashing, input validation)
- 📊 **Role-based Access Control** (Admin/User)
- 🔄 **Error Handling** with custom error messages

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Payment**: Stripe API
- **Email**: Nodemailer
- **Validation**: Validator.js
- **Password Hashing**: bcryptjs

## 🚀 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Nalin-Sandaruwan/Future-Hotel-Booking-system.git
   cd Future-Hotel-Booking-system/backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp config.env.example config.env
   # Edit config.env with your configuration
   ```

4. **Start the server**
   ```bash
   npm start
   ```

The server will start on `http://localhost:3000`

## 🔧 Environment Variables

Create a `config.env` file in the root directory:

```env
PORT=3000
JWT_SECRET=your_jwt_secret_key_here
DATABASE=mongodb://localhost:27017/Hotel-Booking
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_password
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
NODE_ENV=development
```

## 🔌 API Endpoints

### Base URL
```
http://localhost:3000/api/v1
```

### 🔐 Authentication Endpoints

#### 1. User Registration
```http
POST /users/sign-up
```

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "user"
}
```

**Response:**
```json
{
  "status": "success",
  "data": {
    "user": {
      "_id": "60f7b3b3b3b3b3b3b3b3b3b3",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "user"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

#### 2. User Login
```http
POST /users/login
```

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

#### 3. Forgot Password
```http
POST /users/forget-password
```

**Request Body:**
```json
{
  "email": "john@example.com"
}
```

#### 4. Reset Password
```http
POST /users/reset-password
```

**Request Body:**
```json
{
  "resetCode": "123456",
  "newPassword": "newpassword123"
}
```

### 🏠 Room Management Endpoints

#### 1. Get All Rooms
```http
GET /rooms
```

**Response:**
```json
{
  "status": "success",
  "data": {
    "rooms": [
      {
        "_id": "60f7b3b3b3b3b3b3b3b3b3b3",
        "name": "Deluxe Suite",
        "discription": "Luxurious suite with ocean view",
        "gestCapacity": 4,
        "price": 299.99,
        "location": "Beach Front",
        "amenities": ["WiFi", "Pool", "Gym", "Spa"],
        "images": ["image1.jpg", "image2.jpg"]
      }
    ]
  }
}
```

#### 2. Get Room by ID
```http
GET /rooms/:id
```

**Headers:**
```
Authorization: Bearer <jwt_token>
```

#### 3. Create Room (Admin Only)
```http
POST /rooms
```

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Request Body:**
```json
{
  "name": "Premium Suite",
  "discription": "Exclusive suite with city view",
  "gestCapacity": 2,
  "price": 199.99,
  "location": "City Center",
  "amenities": ["WiFi", "Room Service", "Mini Bar"],
  "images": ["premium1.jpg", "premium2.jpg"]
}
```

#### 4. Update Room (Admin Only)
```http
PATCH /rooms/:id
```

**Headers:**
```
Authorization: Bearer <jwt_token>
```

#### 5. Delete Room (Admin Only)
```http
DELETE /rooms/:id
```

**Headers:**
```
Authorization: Bearer <jwt_token>
```

### 📅 Booking Endpoints

#### 1. Create Booking
```http
POST /bookings
```

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Request Body:**
```json
{
  "roomId": "60f7b3b3b3b3b3b3b3b3b3b3",
  "startDate": "2024-01-15T00:00:00.000Z",
  "endDate": "2024-01-18T00:00:00.000Z"
}
```

**Response:**
```json
{
  "status": "success",
  "data": {
    "booking": {
      "_id": "60f7b3b3b3b3b3b3b3b3b3b3",
      "userId": "60f7b3b3b3b3b3b3b3b3b3b3",
      "roomId": "60f7b3b3b3b3b3b3b3b3b3b3",
      "startDate": "2024-01-15T00:00:00.000Z",
      "endDate": "2024-01-18T00:00:00.000Z",
      "status": "pending"
    }
  }
}
```

#### 2. Get All Bookings
```http
GET /bookings
```

**Headers:**
```
Authorization: Bearer <jwt_token>
```

#### 3. Get Booking by ID (Admin Only)
```http
GET /bookings/:id
```

**Headers:**
```
Authorization: Bearer <jwt_token>
```

#### 4. Update Booking (Admin Only)
```http
PUT /bookings/:id
```

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Request Body:**
```json
{
  "status": "confirmed"
}
```

#### 5. Delete Booking (Admin Only)
```http
DELETE /bookings/:id
```

**Headers:**
```
Authorization: Bearer <jwt_token>
```

### 💳 Payment Endpoints

#### 1. Create Payment
```http
POST /payments
```

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Request Body:**
```json
{
  "bookingId": "60f7b3b3b3b3b3b3b3b3b3b3",
  "amount": 599.97,
  "paymentMethod": "stripe"
}
```

#### 2. Get All Payments
```http
GET /payments
```

**Headers:**
```
Authorization: Bearer <jwt_token>
```

#### 3. Get Payment by ID
```http
GET /payments/:id
```

**Headers:**
```
Authorization: Bearer <jwt_token>
```

#### 4. Update Payment
```http
PATCH /payments/:id
```

**Headers:**
```
Authorization: Bearer <jwt_token>
```

#### 5. Delete Payment
```http
DELETE /payments/:id
```

**Headers:**
```
Authorization: Bearer <jwt_token>
```

#### 6. Stripe Webhook
```http
POST /payments/webhook
```

**Headers:**
```
Stripe-Signature: <stripe_signature>
```

## 🔐 Authentication

The API uses JWT (JSON Web Tokens) for authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

### Token Structure
- **Access Token**: Valid for session duration
- **Secret Key**: Configured in environment variables

### Role-based Access
- **User**: Can view rooms, create bookings, manage payments
- **Admin**: Full access to all endpoints including room management

## 🌐 Frontend Integration with Axios

This section explains how to integrate your frontend application with the backend API using Axios for HTTP requests and authentication.

### 📦 Installation

First, install Axios in your frontend project:

```bash
# For React/Vue/Angular
npm install axios

# For React with additional features
npm install axios react-cookie
```

### ⚙️ Axios Configuration

Create an Axios instance with default configuration:

```javascript
// api/config.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api/v1';

// Create axios instance
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  withCredentials: true, // Important for cookies
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for token refresh
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshResponse = await axios.post(
          `${API_BASE_URL}/users/refresh-token`,
          {},
          { withCredentials: true }
        );

        const newToken = refreshResponse.data.token;
        localStorage.setItem('accessToken', newToken);
        
        // Retry the original request
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return apiClient(originalRequest);
      } catch (refreshError) {
        // Refresh failed, redirect to login
        localStorage.removeItem('accessToken');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
```

### 🔐 Authentication Service

Create a service for authentication operations:

```javascript
// services/authService.js
import apiClient from '../api/config';

class AuthService {
  // User Registration
  async signup(userData) {
    try {
      const response = await apiClient.post('/users/sign-up', userData);
      
      if (response.data.token) {
        localStorage.setItem('accessToken', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.data.user));
      }
      
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Registration failed');
    }
  }

  // User Login
  async login(credentials) {
    try {
      const response = await apiClient.post('/users/login', credentials);
      
      if (response.data.token) {
        localStorage.setItem('accessToken', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.data.user));
      }
      
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Login failed');
    }
  }

  // Refresh Token
  async refreshToken() {
    try {
      const response = await apiClient.post('/users/refresh-token');
      
      if (response.data.token) {
        localStorage.setItem('accessToken', response.data.token);
      }
      
      return response.data;
    } catch (error) {
      throw new Error('Token refresh failed');
    }
  }

  // Logout
  async logout() {
    try {
      await apiClient.post('/users/logout');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('user');
    }
  }

  // Forgot Password
  async forgotPassword(email) {
    try {
      const response = await apiClient.post('/users/forget-password', { email });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to send reset email');
    }
  }

  // Reset Password
  async resetPassword(token, password) {
    try {
      const response = await apiClient.post('/users/reset-password', {
        token,
        password
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Password reset failed');
    }
  }

  // Get Current User
  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user') || 'null');
  }

  // Check if user is authenticated
  isAuthenticated() {
    return !!localStorage.getItem('accessToken');
  }
}

export default new AuthService();
```

### 🏠 Room Service

Service for room-related operations:

```javascript
// services/roomService.js
import apiClient from '../api/config';

class RoomService {
  // Get all rooms with filters
  async getRooms(params = {}) {
    try {
      const response = await apiClient.get('/rooms', { params });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch rooms');
    }
  }

  // Get single room
  async getRoom(id) {
    try {
      const response = await apiClient.get(`/rooms/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch room');
    }
  }

  // Create room (Admin only)
  async createRoom(roomData) {
    try {
      const response = await apiClient.post('/rooms', roomData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to create room');
    }
  }

  // Update room (Admin only)
  async updateRoom(id, roomData) {
    try {
      const response = await apiClient.patch(`/rooms/${id}`, roomData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to update room');
    }
  }

  // Delete room (Admin only)
  async deleteRoom(id) {
    try {
      const response = await apiClient.delete(`/rooms/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to delete room');
    }
  }
}

export default new RoomService();
```

### 📅 Booking Service

Service for booking operations:

```javascript
// services/bookingService.js
import apiClient from '../api/config';

class BookingService {
  // Create booking
  async createBooking(bookingData) {
    try {
      const response = await apiClient.post('/bookings', bookingData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to create booking');
    }
  }

  // Get user bookings
  async getUserBookings() {
    try {
      const response = await apiClient.get('/bookings');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch bookings');
    }
  }

  // Get single booking
  async getBooking(id) {
    try {
      const response = await apiClient.get(`/bookings/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch booking');
    }
  }

  // Update booking
  async updateBooking(id, updateData) {
    try {
      const response = await apiClient.patch(`/bookings/${id}`, updateData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to update booking');
    }
  }

  // Cancel booking
  async cancelBooking(id) {
    try {
      const response = await apiClient.delete(`/bookings/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to cancel booking');
    }
  }
}

export default new BookingService();
```

### 💳 Payment Service

Service for payment operations:

```javascript
// services/paymentService.js
import apiClient from '../api/config';

class PaymentService {
  // Create payment
  async createPayment(paymentData) {
    try {
      const response = await apiClient.post('/payments', paymentData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Payment failed');
    }
  }

  // Get payment details
  async getPayment(id) {
    try {
      const response = await apiClient.get(`/payments/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch payment');
    }
  }

  // Get user payments
  async getUserPayments() {
    try {
      const response = await apiClient.get('/payments');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch payments');
    }
  }
}

export default new PaymentService();
```

### 🔧 React Hook Examples

Custom hooks for easier state management:

```javascript
// hooks/useAuth.js
import { useState, useEffect } from 'react';
import authService from '../services/authService';

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    setUser(currentUser);
    setLoading(false);
  }, []);

  const login = async (credentials) => {
    setLoading(true);
    try {
      const response = await authService.login(credentials);
      setUser(response.data.user);
      return response;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await authService.logout();
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const signup = async (userData) => {
    setLoading(true);
    try {
      const response = await authService.signup(userData);
      setUser(response.data.user);
      return response;
    } finally {
      setLoading(false);
    }
  };

  return {
    user,
    loading,
    login,
    logout,
    signup,
    isAuthenticated: authService.isAuthenticated(),
  };
};
```

### 📱 React Component Examples

#### Login Component
```javascript
// components/Login.jsx
import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';

const Login = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const { login, loading } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await login(credentials);
      // Redirect to dashboard or home page
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <div className="error">{error}</div>}
      
      <input
        type="email"
        placeholder="Email"
        value={credentials.email}
        onChange={(e) => setCredentials({...credentials, email: e.target.value})}
        required
      />
      
      <input
        type="password"
        placeholder="Password"
        value={credentials.password}
        onChange={(e) => setCredentials({...credentials, password: e.target.value})}
        required
      />
      
      <button type="submit" disabled={loading}>
        {loading ? 'Logging in...' : 'Login'}
      </button>
    </form>
  );
};

export default Login;
```

#### Rooms List Component
```javascript
// components/RoomsList.jsx
import React, { useState, useEffect } from 'react';
import roomService from '../services/roomService';

const RoomsList = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await roomService.getRooms();
        setRooms(response.data.rooms);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);

  if (loading) return <div>Loading rooms...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="rooms-grid">
      {rooms.map(room => (
        <div key={room._id} className="room-card">
          <h3>{room.name}</h3>
          <p>Type: {room.type}</p>
          <p>Price: ${room.price}/night</p>
          <p>Capacity: {room.capacity} guests</p>
          <button onClick={() => bookRoom(room._id)}>
            Book Now
          </button>
        </div>
      ))}
    </div>
  );
};

export default RoomsList;
```

### 🚨 Error Handling Best Practices

```javascript
// utils/errorHandler.js
export const handleApiError = (error) => {
  if (error.response) {
    // Server responded with error status
    const message = error.response.data?.message || 'Something went wrong';
    const status = error.response.status;
    
    switch (status) {
      case 401:
        // Redirect to login
        localStorage.removeItem('accessToken');
        window.location.href = '/login';
        break;
      case 403:
        // Show permission denied message
        return 'You do not have permission to perform this action';
      case 404:
        return 'Resource not found';
      case 500:
        return 'Server error. Please try again later';
      default:
        return message;
    }
  } else if (error.request) {
    // Request was made but no response received
    return 'Network error. Please check your connection';
  } else {
    // Something else happened
    return error.message || 'An unexpected error occurred';
  }
};
```

### 🛡️ Protected Route Component

```javascript
// components/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const ProtectedRoute = ({ children, adminRequired = false }) => {
  const { user, loading, isAuthenticated } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (adminRequired && user?.role !== 'admin') {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default ProtectedRoute;
```

### 📝 Usage Tips

1. **Token Storage**: Store access tokens in localStorage for persistence across browser sessions
2. **Automatic Refresh**: The Axios interceptor automatically handles token refresh
3. **Error Handling**: Always wrap API calls in try-catch blocks
4. **Loading States**: Show loading indicators during API requests
5. **Logout Cleanup**: Clear all stored data when user logs out

### 🔗 Environment Variables for Frontend

```javascript
// .env (Frontend)
REACT_APP_API_URL=http://localhost:3000/api/v1
REACT_APP_STRIPE_PUBLIC_KEY=your_stripe_public_key
```

This setup provides a robust foundation for integrating your React/Vue/Angular frontend with the hotel booking backend API!

## 🛡️ Error Handling

The API provides comprehensive error handling with appropriate HTTP status codes:

### Common Error Responses

#### 400 - Bad Request
```json
{
  "status": "error",
  "message": "Invalid input data. Please check your request."
}
```

#### 401 - Unauthorized
```json
{
  "status": "error",
  "message": "You are not logged in. Please log in to get access."
}
```

#### 403 - Forbidden
```json
{
  "status": "error",
  "message": "You do not have permission to perform this action."
}
```

#### 404 - Not Found
```json
{
  "status": "error",
  "message": "Resource not found."
}
```

#### 500 - Internal Server Error
```json
{
  "status": "error",
  "message": "Something went very wrong!"
}
```

## 📝 Usage Examples

### Using cURL

#### 1. User Registration
```bash
curl -X POST http://localhost:3000/api/v1/users/sign-up \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }'
```

#### 2. User Login
```bash
curl -X POST http://localhost:3000/api/v1/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

#### 3. Get All Rooms
```bash
curl -X GET http://localhost:3000/api/v1/rooms \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

#### 4. Create Booking
```bash
curl -X POST http://localhost:3000/api/v1/bookings \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "roomId": "60f7b3b3b3b3b3b3b3b3b3b3",
    "startDate": "2024-01-15T00:00:00.000Z",
    "endDate": "2024-01-18T00:00:00.000Z"
  }'
```

### Using JavaScript/Axios

#### 1. User Login
```javascript
import axios from 'axios';

const loginUser = async (email, password) => {
  try {
    const response = await axios.post('http://localhost:3000/api/v1/users/login', {
      email,
      password
    });
    return response.data;
  } catch (error) {
    console.error('Login error:', error.response?.data || error.message);
    throw error;
  }
};
```

#### 2. Get Rooms with Authentication
```javascript
import axios from 'axios';

const getRooms = async (token) => {
  try {
    const response = await axios.get('http://localhost:3000/api/v1/rooms', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Get rooms error:', error.response?.data || error.message);
    throw error;
  }
};
```

#### 3. Create Booking
```javascript
import axios from 'axios';

const createBooking = async (token, bookingData) => {
  try {
    const response = await axios.post('http://localhost:3000/api/v1/bookings', bookingData, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Create booking error:', error.response?.data || error.message);
    throw error;
  }
};

// Usage example:
const bookingData = {
  roomId: '60f7b3b3b3b3b3b3b3b3b3b3',
  startDate: '2024-01-15T00:00:00.000Z',
  endDate: '2024-01-18T00:00:00.000Z'
};
```

#### 4. User Registration
```javascript
import axios from 'axios';

const registerUser = async (userData) => {
  try {
    const response = await axios.post('http://localhost:3000/api/v1/users/sign-up', userData);
    return response.data;
  } catch (error) {
    console.error('Registration error:', error.response?.data || error.message);
    throw error;
  }
};

// Usage example:
const userData = {
  name: 'John Doe',
  email: 'john@example.com',
  password: 'password123',
  role: 'user'
};
```

#### 5. Create Room (Admin Only)
```javascript
import axios from 'axios';

const createRoom = async (token, roomData) => {
  try {
    const response = await axios.post('http://localhost:3000/api/v1/rooms', roomData, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Create room error:', error.response?.data || error.message);
    throw error;
  }
};

// Usage example:
const roomData = {
  name: 'Premium Suite',
  discription: 'Exclusive suite with city view',
  gestCapacity: 2,
  price: 199.99,
  location: 'City Center',
  amenities: ['WiFi', 'Room Service', 'Mini Bar'],
  images: ['premium1.jpg', 'premium2.jpg']
};
```

#### 6. Update Booking Status (Admin Only)
```javascript
import axios from 'axios';

const updateBookingStatus = async (token, bookingId, status) => {
  try {
    const response = await axios.put(`http://localhost:3000/api/v1/bookings/${bookingId}`, 
      { status }, 
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Update booking error:', error.response?.data || error.message);
    throw error;
  }
};

// Usage example:
// updateBookingStatus(token, '60f7b3b3b3b3b3b3b3b3b3b3', 'confirmed');
```

#### 7. Create Payment
```javascript
import axios from 'axios';

const createPayment = async (token, paymentData) => {
  try {
    const response = await axios.post('http://localhost:3000/api/v1/payments', paymentData, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Create payment error:', error.response?.data || error.message);
    throw error;
  }
};

// Usage example:
const paymentData = {
  bookingId: '60f7b3b3b3b3b3b3b3b3b3b3',
  amount: 599.97,
  paymentMethod: 'stripe'
};
```

#### 8. Get All Bookings
```javascript
import axios from 'axios';

const getAllBookings = async (token) => {
  try {
    const response = await axios.get('http://localhost:3000/api/v1/bookings', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Get bookings error:', error.response?.data || error.message);
    throw error;
  }
};
```

#### 9. Delete Room (Admin Only)
```javascript
import axios from 'axios';

const deleteRoom = async (token, roomId) => {
  try {
    const response = await axios.delete(`http://localhost:3000/api/v1/rooms/${roomId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Delete room error:', error.response?.data || error.message);
    throw error;
  }
};

// Usage example:
// deleteRoom(token, '60f7b3b3b3b3b3b3b3b3b3b3');
```

#### 10. Forgot Password
```javascript
import axios from 'axios';

const forgotPassword = async (email) => {
  try {
    const response = await axios.post('http://localhost:3000/api/v1/users/forget-password', {
      email
    });
    return response.data;
  } catch (error) {
    console.error('Forgot password error:', error.response?.data || error.message);
    throw error;
  }
};
```

#### 11. Reset Password
```javascript
import axios from 'axios';

const resetPassword = async (resetCode, newPassword) => {
  try {
    const response = await axios.post('http://localhost:3000/api/v1/users/reset-password', {
      resetCode,
      newPassword
    });
    return response.data;
  } catch (error) {
    console.error('Reset password error:', error.response?.data || error.message);
    throw error;
  }
};
```

#### 12. Axios Instance Setup (Recommended)
```javascript
import axios from 'axios';

// Create axios instance with default config
const api = axios.create({
  baseURL: 'http://localhost:3000/api/v1',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // or get from your auth store
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Now you can use the api instance
const loginUser = async (email, password) => {
  try {
    const response = await api.post('/users/login', { email, password });
    return response.data;
  } catch (error) {
    console.error('Login error:', error.response?.data || error.message);
    throw error;
  }
};

const getRooms = async () => {
  try {
    const response = await api.get('/rooms');
    return response.data;
  } catch (error) {
    console.error('Get rooms error:', error.response?.data || error.message);
    throw error;
  }
};
```

## 📊 Data Models

### User Model
```javascript
{
  name: String (required, 3-50 chars),
  email: String (required, unique, validated),
  password: String (required, max 100 chars),
  role: String (enum: ['user', 'admin'], default: 'admin'),
  resetCode: String,
  resetExpires: Date
}
```

### Room Model
```javascript
{
  name: String (required),
  discription: String (required, min 10 chars),
  gestCapacity: Number (required, min 1),
  price: Number (required, min 0),
  location: String (required),
  amenities: [String] (required),
  images: [String] (required, min 1)
}
```

### Booking Model
```javascript
{
  userId: ObjectId (ref: 'User', required),
  roomId: ObjectId (ref: 'Room', required),
  startDate: Date (required),
  endDate: Date (required),
  status: String (enum: ['pending', 'confirmed', 'cancelled'], default: 'pending')
}
```

### Payment Model
```javascript
{
  bookingId: ObjectId (ref: 'Booking', required),
  amount: Number (required),
  paymentMethod: String (required),
  paymentDate: Date (default: Date.now),
  transactionId: String (required, unique),
  paymentStatus: String (enum: ['pending', 'completed', 'failed'], default: 'pending')
}
```

## 🚀 Deployment

### Prerequisites
- Node.js (v14 or higher)
- MongoDB database
- Stripe account for payments
- Email service (Gmail, SendGrid, etc.)

### Environment Setup
1. Set `NODE_ENV=production`
2. Configure all environment variables
3. Set up MongoDB connection string
4. Configure Stripe keys
5. Set up email service credentials

### Production Commands
```bash
# Install dependencies
npm install --production

# Start the server
npm start

# Or use PM2 for process management
pm2 start index.js --name "hotel-booking-api"
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 👨‍💻 Author

**Nalin Sithara**
- GitHub: [@Nalin-Sandaruwan](https://github.com/Nalin-Sandaruwan)
- Project: [Future Hotel Booking System](https://github.com/Nalin-Sandaruwan/Future-Hotel-Booking-system)

## 🐛 Issues

If you find any bugs or have suggestions, please open an issue on the [GitHub repository](https://github.com/Nalin-Sandaruwan/Future-Hotel-Booking-system/issues).

---

**Happy Coding! 🎉**
