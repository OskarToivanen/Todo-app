import React, { useState, useEffect } from 'react'
import { Container, Typography } from '@mui/material'
import TodoList from './TodoList'
import NewItemForm from './NewItemForm'
import { TodoItemType } from './TodoItem'

const App: React.FC = () => {
  const [todos, setTodos] = useState<TodoItemType[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('http://localhost:5000/api/items')
      const data = await response.json()
      setTodos(data)
    }

    fetchData()
  }, [])

  const handleNewItem = (newItem: TodoItemType) => {
    const newItemWithDescription = {
      ...newItem,
      description: newItem.description || '',
    }
    setTodos((prevTodos) => [newItemWithDescription, ...prevTodos])
  }

  const handleItemUpdate = (updatedItem: TodoItemType) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo._id === updatedItem._id ? updatedItem : todo
      )
    )
  }

  const handleItemDelete = (deletedItemId: string) => {
    setTodos((prevTodos) =>
      prevTodos.filter((todo) => todo._id !== deletedItemId)
    )
  }

  return (
    <Container maxWidth='md'>
      <Typography variant='h3' component='h2' textAlign='center'>
        Todo App
      </Typography>
      <NewItemForm onNewItem={handleNewItem} />
      <Container style={{ textAlign: 'center' }}>
        <TodoList
          items={todos}
          onItemUpdate={handleItemUpdate}
          onItemDelete={handleItemDelete}
        />
      </Container>
    </Container>
  )
}

export default App
