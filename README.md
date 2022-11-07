## Steps to deploy the application

#### Front End

1. Clone the repository's front end folder "frontend" into any machine having node.js installed on it.
2. Open the terminal in the folder "frontend/blind".
3. Execute "npm install" to install all the dependencies.
4. Update the Config.js file in client/src folder with the backend server's IP address and port.
5. Execute "npm start" to run the front end server.

#### Backend

1. Clone the repository's front end folder "backend" into any machine having node.js installed on it.
2. Open the terminal in the folder "backend".
3. Update MongoDB information in "backend/utils/database.js". 
4. Update Redis Server information "backend/routes/profile.js".
5. Execute "npm install" to install all the dependencies.
6. Update the index.js file in server folder with frontend server's IP address and port.
7. Execute "node index" to run the backend server.

#### Launch the application

1. Open the browser and navigate to Front end server's IP address with Port number (Eg: 127.0.0.1:3000) to find the landing page.


## Document Link

https://docs.google.com/document/d/1db5svEMa2VW5Pedk_4Q8lOx74LC39ZqNn96ukVnbwCI/edit?usp=sharing
