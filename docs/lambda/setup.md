---
sidebar_position: 2
---

# Dodajemy API do projektu
## Dodawanie nowego serwisu
```bash
amplify add api
```
## Wartości z terminala
```bash
amplify add api
? Select from one of the below mentioned services: REST
✔ Provide a friendly name for your resource to be used as a label for this category in the project: · awsprotoresource

✔ Provide a path (e.g., /book/{isbn}): · /friends/{friendID}
Only one option for [Choose a Lambda source]. Selecting [Create a new Lambda function].
? Provide an AWS Lambda function name: awsprotofn
? Choose the runtime that you want to use: NodeJS
? Choose the function template that you want to use: Hello World

Available advanced settings:
- Resource access permissions
- Scheduled recurring invocation
- Lambda layers configuration
- Environment variables configuration
- Secret values configuration

? Do you want to configure advanced settings? No
? Do you want to edit the local lambda function now? No

? Do you want to configure advanced settings? No
? Do you want to edit the local lambda function now? No
Successfully added resource awsprotofn locally.
```

## Kod lambdy w Node.js
- Lokalizacja w projekcie
`amplify/backend/function/{twoja-nazwa}/src/index.js`

- Podstawowa implementacja
```js
/**
/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

exports.handler = async (event) => {
    // Sprawdzamy co jest użytecznego dla nas w evencie
    console.log(`EVENT: ${JSON.stringify(event)}`, event);

    // /friend/1
    const friendID = event.pathParameters.friendID;
    const friend = {
        friendID,
        friendName: `Friend ${friendID}`
    };

    const response = {
        statusCode: 200,
        //  Uncomment below to enable CORS requests
        // Chcemy odblokować CORS żeby móc testować lambdę lokalnie
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "*"
        }, 
        body: JSON.stringify(friend),
    }

    return response;
};
```

## Aktywacja lambdy
```bash
amplify push
```
Sprzawdzamy podczas procesu: [Cloud formation](https://eu-central-1.console.aws.amazon.com/cloudformation)
Mozemy sobie sprawdzić co zostało utworzone w ramach aktywacji lambdy (Resources):
- Role i Policy
- API Gateway

:::tip
API Gateway to rodzaj reverse proxy. Jego rolą jest odizolowanie mikroserwisów.
:::

:::info
Logi mozemy znaleźć w [AWS Lambda](https://eu-central-1.console.aws.amazon.com/lambda/)
:::

## Sprawdzamy endpoint w przeglądarce:
```bash
REST API endpoint: https://6kt0n813ti.execute-api.eu-central-1.amazonaws.com/dev
```
Coś nie działa 😡
Spokojnie... musimy dodać do URLa ścieżkę którą wczesniej zdefiniowaliśmy 😁

```bash
https://6kt0n813ti.execute-api.eu-central-1.amazonaws.com/dev/friends/1
```
