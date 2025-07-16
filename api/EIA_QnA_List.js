const axios = require('axios');
const xml2js = require('xml2js');

module.exports = async (req, res) => {
  const { keyword } = req.query;
  const serviceKey = encodeURIComponent(process.env.SERVICE_KEY);

  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const dd = String(today.getDate()).padStart(2, '0');
  const regTo = `${yyyy}${mm}${dd}`;

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
    const response = await axios.get(url);
    const parser = new xml2js.Parser();
    const parsed = await parser.parseStringPromise(response.data);
    res.status(200).json(parsed);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
