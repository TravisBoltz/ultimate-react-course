export default function Stats({ items }) {
  const numPacked = items.length;
  const packedItems = items.filter((item) => item.packed).length;
  const percentage = Math.round((packedItems / numPacked) * 100);
  return (
    <>
      {numPacked === 0 ? (
        <footer className="stats">Start Adding Some Items 🚀</footer>
      ) : (
        <footer className="stats">
          You have {numPacked} items on your list, and you already packed{" "}
          {packedItems} item({percentage}%)
        </footer>
      )}
    </>
  );
}
