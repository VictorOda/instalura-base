import { setCookie } from 'nookies';

async function HttpClient(url, { headers, body, ...options }) {
  return fetch(url, {
    headers: {
      ...headers,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
    ...options,
  })
    .then((respostaDoServidor) => {
      if (respostaDoServidor.ok) {
        return respostaDoServidor.json();
      }

      throw new Error('Falha em pegar os dados do servidor');
    });
}

export const loginService = {
  async login({ username, password }) {
    return HttpClient('https://instalura-api.omariosouto.vercel.app/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
      }),
    })
      .then((respostaConvertida) => {
        const { token } = respostaConvertida.data;
        const DAY_IN_SECONDS = 86400;

        // Salvar o Token
        setCookie(null, 'APP_TOKEN', token, {
          path: '/',
          maxAge: DAY_IN_SECONDS * 7,
        });

        // Escrever os testes
        return {
          token,
        };
      });
  },
};
