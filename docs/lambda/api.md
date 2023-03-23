---
sidebar_position: 3
---

# Implementacja lambdy na UI
## Dodajemy kod do `src/App.js`
```jsx
// amplify/backend/api/{twoja-nazwa}
const friendsAPI = 'awsprotoresource';
const path = '/friends'

// ...
const [friends, setFriends] = useState([])
const [friendsInput, setFriendsInput] = useState([])

// ...
async function getFriendFromLambda(event) {
    try {
        const friendId = event.input;
        const response = await 
        API.get(friendsAPI, path + "/" + friendId);

        console.log(response)
        let newFriends = [...friends]
        newFriends.push(response)
        setFriends(newCustomers)
    } catch (err) {
        console.log('Lambda error', err);
    }
}

//...
<hr />
<section>
<h1>Lambda friends</h1>
<input
    type="text"
    placeholder="Add friend"
    onChange={event => setFriendsInput(event.target.value)}
/>
<button
    onClick={getFriendFromLambda}
>Get Friend From Lambda</button>
{
    friends.map(friend => (
    <article key={friend.friendID}>
        <header>Id: {friend.friendID}</header>
        <p>
        <strong>
            Friend name:
        </strong>
        {friend.friendName}
        </p>
    </article>
    ))
}
</section>

```

## Pełny kod
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

const friendsAPI = 'awsprotoresource';
const path = '/friends'

const App = ({ user, signOut }) => {
  const [formState, setFormState] = useState(initialState)
  const [todos, setTodos] = useState([])
  const [friends, setFriends] = useState([])
  const [friendsInput, setFriendsInput] = useState([])

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
      await API.graphql(graphqlOperation(createTodo, { input: todo }))
    } catch (err) {
      console.log('error creating todo:', err)
    }
  }

  async function removeTodo(selectedTodo) {
    try {
      if (!selectedTodo.name || !selectedTodo.description) return
      const filteredTodos = [...todos]
        .filter(({ name, description }) => (
          selectedTodo.name !== name &&
          selectedTodo.description !== description
        ));
      setTodos(filteredTodos)
      const { id, _version } = selectedTodo;
      await API.graphql(graphqlOperation(deleteTodo, {
        input: { id, _version }
      }))
    } catch (err) {
      console.log('error deleting todo:', err)
    }
  }

  async function getFriendFromLambda() {
    try {
      const friendId = friendsInput;
      const response = await 
        API.get(friendsAPI, path + "/" + friendId);

      console.log(response)
      let newFriends = [...friends]
      newFriends.push(response)
      setFriends(newFriends)
    } catch (err) {
      console.log('Lambda error', err);
    }
  }

  return (
    <main className='container'>
      <Heading level={1}>Hello {user.username}</Heading>
      <Button onClick={signOut}>Sign out</Button>
      <hr />
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
          .filter(({ _deleted }) => !_deleted)
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
      <hr />
      <section>
        <h1>Lambda friends</h1>
        <input
          type="text"
          placeholder="Add friend"
          onChange={event => setFriendsInput(event.target.value)}
        />
        <button
          onClick={getFriendFromLambda}
        >Get Friend From Lambda</button>
        {
          friends.map(friend => (
            <article key={friend.friendID}>
              <header>Id: {friend.friendID}</header>
              <p>
                <strong>
                  Friend name:
                </strong>
                {friend.friendName}
              </p>
            </article>
          ))
        }
      </section>
    </main>
  )
}

export default withAuthenticator(App);
```

## Publikacja Lambdy
```bash
amplify publish
```

## Jak możemy rozwinąć Lambdę w przyszłości?
- Integracja z bazą danych **Dynamo DB**
- Dodanie autentykacji użytkownika przez **AWS Cognito**
- Dodanie nowej lambdy która wrzuca i pobiera pliki z **AWS S3**

:::tip
Dajcie znać czy chcece **Drugą część szkolenia z AWS!** na kanale *#gildia-frontend*!
:::