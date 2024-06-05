# Set base image
FROM node:18

# Create work directory
WORKDIR /app

COPY ./backend ./
#COPY ./frontend/build ./client/

RUN npm install --only=production

# Start the server
CMD ["npm", "start"]