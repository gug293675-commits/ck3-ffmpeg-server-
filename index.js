import express from 'express';
import cors from 'cors';
import { exec } from 'child_process';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('CK 3.0 FFmpeg Server is Live and Ready!');
});

app.post('/api/advanced-render', (req, res) => {
  const { videoPath, audioPath, logoPath, subtitlePath, outputPath, speed = 1.0, quality = '720p' } = req.body;

  let scale = quality === '1080p' ? '1920:1080' : '1280:720';
  let pts = 1 / speed;

  // FFmpeg Command တိုက်ရိုက် ရေးဆွဲခြင်း
  let command = `ffmpeg -i "${videoPath}" `;
  if (logoPath) command += `-i "${logoPath}" `;
  command += `-i "${audioPath}" `;
  command += `-filter_complex "[0:v]setpts=${pts}*PTS,scale=${scale}[v]" `;
  command += `-map "[v]" -map 2:a:0 -c:v libx264 -preset fast -c:a aac "${outputPath}"`;

  exec(command, (error, stdout, stderr) => {
    if (error) {
      return res.status(500).json({ success: false, error: error.message });
    }
    res.json({ success: true, message: 'Render finished', outputPath });
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`FFmpeg Server running on port ${PORT}`));
