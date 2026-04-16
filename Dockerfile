# Etapa 1: Build da aplicação
FROM maven:3.9-eclipse-temurin-17 AS build

# Instalar Node.js para build do frontend
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - && \
    apt-get install -y nodejs

WORKDIR /app

# Copiar arquivos do frontend
COPY frontend/package*.json ./frontend/
COPY frontend/ ./frontend/

# Build do frontend React
RUN cd frontend && \
    npm install && \
    npm run build && \
    cd ..

# Copiar código Java
COPY pom.xml .
COPY src ./src

# Copiar frontend buildado para resources/static
RUN mkdir -p src/main/resources/static && \
    cp -r frontend/dist/* src/main/resources/static/

# Build do Maven
RUN mvn clean package -DskipTests

# Etapa 2: Executar a aplicação
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app
COPY --from=build /app/target/rsvp-formatura-0.0.1-SNAPSHOT.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-Xmx256m", "-Xms128m", "-jar", "app.jar"]
