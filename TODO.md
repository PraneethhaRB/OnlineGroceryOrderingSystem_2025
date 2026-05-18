# TODO - Vercel deploy fix (VendorDashboard vendordashboard.js error)

- [ ] Identify exact Vercel error message/stack trace pointing to VendorDashboard.js
- [x] Fix SSR/build crash risk by guarding `localStorage` usage in `reactapp/src/utils/api.js`
- [ ] Update API base URL for production (Vercel env var) so API_BASE isn’t hardcoded to localhost (TODO: read constants.js and adjust)
- [ ] Redeploy to Vercel and confirm VendorDashboard loads

