/**
 * Get the correct path for static assets based on the environment
 * @param {string} imagePath - The path relative to public/img/
 * @returns {string} The correct asset path
 */
export const getImagePath = (imagePath) => {
  // Remove leading slash if present
  const cleanPath = imagePath.startsWith('/') ? imagePath.slice(1) : imagePath;
  
  // In development, use the direct path
  if (import.meta.env.DEV) {
    return `/${cleanPath}`;
  }
  
  // In production, use the base URL
  const baseUrl = import.meta.env.BASE_URL || '/';
  return `${baseUrl}${cleanPath}`;
};

/**
 * Get the correct path for images in the img folder
 * @param {string} imagePath - The path relative to public/img/
 * @returns {string} The correct image path
 */
export const getImgPath = (imagePath) => {
  // Remove 'img/' prefix if present
  const cleanPath = imagePath.startsWith('img/') ? imagePath.slice(4) : imagePath;
  return getImagePath(`img/${cleanPath}`);
};

/**
 * Handle image load errors by setting a fallback image
 * @param {Event} event - The error event
 * @param {string} fallbackPath - Optional custom fallback path
 */
export const handleImageError = (event, fallbackPath = 'img/cars/no-car.png') => {
  event.currentTarget.src = getImagePath(fallbackPath);
};

/**
 * Preload an image and return a promise
 * @param {string} src - The image source
 * @returns {Promise} Promise that resolves when image is loaded
 */
export const preloadImage = (src) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
};
