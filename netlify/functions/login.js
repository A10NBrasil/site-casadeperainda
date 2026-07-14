const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const SECRET = process.env.AUTH_SECRET || 'perainda-secret-key-change-in-prod';

function generateSignature(data, secret) {
  return crypto
    .createHmac('sha256', secret)
    .update(JSON.stringify(data))
    .digest('hex');
}

function validateClientPassword(celular, clientesData) {
  if (!clientesData.clientes) return false;
  return clientesData.clientes.some(
    (cliente) => cliente.celular === celular.replace(/\D/g, '')
  );
}

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ erro: 'Método não permitido' }),
    };
  }

  try {
    const { usuario, senha } = JSON.parse(event.body);

    if (usuario !== 'beto') {
      return {
        statusCode: 401,
        body: JSON.stringify({ erro: 'Usuário inválido' }),
      };
    }

    // Carregar dados de clientes
    const clientesPath = path.join(__dirname, '../../clientes.json');
    const clientesData = JSON.parse(fs.readFileSync(clientesPath, 'utf-8'));

    if (!validateClientPassword(senha, clientesData)) {
      return {
        statusCode: 401,
        body: JSON.stringify({ erro: 'Senha inválida' }),
      };
    }

    // Gerar cookie assinado
    const sessionData = {
      usuario,
      timestamp: Date.now(),
      expires: Date.now() + 30 * 24 * 60 * 60 * 1000, // 30 dias
    };

    const signature = generateSignature(sessionData, SECRET);
    const cookieValue = Buffer.from(JSON.stringify(sessionData)).toString('base64');

    return {
      statusCode: 200,
      headers: {
        'Set-Cookie': `auth-session=${cookieValue}.${signature}; Path=/; HttpOnly; SameSite=Strict; Max-Age=${30 * 24 * 60 * 60}`,
      },
      body: JSON.stringify({ sucesso: true, redirect: '/' }),
    };
  } catch (erro) {
    console.error('Erro no login:', erro);
    return {
      statusCode: 500,
      body: JSON.stringify({ erro: 'Erro no servidor' }),
    };
  }
};
