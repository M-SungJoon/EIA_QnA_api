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
    `recordCountPerPage=20`,
    `regFrom=20200101`,
    `regTo=${regTo}`
  ];
  if (keyword) {
    params.push(`keyword=${encodeURIComponent(keyword)}`);
  }

  const url = `http://apis.data.go.kr/1140100/CivilPolicyQnaService/PolicyQnaList?${params.join('&')}`;

  try {
    const response = await axios.get(url);  // 응답은 JSON이라고 가정
    res.status(200).json(response.data);   // XML 파싱 불필요
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
