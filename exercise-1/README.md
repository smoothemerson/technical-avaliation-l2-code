# Avaliação Técnica

## Docker
Use o script abaixo para a execução do docker:
```bash
docker compose -d --build
```

## Como Executar
Use os scripts para executar e gerenciar o projeto:

```bash
# Build do projeto
npm run build

# Executar o projeto
npm run start          # modo padrão
npm run start:dev      # modo desenvolvimento com watch
npm run start:debug    # modo debug com watch
npm run start:prod     # executar versão compilada

# Lint e formatação
npm run lint           # verifica e corrige lint
npm run format         # formata o código

# Testes
npm run test:e2e       # executar testes end-to-end
npm run test:e2e:watch # executar testes end-to-end em watch mode
```