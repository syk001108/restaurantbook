const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

const KAKAO_API_KEY = 'c3930d28b795370c1c656c7c9dbe8c27'; // 실제 API 키로 대체

app.use(cors());  // CORS 설정

app.get('/search', async (req, res) => {
  const { lat, lng, radius } = req.query;

  try {
    const response = await axios.get('https://dapi.kakao.com/v2/local/search/category.json', {
      headers: { Authorization: `KakaoAK ${KAKAO_API_KEY}` },
      params: {
        category_group_code: 'FD6', // 음식점 카테고리 코드
        x: lng,
        y: lat,
        radius: radius,
        sort: 'distance'
      },
    });
    res.json(response.data.documents);
  } catch (error) {
    res.status(500).json({ error: '검색 중 오류가 발생했습니다.' });
  }
});

app.listen(PORT, () => {
  console.log(`서버가 http://localhost:${PORT}에서 실행 중입니다.`);
});
