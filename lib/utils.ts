/**
 * Get the base path for assets
 * This ensures assets work both locally and on GitHub Pages
 */
export function getAssetPath(path: string): string {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  // If no base path, return the original path
  if (!basePath) {
    return path;
  }
  // Remove leading slash from path if it exists to avoid double slashes
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `${basePath}/${cleanPath}`;
}
