# SisandUsuarios

Aplicação de cadastro de usuários com login, desenvolvida em Angular e .NET 8, com banco de dados Firebird.

- Node.js (v18+)
- Angular CLI
- .NET 8 SDK
- Firebird

---

Banco de Dados (Firebird)

Para criar o banco de dados:

1. Instale o IBExpert ou ferramenta de sua preferência.
2. Execute o script localizado em: SisandUsuariosAPI/database/script-criacao-banco.sql

Backend (.NET 8)

1. Abra o `SisandUsuarios.sln` no Visual Studio.
2. Verifique e ajuste a string de conexão no `appsettings.json`.

4. Rode o projeto (`Ctrl + F5`).

Frontend (Angular)

1. Vá até a pasta `sisand-front`:

```bash
cd sisand-front
```

2. Instale as dependências:

```bash
npm install
npm install bootstrap
```

3. Inicie o frontend:

```bash
ng serve
```

Acesse: [http://localhost:4200](http://localhost:4200)

---

Observações

- O backend usa autenticação JWT.
- A URL da API está definida nos arquivos:
-  sisand-front/src/app/auth/auth.service.ts.
-  sisand-front/src/app/services/usuario.ts.
-  Certifique-se de que o back esteja rodando na mesma porta (7199).
Se estiver diferente, atualize o valor de apiUrl.
- O CRUD de usuários só é acessível após login.
- Login de teste inserido via banco:
- usuario: admin@admin.com
- senha: admin
