# Configuração de Variáveis de Ambiente

## Desenvolvimento Local

1. Copie o arquivo `.env.example` para `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. O arquivo `.env.local` já está configurado para usar `http://localhost:8080/api`

3. Inicie o backend (na raiz do projeto):
   ```bash
   ./mvnw spring-boot:run
   ```

4. Inicie o frontend:
   ```bash
   npm run dev
   ```

## Produção (Render)

A variável `VITE_API_URL` é configurada automaticamente no `render.yaml` com o valor `/api` (URL relativa).

Isso permite que o frontend faça requisições para o mesmo domínio onde está hospedado.

### Importante

- Em **desenvolvimento**: usa `http://localhost:8080/api` (configurado no `.env.local`)
- Em **produção**: usa `/api` (URL relativa configurada no Render)

## Rebuild no Render

Após fazer o commit dessas alterações, faça um novo deploy no Render para aplicar as correções:

```bash
git add .
git commit -m "fix: corrigir configuração de API e validação de regex"
git push
```

O Render fará automaticamente um novo build com as variáveis de ambiente corretas.
