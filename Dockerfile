FROM node:19
WORKDIR /usr/src/app
COPY package*.json ./
RUN --mount=type=secret,id=_env,dst=/etc/secrets/.env cat /etc/secrets/.env 
RUN npm install
COPY . .
EXPOSE 3000
CMD [ "npm","run", "start" ]