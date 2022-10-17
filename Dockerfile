# Pull latest official node image
FROM node:14

# Set working directory
WORKDIR /frontend

# Copy package files and install app dependencies
COPY ./oohub-fe/package.json /frontend
COPY ./oohub-fe/ /frontend

RUN npm install

# Expose ports
EXPOSE 3000

# Start the React app
CMD ["npm", "start"]