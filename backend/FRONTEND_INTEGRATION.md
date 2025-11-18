# 🌐 Frontend Integration Guide

Complete guide for integrating your frontend application with the Hotel Booking API using Axios.

## 📦 Quick Setup

### 1. Install Dependencies
```bash
npm install axios react-cookie
```

### 2. Environment Variables
```env
# .env
REACT_APP_API_URL=http://localhost:3000/api/v1
REACT_APP_STRIPE_PUBLIC_KEY=your_stripe_public_key
```

### 3. Basic Axios Setup
```javascript
// src/api/client.js
import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true,
  timeout: 10000,
});

// Add token to requests
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle token refresh
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      try {
        const refreshResponse = await axios.post(
          `${process.env.REACT_APP_API_URL}/users/refresh-token`,
          {},
          { withCredentials: true }
        );
        
        const newToken = refreshResponse.data.token;
        localStorage.setItem('accessToken', newToken);
        
        // Retry original request
        error.config.headers.Authorization = `Bearer ${newToken}`;
        return apiClient.request(error.config);
      } catch (refreshError) {
        localStorage.removeItem('accessToken');
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;
```

## 🔐 Authentication Examples

### Login
```javascript
const login = async (email, password) => {
  try {
    const response = await apiClient.post('/users/login', {
      email,
      password
    });
    
    localStorage.setItem('accessToken', response.data.token);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Login failed');
  }
};
```

### Signup
```javascript
const signup = async (userData) => {
  try {
    const response = await apiClient.post('/users/sign-up', userData);
    localStorage.setItem('accessToken', response.data.token);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Signup failed');
  }
};
```

### Logout
```javascript
const logout = async () => {
  try {
    await apiClient.post('/users/logout');
  } finally {
    localStorage.removeItem('accessToken');
    window.location.href = '/login';
  }
};
```

## 🏠 Room Operations

### Get All Rooms
```javascript
const getRooms = async (filters = {}) => {
  try {
    const response = await apiClient.get('/rooms', { params: filters });
    return response.data.data.rooms;
  } catch (error) {
    throw new Error('Failed to fetch rooms');
  }
};

// Usage with filters
const rooms = await getRooms({
  type: 'deluxe',
  price: { gte: 100, lte: 300 },
  page: 1,
  limit: 10
});
```

### Get Single Room
```javascript
const getRoom = async (roomId) => {
  try {
    const response = await apiClient.get(`/rooms/${roomId}`);
    return response.data.data.room;
  } catch (error) {
    throw new Error('Failed to fetch room details');
  }
};
```

## 📅 Booking Operations

### Create Booking
```javascript
const createBooking = async (bookingData) => {
  try {
    const response = await apiClient.post('/bookings', {
      roomId: bookingData.roomId,
      startDate: bookingData.startDate,
      endDate: bookingData.endDate,
      guests: bookingData.guests
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Booking failed');
  }
};
```

### Get User Bookings
```javascript
const getUserBookings = async () => {
  try {
    const response = await apiClient.get('/bookings');
    return response.data.data.bookings;
  } catch (error) {
    throw new Error('Failed to fetch bookings');
  }
};
```

## 💳 Payment Operations

### Create Payment
```javascript
const createPayment = async (paymentData) => {
  try {
    const response = await apiClient.post('/payments', {
      bookingId: paymentData.bookingId,
      amount: paymentData.amount,
      paymentMethod: paymentData.paymentMethod
    });
    return response.data;
  } catch (error) {
    throw new Error('Payment processing failed');
  }
};
```

## ⚛️ React Hooks

### useAuth Hook
```javascript
// hooks/useAuth.js
import { useState, useEffect, useContext, createContext } from 'react';
import apiClient from '../api/client';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      // Verify token and get user data
      getCurrentUser();
    } else {
      setLoading(false);
    }
  }, []);

  const getCurrentUser = async () => {
    try {
      const response = await apiClient.get('/users/me');
      setUser(response.data.data.user);
    } catch (error) {
      localStorage.removeItem('accessToken');
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    const response = await apiClient.post('/users/login', { email, password });
    localStorage.setItem('accessToken', response.data.token);
    setUser(response.data.data.user);
    return response.data;
  };

  const logout = async () => {
    try {
      await apiClient.post('/users/logout');
    } finally {
      localStorage.removeItem('accessToken');
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
```

### useApi Hook
```javascript
// hooks/useApi.js
import { useState, useEffect } from 'react';

export const useApi = (apiFunction, dependencies = []) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await apiFunction();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, dependencies);

  const refetch = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await apiFunction();
      setData(result);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, refetch };
};
```

## 🛡️ Protected Routes

```javascript
// components/ProtectedRoute.jsx
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;
  
  if (!user) return <Navigate to="/login" />;
  
  if (adminOnly && user.role !== 'admin') {
    return <Navigate to="/unauthorized" />;
  }

  return children;
};

export default ProtectedRoute;
```

## 📱 Component Examples

### Login Form
```javascript
// components/LoginForm.jsx
import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(formData.email, formData.password);
      navigate('/dashboard');
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
        value={formData.email}
        onChange={(e) => setFormData({...formData, email: e.target.value})}
        required
      />
      
      <input
        type="password"
        placeholder="Password"
        value={formData.password}
        onChange={(e) => setFormData({...formData, password: e.target.value})}
        required
      />
      
      <button type="submit">Login</button>
    </form>
  );
};
```

### Rooms List
```javascript
// components/RoomsList.jsx
import React from 'react';
import { useApi } from '../hooks/useApi';
import { getRooms } from '../services/roomService';

const RoomsList = () => {
  const { data: rooms, loading, error } = useApi(getRooms);

  if (loading) return <div>Loading rooms...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="rooms-grid">
      {rooms?.map(room => (
        <div key={room._id} className="room-card">
          <h3>{room.name}</h3>
          <p>{room.type}</p>
          <p>${room.price}/night</p>
          <button onClick={() => bookRoom(room._id)}>
            Book Now
          </button>
        </div>
      ))}
    </div>
  );
};
```

## 🚨 Error Handling

### Global Error Handler
```javascript
// utils/errorHandler.js
export const handleApiError = (error) => {
  if (error.response) {
    const { status, data } = error.response;
    
    switch (status) {
      case 400:
        return data.message || 'Invalid request';
      case 401:
        localStorage.removeItem('accessToken');
        window.location.href = '/login';
        return 'Please log in again';
      case 403:
        return 'You do not have permission';
      case 404:
        return 'Resource not found';
      case 500:
        return 'Server error. Please try again';
      default:
        return data.message || 'Something went wrong';
    }
  }
  
  return 'Network error. Check your connection';
};
```

## 🔄 Loading States

### Loading Component
```javascript
// components/Loading.jsx
const Loading = ({ message = 'Loading...' }) => (
  <div className="loading">
    <div className="spinner"></div>
    <p>{message}</p>
  </div>
);
```

### CSS for Loading Spinner
```css
.loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
```

## 🎯 Best Practices

1. **Always handle loading states** - Show spinners or skeleton screens
2. **Implement proper error handling** - Display user-friendly error messages
3. **Use environment variables** - Never hardcode API URLs
4. **Implement token refresh** - Handle expired tokens gracefully
5. **Cache responses** - Use React Query or SWR for better performance
6. **Validate inputs** - Add client-side validation before API calls
7. **Use TypeScript** - Add type safety to your API calls

## 📚 Additional Resources

- [Axios Documentation](https://axios-http.com/)
- [React Query](https://tanstack.com/query/latest) - For advanced data fetching
- [SWR](https://swr.vercel.app/) - Alternative data fetching library
- [React Hook Form](https://react-hook-form.com/) - For form handling

Happy coding! 🚀
