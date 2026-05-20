import { Router } from 'express';
import axios from 'axios';

const router = Router();

router.post('/', async (req, res) => {
  try {
    const { image } = req.body;

    if (!image) {
      return res.status(400).json({
        message: 'Image required',
      });
    }

    const response = await axios.post(
      'https://router.huggingface.co/v1/chat/completions',
      {
        model: 'google/gemma-4-31B-it',

        temperature: 0,

        messages: [
          {
            role: 'user',

            content: [
              {
                type: 'text',

                text: `
Kamu adalah AI ahli penyakit tanaman sawit.

Analisa gambar tanaman ini.

Jawab WAJIB dengan format berikut:

PENYAKIT:
...

SEVERITY:
...(isi dengan ringan/sedang/berat)

SOLUSI:
- ...
- ...
- ...

CONFIDENCE:
...%

Gunakan bahasa Indonesia.
Jangan menjelaskan proses berpikirmu.
`,
              },

              {
                type: 'image_url',

                image_url: {
                  url: image,
                },
              },
            ],
          },
        ],

        max_tokens: 260,
      },

      {
        headers: {
          Authorization: `Bearer ${process.env.HF_TOKEN}`,
          'Content-Type': 'application/json',
        },
      },
    );

    const message = response.data.choices[0].message;

    const result = message.content || message.reasoning || message.reasoning_content || 'Tidak ada hasil analisa';

    res.json({
      result,
    });
  } catch (error: any) {
    console.log(error.response?.data || error.message);

    res.status(500).json({
      message: 'AI analysis failed',
    });
  }
});

export default router;
