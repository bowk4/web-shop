# E-commerce Shop

## Git

Use [Semantic Commit Messages](https://gist.github.com/joshbuchea/6f47e86d2510bce28f8e7f42ae84c716).

You can find this article useful as well: [Understanding Semantic Commit Messages Using Git and Angular](https://nitayneeman.com/posts/understanding-semantic-commit-messages-using-git-and-angular/).

## Frontend

Click the link to see the app online: [E-commerce Shop](https://mern-b6d37.web.app/)

The frontend was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run test:ci`

Runs tests with coverage.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.

### ESLint configuration 

Instructions at:
* [Activate and configure ESLint in WebStorm](https://www.jetbrains.com/help/webstorm/eslint.html#ws_js_eslint_activate).
* [Activate and configure ESLint in VS Code](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint).

### Running Lighthouse locally

`npm i -g lighthouse` (one time command)

* Start frontend locally 
* `lighthouse --chrome-flags="--headless --no-sandbox" "http://localhost:3000" --output html --output-path ./report.html`

### Deployment

The frontend is deployed to [Firebase Hosting](https://firebase.google.com/docs/hosting?authuser=0).

## Backend

Click the link to see the backend online: [E-commerce Shop API Endpoint](https://gitlab-54605479-main-mw6dog77dq-uc.a.run.app/api/configs)

The backend is a vanilla Node.js server.

### Running locally

To run the backend locally together with mongoDB, you need to have Docker installed. Then, from the project root, you can run the following command:

```bash

docker-compose up

```

### Deployment

The code is packaged into a Docker container and deployed to [Google Cloud Run](https://cloud.google.com/run).

