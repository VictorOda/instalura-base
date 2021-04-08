export default function handler(req, res) {
  res.setPreviewData({});

  const key = 'LEPA';

  if (req.query.key !== key) {
    return res.status(401).json({ message: 'Invalid Key' });
  }

  res.writeHead(307, { location: '/' });
  return res.end();
}
