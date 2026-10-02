# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend enabling type-aware lint rules by installing `oxlint-tsgolint` and editing `.oxlintrc.json`:

```json
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "plugins": ["react", "typescript", "oxc"],
  "options": {
    "typeAware": true
  },
  "rules": {
    "react/rules-of-hooks": "error",
    "react/only-export-components": ["warn", { "allowConstantExport": true }]
  }
}
```

See the [Oxlint rules documentation](https://oxc.rs/docs/guide/usage/linter/rules) for the full list of rules and categories.

## URL de l’API

Dans GitHub Codespaces, `VITE_CODESPACE_NAME` doit être défini pour que le frontend contacte l’API distante. Ajoutez-le au fichier `octofit-tracker/frontend/.env.local` :

```dotenv
VITE_CODESPACE_NAME=le-nom-de-votre-codespace
```

Redémarrez Vite après avoir modifié ce fichier. En local, cette variable peut rester absente : l’application utilise alors `http://localhost:8000`.

## Développement

```bash
npm run dev --prefix octofit-tracker/frontend
```

L’API doit être disponible sur le port 8000.
