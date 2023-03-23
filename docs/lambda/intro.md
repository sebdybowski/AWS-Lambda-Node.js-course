---
sidebar_position: 1
---

# Co to jest AWS Lambda?
:::info
AWS Lambda to usługa obliczeniowa, która umożliwia uruchamianie kodu bez zarządzania serwerem. Lambda uruchamia Twój kod w infrastrukturze obliczeniowej o wysokiej dostępności i odpowiada za całą administrację, w tym konserwację serwera i systemu operacyjnego oraz za automatyczne skalowanie.
:::

## Jak to działa?
![Lambda scheme](/img/lambda-scheme.png)

## Wspierane technologie
<div class="row">
    <div class="col icon">
        <img src="/img/node.svg"/>
    </div>
    <div class="col icon">
        <img src="/img/golang.svg"/>
    </div>
    <div class="col icon">
        <img src="/img/java.svg" width="50%"/>
    </div>
    <div class="col icon">
        <img src="/img/python.svg" width="50%"/>
    </div>
</div>
<br/>
<div class="row">
    <div class="col icon">
        <h1>.net</h1>
    </div>
    <div class="col icon">
        <h1>ruby</h1>
    </div>
</div>

## Lambda vs Amplify GraphQL?
- Pełna kontrola nad kodem i usługami AWS powiązanymi z lambdą
- Możliwość implementacji bardziej skomplikowanych serwisów
- AWS Amplify GraphQL "pod maską" także używa lambdy, ale narzuca nam konkretny styl pisania kodu
- Lambda umożliwia podpięcie customowej bazy danych