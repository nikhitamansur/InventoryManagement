import React, { useEffect, useState } from 'react';
import { getItems, addItem, updateItem, deleteItem } from './services/itemService';

function App() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({ name: '', quantity: 0, category: '', price: 0 });

  useEffect(() => {
    const fetchItems = async () => {
      const items = await getItems();
      setItems(items);
    };
    fetchItems();
  }, []);

  const handleAddItem = async () => {
    const addedItem = await addItem(newItem);
    setItems([...items, addedItem]);
    setNewItem({ name: '', quantity: 0, category: '', price: 0 });
  };

  const handleUpdateItem = async (id) => {
    const updatedItem = await updateItem(id, newItem);
    setItems(items.map((item) => (item._id === id ? updatedItem : item)));
  };

  const handleDeleteItem = async (id) => {
    await deleteItem(id);
    setItems(items.filter((item) => item._id !== id));
  };

  return (
    <div>
      <h1>Inventory Management System</h1>
      <input
        type="text"
        placeholder="Item Name"
        value={newItem.name}
        onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
      />
      <input
        type="number"
        placeholder="Quantity"
        value={newItem.quantity}
        onChange={(e) => setNewItem({ ...newItem, quantity: parseInt(e.target.value) })}
      />
      <input
        type="text"
        placeholder="Category"
        value={newItem.category}
        onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
      />
      <input
        type="number"
        placeholder="Price"
        value={newItem.price}
        onChange={(e) => setNewItem({ ...newItem, price: parseFloat(e.target.value) })}
      />
      <button onClick={handleAddItem}>Add Item</button>

      <ul>
        {items.map((item) => (
          <li key={item._id}>
            {item.name} - {item.quantity} - {item.category} - ${item.price}
            <button onClick={() => handleUpdateItem(item._id)}>Update</button>
            <button onClick={() => handleDeleteItem(item._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
