---
sidebar_position: 5
---

# Dodajemy autentykację użytkowników
## Rodzaje platform do autentykacji użytkowników w AWS
- **AWS Amplify** - lekka integracja po stronie klienta / we frameworkach SSR (np. Next.js)
- **AWS Cognito** - działa po stronie klienta i na backendzie zbudowanym na Node.js,
- **AWS SDK** - Przeznaczona do autentykacji po stronie backendu

## Autentykacja z użyciem AWS Amplify
### Dodajemy autentykację do projektu
```bash
amplify add auth
```

### Wartości z terminala
```bash
? Do you want to use the default authentication and security configuration? Default configuration
Warning: you will not be able to edit these selections. 
? How do you want users to be able to sign in? Username
? Do you want to configure advanced settings? No, I am done.
```

### Deployment
```bash
amplify push
```

### Implementacja na Front-endzie
```bash
npm install @aws-amplify/ui-react 
```

`src/App.js`
```jsx
import { withAuthenticator, Button, Heading } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
```

```jsx
const App = ({user, signOut}) => {
```

```jsx
<Heading level={1}>Hello {user.username}</Heading>
<Button onClick={signOut}>Sign out</Button>
<hr/>
```

```jsx
export default withAuthenticator(App);
```

#### Kompletny kod
```jsx
import React, { useEffect, useState } from 'react'
import { Amplify, API, graphqlOperation } from 'aws-amplify'
import { createTodo, deleteTodo } from './graphql/mutations'
import { listTodos } from './graphql/queries'
import { withAuthenticator, Button, Heading } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import awsExports from "./aws-exports";
Amplify.configure(awsExports);

const initialState = { name: '', description: '' }

const App = ({user, signOut}) => {
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
      <Heading level={1}>Hello {user.username}</Heading>
      <Button onClick={signOut}>Sign out</Button>
      <hr/>
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

export default withAuthenticator(App);
```

### Testujemy rejestrację i logowanie!
`https://fumail.co/`