/* eslint react/prop-types: 0 */

export default function Stats({ items }) {
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
