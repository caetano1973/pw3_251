
# Testes End-to-End (E2E) com Cypress

## 2. Testes End-to-End (E2E) com Cypress

### O que é Cypress?

O **Cypress** é uma ferramenta de testes E2E (End-to-End) para aplicações web. Ele permite automatizar interações de usuários no navegador, simulando cliques, preenchimento de formulários, navegação, etc.

> 🔥 O Cypress roda diretamente no navegador, oferecendo uma interface visual para acompanhar a execução dos testes em tempo real.

---

## 🚀 Instalação do Cypress no projeto React

1. No terminal, execute:

```bash
npm install cypress --save-dev
```

2. Após a instalação, execute:

```bash
npx cypress open
```

> Isso abrirá a interface do Cypress e criará automaticamente a estrutura de pastas:

```
/cypress
  /e2e
  /downloads
  /support
cypress.config.js
```

---

## 🏗️ Criando seu primeiro teste E2E

### 📄 Crie um arquivo dentro de `/cypress/e2e/`:

Exemplo de nome:

```
/cypress/e2e/login.cy.js
```

### 🧠 Código do teste:

```javascript
describe('Tela de Login', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/') // ajuste a porta se necessário
  })

  it('Testa o login com email e senha', () => {
    cy.get('input[name="email"]').type('teste@etec.com')
    cy.get('input[name="password"]').type('123456')
    cy.contains('Entrar').click()

    cy.contains('Esqueci minha senha').should('exist')
  })

  it('Testa o fluxo de criar conta', () => {
    cy.contains('Criar Conta').click()

    cy.get('input[name="email"]').type('novo@etec.com')
    cy.get('input[name="password"]').type('12345678')
    cy.contains('Criar Conta').click()

    cy.contains('Esqueci minha senha').should('exist')
  })

  it('Testa alternar entre login e criar conta', () => {
    cy.contains('Criar Conta').click()
    cy.get('button.selected').should('have.text', 'Criar Conta')

    cy.contains('Entrar').click()
    cy.get('button.selected').should('have.text', 'Entrar')
  })

  it('Testa o botão Login com Google', () => {
    cy.contains('Login com Google').should('exist').click()

    // Valida se permanece na página ou se alguma ação ocorreu
    cy.contains('Esqueci minha senha').should('exist')
  })
})
```

---

## 🏃 Executando os testes

1. Rode sua aplicação normalmente:

```bash
npm run dev
```

2. Em outro terminal, execute:

```bash
npx cypress open
```

3. Na interface do Cypress, clique no arquivo `login.cy.js`.

> 🧠 O Cypress abrirá um navegador controlado automaticamente e executará os testes, mostrando passo a passo.

---

## ✅ Boas práticas

- Utilize seletor de atributos como `data-testid` para tornar os testes mais robustos e menos dependentes de texto ou classes CSS.

### Exemplo no React:

```jsx
<button data-testid="login-with-google">Login com Google</button>
```

### No Cypress:

```js
cy.get('[data-testid="login-with-google"]').click()
```

---

## 🚨 Observações sobre Login com Google

- **O Cypress não consegue interagir com popups de autenticação externos**, como o do Google.
- Para testar isso, existem duas abordagens:
  - Testar apenas se o botão está presente e dispara a ação.
  - Realizar mocks e interceptações simulando a resposta do backend (Firebase).

---

## 🏆 Conclusão

- Cypress é uma ferramenta poderosa para testes E2E.
- Ele permite validar os fluxos principais da aplicação, como login, criação de conta e interações na interface.
- Testes com serviços externos (Google Auth) exigem simulações (mock) ou verificações indiretas.

---

## 💡 Referências

- [Documentação oficial do Cypress](https://docs.cypress.io/)
- [Documentação do Firebase Auth](https://firebase.google.com/docs/auth)
