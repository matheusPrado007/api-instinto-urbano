# Boas vindas ao repositório do Projeto Rastro Urbano!

Aqui você vai encontrar os detalhes de como estruturar o desenvolvimento do seu projeto a partir deste repositório, utilizando uma branch específica e um _Pull Request_ para colocar seus códigos.

# Sobre
 Bem-vindo ao projeto "Rastro Urbano", um backend dinâmico desenvolvido em Node.js e TypeScript para catalogar e explorar a efervescente cena da arte urbana. Com recursos de armazenamento eficiente em banco de dados, interação social e APIs poderosas, nossa plataforma conecta artistas, entusiastas e curadores de forma inovadora.


<details>
<summary><strong> Estrutura do projeto</strong></summary><br />

O projeto é composto de 2 entidades importantes para sua estrutura:

1️⃣ **Back-end:**
 - Será o ambiente que você realizará a maior parte das implementações exigidas.
 - Deve rodar na porta `4000`, pois o front-end faz requisições para ele nessa porta por padrão;
 - Sua aplicação deve ser inicializada a partir do arquivo `app/backend/src/server.ts`;
 - Garanta que o `express` é executado e a aplicação ouve a porta que vem das variáveis de ambiente;
 - Todas as dependências extras (tal como `joi`, `boom`, `express-async-errors`...) devem ser listadas em `app/backend/packages.npm`.
 - 
 2️⃣**Banco de dados:**
  - Tem o papel de fornecer dados para o serviço de _backend_.
  - MongoDB
  - Mongoose
  - Durante a execução dos testes sempre vai ser acessado pelo `express` e via porta `4000` do `localhost`;
</details>

<details>
  <summary><strong> 🗓 Data de Entrega</strong></summary><br />
  * Serão `4 meses` dias de projeto;
  * Data de entrega: `01/04/2024 14:00`.
</details>

# Orientações

## Antes de Começar o Desenvolvimento

Leia atentamente esta seção, pois aqui você encontrará informações cruciais para configurar corretamente o ambiente do projeto.

<details>
<summary><strong>🔰 Iniciando o Projeto</strong></summary><br />

Para criar um backend que armazena dados de artistas e arte, juntamente com fotos da arte, utilizando Node.js, MongoDB, Firebase, TypeScript e JWT, você precisará seguir alguns passos básicos. Aqui está um guia simplificado:

### 1. Instalação do Node.js e npm:

Certifique-se de ter o Node.js e o npm instalados em sua máquina. Você pode baixá-los em [nodejs.org](https://nodejs.org/).

### 2. Inicialização do Projeto:

No terminal, crie um novo diretório para o seu projeto e execute:

```bash
mkdir nome-do-projeto
cd nome-do-projeto
npm init -y
```

### 3. Instalação das Dependências:

Instale as dependências necessárias:

```bash
npm install express mongoose body-parser firebase-admin jsonwebtoken bcrypt bcryptjs multer
npm install --save-dev typescript @types/node @types/express @types/mongoose @types/body-parser @types/multer ts-node
```

### 4. Configuração do TypeScript:

Crie um arquivo de configuração do TypeScript chamado `tsconfig.json` na raiz do seu projeto:

```json
{
  "compilerOptions": {
    "target": "es6",
    "module": "commonjs",
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true
  },
  "include": ["src/**/*.ts"],
  "exclude": ["node_modules"]
}
```

### 5. Estrutura do Projeto:

Organize seu projeto com uma estrutura de diretórios como esta:

```
- nome-do-projeto
  - src
    - controllers
    - models
    - routes
    - utils
  - dist
  - uploads (para armazenar as fotos)
```

### 6. Configuração do Firebase:

Crie um projeto no [Firebase Console](https://console.firebase.google.com/), e faça o download do arquivo de configuração do SDK Admin. Renomeie o arquivo para `firebase-admin-key.json` e coloque-o na raiz do seu projeto.

### 7. Configuração do MongoDB:

Configure uma instância do MongoDB. Você pode usar um serviço online como o MongoDB Atlas ou instalar localmente.

### 8. Implementação:

- Crie os modelos de dados (`models`) para Artista e Arte usando o Mongoose.
- Implemente as rotas (`routes`) para manipular os dados.
- Implemente os controladores (`controllers`) para processar as solicitações.
- Use o Firebase Admin SDK para autenticação e armazenamento de arquivos.
- Utilize o JWT para autenticação.
- Configure o Multer para processar uploads de fotos.

### 9. Scripts no package.json:

Adicione scripts ao seu `package.json` para facilitar a execução do projeto:

```json
"scripts": {
  "start": "node dist/index.js",
  "dev": "ts-node src/index.ts",
  "build": "tsc"
}
```

### 10. Execução:

- Execute `npm run dev` para iniciar o servidor em modo de desenvolvimento.
- Execute `npm run build` para compilar o código TypeScript para JavaScript.
- Execute `npm start` para iniciar o servidor em produção.

Este é um guia básico e simplificado. Dependendo dos requisitos específicos do seu projeto, você pode precisar ajustar e expandir essas etapas. Certifique-se de revisar a documentação das bibliotecas e serviços que está utilizando para uma implementação mais detalhada.


</details>

Certifique-se de seguir cada passo com precisão para garantir uma configuração adequada do seu ambiente de desenvolvimento.

</details>

<details>
<summary><strong>🕵️ Linter</strong></summary><br />

A instalação de um linter no seu projeto é uma ótima prática para garantir consistência no estilo do código e identificar possíveis erros ou más práticas. Vou fornecer um exemplo de como você pode instalar o ESLint, um linter popular para JavaScript e TypeScript, em seu projeto:

1. **Instalar o ESLint como uma dependência de desenvolvimento:**

   Execute o seguinte comando no terminal na raiz do seu projeto:

   ```bash
   npm install eslint --save-dev
   ```

2. **Inicializar o ESLint:**

   Depois de instalar o ESLint, você precisa configurá-lo para o seu projeto. Execute o seguinte comando e siga as instruções:

   ```bash
   npx eslint --init
   ```

   Este comando irá criar um arquivo chamado `.eslintrc.js` na raiz do seu projeto.

3. **Configurar o ESLint (opcional):**

   Se você quiser personalizar as regras do ESLint para atender às necessidades específicas do seu projeto, edite o arquivo `.eslintrc.js`. Aqui está um exemplo básico:

   ```javascript
   module.exports = {
     env: {
       node: true,
       es6: true,
     },
     extends: 'eslint:recommended',
     parserOptions: {
       ecmaVersion: 2018,
       sourceType: 'module',
     },
     rules: {
       // Suas regras personalizadas aqui
     },
   };
   ```

   Você pode consultar a [documentação do ESLint](https://eslint.org/docs/user-guide/configuring) para obter mais informações sobre as configurações disponíveis.

4. **Executar o ESLint:**

   Você pode executar o ESLint manualmente usando o seguinte comando:

   ```bash
   npx eslint yourfile.js
   ```

   Ou você pode adicionar um script no seu `package.json` para tornar isso mais conveniente:

   ```json
   "scripts": {
     "lint": "eslint ."
   }
   ```

   Em seguida, você pode executar o linter usando:

   ```bash
   npm run lint
   ```

Agora, o ESLint está configurado no seu projeto. Ele analisará seu código em busca de problemas e seguirá as regras definidas no seu arquivo de configuração `.eslintrc.js`.

</details>



<details>
<summary><strong> ⚠️ Configurações mínimas para execução do projeto</strong></summary><br />

Na sua máquina você deve ter:

 - Sistema Operacional Distribuição Unix
 - Node versão 16

➡️ O `node` deve ter versão igual ou superior à `16.14.0 LTS`:
  - Para instalar o nvm, [acesse esse link](https://github.com/nvm-sh/nvm#installing-and-updating);
  - Rode os comandos abaixo para instalar a versão correta de `node` e usá-la:
    - `nvm install 16.14 --lts`
    - `nvm use 16.14`
    - `nvm alias default 16.14`

</details>

<details>
  <summary><strong>⚠️ Pré-requisitos para uma boa avaliação</strong></summary><br />

## Durante o desenvolvimento

Aqui você encontrará orientações e dicas que ajudarão muito no desenvolvimento do projeto. Sempre que tiver dúvidas ou bugs aparecerem, dê uma olhada aqui. 👀

<details>
<summary><strong> ⌨️ Boas práticas </strong></summary><br/>

* Versione seu projeto

  * Faça `commits` das alterações que você fizer no código regularmente;

  * Lembre-se de sempre após um (ou alguns) `commits` atualizar o repositório remoto.

  * Os comandos que você utilizará com mais frequência são:
    1. `git status` _(para verificar o que está em vermelho - fora do stage - e o que está em verde - no stage)_;
    2. `git add` _(para adicionar arquivos ao stage do Git)_;
    3. `git commit` _(para criar um commit com os arquivos que estão no stage do Git)_;
    4. `git push -u nome-da-branch` _(para enviar o commit para o repositório remoto na primeira vez que fizer o `push` de uma nova branch)_;
    5. `git push` _(para enviar o commit para o repositório remoto após o passo anterior)_.

</details>

<details>
<summary><strong> 📦 Pacotes externos</strong></summary><br />

* ⚠️ **As alterações que você fizer no arquivo `app/backend/packages.json` serão descartadas no momento da avaliação, caso queira instalar pacotes adicionais ao back-end, utilize o arquivo `app/backend/packages.npm`, separando os pacotes por espaços ou quebras de linha.** Exemplo:

  ```text
  joi
  cors
  @types/cors
  ```

</br>

</details>

<details id='Criptografia-de-senhas'>
<summary><strong>🔐 Criptografia de senhas </strong></summary><br />

⚠️ A biblioteca utilizada para criptografar a senha no banco de dados é a `bcryptjs` [bcryptjs npm](https://github.com/dcodeIO/bcrypt.js) e que já vem instalada no projeto e não deve ser alterada ou substituída. Recomendamos que explore os recursos da biblioteca na documentação para implementar no projeto ao cadastrar um usuário e ao realizar login ⚠️

</details>

<details id='testes-de-cobertura'>
  <summary><strong> Testes de cobertura </strong></summary><br/>

  A construção de testes de cobertura no back-end deve ser feita em *TypeScript*, utilizando `mocha`, `chai` e `sinon`, na pasta `app/backend/src/tests/`, conforme o exemplo em `app/backend/src/tests/change.me.test.ts` *(aqui considerando um teste de integração)*:

  ```typescript
  import * as sinon from 'sinon';
  import * as chai from 'chai';
  // @ts-ignore
  import chaiHttp = require('chai-http');

  import { app } from '../app';
  import Example from '../database/models/ExampleModel';

  import { Response } from 'superagent';

  chai.use(chaiHttp);

  const { expect } = chai;

  describe('Seu teste', () => {
    /**
     * Exemplo do uso de stubs com tipos
     */

    // let chaiHttpResponse: Response;

    // before(async () => {
    //   sinon
    //     .stub(Example, "findOne")
    //     .resolves({
    //       ...<Seu mock>
    //     } as Example);
    // });

    // after(()=>{
    //   (Example.findOne as sinon.SinonStub).restore();
    // })

    // it('...', async () => {
    //   chaiHttpResponse = await chai
    //      .request(app)
    //      ...

    //   expect(...)
    // });

    it('Seu sub-teste', () => {
      expect(false).to.be.eq(true);
    });
  });
  ```

  Os testes devem cobrir todos os arquivos contidos em `app/backend/src`, com exceção daqueles que já foram entregues com o projeto.

  Para rodar testes de cobertura no seu back-end, utilize o comando: `npm run test:coverage`.

  :warning:
  Para que o comando acima funcione localmente (fora do container) você deverá configurar na raiz do _back-end_ o seu arquivo _.env_. Como explicado na Seção [⚙️ Variáveis de ambiente](#Variaveis-de-ambiente).

</details>

<details>
  <summary><strong>ℹ️ Status HTTP</strong></summary><br />

  Tenha em mente que todas as "respostas" devem respeitar os [status do protocolo HTTP](https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Status), com base no que o REST prega.

  Alguns exemplos:

  - Requisições que precisam de token mas não o receberam devem retornar um código de `status 401`;

  - Requisições que não seguem o formato pedido pelo servidor devem retornar um código de `status 400`;

  - Um problema inesperado no servidor deve retornar um código de `status 500`;

  - Um acesso ao criar um recurso, no nosso caso usuário ou partida, deve retornar um código de `status 201`.

  - Quando solicitado algo que não existe no banco, deve retornar um código de `status 404`.

</details>

<details>
  <summary><strong>🛠 Execução de testes em sua máquina</strong></summary>

> :information_source: IMPORTANTE


# Sobre os Requisitos

Esse projeto é composto de 3 fluxos principais:
1. Artista
2. Users e Login (Pessoas Usuárias e Credenciais de acesso)
3. Artes (Partidas)


## Database
  - MongoDB
  - Express
  - Firebase
  - Multer
  - Atlas

## Fluxo 1: Artistas

<details>
  <summary><strong> Introdução </strong></summary>

 - Os requisitos a seguir consideram o consumo da rota `/artista` para retornar os dados dos artistas

</details>

<details>
  <summary><strong> Requisitos </strong></summary>

### 1 - Desenvolva em `/app/backend/src/database` nas pastas correspondentes, uma migration e um model para a tabela de artista


### 2 - (`TDD`) Desenvolva testes que cubram no mínimo 5 por cento dos arquivos em `/app/backend/src`, com um mínimo de 7 linhas cobertas

  **Sugestões:**
  - Baseando-se no contrato do endpoint `/artista` **do próximo requisito**, inicie um teste de integração utilizando a metodologia `TDD` com a implementação do requisito seguinte;
  - Nesse primeiro momento, foque em desenvolver o que pede o requisito, progredindo gradualmente a partir disso;
  - Para tanto, utilize/altere o arquivo de referência `app/backend/src/tests/change.me.test.ts`;
  - Veja a seção de [Testes de cobertura](#testes-de-cobertura) para mais detalhes.

### 3 - Desenvolva o endpoint `/artista` no back-end de forma que ele possa retornar todos os times corretamente

  - Deve ser uma rota `GET` com resposta com status `200` e com um `json` contendo o retorno no seguinte modelo:

```json
[
  {
    "id": 1,
    "nomeArtista": "Luciano"
  },
  {
    "id": 2,
    "nomeArtista": "Gabriel"
  },
  {
    "id": 3,
    "nomeArtista": "Matheus"
  },
  ...
]
```

### 4 - (`TDD`) Desenvolva testes que cubram no mínimo 10 por cento dos arquivos em `/app/backend/src`, com um mínimo de 19 linhas cobertas

  **Sugestão:**
  - Evolua os testes de integração da sua rota `/artista`, utilizando o método `TDD`, agora considerando **o contrato do próximo requisito**.

### 5 - Desenvolva o endpoint `/artista/:id` no back-end de forma que ele possa retornar dados de um time específico

  - Deve ser uma rota `GET` com resposta com status `200` e com um `json` contendo o retorno no seguinte modelo:

```json
{
  "id": 1,
  "nomeArtista": "Luciano"
}
```

</details>

## Fluxo 2: Users e Login (Pessoas Usuárias e Credenciais de acesso)

<details>
  <summary><strong> Introdução </strong></summary>

- A rota utilizada deve ser (`/login`);

- A rota deve receber os campos `email` e `password` e esses campos devem ser validados no banco de dados:
  - O campo `email` deve receber um email válido. Ex: `rastro@projeto.com`;
  - O campo `password` deve ter mais de 6 caracteres.
  - Além de válidos, é necessário que o email e a senha estejam cadastrados no banco para ser feito o login;

- O body da requisição deve conter o seguinte formato:
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```

</details>

<details>
  <summary><strong> Requisitos </strong></summary>

### 6 - Desenvolva em `/app/backend/src/database` nas pastas correspondentes, uma migration e um model para a tabela de pessoas usuárias

  - O avaliador consultará os dados da tabela `users`, verificando se ela contém os dados iniciais corretos. [Nessa seção](#sequelize) temos o diagrama de entidades;

### 7 - (`TDD`) Desenvolva testes que cubram no mínimo 15 por cento dos arquivos em `/app/backend/src`, com um mínimo de 25 linhas cobertas

  **Sugestão:**
  - Baseando-se no contrato do endpoint `/login` **do próximo requisito**, inicie um teste de integração utilizando a metodologia `TDD` com a implementação do requisito seguinte;

### 8 - Desenvolva o endpoint `/login` no back-end de maneira que ele permita o acesso com dados válidos no front-end

  - A rota de ser do tipo `POST`;

  - O avaliador verificará se é possível fazer o login com dados corretos e que, após o acesso, será redirecionado para a tela de jogos.

  - O endpoint `/login` no back-end não deve permitir o acesso sem informar um email no front-end

  - O endpoint `/login` no back-end não deve permitir o acesso sem informar uma senha no front-end

  - As senhas que existem no banco de dados estão encriptadas. Veja a [seção de Criptografia de Senhas](#Criptografia-de-senhas) para mais detalhes de como comparar a senha do banco com a senha do corpo da requisição.

  - Se o login foi feito com sucesso, o resultado retornado deverá ser similar ao exibido abaixo, com um status http `200`:

    ```json
    {
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjU0NTI3MTg5fQ.XS_9AA82iNoiVaASi0NtJpqOQ_gHSHhxrpIdigiT-fc" // Aqui deve ser o token gerado pelo backend.
    }
    ```

  - O avaliador verificará se fazer o login sem um email, haverá o retorno de status _bad request_.

  - Se o login não tiver o campo "email", o resultado retornado deverá ser a mensagem abaixo, com um status http `400`:

    ```json
    { "message": "All fields must be filled" }
    ```

  - O avaliador verificará se fazer login sem senha, o retorno será status _bad request_.

  - Se o login não tiver o campo "password", o resultado retornado deverá ser conforme exibido abaixo, com um status http `400`:

    ```json
    { "message": "All fields must be filled" }
    ```

### 9 - (`TDD`) Desenvolva testes que cubram no mínimo 20 por cento dos arquivos em `/app/backend/src`, com um mínimo de 35 linhas cobertas

  **Sugestão:**
  - Evolua os testes de integração da sua rota `/login`, utilizando o método `TDD`, agora considerando **o contrato do próximo requisito**.

### 10 - Desenvolva o endpoint `/login` no back-end de maneira que ele não permita o acesso com um email não cadastrado ou senha incorreta no front-end

- Se o login tiver o "email" **inválido** ou a "senha" **inválida**, o resultado retornado será similar ao exibido abaixo, com um status http `401`:

  ```json
    { "message": "Invalid email or password" }
  ```

- Sendo emails inválidos:
  - Emails com formato inválido: `@exemplo.com`, `exemplo@exemplo`, `exemplo@.com`, `exemplo.exemplo.com`;
  - Emails com formato válido, mas não cadastrados no banco;
- Sendo senhas inválidas:
  - Senhas com formato inválido: com um tamanho **menor** do que `6 caracteres`;
  - Senhas com formato válido, mas não cadastradas no banco;

### 11 - (`TDD`) Desenvolva testes que cubram no mínimo 30 por cento dos arquivos em `/app/backend/src`, com um mínimo de 45 linhas cobertas

  **Sugestão:**
- Baseando-se no contrato do endpoint `/login/role` **do próximo requisito**, inicie um teste de integração utilizando a metodologia TDD com a implementação do requisito seguinte;

### 12 - Desenvolva um middleware de validação para o `token`, verificando se ele é válido, e desenvolva o endpoint `/login/role` no back-end de maneira que ele retorne os dados corretamente no front-end

  - Deve ser uma rota `GET` que receba um `header` com parâmetro `authorization`, onde ficará armazenado o token gerado no login;

  - Será validado na API que não é possível retornar um objeto com o tipo de usuário, sem um token;

  - Caso o token não seja informado, deve-se retornar, com um status `401`, a seguinte mensagem:

  ```json
  { "message": "Token not found" }
  ```

  - Será validado na API que não é possível retornar um objeto com o tipo de usuário, com um token inválido

  - Caso o token informado não seja válido, deve-se retornar, com um status `401`, a seguinte mensagem:

  ```json
  { "message": "Token must be a valid token" }
  ```

  - O avaliador verificará se ao tentar bater na rota com um token válido, o mesmo retornará o tipo de usuário.

  A resposta deve ser de status `200` com um `objeto` contendo a `role` do *user*:
  ```json
    { "role": "admin" }
  ```

</details>

## Fluxo 3: artes 

<details>
  <summary><strong> Introdução </strong></summary>

  - Para os requisitos de criação de artes, será necessário implementar o model e algumas rotas relacionadas a entidade artes.

</details>

<details>
  <summary><strong> Requisitos </strong></summary>

### 13 - Desenvolva em `/app/backend/src/database` nas pastas correspondentes, uma migration e um model para a tabela de artes

- O avaliador consultará os dados da tabela `matches`, verificando se ela contém os dados iniciais corretos. [Nessa seção](#sequelize) temos o diagrama de entidades.

### 14 - (`TDD`) Desenvolva testes que cubram no mínimo 45 por cento dos arquivos em `/app/backend/src`, com um mínimo de 70 linhas cobertas

  **Sugestão:**

- Crie um novo teste de integração, agora da sua rota `/matches`, utilizando o método `TDD`, considerando **os contratos dos próximos requisitos**. [Nessa seção](#sequelize) temos o diagrama de entidades.

### 15 - Desenvolva o endpoint `/artes` de forma que os dados apareçam corretamente na tela de partidas no front-end

- A rota deve ser um `GET` e retorna uma lista de partidas;

- Será validado que a página apresentará todos os dados de partidas sem nenhum filtro.

    Exemplo de retorno:

    ```json
    [
      {
        "id": 1,
        "nomeArtista": "Luciano",
        "fotaArte": "endereço dda arte",
        "uf": "MG",
        "endereço": "endereço da arte",
        "descricaoArte": "descricao",
      },
      ...
      {
        "id": 2,
        "nomeArtista": "Gabriel",
        "fotaArte": "endereço dda arte",
        "uf": "MG",
        "endereço": "endereço da arte",
        "descricaoArte": "descricao",
      },
    ]
    ```


### 16 - Desenvolva o endpoint `/artes/:id` de forma que seja possível atualizar partidas em andamento

- O endpoint deve ser do tipo `PATCH`;

- Será recebido o `id` pelo parâmetro da URL;

- Será validado que não é possível alterar uma partida sem um token;

- Caso o token não seja informado, deve-se retornar, com um status `401`, a seguinte mensagem:

  ```json
  { "message": "Token not found" }
  ```

- Será validado que não é possível alterar uma partida com um token inválido;

- Caso o token informado não seja válido, deve-se retornar, com um status `401`, a seguinte mensagem:

  ```json
  { "message": "Token must be a valid token" }
  ```

- Será avaliado que é possível alterar o resultado de uma partida.

- O corpo da requisição terá o seguinte formato:

  ```json
      {
        "id": 2,
        "nomeArtista": "Gabriel",
        "fotaArte": "endereço dda arte",
        "uf": "MG",
        "endereço": "endereço da arte",
        "descricaoArte": "descricao",
      },
  ```

- Será avaliado que é o endpoint responde à requisição com um status `200` e qualquer corpo.

### 19 - (`TDD`) Desenvolva testes que cubram no mínimo 60 por cento dos arquivos em `/app/backend/src`, com um mínimo de 80 linhas cobertas

  **Sugestão:**
  - Crie um novo teste de integração, agora da sua rota `/matches`, utilizando o método `TDD`, agora considerando **os contratos dos próximos requisitos**.

### 20 - Desenvolva o endpoint `/artes` de modo que seja possível cadastrar uma nova partida em andamento no banco de dados

- A rota deverá ser do tipo `POST` e retornar a partida inserida no banco de dados;

- Será validado que não é possível inserir uma partida sem um token;

- Caso o token não seja informado, deve-se retornar, com um status `401`, a seguinte mensagem:

  ```json
  { "message": "Token not found" }
  ```

- Será validado que não é possível inserir uma partida com um token inválido;

- Caso o token informado não seja válido, deve-se retornar, com um status `401`, a seguinte mensagem:

  ```json
  { "message": "Token must be a valid token" }
  ```

- Será validado que é possível salvar uma arte no banco de dados;

- O corpo da requisição terá o seguinte formato:

  ```json
        {
        "nomeArtista": "Rose",
        "fotaArte": "endereço dda arte",
        "uf": "MG",
        "endereço": "endereço da arte",
        "descricaoArte": "descricao",
      },

- Caso a partida seja inserida com sucesso, deve-se retornar os dados da partida, com _status_ `201`:

  ```json
      {
        "id": 4,
        "nomeArtista": "Rose",
        "fotaArte": "endereço dda arte",
        "uf": "MG",
        "endereço": "endereço da arte",
        "descricaoArte": "descricao",
      },
  ```


</details>

<details>
  <summary><strong> Requisitos </strong></summary>


### 22 - Desenvolva testes que cubram no mínimo 80 por cento dos arquivos em `/app/backend/src`, com um mínimo de 100 linhas cobertas

</details>
