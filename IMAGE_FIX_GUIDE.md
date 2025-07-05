# Image Loading Fix for Vercel Deployment

## Problem

Your images were not loading correctly after deploying to Vercel because of improper asset path resolution. The errors you saw (`net::ERR_BLOCKED_BY_CLIENT`, `net::ERR_NAME_NOT_RESOLVED`) were due to:

1. Using `import.meta.env.BASE_URL` incorrectly in production
2. Hardcoded paths like `/img/...` not resolving properly in Vite builds
3. Inconsistent image path handling across components

## Solution Applied

### 1. Created Image Utility Functions (`src/utils/imageUtils.js`)

- `getImagePath()`: Handles correct asset paths for both development and production
- `getImgPath()`: Specifically for images in the `public/img/` folder
- `handleImageError()`: Provides fallback images when assets fail to load
- `preloadImage()`: For preloading images when needed

### 2. Updated Vite Configuration (`vite.config.js`)

- Added proper asset handling configuration
- Added asset file naming strategy for images
- Included asset extensions in build process

### 3. Fixed Components and Data Files

Updated the following files to use proper image paths:

- `src/utils/helper.js` - Error handling
- `src/utils/mapper.js` - Car image mappings
- `src/components/header/header-1/index.jsx` - Logo images
- `src/components/header/S_MobileMenu.jsx` - Mobile logo
- `src/pages/alerts/createAlert.jsx` - Alert images
- `src/data/sources.js` - Source logos
- `src/data/S_testimonialData.js` - Testimonial avatars

## Usage Examples

### In React Components:

```jsx
import { getImgPath, handleImageError } from '@/utils/imageUtils';

// For static images
<img src={getImgPath('general/logo-light.png')} alt="Logo" />

// With error handling
<img
  src={getImgPath('cars/car-image.jpg')}
  onError={handleImageError}
  alt="Car"
/>

// Custom fallback
<img
  src={getImgPath('cars/car-image.jpg')}
  onError={(e) => handleImageError(e, 'cars/default-car.png')}
  alt="Car"
/>
```

### In Data Files:

```javascript
import { getImgPath } from "../utils/imageUtils";

export const data = [
  {
    id: 1,
    img: getImgPath("sources/logo.png"),
    title: "Title",
  },
];
```

## Remaining Tasks

Some files may still use direct paths. Search for these patterns and replace:

- `"/img/` → `getImgPath('`
- `${import.meta.env.BASE_URL}/img/` → `getImgPath('`

## Testing

1. **Development**: `npm run dev` - Images should load correctly
2. **Production Build**: `npm run build` - Should build without errors
3. **Preview**: `npm run preview` - Test production build locally
4. **Deployment**: Deploy to Vercel - Images should now load correctly

## Benefits

- ✅ Images load correctly in both development and production
- ✅ Automatic fallback handling for missing images
- ✅ Consistent path resolution across the application
- ✅ Better error handling and user experience
- ✅ Optimized asset loading for better performance
