# Environment Setup Guide

This application requires several environment variables to be configured. Please create a `.env.local` file in the root directory with the following variables:

## Required Environment Variables

### 1. Google OAuth Configuration
```
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id_here
```

**How to get Google Client ID:**
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google+ API
4. Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client IDs"
5. Set the application type to "Web application"
6. Add your domain to "Authorized JavaScript origins" (e.g., `http://localhost:3000` for development)
7. Copy the Client ID and paste it as the value for `NEXT_PUBLIC_GOOGLE_CLIENT_ID`

### 2. Convex Configuration
```
NEXT_PUBLIC_CONVEX_URL=your_convex_url_here
```

**How to get Convex URL:**
1. Go to [Convex Dashboard](https://dashboard.convex.dev/)
2. Create a new project or select an existing one
3. Copy the deployment URL from your project settings

### 3. Gemini AI Configuration
```
NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key_here
```

**How to get Gemini API Key:**
1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key
3. Copy the API key and paste it as the value for `NEXT_PUBLIC_GEMINI_API_KEY`

## Example .env.local file

```env
# Google OAuth Configuration
NEXT_PUBLIC_GOOGLE_CLIENT_ID=123456789-abcdefghijklmnop.apps.googleusercontent.com

# Convex Configuration
NEXT_PUBLIC_CONVEX_URL=https://your-project.convex.cloud

# Gemini AI Configuration
NEXT_PUBLIC_GEMINI_API_KEY=AIzaSyC...
```

## After Setup

1. Create the `.env.local` file with your actual values
2. Restart your development server: `npm run dev`
3. The Google OAuth error should be resolved

## Troubleshooting

- If you still see the "Missing required parameter client_id" error, make sure the `.env.local` file is in the root directory and the variable name is exactly `NEXT_PUBLIC_GOOGLE_CLIENT_ID`
- For development, make sure `http://localhost:3000` is added to the authorized origins in your Google OAuth configuration
- The application will show "Google OAuth Not Configured" button if the client ID is missing, which is expected behavior 