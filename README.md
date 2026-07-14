# Casa de Perainda - Site de Investimento

Site de apresentação de oportunidade de investimento na Casa de Perainda, hospedado na Netlify com autenticação multi-senha.

## Estrutura do Projeto

```
site-casadeperainda/
├── src/
│   └── public/
│       ├── index.html          # Página principal
│       ├── login.html          # Página de login
│       ├── styles.css          # Estilos globais
│       └── gallery.js          # Script da galeria
├── netlify/
│   ├── functions/
│   │   └── login.js            # Função de autenticação
│   └── edge-functions/
│       └── gate.js             # Guard de proteção
├── clientes.json               # Lista de clientes com permissão
├── netlify.toml                # Configuração Netlify
├── package.json
└── README.md
```

## Setup Local

1. **Instalar dependências:**
   ```bash
   npm install
   ```

2. **Executar localmente:**
   ```bash
   npm run dev
   ```

3. **Acessar:**
   ```
   http://localhost:8888
   ```

## Autenticação

- **Usuário:** `beto` (fixo)
- **Senha:** número de celular do cliente (ex: `5511999999999`)
- **Válidos em:** `clientes.json`

### Gerenciar Clientes

Editar `clientes.json` e adicionar números de celular:

```json
{
  "clientes": [
    { "nome": "Cliente 1", "celular": "5511999999999" },
    { "nome": "Cliente 2", "celular": "5521999999999" }
  ]
}
```

Após editar, fazer commit e push para republicar na Netlify.

## Adicionar Fotos/Vídeos

1. Copiar arquivos de `d:\08. Trancoso & Arraial\Perainda\Revisao Geral\` para:
   - Fotos: `src/public/images/<Acomodacao>/`
   - Vídeos: `src/public/videos/<Acomodacao>/`

2. Seguir nomenclatura: `Casa Areia 01.jpg`, `Casa Areia 02.mp4`, etc.

3. Fazer commit e push para republicar.

## Deploy na Netlify

1. Conectar repositório Git ao Netlify
2. Configurar variável de ambiente:
   ```
   AUTH_SECRET = perainda-secret-key (mudar em produção)
   ```
3. Netlify detecta `netlify.toml` e faz deploy automático

## Agendamento

- Formulário captura dados (nome, email, telefone, horário)
- Ao enviar, redireciona para WhatsApp com mensagem pré-formatada
- WhatsApp: +55 11 941814004

## Notas

- Cookie de sessão expira em 30 dias
- Todas as solicitações para `/` (exceto `/login`) são protegidas
- Netlify Edge Function checa cookie antes de servir página

## Contato

Para atualizar clientes, WhatsApp, ou conteúdo, editar arquivos correspondentes e fazer commit.
