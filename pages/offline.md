---
layout: default
title: You're Offline
permalink: /offline.html
sitemap: false
---

# You're Currently Offline

Don't worry! You can still browse the pages you've previously visited.

## What You Can Do:

- Check out cached blog posts in your browser history
- Use the navigation menu to find previously visited pages  
- Wait for your connection to return for new content

## Recently Cached Pages:

The following pages should still work offline:
- Home page
- About page
- Any blog posts you've read recently

<script>
// Show list of cached pages if possible
if ('caches' in window) {
  caches.open('jekyll-site-v1').then(cache => {
    cache.keys().then(requests => {
      const pageList = requests
        .filter(req => req.url.includes(location.origin) && !req.url.includes('assets'))
        .map(req => `<li><a href="${req.url}">${req.url.replace(location.origin, '')}</a></li>`)
        .join('');
      
      if (pageList) {
        document.write(`
          <h3>Available Offline Pages:</h3>
          <ul>${pageList}</ul>
        `);
      }
    });
  });
}
</script>