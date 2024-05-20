import { useState, useEffect } from 'react';
import { Pizza } from './types';
import PizzaList from './PizzaList';

const term = 'Pizza';
const API_URL = '/pizzas';
const headers = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': 'http://localhost:3000',
  methods: 'GET,PUT,POST,DELETE',
};

function PizzaComponent() {
  const [data, setData] = useState<Pizza[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchPizzaData();
  }, []);

  const fetchPizzaData = () => {
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => setError(error));
  };

  const handleCreate = (item: Pizza) => {
    console.log(`add item: ${JSON.stringify(item)}`);
    const { name, description } = item;

    fetch(API_URL, {
      method: 'POST',
      headers,
      body: JSON.stringify({ name, description }),
    })
      .then((response) => response.json())
      .then((returnedItem) => setData([...data, returnedItem]))
      .catch((error) => setError(error));
  };

  const handleUpdate = (updatedItem: Pizza) => {
    console.log(`update item: ${JSON.stringify(updatedItem)}`);

    fetch(`${API_URL}/${updatedItem.id}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify(updatedItem),
    })
      .then(() =>
        setData(
          data.map((item) => (item.id === updatedItem.id ? updatedItem : item))
        )
      )
      .catch((error) => setError(error));
  };

  const handleDelete = (id: number) => {
    fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
      headers,
    })
      .then(() => setData(data.filter((item) => item.id !== id)))
      .catch((error) => console.error('Error deleting item:', error));
  };

  return (
    <div>
      <PizzaList
        name={term}
        data={data}
        error={error}
        onCreate={handleCreate}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default PizzaComponent;
