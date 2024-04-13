FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV REACT_APP_API_TOKEN=YOUR_TOKEN

RUN npm run build

EXPOSE 7070

CMD ["npm", "start"]

