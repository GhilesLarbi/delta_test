FROM node:18
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install --verbose
COPY . .
EXPOSE 3000
CMD ["npm", "run", "dev"]