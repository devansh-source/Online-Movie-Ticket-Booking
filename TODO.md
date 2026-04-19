# Deployment Fixes for Render (Backend) and Vercel (Frontend)

## Issues Identified
- Backend serves frontend static files in production, but deployments are separate.
- CORS allows localhost or FRONTEND_URL, but needs to be set correctly.
- Email links hardcoded to localhost:3000, won't work in production.
- Frontend axios assumes backend on same domain in production.
- Missing environment variables for dynamic URLs.

## Tasks
- [x] Update backend/server.js: Remove static file serving for production since frontend is separate.
- [x] Update backend/utils/emailService.js: Use FRONTEND_URL for email links.
- [x] Update backend/controllers/authController.js: Use FRONTEND_URL for reset URL.
- [x] Update frontend/src/utils/axiosConfig.js: Use REACT_APP_API_URL for baseURL in production.
- [x] Update backend/server.js: Fix CORS to allow Vercel frontend origin.
- [ ] Ensure .env has FRONTEND_URL and REACT_APP_API_URL set in deployments.
- [ ] Test deployments after changes.
