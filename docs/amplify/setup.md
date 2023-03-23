---
sidebar_position: 2
---

# Tworzymy front-end
## Konfiguracja AWS amplify
```bash
amplify configure
```
### Kroki
- region: `eu-central-1`
- tworzenie użytkownika, nazwa dowolna
- uprawnienia: `AdministratorAccess-Amplify`
- tworzenie `Security credentials` i `Access Key`
- Access key best practices & alternatives: `Command Line Interface CLI`
- wpisanie kluczy dostępowych w terminalu
- Profile name: dowolny

## Konfiguracja projektu
### Wygenerowanie front-endu w React.js
```bash
npx create-react-app jlabs-aws-ui
```
```bash
cd jlabs-aws-ui
```
```bash
npm run start
```