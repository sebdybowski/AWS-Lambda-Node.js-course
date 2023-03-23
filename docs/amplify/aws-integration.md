---
sidebar_position: 3
---

# Integrujemy aplikację z AWS
## Inicjalizacja AWS Amplify w projekcie
```bash
amplify init
```
## Przykładowe wartości z terminala
```bash
❯ amplify init
Note: It is recommended to run this command from the root of your app directory
? Enter a name for the project jlabsawsuitest
The following configuration will be applied:

Project information
| Name: jlabsawsui
| Environment: dev
| Default editor: Visual Studio Code
| App type: javascript
| Javascript framework: react
| Source Directory Path: src
| Distribution Directory Path: build
| Build Command: npm run-script build
| Start Command: npm run-script start

? Initialize the project with the above configuration? Yes
Using default provider  awscloudformation
? Select the authentication method you want to use: AWS profile

For more information on AWS Profiles, see:
https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-profiles.html

? Please choose the profile you want to use jlabs-aws-test
Adding backend environment dev to AWS Amplify app: d1idlis93i201a

Deployment completed.
Deploying root stack jlabsawsuitest [ ---------------------------------
	amplify-jlabsawsuitest-dev-24… AWS::CloudFormation::Stack     CREATE_I
	AuthRole                       AWS::IAM::Role                 CREATE_I
	UnauthRole                     AWS::IAM::Role                 CREATE_I
	DeploymentBucket               AWS::S3::Bucket                CREATE_I

```

## O co tu chodzi?
### Cloud formation
- [Cloud Formation Dashboard](https://eu-central-1.console.aws.amazon.com/cloudformation)
- Zobacz zakłądkę "Events"
- Sprawdź zakładkę "Resources"

### Kod projektu
Podczas inicjowania nowego projektu Amplify dzieje się kilka rzeczy:
- Tworzy się katalog `amplify`, który przechowuje definicję backendu. Ten katalog będzie się powiększał o nowe pliki wraz z tym jak będziemy dodawać do projektu nowe funkcje.
- Tworzy się plik o nazwie `aws-exports.js` w katalogu `src`, który zawiera całą konfigurację usług tworzonych za pomocą Amplify. W ten sposób klient Amplify jest w stanie uzyskać niezbędne informacje o Twoich usługach backendowych.
- Zmodyfikowany zostaje plik `.gitignore`, dodając niektóre wygenerowane pliki do listy ignorowanych
- Utworzony zostaje projekt chmurowy, który mozesz podejrzeć za pomocą komendy 
```bash
amplify console
```

## Implementacja bibliotek frontendowych AWS Amplify w projekcie
- w głównym katalogu projektu
```bash
npm install aws-amplify
```
- w pliku `src/index.js`
```jsx
import { Amplify } from 'aws-amplify';
import awsExports from './aws-exports';
Amplify.configure(awsExports);
```


