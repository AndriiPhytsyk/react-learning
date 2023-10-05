/* eslint react/prop-types: 0 */

import { useState } from 'react';

// const initialItems = [
//   { id: 1, description: 'Passports', quantity: 2, packed: false },
//   { id: 2, description: 'Socks', quantity: 12, packed: false }
// ];

export default function App() {
  const [items, setItems] = useState([]);

  function handleAddItems(item) {
    setItems((items) => [...items, item]);
  }

  function handleDeleteItems(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  function handleToggleItems(id) {
    setItems((items) =>
      items.map((item) => (item.id === id ? { ...item, packed: !item.packed } : item))
    );
  }

  return (
    <div className="app">
      <Logo />
      <Form onItemsAdd={handleAddItems} />
      <PackingList
        onToggleItems={handleToggleItems}
        onDeleteItems={handleDeleteItems}
        items={items}
      />
      <Stats items={items} />
    </div>
  );
}

function Logo() {
  return <h1>Far Away</h1>;
}

function Form({ onItemsAdd }) {
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();
    if (!description) return;

    const item = { description, quantity, packed: false, id: new Date().getTime() };

    onItemsAdd(item);

    setDescription('');
    setQuantity(1);
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for trip </h3>
      <select value={quantity} onChange={(e) => setQuantity(+e.target.value)}>
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option key={num} value={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Item..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button>Add</button>
    </form>
  );
}

function PackingList({ items, onDeleteItems, onToggleItems }) {
  const [sortBy, setSortBy] = useState('input');

  let sorted;

  if (sortBy === 'input') sorted = items;
  if (sortBy === 'description')
    sorted = items.slice().sort((a, b) => a.description.localeCompare(b.description));
  if (sortBy === 'packed')
    sorted = items.slice().sort((a, b) => Number(a.packed) - Number(b.packed));

  return (
    <div className="list">
      <ul>
        {sorted.map((item) => (
          <Item
            onToggleItems={onToggleItems}
            onDeleteItems={onDeleteItems}
            key={item.id}
            item={item}
          />
        ))}
      </ul>

      <div className="actions">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="input">Sort by input</option>
          <option value="description">Sort by description</option>
          <option value="packed">Sort by packed status</option>
        </select>
      </div>
    </div>
  );
}

function Item({ item, onDeleteItems, onToggleItems }) {
  return (
    <li>
      <input type="checkbox" onChange={() => onToggleItems(item.id)} />
      <span style={item.packed ? { textDecoration: 'line-through' } : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => onDeleteItems(item.id)} style={{ color: 'red' }}>
        &times;
      </button>
    </li>
  );
}

function Stats({ items }) {
  if (items.length === 0) return <p className="stats">Select some items</p>;
  const itemsLength = items.length;
  const packed = items.filter((item) => item.packed);
  const percentage = Math.round((packed.length / itemsLength) * 100);
  return (
    <footer className="stats">
      {percentage === 100
        ? 'You have everything packed. Ready to go.'
        : `You have ${itemsLength} on your list, and you already packed ${packed.length} (${percentage} %)`}
    </footer>
  );
}
