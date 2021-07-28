# Accenture Frontend Challange
### To run the app with React scripts
1. Execute `npm install` in the root folder of the challenge.
2. Execute `npm start` to host the React application on http://localhost:3000.

### To run the app with Dockerfile
1. Execute `docker build -t tuncakin/accenture-frontend-challange .`   
2. Execute `docker run -d -it -p 80:80/tcp --name accenture-frontend-challange tuncakin/accenture-frontend-challange:latest`
3. React application will start on http://localhost

###File Structure
- **src/Components** -> Sibling components that create the application
- **src/Hooks** -> Custom hooks that we use in the project
- **src/App.css** -> Main styles of the application
- **src/App.js** -> Parent component that shares the state between children components
- **src/index.js** -> Entry point of the application
- **src/Utils.js** -> A simple regex for only allowing numbers and dash on text inputs

###References 
We used this question on stackoverflow for creating a rotation algorithm on our canvas element
https://stackoverflow.com/questions/65836588/rotating-an-image-without-canvasrenderingcontext2d-rotate
