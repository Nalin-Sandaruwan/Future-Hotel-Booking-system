# Access Token & Refresh Token Authentication Guide

## Overview
Your authentication system now uses:
- **Access Tokens**: Short-lived (15 minutes) for API requests
- **Refresh Tokens**: Long-lived (7 days) for getting new access tokens

## How It Works

### 1. User Registration/Login
When a user signs up or logs in, they receive:
- An access token (expires in 15 minutes)
- A refresh token (expires in 7 days)
- Both tokens are sent as HTTP-only cookies AND in the response body

### 2. Making Authenticated Requests
For protected routes, clients can send the access token in:
- **Authorization Header**: `Bearer <access_token>`
- **Cookie**: Automatically sent if using cookies

### 3. Token Refresh
When the access token expires, use the refresh token to get a new one:
```
POST /api/v1/users/refresh-token
```

### 4. Logout
Clears all tokens and removes refresh token from database:
```
POST /api/v1/users/logout
```

## API Endpoints

### Authentication Endpoints
- `POST /api/v1/users/sign-up` - Register new user
- `POST /api/v1/users/login` - User login
- `POST /api/v1/users/refresh-token` - Get new access token
- `POST /api/v1/users/logout` - Logout user
- `POST /api/v1/users/forget-password` - Request password reset
- `POST /api/v1/users/reset-password` - Reset password with OTP

### Protected Routes Example
All booking routes are already protected:
- `GET /api/v1/bookings` - Requires valid access token
- `POST /api/v1/bookings` - Requires valid access token
- Admin routes also require admin role

## Client Implementation Example

### Frontend Usage (JavaScript)
```javascript
// Login
const loginResponse = await fetch('/api/v1/users/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email, password }),
  credentials: 'include' // Include cookies
});

const { accessToken, refreshToken } = await loginResponse.json();

// Store tokens (optional, since they're also in cookies)
localStorage.setItem('accessToken', accessToken);
localStorage.setItem('refreshToken', refreshToken);

// Making authenticated requests
const bookingsResponse = await fetch('/api/v1/bookings', {
  headers: {
    'Authorization': `Bearer ${accessToken}`
  },
  credentials: 'include'
});

// If access token expires, refresh it
if (bookingsResponse.status === 401) {
  const refreshResponse = await fetch('/api/v1/users/refresh-token', {
    method: 'POST',
    credentials: 'include' // Refresh token from cookie
  });
  
  if (refreshResponse.ok) {
    const { accessToken: newAccessToken } = await refreshResponse.json();
    localStorage.setItem('accessToken', newAccessToken);
    // Retry original request with new token
  } else {
    // Refresh failed, redirect to login
    window.location.href = '/login';
  }
}
```

## Testing with Postman

### 1. Login/Signup
- Send POST request to `/api/v1/users/login`
- Check response for `accessToken` and `refreshToken`
- Cookies should be set automatically

### 2. Access Protected Route
- Send GET request to `/api/v1/bookings`
- Add Authorization header: `Bearer <your_access_token>`
- Or rely on cookies if testing in browser

### 3. Test Token Refresh
- Wait for access token to expire (15 minutes) OR manually test
- Send POST to `/api/v1/users/refresh-token`
- Should receive new access token

### 4. Test Logout
- Send POST to `/api/v1/users/logout`
- All tokens should be cleared

## Security Features

1. **Short-lived Access Tokens**: Minimize exposure if compromised
2. **HTTP-only Cookies**: Protect against XSS attacks
3. **Refresh Token Rotation**: Refresh tokens are stored in database
4. **Separate Secrets**: Different JWT secrets for access and refresh tokens
5. **Database Cleanup**: Refresh tokens removed on logout

## Environment Variables
Make sure these are set in your `config.env`:
```
JWT_SECRET=your_access_token_secret
JWT_REFRESH_SECRET=your_refresh_token_secret
```

## Migration Notes
- Old `jwtToken` cookie is replaced with `accessToken` and `refreshToken`
- Access token expiry reduced from 1 hour to 15 minutes
- All existing protected routes will continue to work
- Users will need to re-login after this update
