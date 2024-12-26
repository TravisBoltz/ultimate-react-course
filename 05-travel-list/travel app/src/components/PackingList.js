import { useState } from "react";
export default function PackingList({
  items,
  onDeleteItem,
  onCheckItem,
  onClear,
}) {
  const [sortBy, setSortBy] = useState("packed");

  let sortedItems = [...items];

  if (sortBy === "input") {
    sortedItems = sortedItems.sort((a, b) => a.id - b.id);
  }

  if (sortBy === "description") {
    sortedItems = sortedItems.sort((a, b) =>
      a.description.localeCompare(b.description)
    );
  }

  if (sortBy === "packed") {
    sortedItems = sortedItems.sort(
      (a, b) => Number(a.packed) - Number(b.packed)
    );
  }

  return (
    <>
      <div className="flex justify-center gap-4 bg-[#5a3e2b] pt-10">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="input">Sort by Input</option>
          <option value="description">Sort by Description</option>
          <option value="packed">Sort by Packed</option>
        </select>
        <button onClick={onClear}>Clear List</button>
      </div>
      <div className="list p-20">
        {sortedItems.map((item) => (
          <Item
            key={item.id}
            item={item}
            onDeleteItem={onDeleteItem}
            onCheckItem={onCheckItem}
          />
        ))}
      </div>
    </>
  );
}
function Item({ item, onDeleteItem, onCheckItem }) {
  return (
    <div>
      <li key={item.id}>
        {" "}
        <input
          type="checkbox"
          value={item.packed}
          onChange={() => onCheckItem(item.id)}
        />{" "}
        <span className={`${item.packed ? "line-through" : ""}`}>
          {item.quantity} - {item.description}
        </span>{" "}
        <button className="text-red" onClick={() => onDeleteItem(item.id)}>
          ❌
        </button>
      </li>
    </div>
  );
}
