import { useMemo, useState } from "react";
import { AiFillCloseCircle, AiFillCheckCircle } from "react-icons/ai";

interface Item {
  id: number;
  name: string;
  price: number;
  count: number;
  status: "wish" | "bought" | "cancelled";
}

// let key = 1;

function App() {
  const [items, setItems] = useState<Item[]>([
    {
      id: 0,
      name: "Cámara digital",
      price: 100,
      count: 1,
      status: "wish",
    },
  ]);

  let key = 1;
  const total = useMemo(() => {
    // @TODO: Should implement
    return items.reduce((acc, item) => {
      return acc + item.price * item.count;
    }, 0);
  }, [items]);
  const isValid = useMemo(() => {
    return !items.some((item) => {
      return item.name && item.status && item.count >= 0 && item.price >= 0;
    });
  }, [items]);

  function handleAdd() {
    setItems((items) => {
      // @TODO: Should implement
      return items.concat({
        id: ++key,
        name: "",
        price: 0,
        count: 1,
        status: "wish",
      });
    });
  }

  function handleEdit(item: Item) {
    setItems((items) => {
      // @TODO: Should implement
      return items.map((_item) => (_item.id === item.id ? item : _item));
    });
  }

  function handleRemove(item: Item) {
    setItems((items) => {
      // @TODO: Should implement
      return items.filter((_item) => item.id !== _item.id);
    });
  }

  return (
    <main>
      <h1>ACWincy</h1>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <input
              value={item.name}
              onChange={(event) =>
                handleEdit({ ...item, name: event.target.value })
              }
            />
            <input
              style={{ width: 96 }}
              value={item.price}
              onChange={(event) =>
                handleEdit({ ...item, price: Number(event.target.value) })
              }
            />
            <input
              style={{ width: 96 }}
              value={item.count}
              onChange={(event) =>
                handleEdit({ ...item, count: Number(event.target.value) })
              }
            />
            <select
              value={item.status}
              onChange={(event) =>
                handleEdit({
                  ...item,
                  status: event.target.value as Item["status"],
                })
              }
            >
              <option value="wish">Wish</option>
              <option value="bought">Bought</option>
              <option value="cancelled">Cancelled</option>
            </select>
            <button onClick={() => handleRemove(item)}> Delete </button>
          </li>
        ))}
      </ul>
      <button onClick={handleAdd}>Add item</button>
      <p>
        Are items valid?:{" "}
        {isValid ? <AiFillCloseCircle /> : <AiFillCheckCircle />}
      </p>
      <p>Total: ${total}</p>
    </main>
  );
}

export default App;
