import { promises as fs } from "fs";

// Define your redirect rules here
const redirects = [
  "/*    /index.html   200",
  // Add more redirect rules as needed
];

// Path to the _redirects file in the dist folder
const redirectsFilePath = "dist/_redirects";

// Generate _redirects content
const redirectsContent = redirects.join("\n");

// Write content to the _redirects file
fs.writeFile(redirectsFilePath, redirectsContent)
  .then(() => console.log("Generated _redirects file in the dist folder."))
  .catch((error) => console.error("Error generating _redirects file:", error));
