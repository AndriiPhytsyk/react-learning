/* eslint react/prop-types: 0 */

import { useState } from 'react';
import Item from './Item';

export default function PackingList({ items, onDeleteItems, onToggleItems, onClearAll }) {
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
        <button onClick={onClearAll}>Clear all</button>
      </div>
    </div>
  );
}
