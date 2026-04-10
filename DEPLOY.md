# 🚀 Deploy no Render - Passo a Passo

## 📋 Pré-requisitos
- Conta no GitHub
- Conta no Render (gratuita)

---

## 1️⃣ SUBIR CÓDIGO NO GITHUB

### Opção A: Usando Git Bash ou Terminal

```bash
# 1. Navegar até a pasta do projeto
cd c:\Users\Angelo\Desktop\dev\rsvp-formatura

# 2. Inicializar repositório Git (se ainda não fez)
git init

# 3. Adicionar todos os arquivos
git add .

# 4. Fazer o commit
git commit -m "Deploy inicial - Sistema RSVP Formatura"

# 5. Criar repositório no GitHub
# Acesse: https://github.com/new
# Nome: rsvp-formatura
# Deixe PÚBLICO
# NÃO marque nenhuma opção (README, .gitignore, etc)

# 6. Conectar ao repositório remoto (substitua SEU_USUARIO)
git remote add origin https://github.com/SEU_USUARIO/rsvp-formatura.git

# 7. Subir código
git branch -M main
git push -u origin main
```

### Opção B: Usando GitHub Desktop
1. Baixe [GitHub Desktop](https://desktop.github.com/)
2. File → Add Local Repository → Escolha a pasta do projeto
3. Publish repository → Marque como público
4. Commit e Push

---

## 2️⃣ CRIAR CONTA NO RENDER

1. Acesse [render.com](https://render.com)
2. Clique em **"Get Started for Free"**
3. Faça login com GitHub
4. Autorize o Render a acessar seus repositórios

---

## 3️⃣ CRIAR BANCO DE DADOS POSTGRESQL

1. No Dashboard do Render, clique em **"New +"**
2. Selecione **"PostgreSQL"**
3. Configurações:
   - **Name:** `rsvp-db`
   - **Database:** `festa_formatura`
   - **User:** `festa_user`
   - **Region:** Escolha a mais próxima (US East geralmente)
   - **PostgreSQL Version:** 15 ou superior
   - **Plan:** Free
4. Clique em **"Create Database"**
5. ⏳ Aguarde ~2 minutos para criar
6. **IMPORTANTE:** Copie e salve em um bloco de notas:
   - Internal Database URL
   - External Database URL (caso queira conectar localmente)

---

## 4️⃣ CRIAR WEB SERVICE (APLICAÇÃO)

1. No Dashboard, clique em **"New +"** novamente
2. Selecione **"Web Service"**
3. Conecte seu repositório GitHub `rsvp-formatura`
4. Configurações:

   **Basic Info:**
   - **Name:** `rsvp-formatura`
   - **Region:** Same as database (mesma do banco)
   - **Branch:** `main`
   - **Root Directory:** (deixe vazio)
   
   **Build & Deploy:**
   - **Runtime:** `Java`
   - **Build Command:** `./mvnw clean package -DskipTests`
   - **Start Command:** `java -jar target/rsvp-formatura-0.0.1-SNAPSHOT.jar`
   
   **Plan:**
   - Selecione **Free**

5. **ANTES DE CRIAR**, clique em **"Advanced"**

6. **Environment Variables** - Adicione 3 variáveis:

   ```
   DATABASE_URL
   Value: [Cole aqui a "Internal Database URL" que você copiou]
   
   DB_USERNAME
   Value: festa_user
   
   DB_PASSWORD
   Value: [A senha está na página do banco, em "Password"]
   ```

7. Clique em **"Create Web Service"**

---

## 5️⃣ AGUARDAR DEPLOY

- ⏳ O primeiro deploy leva ~5-10 minutos
- Acompanhe os logs em tempo real
- Quando aparecer "Your service is live 🎉", está pronto!
- Copie a URL: `https://rsvp-formatura.onrender.com`

---

## 6️⃣ TESTAR APLICAÇÃO

1. Acesse a URL gerada
2. Teste o formulário de confirmação
3. Verifique se está salvando os dados

---

## ⚠️ IMPORTANTE - LIMITAÇÕES DO PLANO FREE

- ❌ App "dorme" após 15 minutos de inatividade
- ❌ Primeiro acesso após "dormir" demora ~1 minuto para acordar
- ✅ Após acordar, funciona normalmente
- ✅ Banco de dados PostgreSQL é permanente (não perde dados)
- ✅ 750 horas/mês gratuitas (suficiente para uso pessoal)

---

## 🔄 COMO ATUALIZAR A APLICAÇÃO

Sempre que fizer mudanças no código:

```bash
git add .
git commit -m "Descrição da mudança"
git push
```

O Render detecta automaticamente e faz deploy automático! 🎉

---

## 🆘 PROBLEMAS COMUNS

### Erro: "Build failed"
- Verifique se o Java 17 está configurado
- Confira se `./mvnw` tem permissão de execução

### Erro: "Application failed to start"
- Verifique as variáveis de ambiente
- Confira se a DATABASE_URL está correta

### App muito lento no primeiro acesso
- Normal! É o "acordar" do sleep mode
- Considere pagar $7/mês para manter sempre ativo

---

## 📞 COMPARTILHAR COM OS CONVIDADOS

Depois do deploy, compartilhe:
- Link direto: `https://rsvp-formatura.onrender.com`
- QR Code: Gere em [qr-code-generator.com](https://www.qr-code-generator.com/)

---

## 💡 DICAS

1. **Domínio próprio (opcional):**
   - Render permite conectar domínio próprio gratuitamente
   - Ex: `formatura.seunome.com.br`

2. **Monitoramento:**
   - Render envia emails se a app cair
   - Dashboard mostra logs em tempo real

3. **SSL/HTTPS:**
   - Render fornece SSL automático e gratuito
   - Seu site será `https://` automaticamente

Boa sorte com o deploy! 🚀
