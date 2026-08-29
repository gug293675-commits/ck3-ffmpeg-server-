FROM node:18

# Cloud Server ပေါ်တွင် FFmpeg တိုက်ရိုက် သွင်းယူခြင်း
RUN apt-get update && apt-get install -y ffmpeg

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000
CMD ["npm", "start"]
