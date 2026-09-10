const { getStore } = require('@netlify/blobs');

exports.handler = async (event) => {
  const store = getStore('lectura-tele');

  if (event.httpMethod === 'GET') {
    const value = await store.get('state', { type: 'json' });
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(value || null),
    };
  }

  if (event.httpMethod === 'POST') {
    let body;
    try {
      body = JSON.parse(event.body || '{}');
    } catch (e) {
      return { statusCode: 400, body: 'JSON inválido' };
    }
    await store.setJSON('state', body);
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ok: true }),
    };
  }

  return { statusCode: 405, body: 'Método no permitido' };
};
