/**
project overview
This is a RESTful API for managing tasks and users, built with Express.js, TypeScript, and Firebase. The API provides secure endpoints for creating, reading, updating, and deleting tasks, with user authentication and role-based access control.
The main purpose of this API is to help teams organize their work by providing a backend system where users can manage their tasks efficiently. It includes features like user authentication, task assignment, and administrative controls.
 
Installtion Instructions
npm install -D @redocly/cli - used to install redocly cli
npm install dotenv - used to install dotenv
npm install helmet -install the helmet
npm install cors - used to install cors

API request examples
Example: 1
OkHttpClient client = new OkHttpClient().newBuilder()
  .build();
MediaType mediaType = MediaType.parse("application/json");
RequestBody body = RequestBody.create(mediaType, "{\r\n    \"name\": \"john\"\r\n}");
Request request = new Request.Builder()
  .url("http://localhost:3000/api/v1/loans/")
  .method("GET", body)
  .addHeader("Content-Type", "application/json")
  .build();
Response response = client.newCall(request).execute();

Example2
OkHttpClient client = new OkHttpClient().newBuilder()
  .build();
MediaType mediaType = MediaType.parse("application/json");
RequestBody body = RequestBody.create(mediaType, "{\r\n    \"name\": \"john\"\r\n}");
Request request = new Request.Builder()
  .url("http://localhost:3000/api/v1/loans/2005/approve")
  .method("PUT", body)
  .addHeader("Content-Type", "application/json")
  .build();
Response response = client.newCall(request).execute();
 
Example3
OkHttpClient client = new OkHttpClient().newBuilder()
  .build();
MediaType mediaType = MediaType.parse("application/json");
RequestBody body = RequestBody.create(mediaType, "{\r\n    \"email\": \"jass@rrc.ca\",\r\n    \"password\": \"jassredriver\",\r\n    \"returnSecureToken\": true\r\n}");
Request request = new Request.Builder()
  .url("localhost:3000/api/v1/loans")
  .method("POST", body)
  .addHeader("Content-Type", "application/json")
  .addHeader("Authorization", "Bearer helllo")
  .build();
Response response = client.newCall(request).execute()

Link to public documentation:
https://rajandeep1.github.io/Assignment2BackEnd/

Local documentation access: npm run generate-docs

Security configuration document

For my API, I configured Helmet to improve security. I enabled xssFilter: true to protect against cross-site scripting attacks, which prevents malicious scripts from running in users’ browsers. I also set hsts with a maxAge of 3600 seconds so that browsers always use HTTPS for my API, keeping all data encrypted during transit. The noSniff: true option ensures browsers do not guess the content type, which adds another layer of security. For CORS, I only allow requests from trusted origins to prevent unauthorized websites from accessing my API. Finally, I manage sensitive information like API keys and database URLs using environment variables stored in a .env file, which I access in the code with process.env. This ensures secrets are not exposed in the code or committed to GitHub, making my API safer and easier to maintain.
 
