#!/bin/sh

# Print all environment variables for debugging
echo "========================="
echo "ENVIRONMENT VARIABLES:"
env
echo "========================="

# Debugging message
echo "Generating env.js file with API_URL"

# Generate env.js with runtime environment variables
if [ -n "$API_URL" ]; then
  echo "API_URL is set to: $API_URL"
  echo "window.ENV = { API_URL: \"$API_URL\" };" > /usr/share/nginx/html/env.js
else
  echo "API_URL is not set, using default value: /api"
  echo "window.ENV = { API_URL: \"/api\" };" > /usr/share/nginx/html/env.js
fi

# Display the contents of the generated env.js file
echo "========================="
echo "CONTENTS OF env.js:"
cat /usr/share/nginx/html/env.js
echo "========================="

# Check if env.js exists and is accessible
if [ -f /usr/share/nginx/html/env.js ]; then
  echo "env.js file created successfully at /usr/share/nginx/html/env.js"
else
  echo "ERROR: Failed to create env.js file!"
fi

# Start nginx
echo "Starting nginx..."
exec nginx -g "daemon off;"
