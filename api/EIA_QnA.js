// Vercel에서 자동 인식되는 함수형 구조
const axios = require('axios');

module.exports = async (req, res) => {
  const { searchword } = req.query;
  const serviceKey = encodeURIComponent(process.env.SERVICE_KEY); // URL 인코딩된 키

  const url = `http://apis.data.go.kr/1140100/minAnalsInfoView5/minSimilarInfo5?serviceKey=${serviceKey}&retCount=100&minScore=10&startPos=1&dataType=json&target=qna_origin${searchword ? `&searchword=${encodeURIComponent(searchword)}` : ''
  }`;

	try {
		const response = await axios.get(url);
		res.status(200).json(response.data); // 그냥 바로 응답
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};
