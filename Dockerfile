FROM node:19
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD [ "npm","run", "start" ]