/**
 * UAGC DX Documentation - Latest Version Redirector
 * 
 * This script handles redirects from /latest/ paths to the root URL.
 * It can be deployed to services like Netlify or Vercel.
 */

// For Netlify Functions or Vercel Edge Functions
export default function handler(req, res) {
  const url = new URL(req.url, 'http://localhost');
  const path = url.pathname;
  
  // Check if the path starts with /latest/
  if (path.startsWith('/latest/')) {
    // Replace /latest/ with /
    const redirectPath = path.replace('/latest/', '/');
    
    // Redirect to the root path
    return Response.redirect(new URL(redirectPath, url.origin).toString(), 302);
  }
  
  // If not a /latest/ path, pass through
  return fetch(req);
}

// For Node.js HTTP server (optional)
if (require.main === module) {
  const http = require('http');
  const url = require('url');
  
  const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url);
    const path = parsedUrl.pathname;
    
    // Check if the path starts with /latest/
    if (path.startsWith('/latest/')) {
      // Replace /latest/ with /
      const redirectPath = path.replace('/latest/', '/');
      
      // Redirect to the root path
      res.writeHead(302, {
        'Location': redirectPath
      });
      res.end();
      return;
    }
    
    // If not a /latest/ path, return 404 (this is just for the standalone server)
    res.writeHead(404);
    res.end('Not Found');
  });
  
  const PORT = process.env.PORT || 3000;
  server.listen(PORT, () => {
    console.log(`Latest redirector is running on port ${PORT}`);
  });
} 