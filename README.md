# cypress-intermediario-v2

Projeto de automação de testes *end-to-end* com [Cypress](https://www.cypress.io/) para uma instância local do **GitLab CE**, desenvolvido durante o curso [Testes automatizados com Cypress (intermediário)](https://www.udemy.com/course/testes-automatizados-com-cypress-intermediario/), da Escola **Talking About Testing** (Walmyr Filho), na Udemy.

O projeto cobre as mesmas funcionalidades da aplicação em três camadas de teste: **GUI** (interface), **API** (REST) e **CLI** (linha de comando).

> Este repositório é baseado no projeto original do curso: [wlsf82/cypress-intermediario-v2](https://github.com/wlsf82/cypress-intermediario-v2).

---

## Funcionalidades testadas

| Funcionalidade        | GUI | API | CLI |
| --------------------- | :-: | :-: | :-: |
| Login                 |  ✅ |  –  |  –  |
| Logout                |  ✅ |  –  |  –  |
| Criação de projeto    |  ✅ |  ✅ |  –  |
| Criação de *issue*    |  ✅ |  ✅ |  –  |
| Adição de *label*     |  ✅ |  –  |  –  |
| Adição de *milestone* |  ✅ |  –  |  –  |
| `git clone` (SSH)     |  –  |  –  |  ✅ |

> As *labels* e os *milestones* são criados via API (`api_createLabel` e `api_createMilestone`) apenas como pré-condição dos testes de GUI.

## Tecnologias

- [Cypress](https://www.cypress.io/) `^12.0.2`
- [@faker-js/faker](https://www.npmjs.com/package/@faker-js/faker) `^7.6.0`: geração de dados aleatórios
- [cypress-plugin-api](https://www.npmjs.com/package/cypress-plugin-api) `^2.6.1`: *feedback* visual para testes de API
- [Docker](https://www.docker.com/): para executar o GitLab CE localmente (imagem [`wlsf82/gitlab-ce`](https://hub.docker.com/r/wlsf82/gitlab-ce))

## Comandos customizados

### API (`cypress/support/api_commands.js`)

| Comando                              | O que faz                                              |
| ------------------------------------ | ------------------------------------------------------ |
| `cy.api_createProject(project)`      | Cria um projeto, inicializado com README               |
| `cy.api_getAllProjects()`            | Lista todos os projetos                                |
| `cy.api_deleteProjects()`            | Remove todos os projetos existentes                    |
| `cy.api_createIssue(issue)`          | Cria um projeto e uma *issue* dentro dele              |
| `cy.api_createLabel(projectId, label)`         | Cria uma *label* em um projeto               |
| `cy.api_createMilestone(projectId, milestone)` | Cria um *milestone* em um projeto            |

### GUI (`cypress/support/gui_commands.js`)

| Comando                                | O que faz                                                        |
| -------------------------------------- | ---------------------------------------------------------------- |
| `cy.login(user, password, options)`    | Faz login; por padrão cacheia a sessão com `cy.session()`        |
| `cy.logout()`                          | Faz *logout* pelo menu do avatar                                 |
| `cy.gui_createProject(project)`        | Cria um projeto pela interface                                   |
| `cy.gui_createIssue(issue)`            | Cria uma *issue* pela interface                                  |
| `cy.gui_setLabelOnIssue(label)`        | Adiciona uma *label* a uma *issue*                               |
| `cy.gui_setMilestoneOnIssue(milestone)`| Adiciona um *milestone* a uma *issue*                            |

### CLI (`cypress/support/cli_commands.js`)

| Comando                      | O que faz                                                                       |
| ---------------------------- | ------------------------------------------------------------------------------- |
| `cy.cloneViaSSH(project)`    | Executa `git clone` via SSH dentro de `cypress/downloads/` usando `cy.exec()`   |

## Boas práticas aplicadas

- **Camadas separadas** (API, CLI, GUI), com comandos customizados reutilizáveis.
- **Pré-condições via API**: a massa de dados é criada por requisições, deixando os testes de GUI mais rápidos e focados.
- **Limpeza de dados** antes dos testes (`api_deleteProjects`).
- **Dados aleatórios** com Faker (`faker.datatype.uuid()`, `faker.random.words()`), evitando conflitos entre execuções.
- **Sessão em cache** com `cy.session()`, incluindo validação da sessão (`validate`) e `cacheAcrossSpecs`.
- **Proteção de dados sensíveis**: senha digitada com `{ log: false }`, credenciais em `cypress.env.json` (fora do git) e `hideCredentials` ativo.
- **Testes que leem arquivos**: o teste de `git clone` valida o conteúdo do `README.md` do repositório clonado com `cy.readFile()`.
- **Comandos a nível de sistema operacional** com `cy.exec()`.

---

Curso: [Testes automatizados com Cypress (intermediário)](https://www.udemy.com/course/testes-automatizados-com-cypress-intermediario/) · Escola [Talking About Testing](https://udemy.com/user/walmyr)