import { useState } from 'react'
import { Button, TextField, Container, Stack } from '@mui/material'

interface NewItemFormProps {
  onNewItem: (item: any) => void
}

const NewItemForm: React.FC<NewItemFormProps> = ({ onNewItem }) => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('') // Add description state here

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const newItem = { title, description } // Include description in the newItem object
    const response = await fetch(
      'https://fancy-salamander-d1d73a.netlify.app/api/items',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newItem),
      }
    )
    const data = await response.json()
    onNewItem(data)
    setTitle('')
    setDescription('') // Clear the description input after submitting
  }

  return (
    <Container>
      <form onSubmit={handleSubmit} style={{ display: 'block' }}>
        <Stack
          direction='column'
          justifyContent='center'
          alignItems='center'
          spacing={2}
        >
          <TextField
            label='Title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <TextField // Add a TextField for description input
            id='outlined-multiline-static'
            label='Description'
            value={description}
            multiline
            rows={4}
            defaultValue='Default Value'
            onChange={(e) => setDescription(e.target.value)}
          />
          <Button type='submit' variant='contained'>
            Add Item
          </Button>
        </Stack>
      </form>
    </Container>
  )
}

export default NewItemForm
