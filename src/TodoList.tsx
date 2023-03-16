import React from 'react'
import TodoItem, { TodoItemType } from './TodoItem'
import { List, Paper } from '@mui/material'

interface TodoListProps {
  items: TodoItemType[]
  onItemUpdate: (updatedItem: TodoItemType) => void
  onItemDelete: (deletedItemId: string) => void
}

const TodoList: React.FC<TodoListProps> = ({
  items,
  onItemUpdate,
  onItemDelete,
}) => {
  return (
    <List>
      {items.map((item) => (
        <Paper
          elevation={6}
          style={{
            maxWidth: '600px',
            margin: '20px',
            display: 'inline-block',
          }}
        >
          <TodoItem
            key={item._id}
            {...item}
            onItemUpdate={onItemUpdate}
            onItemDelete={onItemDelete}
          />
        </Paper>
      ))}
    </List>
  )
}

export default TodoList
