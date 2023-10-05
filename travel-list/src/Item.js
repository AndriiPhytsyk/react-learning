/* eslint react/prop-types: 0 */

export default function Item({ item, onDeleteItems, onToggleItems }) {
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
