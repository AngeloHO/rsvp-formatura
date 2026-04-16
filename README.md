# 🎓 Sistema de Confirmação de Presença - Formatura

Sistema web para gerenciar confirmações de presença em evento de formatura, desenvolvido com **Spring Boot** (backend) e **React** (frontend).

## 🚀 Tecnologias

### Backend
- **Java 17**
- **Spring Boot 4.0.5**
  - Spring Data JPA
  - Spring Web MVC
  - Spring Validation
- **PostgreSQL** (produção)
- **H2** (desenvolvimento/testes)
- **Maven**

### Frontend
- **React 19**
- **Vite 8**
- **Bootstrap 5.3**
- **React Bootstrap**
- **Axios**

## 📁 Estrutura do Projeto

```
rsvp-formatura/
├── src/
│   ├── main/
│   │   ├── java/angelo/example/rsvp_formatura/
│   │   │   ├── config/          # Configurações (CORS, etc)
│   │   │   ├── controller/      # Controllers REST
│   │   │   ├── model/           # Entidades JPA
│   │   │   ├── repository/      # Repositórios Spring Data
│   │   │   └── service/         # Lógica de negócio
│   │   └── resources/
│   │       ├── application.properties
│   │       └── static/          # Build do frontend (gerado automaticamente)
│   └── test/                    # Testes unitários
├── frontend/
│   ├── src/
│   │   ├── components/          # Componentes React
│   │   ├── services/            # API client (Axios)
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
├── pom.xml
├── render.yaml                  # Configuração de deploy
└── Dockerfile
```

## 🛠️ Configuração Local

### Pré-requisitos
- Java 17+
- Node.js 18+
- PostgreSQL 14+ (opcional - pode usar H2)
- Maven 3.9+

### 1. Clonar o Repositório
```bash
git clone <url-do-repositorio>
cd rsvp-formatura
```

### 2. Configurar Backend

#### Opção A: Usando PostgreSQL Local
Edite `src/main/resources/application.properties`:
```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/festa_formatura
spring.datasource.username=seu_usuario
spring.datasource.password=sua_senha
```

#### Opção B: Usando H2 (em memória)
Adicione no `application.properties`:
```properties
spring.datasource.url=jdbc:h2:mem:testdb
spring.jpa.database-platform=org.hibernate.dialect.H2Dialect
```

### 3. Instalar Dependências do Frontend
```bash
cd frontend
npm install
```

### 4. Executar em Modo Desenvolvimento

#### Terminal 1 - Backend (Spring Boot)
```bash
./mvnw spring-boot:run
# Servidor rodando em http://localhost:8080
```

#### Terminal 2 - Frontend (Vite)
```bash
cd frontend
npm run dev
# Servidor rodando em http://localhost:5173
```

Acesse: **http://localhost:5173**

## 📦 Build para Produção

### Build Completo (Backend + Frontend)
```bash
# 1. Build do frontend
cd frontend
npm install
npm run build

# 2. Copiar build para resources/static
cd ..
mkdir -p src/main/resources/static
cp -r frontend/dist/* src/main/resources/static/

# 3. Build do backend (inclui o frontend)
./mvnw clean package -DskipTests
```

O JAR gerado estará em: `target/rsvp-formatura-0.0.1-SNAPSHOT.jar`

## 🚢 Deploy no Render

O projeto está configurado para deploy automático no Render via `render.yaml`.

### Configuração Automática
1. Conecte o repositório GitHub ao Render
2. O Render executará automaticamente:
   - Build do frontend React (Vite)
   - Cópia dos arquivos para `src/main/resources/static/`
   - Build do backend Maven
   - Deploy do JAR

### Variáveis de Ambiente no Render
O banco de dados PostgreSQL é configurado automaticamente:
- `DATABASE_URL`
- `DB_USERNAME`
- `DB_PASSWORD`

### Troubleshooting - Erro 404

Se você receber **Whitelabel Error Page** ou **404** após o deploy:

1. **Verifique os logs de build** no Render:
   - Procure por "=== Iniciando build do frontend ==="
   - Verifique se os arquivos foram copiados para `static/`
   - Confirme que o Maven finalizou com sucesso

2. **Arquivos necessários**:
   - `src/main/resources/static/index.html` deve existir no JAR
   - `WebConfig.java` deve estar presente para roteamento SPA

3. **Se o problema persistir**, force um novo deploy:
   ```bash
   git commit --allow-empty -m "Force rebuild"
   git push
   ```

## 🔌 API Endpoints

### Convidados
- `POST /api/convidados` - Confirmar presença
- `GET /api/convidados` - Listar todos os convidados
- `GET /api/convidados/estatisticas` - Estatísticas do evento
- `GET /api/convidados/resumo` - Resumo detalhado

### Exemplo de Request
```json
POST /api/convidados
{
  "nome": "João",
  "sobrenome": "Silva",
  "email": "joao@email.com",
  "telefone": "(11) 99999-9999",
  "presencaConfirmada": "S",
  "sexo": "M",
  "acompanhantes": [
    {
      "nome": "Maria Silva",
      "sexo": "F",
      "idade": 25
    }
  ]
}
```

## 🗃️ Modelo de Dados

### Convidado
- `id` (Long)
- `nome` (String, obrigatório)
- `sobrenome` (String, obrigatório)
- `email` (String, único)
- `telefone` (String)
- `presencaConfirmada` (String: 'S' ou 'N')
- `sexo` (String: 'M', 'F', 'O')
- `acompanhantes` (List<Acompanhante>)

### Acompanhante
- `id` (Long)
- `nome` (String, obrigatório)
- `sobrenome` (String)
- `sexo` (String: 'M', 'F', 'O')
- `idade` (Integer)
- `convidado_id` (FK)

## 🧪 Testes

```bash
# Executar testes
./mvnw test

# Executar com cobertura
./mvnw test jacoco:report
```

## 📝 Funcionalidades

- ✅ Confirmação de presença (sim/não)
- ✅ Cadastro de dados do convidado
- ✅ Adição de acompanhantes
- ✅ Classificação automática (adulto/criança)
- ✅ Validação de email único
- ✅ Estatísticas em tempo real
- ✅ Contagem de convidados/adultos/crianças
- ✅ Interface responsiva (Bootstrap)
- ✅ Animações e feedback visual

## 🔒 Segurança

### Validação e Sanitização de Dados

#### Backend (Bean Validation)
- ✅ **SQL Injection** - Protegido via JPA/Hibernate (prepared statements)
- ✅ **Validação de campos obrigatórios** - `@NotBlank` em campos essenciais
- ✅ **Validação de email** - `@Email` com formato RFC compliant
- ✅ **Validação de tamanho** - `@Size` em todos os campos de texto
- ✅ **Validação de padrões** - `@Pattern` para:
  - Nomes: apenas letras, espaços, hífens e apóstrofos
  - Telefone: apenas números, parênteses, espaços e hífens
  - Email: máximo 255 caracteres
- ✅ **Validação de valores permitidos**:
  - `presencaConfirmada`: apenas 'S' ou 'N'
  - `sexo`: apenas 'M', 'F' ou 'O'
- ✅ **Validação de idade** - `@Min(0)` e `@Max(150)`
- ✅ **Validação em cascata** - `@Valid` valida acompanhantes automaticamente

#### Frontend (HTML5 + React)
- ✅ **Validação HTML5** - `required`, `type="email"`, `pattern`, `maxLength`
- ✅ **Limitação de entrada** - Campos com tamanho máximo definido
- ✅ **Validação de idade** - Input numérico com `min="0"` e `max="150"`
- ✅ **Prevenção de valores inválidos** - Selects e radios limitam opções
- ✅ **Feedback visual** - Mensagens de erro claras do backend

#### Limites de Tamanho
| Campo | Tamanho Máximo |
|-------|----------------|
| Nome/Sobrenome (Convidado) | 100 caracteres |
| Nome (Acompanhante) | 200 caracteres |
| Sobrenome (Acompanhante) | 100 caracteres |
| Email | 255 caracteres |
| Telefone | 20 caracteres |
| Presença confirmada | 1 caractere (S/N) |
| Sexo | 1 caractere (M/F/O) |
| Idade | 0-150 anos |

### Proteções Implementadas
- **XSS (Cross-Site Scripting)** - Validação de padrões impede scripts
- **SQL Injection** - JPA/Hibernate com queries parametrizadas
- **CORS** - Configurado para origens específicas
- **Input Validation** - Camada dupla (frontend + backend)
- **Email único** - Validação de duplicidade no banco

### Boas Práticas
- Validação sempre no backend (nunca confiar apenas no frontend)
- Mensagens de erro genéricas para não expor detalhes do sistema
- Logs de erro no console do servidor para debugging
- Tratamento de exceções centralizado no controller

## 🤝 Contribuindo

1. Faça fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona MinhaFeature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT.

## 👨‍💻 Autor

Angelo - [GitHub](https://github.com/seu-usuario)

---

**Desenvolvido com ❤️ para celebrar momentos especiais**
