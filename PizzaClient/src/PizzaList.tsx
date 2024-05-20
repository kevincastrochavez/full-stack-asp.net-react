import { useState } from 'react';
import {
  TextField,
  Button,
  Box,
  List,
  ListItem,
  ListItemText,
  IconButton,
} from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';

import { Pizza, PizzaItemProps } from './types';

function PizzaList({
  name,
  data,
  onCreate,
  onUpdate,
  onDelete,
  error,
}: PizzaItemProps) {
  const [formData, setFormData] = useState({
    id: 0,
    name: '',
    description: '',
  });
  const [editingId, setEditingId] = useState(0);

  const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (editingId) {
      onUpdate(formData);
      setEditingId(0);
    } else {
      onCreate(formData);
    }
    setFormData({ id: 0, name: '', description: '' });
  };

  const handleEdit = (item: Pizza) => {
    setEditingId(item.id);
    setFormData({
      id: item.id,
      name: item.name,
      description: item.description,
    });
  };

  const handleCancelEdit = () => {
    setEditingId(0);
    setFormData({ id: 0, name: '', description: '' });
  };

  return (
    <Box
      className='Box'
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <h2>{name}</h2>
      <form
        onSubmit={handleSubmit}
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: 8,
        }}
      >
        <TextField
          label='Name'
          name='name'
          value={formData.name}
          onChange={handleFormChange}
        />
        <TextField
          label='Description'
          name='description'
          value={formData.description}
          onChange={handleFormChange}
        />
        <Button sx={{ mr: 1 }} variant='contained' type='submit'>
          {editingId === null ? 'Create' : 'Update'}
        </Button>
        {editingId !== null && (
          <Button
            variant='contained'
            color='secondary'
            onClick={handleCancelEdit}
          >
            Cancel
          </Button>
        )}
      </form>
      <List sx={{ width: '100%', maxWidth: 360 }}>
        {data.map((item) => (
          <ListItem
            key={item.id}
            secondaryAction={
              <>
                <IconButton
                  edge='end'
                  aria-label='edit'
                  onClick={() => handleEdit(item)}
                >
                  <Edit />
                </IconButton>
                <IconButton
                  edge='end'
                  aria-label='delete'
                  onClick={() => onDelete(item.id)}
                >
                  <Delete />
                </IconButton>
              </>
            }
          >
            <ListItemText primary={item.name} secondary={item.description} />
          </ListItem>
        ))}
      </List>
      {error && <p>{error}</p>}
    </Box>
  );
}

export default PizzaList;
