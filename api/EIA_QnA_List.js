const axios = require('axios');

module.exports = async (req, res) => {
  try {
    const { keyword } = req.query;

    // 로컬 개발용 API 키 (환경변수 대신 직접 입력)
    const serviceKey = process.env.SERVICE_KEY; // URL 인코딩된 키

    // 오늘 날짜 (YYYYMMDD)
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    const regTo = `${yyyy}${mm}${dd}`;

    // 쿼리 파라미터 구성 (axios가 자동으로 URI 인코딩 처리)
    const params = {
      serviceKey,
      firstIndex: 1,
      recordCountPerPage: 50,
      type: 2,
      regFrom: '20200101',
      regTo,
      ...(keyword && { keyword })
    };

    // HTTPS 엔드포인트 사용
    const url =
      'https://apis.data.go.kr/1140100/CivilPolicyQnaService/PolicyQnaList';

    // API 호출
    const response = await axios.get(url, {
      params,
      headers: {
        Accept: 'application/json, text/plain, */*',
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/115.0.0.0 Safari/537.36',
        'Accept-Language': 'ko-KR,ko;q=0.9',
        Connection: 'keep-alive'
      }
    });

    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
