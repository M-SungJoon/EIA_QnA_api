const axios = require('axios');

// Vercel용 API 라우트 핸들러
module.exports = async (req, res) => {
  const { keyword } = req.query;
  const serviceKey = encodeURIComponent(process.env.SERVICE_KEY);

  // 오늘 날짜 (YYYYMMDD)
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const dd = String(today.getDate()).padStart(2, '0');
  const regTo = `${yyyy}${mm}${dd}`;

  // 요청 파라미터 구성
  const params = [
    `serviceKey=${serviceKey}`,
    `firstIndex=1`,
    `recordCountPerPage=50`,
    `type=3`,
    `regFrom=20200101`,
    `regTo=${regTo}`
  ];
  if (keyword) {
    params.push(`keyword=${encodeURIComponent(keyword)}`);
  }

  const url = `http://apis.data.go.kr/1140100/CivilPolicyQnaService/PolicyQnaList?${params.join('&')}`;

  try {
      const response = await axios.get(url, {
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/115.0.0.0 Safari/537.36',
        'Accept-Language': 'ko-KR,ko;q=0.9',
        'Connection': 'keep-alive'
      }
    });
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
