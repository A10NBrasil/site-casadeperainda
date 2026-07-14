# Casa de Perainda - Site de Investimento Premium

Site de apresentação de oportunidade de investimento na Casa de Perainda, hospedado na Netlify com design premium/minimalista, autenticação multi-senha e integração WhatsApp.

**Status:** ✅ Publicado e em produção  
**URL:** `a10n.com.br/casadeperainda`  
**Hosting:** Netlify (domínio principal: a10n.com.br com redirect)

## 🎯 Sobre o Site

Um site sofisticado e minimalista (inspirado em uxua.com) que apresenta a Casa de Perainda como oportunidade de investimento exclusiva. Inclui:

- **Seção Apresentação:** História e contexto da propriedade (8 anos em operação)
- **Timeline de Crescimento:** Evolução 2016-2024 com eventos-chave
- **Galeria de Acomodações:** 9 unidades (Casa Areia, Casa Concha, Casa Coral, Casa Mar, Casa Tartaruga, Suítes)
- **Diferenciais de Investimento:** 4 pilares estratégicos
- **Formulário de Agendamento:** Captura leads e redireciona para WhatsApp
- **Autenticação Restrita:** Apenas clientes selecionados conseguem acessar
- **Branding:** Cores corporativas (#0043a8 azul + #00a8d8 turquesa) + logo oficial

## 📁 Estrutura do Projeto

```
site-casadeperainda/
├── src/
│   └── public/
│       ├── index.html              # Página principal (premium design)
│       ├── login.html              # Página de login
│       ├── styles.css              # Estilos globais + responsivo
│       ├── gallery.js              # Script de galeria dinâmica
│       ├── logo.jpeg               # Logo Casa de Perainda
│       └── images/                 # Fotos das acomodações
│           ├── Casa Areia/
│           ├── Casa Concha/
│           ├── Casa Coral/
│           ├── Casa Mar/
│           ├── Casa Tartaruga/
│           ├── Suíte Ancora/
│           ├── Suíte Cavalo Marinho/
│           ├── Suíte Estrela do Mar/
│           └── Suíte Marimbá/
├── netlify/
│   ├── functions/
│   │   └── login.js                # Função de autenticação (Netlify Function)
│   └── edge-functions/
│       └── gate.js                 # Guard de proteção de rotas
├── clientes.json                   # Lista de clientes com permissão
├── netlify.toml                    # Configuração Netlify
├── package.json                    # Build scripts
└── README.md                       # Este arquivo
```

## 🚀 Setup Local

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
   http://localhost:8888/login  (página de autenticação)
   ```

4. **Testar login:**
   - Usuário: `beto`
   - Senha: número de celular de um cliente em `clientes.json`
   - Ex: `5511981034545` (Dazio Vasconcellos) ou `5511985241108` (Alexandre Bacelar)

## 🔐 Autenticação Multi-Senha

Sistema seguro que permite múltiplos clientes com credenciais diferentes:

- **Usuário fixo:** `beto`
- **Senha por cliente:** Número de celular do cliente (formato: `55` + DDD + número)
- **Validação:** Feita via Netlify Function (`netlify/functions/login.js`)
- **Sessão:** Cookie HMAC assinado, expira em 30 dias
- **Proteção:** Edge Function bloqueia acesso sem cookie válido

### 📋 Gerenciar Clientes

Editar `clientes.json` com a lista de clientes autorizados:

```json
{
  "clientes": [
    { "nome": "Dazio Vasconcellos", "celular": "5516981034545" },
    { "nome": "Alexandre Bacelar", "celular": "5511985241108" }
  ]
}
```

**Workflow para adicionar novo cliente:**
1. Editar `clientes.json` localmente
2. Fazer commit: `git add clientes.json && git commit -m "Add: novo cliente autorizado"`
3. Push: `git push origin master`
4. Netlify reconstrói e republica automaticamente (~2-3 min)

## 🖼️ Adicionar/Atualizar Fotos e Vídeos

**Fonte de referência:** `d:\08. Trancoso & Arraial\Perainda\Revisao Geral\`  
Arquivos já estão renomeados conforme convenção (Casa Areia 01, Casa Areia 02, etc.)

**Workflow:**
1. Copiar arquivos para `src/public/images/<Acomodacao>/` (fotos) ou `src/public/videos/<Acomodacao>/` (vídeos)
2. Manter nomenclatura existente: `Casa Areia 01.jpg`, `Suíte Ancora 02.mp4`, etc.
3. Otimizar mídia (comprimir imagens, reduzir resolução de vídeos se necessário)
4. Fazer commit: `git add src/public/images/ && git commit -m "Update: fotos Casa Areia"`
5. Push: `git push origin master`
6. Netlify reconstrói e republica automaticamente

**Nota:** Usar Git LFS para vídeos grandes (`.gitattributes` já configurado para `*.mp4`)

## 🚀 Deploy e Hosting

### Status Atual
✅ **Publicado em produção**
- Repositório: GitHub (site-casadeperainda)
- Hosting: Netlify (site Netlify dedicado)
- Domínio: `a10n.com.br/casadeperainda` (via redirect)

### Variáveis de Ambiente Netlify
```
AUTH_SECRET = perainda-secret-key-2024
```
(Chave HMAC para assinatura de cookies de sessão)

### Configuração do Redirect em a10n.com.br
No site principal a10n.com.br, arquivo `_redirects` contém:
```
/casadeperainda/*  https://<seu-site-netlify>.netlify.app/:splat  200
```

Isso garante que `a10n.com.br/casadeperainda` (e subrotas) sejam servidas pelo site Netlify sem aparecer a URL da Netlify na barra de endereço.

## 📅 Formulário de Agendamento

O formulário captura informações do potencial investidor:
- **Nome completo**
- **Email**
- **Telefone**
- **Horário preferido para contato**
- **Mensagem/interesse**

**Fluxo:**
1. Usuário preenche o formulário
2. Dados são capturados via Netlify Forms (visible no painel Netlify)
3. Navegador redireciona para WhatsApp com mensagem pré-formatada
4. Conversa manual acontece via WhatsApp

**WhatsApp:** +55 11 9 41814004  
(Adalberto Sanches - A10N Investimentos Imobiliários)

## 📊 Conteúdo Incluído

### Seção "Uma Propriedade Consolidada"
- 8 anos em operação (2016-2024)
- Hotel + Pousada em Trancoso, Bahia
- 9 acomodações distintas
- Histórico de ocupação comprovado

### Timeline de Crescimento
- **2016:** Abertura em junho
- **2017:** Consolidação operacional
- **2018:** Reformas e expansão
- **2019:** Estabilização
- **2020:** COVID-19 (fechamento março-julho)
- **2021:** Novo gerente, sem paradas de manutenção
- **2022:** Boom do turismo
- **2023-2024:** Normalização do mercado

### Diferenciais de Investimento
1. **Experiência Única** — Hospedagem diferenciada e ocupação constante
2. **Modelo Escalável** — Estrutura pronta para crescimento
3. **Gestão Profissional** — Equipes treinadas e processos consolidados
4. **Segurança Jurídica** — Documentação completa

## 👤 Profissional Responsável

**Adalberto Sanches**  
CRECI: 25330  
A10N Investimentos Imobiliários  
Email: adalberto.sanches@hotmail.com  

---

## 🛠️ Desenvolvimento e Manutenção

### Stack Técnico
- **Frontend:** HTML5 + CSS3 (Flexbox/Grid) + JavaScript vanilla
- **Backend:** Netlify Functions (Node.js) + Edge Functions
- **Autenticação:** Cookie HMAC + Netlify Edge Function
- **Banco de dados:** JSON estático (`clientes.json`)
- **Formulários:** Netlify Forms (sem backend adicional)
- **Hosting:** Netlify (Git-driven deployment)

### Notas Técnicas
- Cookie de sessão expira em 30 dias
- Todas as rotas (exceto `/login`) são protegidas por Edge Function
- Edge Function checa assinatura HMAC antes de servir conteúdo
- Design totalmente responsivo (mobile-first)
- Performance otimizada para navegador (CSS crítico inline, images otimizadas)

### Próximas Melhorias (Opcional)
- [ ] Adicionar mais acomodações à galeria conforme fotos forem disponibilizadas
- [ ] Integrar analytics (Google Analytics / Plausible) para rastrear engajamento
- [ ] Adicionar chatbot de WhatsApp para atendimento automático inicial
- [ ] Criar versão em inglês para investidores internacionais
- [ ] Implementar sistema de testimonials de clientes investidores
- [ ] Adicionar vídeo 360° ou tour virtual das acomodações
