FROM node:18-slim

# FFmpeg ကို သွင်းယူခြင်း
RUN apt-get update && apt-get install -y ffmpeg && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package*.json ./
# RAM သက်သာစေသော Command ဖြင့် Package သွင်းခြင်း
RUN npm install --omit=dev --no-audit --no-fund

COPY . .

EXPOSE 3000
CMD ["npm", "start"]
