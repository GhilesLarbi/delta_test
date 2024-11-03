FROM node:18
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install -g nodemon
RUN npm install --verbose
COPY . .
EXPOSE 5000
CMD ["npm", "run", "mon"]