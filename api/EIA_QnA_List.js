// Vercel에서 자동 인식되는 함수형 구조
const axios = require('axios');

module.exports = async (req, res) => {
  const { keyword } = req.query;
  const serviceKey = encodeURIComponent(process.env.SERVICE_KEY); // URL 인코딩된 키

  // 오늘 날짜를 yyyymmdd 형식으로 변환
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const dd = String(today.getDate()).padStart(2, '0');
  const regTo = `${yyyy}${mm}${dd}`;
	
  const url = `http://apis.data.go.kr/1140100/CivilPolicyQnaService/PolicyQnaList?serviceKey=${serviceKey}&firstIndex=1&recordCountPerPage=20&regFrom=20200101&regTo=${regTo}${keyword ? `&keyword=${encodeURIComponent(keyword)}` : ''
  }`;

	try {
		const response = await axios.get(url);
		res.status(200).json(response.data); // 그냥 바로 응답
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};
