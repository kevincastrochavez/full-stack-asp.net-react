import { useState } from 'react';
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
    <div>
      <h2>New {name}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          name='name'
          placeholder='Name'
          value={formData.name}
          onChange={handleFormChange}
        />
        <input
          type='text'
          name='description'
          placeholder='Description'
          value={formData.description}
          onChange={handleFormChange}
        />
        <button type='submit'>{editingId ? 'Update' : 'Create'}</button>
        {editingId && (
          <button type='button' onClick={handleCancelEdit}>
            Cancel
          </button>
        )}
      </form>
      {/* {error && <div>{error.message}</div>} */}
      <h2>{name}s</h2>
      <ul>
        {data.map((item) => (
          <li key={item.id}>
            <div>
              {item.name} - {item.description}
            </div>
            <div>
              <button onClick={() => handleEdit(item)}>Edit</button>
              <button onClick={() => onDelete(item.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PizzaList;
