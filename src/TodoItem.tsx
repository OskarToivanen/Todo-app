import React, { useState } from 'react'
import {
  ListItem,
  Checkbox,
  IconButton,
  TextField,
  Container,
  Typography,
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import SaveIcon from '@mui/icons-material/Save'

export interface TodoItemType {
  _id: string
  title: string
  description: string
  completed: boolean
  createdAt: Date
}

export interface TodoItemProps extends TodoItemType {
  onItemUpdate: (updatedItem: TodoItemType) => void
  onItemDelete: (deletedItemId: string) => void
}

const TodoItem: React.FC<TodoItemProps> = ({
  _id,
  title,
  description,
  completed,
  createdAt,
  onItemUpdate,
  onItemDelete,
}) => {
  const [isEditing, setIsEditing] = useState(false)
  const [editedTitle, setEditedTitle] = useState(title)
  const [editedDescription, setEditedDescription] = useState(description)

  const handleToggleComplete = async () => {
    const updatedItem = {
      ...{ _id, title, description, completed, createdAt },
      completed: !completed,
    }
    await fetch(
      `https://fancy-salamander-d1d73a.netlify.app/api/items/${_id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedItem),
      }
    )
    onItemUpdate(updatedItem)
  }

  const handleDelete = async () => {
    await fetch(
      `https://fancy-salamander-d1d73a.netlify.app/api/items/${_id}`,
      {
        method: 'DELETE',
      }
    )
    onItemDelete(_id)
  }

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await fetch(
      `https://fancy-salamander-d1d73a.netlify.app/api/items/${_id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...{ _id, title, description, completed, createdAt },
          title: editedTitle,
          description: editedDescription,
        }),
      }
    )
    onItemUpdate({
      ...{ _id, title, description, completed, createdAt },
      title: editedTitle,
      description: editedDescription,
    })
    setIsEditing(false)
  }

  return (
    <ListItem style={{ textAlign: 'center' }}>
      <Container>
        {isEditing ? (
          <form onSubmit={handleEditSubmit}>
            <TextField
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              required
            />
            <TextField
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value)}
            />
            <IconButton type='submit' edge='end' aria-label='save'>
              <SaveIcon />
            </IconButton>
          </form>
        ) : (
          <div onDoubleClick={() => setIsEditing(true)}>
            <Typography variant='body1' fontWeight='bold'>
              {completed ? <s>{title}</s> : title}
            </Typography>
            <p>{description}</p>
          </div>
        )}
        <Checkbox checked={completed} onChange={handleToggleComplete} />
        <IconButton edge='end' aria-label='delete' onClick={handleDelete}>
          <DeleteIcon />
        </IconButton>
      </Container>
    </ListItem>
  )
}

export default TodoItem
