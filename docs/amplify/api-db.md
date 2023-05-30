---
sidebar_position: 4
---

# Dodajemy proste API i bazę danych
## Przykładowe api oparte o GraphQL
```bash
amplify add api
```
### Wartości z terminala
```bash
? Select from one of the below mentioned services: GraphQL
? Here is the GraphQL API that we will create. Select a setting to edit or contin
ue Conflict detection (required for DataStore): Disabled
? Enable conflict detection? Yes
? Select the default resolution strategy Auto Merge
? Here is the GraphQL API that we will create. Select a setting to edit or contin
ue Continue
? Choose a schema template: Single object with fields (e.g., “Todo” with ID, name
, description)
```

### Jak wygąda nasze API?
`amplify/backend/api/jlabsawsuitest/schema.graphql`
```graphql
type Todo @model {
  id: ID!
  name: String!
  description: String
}
```

### Deployment
```bash
amplify push
```

### Wartości z terminala
```bash
? Are you sure you want to continue? Y

# You will be walked through the following questions for GraphQL code generation
? Do you want to generate code for your newly created GraphQL API? Y
? Choose the code generation language target: javascript
? Enter the file name pattern of graphql queries, mutations and subscriptions: src/graphql/**/*.js
? Do you want to generate/update all possible GraphQL operations - queries, mutations and subscriptions? Y
? Enter maximum statement depth [increase from default if your schema is deeply nested]: 2
```

### Sprawdzanie statusu deploymentu
```bash
amplify status
```

```bash
    Current Environment: dev
    
┌──────────┬────────────────┬───────────┬───────────────────┐
│ Category │ Resource name  │ Operation │ Provider plugin   │
├──────────┼────────────────┼───────────┼───────────────────┤
│ Api      │ jlabsawsuitest │ Create    │ awscloudformation │
└──────────┴────────────────┴───────────┴───────────────────┘
```

<!-- ```bash
amplify console api
```

### Testowanie API
```bash
amplify mock api
```
### Testowy payload API
```graphql
mutation createTodo {
  createTodo(input: {
    name: "Placki"
    description: "bardzo lubię"
  }) {
    id
    name
    description
  }
}

query listTodos {
  listTodos {
    items {
      id
      description
      name
    }
  }
}
``` -->

## Implementacja API na Front-endzie
```bash
  npm install @picocss/pico
```
- `src/index.js`
```jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import '@picocss/pico';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Amplify } from 'aws-amplify';
import awsExports from './aws-exports';
Amplify.configure(awsExports);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
```

- `src/App.js`
```jsx
import React, { useEffect, useState } from 'react'
import { API, graphqlOperation } from 'aws-amplify'
import { createTodo, deleteTodo } from './graphql/mutations'
import { listTodos } from './graphql/queries'

const initialState = { name: '', description: '' }

const App = () => {
  const [formState, setFormState] = useState(initialState)
  const [todos, setTodos] = useState([])

  useEffect(() => {
    fetchTodos()
  }, [])

  const setInput = (key, value) => {
    setFormState({ ...formState, [key]: value })
  }

  async function fetchTodos() {
    try {
      const todoData = await API.graphql(graphqlOperation(
        listTodos))
      const todos = todoData.data.listTodos.items
      setTodos(todos)
    } catch (err) { console.log('error fetching todos') }
  }

  async function addTodo() {
    try {
      if (!formState.name || !formState.description) return
      const todo = { ...formState }
      setTodos([...todos, todo])
      setFormState(initialState)
      await API.graphql(graphqlOperation(createTodo, {input: todo}))
    } catch (err) {
      console.log('error creating todo:', err)
    }
  }

  async function removeTodo(selectedTodo) {
    try {
      if (!selectedTodo.name || !selectedTodo.description) return
      const filteredTodos = [...todos]
        .filter(({name, description}) => (
          selectedTodo.name !== name && 
          selectedTodo.description !== description
        ));
      setTodos(filteredTodos)
      const {id, _version} = selectedTodo;
      await API.graphql(graphqlOperation(deleteTodo, {
        input: {id, _version}
      }))
    } catch (err) {
      console.log('error deleting todo:', err)
    }
  }

  return (
    <main className='container'>
      <h1>Amplify Todos</h1>
      <input
        onChange={event => setInput('name', event.target.value)}
        value={formState.name}
        placeholder="Name"
      />
      <input
        onChange={event => setInput('description', event.target.value)}
        value={formState.description}
        placeholder="Description"
      />
      <button onClick={addTodo}>
        Create Todo
      </button>
      {
        todos
          .filter(({_deleted}) => !_deleted)
          .map((todo, index) => (
          <article key={todo.id ? todo.id : index}>
            <header>Todo name: {todo.name}</header>
            <strong>Todo description:</strong>
            <p>{todo.description}</p>
            <footer>
              <button onClick={() => removeTodo(todo)}>
                🗑 Delete todo
              </button>
            </footer>
          </article>
        ))
      }
    </main>
  )
}

export default App
```

## Odpalamy lokalny UI
```bash
npm run start
```