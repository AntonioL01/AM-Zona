exports.handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Content-Type': 'application/json',
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  try {
    const appId = process.env.SENDBIRD_APP_ID;
    const apiToken = process.env.SENDBIRD_API_TOKEN;

    if (!appId || !apiToken) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: 'Nedostaje Sendbird konfiguracija' }),
      };
    }

    const { userId, nickname, profileUrl } = JSON.parse(event.body || '{}');

    if (!userId) {
      return { statusCode: 400, headers, body: JSON.stringify({ error: 'userId je obavezan' }) };
    }

    const sendbirdBaseUrl = `https://api-${appId}.sendbird.com/v3`;
    const userHeaders = { 'Api-Token': apiToken, 'Content-Type': 'application/json' };

    const provjeriResponse = await fetch(`${sendbirdBaseUrl}/users/${encodeURIComponent(userId)}`, {
      method: 'GET',
      headers: userHeaders,
    });

    let user;

    if (provjeriResponse.ok) {
      const azurirajResponse = await fetch(`${sendbirdBaseUrl}/users/${encodeURIComponent(userId)}`, {
        method: 'PUT',
        headers: userHeaders,
        body: JSON.stringify({ nickname: nickname || userId, profile_url: profileUrl || '', issue_session_token: true }),
      });

      if (!azurirajResponse.ok) {
        throw new Error(`Neuspjelo ažuriranje korisnika: ${azurirajResponse.status}`);
      }
      user = await azurirajResponse.json();

    } else if (provjeriResponse.status === 404) {
      const kreirajResponse = await fetch(`${sendbirdBaseUrl}/users`, {
        method: 'POST',
        headers: userHeaders,
        body: JSON.stringify({ user_id: userId, nickname: nickname || userId, profile_url: profileUrl || '', issue_session_token: true }),
      });

      if (!kreirajResponse.ok) {
        throw new Error(`Neuspjelo kreiranje korisnika: ${kreirajResponse.status}`);
      }
      user = await kreirajResponse.json();

    } else {
      throw new Error(`Greška pri provjeri korisnika: ${provjeriResponse.status}`);
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        user: { user_id: user.user_id, nickname: user.nickname, session_token: user.session_token },
      }),
    };

  } catch (error) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Greška servera', message: error.message }),
    };
  }
};
