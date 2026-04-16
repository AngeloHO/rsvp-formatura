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
   - Build do frontend React
   - Cópia dos arquivos para `static/`
   - Build do backend Maven
   - Deploy do JAR

### Variáveis de Ambiente no Render
O banco de dados PostgreSQL é configurado automaticamente:
- `DATABASE_URL`
- `DB_USERNAME`
- `DB_PASSWORD`

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

- Validação de dados no backend (Bean Validation)
- CORS configurado
- Proteção contra SQL Injection (JPA/Hibernate)
- Sanitização de entradas

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
