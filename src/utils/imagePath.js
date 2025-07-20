/**
 * Get the correct image path for both development and production (GitHub Pages)
 * @param {string} imagePath - The relative image path starting with /img/ or img/
 * @returns {string} - The correct image path with base URL
 */
export const getImagePath = (imagePath) => {
  // Remove leading slash if present to normalize the path
  const cleanPath = imagePath.startsWith('/') ? imagePath.slice(1) : imagePath;
  
  // Get the base URL from Vite's environment
  const basePath = import.meta.env.BASE_URL || '/';
  
  // Ensure base path ends with / and clean path doesn't start with /
  const normalizedBasePath = basePath.endsWith('/') ? basePath : `${basePath}/`;
  
  return `${normalizedBasePath}${cleanPath}`;
};

/**
 * Alternative approach for assets in the public folder using import.meta.env.BASE_URL
 * This is the recommended pattern by Vite for public assets
 * @param {string} assetPath - Path relative to public folder (e.g., "img/general/logo.png")
 * @returns {string} - The correct asset URL
 */
export const getPublicAssetPath = (assetPath) => {
  const cleanPath = assetPath.startsWith('/') ? assetPath.slice(1) : assetPath;
  return `${import.meta.env.BASE_URL}${cleanPath}`;
};
