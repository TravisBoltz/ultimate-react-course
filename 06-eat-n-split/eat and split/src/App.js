// import "./App.css";
// import { useState } from "react";

// const initialFriends = [
//   {
//     id: 118836,
//     name: "Clark",
//     image: "https://i.pravatar.cc/48?u=118836",
//     balance: -7,
//   },
//   {
//     id: 933372,
//     name: "Sarah",
//     image: "https://i.pravatar.cc/48?u=933372",
//     balance: 20,
//   },
//   {
//     id: 499476,
//     name: "Anthony",
//     image: "https://i.pravatar.cc/48?u=499476",
//     balance: 0,
//   },
// ];

// function App() {
//   const [friends, setFriends] = useState(initialFriends);
//   const [showFriend, setShowFriend] = useState(true);
//   const [selectFriend, setSelectedFriend] = useState(null);

//   function toggleFriend() {
//     setShowFriend((showFriend) => !showFriend);
//   }

//   function AddFriend(friend) {
//     setFriends((friends) => [...friends, friend]);
//   }

//   function handleSelection(friend) {
//     setSelectedFriend((cur) => (cur?.id === friend.id ? null : friend));
//     setShowFriend(false);
//   }

//   function handleSplitBill(value) {
//     setFriends((friends) =>
//       friends.map((friend) =>
//         friend.id === selectFriend.id
//           ? { ...friend, balance: friend.balance + value }
//           : friend
//       )
//     );

//     setSelectedFriend(null);
//   }

//   return (
//     <div className="app">
//       <div className="sidebar">
//         <FriendList
//           friends={friends}
//           onAddFriend={AddFriend}
//           onSelectedFriend={handleSelection}
//           selectFriend={selectFriend}
//         />
//         {showFriend && <FormAddFriend onAddFriend={AddFriend} />}
//         <button className="button" onClick={toggleFriend}>
//           {showFriend ? "Close" : "Add Friend"}
//         </button>
//       </div>
//       {selectFriend && (
//         <FormSplitBill
//           selectFriend={selectFriend}
//           onSplitBill={handleSplitBill}
//         />
//       )}
//     </div>
//   );
// }

// function FriendList({ friends, onSelectedFriend, selectFriend }) {
//   return (
//     <div className="sidebar">
//       <h1 className="text-3xl font-bold">List of Friends</h1>
//       <ul>
//         {friends.map((friend) => (
//           <Friend
//             key={friend.id}
//             friend={friend}
//             onSelectedFriend={onSelectedFriend}
//             selectFriend={selectFriend}
//           />
//         ))}
//       </ul>
//     </div>
//   );
// }

// function Friend({ friend, onSelectedFriend, selectFriend }) {
//   const isSelected = selectFriend?.id === friend.id;

//   return (
//     <li className={isSelected ? "selected" : ""}>
//       <img alt={friend.name} src={friend.image} />
//       <h3>{friend.name}</h3>
//       {friend.balance < 0 && (
//         <p className="red">
//           You owe {friend.name} GH¢{Math.abs(friend.balance)}.00
//         </p>
//       )}
//       {friend.balance > 0 && (
//         <p className="green">
//           {friend.name} owes you GH¢{Math.abs(friend.balance)}.00
//         </p>
//       )}
//       {friend.balance === 0 && <p>{friend.name} and you are even</p>}
//       <Button onClick={() => onSelectedFriend(friend)}>
//         {isSelected ? "Close" : "Select"}
//       </Button>
//     </li>
//   );
// }

// function Button({ children, onClick }) {
//   return (
//     <button className="button" onClick={onClick}>
//       {children}
//     </button>
//   );
// }

// function FormAddFriend({ onAddFriend }) {
//   const [name, setName] = useState("");
//   const [image, setImage] = useState("https://i.pravatar.cc/48");

//   function handleSubmit(e) {
//     e.preventDefault();

//     if (!name || !image) return;

//     const id = crypto.randomUUID();
//     const newFriend = {
//       id,
//       name,
//       image: `${image}?=${id}`,
//       balance: 0,
//     };

//     onAddFriend(newFriend);
//     setName("");
//     setImage("https://i.pravatar.cc/48");
//   }

//   return (
//     <form className="form-add-friend" onSubmit={handleSubmit}>
//       <label>🫂 Friend name</label>
//       <input
//         type="text"
//         value={name}
//         onChange={(e) => setName(e.target.value)}
//       />
//       <label>🖼️ Image URL</label>
//       <input
//         type="text"
//         value={image}
//         onChange={(e) => setImage(e.target.value)}
//       />
//       <Button>Add</Button>
//     </form>
//   );
// }

// function FormSplitBill({ selectFriend, onSplitBill }) {
//   const [bill, setBill] = useState("");
//   const [myExpense, setMyExpense] = useState("");
//   const [whoIsPaying, setWhoIsPaying] = useState("user");

//   const friendExpense = bill ? bill - myExpense : "";

//   function handleSubmit(e) {
//     e.preventDefault();

//     if (!bill || !myExpense) return;

//     const value = whoIsPaying === "user" ? friendExpense : -myExpense;
//     onSplitBill(value);
//   }

//   return (
//     <form className="form-split-bill" onSubmit={handleSubmit}>
//       <h2>Split a bill with {selectFriend.name}</h2>

//       <label>💰 Bill Value</label>
//       <input
//         type="number"
//         value={bill}
//         onChange={(e) => setBill(Number(e.target.value))}
//       />

//       <label>💵 Your expense</label>
//       <input
//         type="number"
//         value={myExpense}
//         onChange={(e) =>
//           setMyExpense(
//             Number(e.target.value) > bill ? myExpense : Number(e.target.value)
//           )
//         }
//       />

//       <label>🏧 {selectFriend.name}'s expense</label>
//       <input type="text" disabled value={friendExpense} />

//       <label>🚀 Who is paying the bill?</label>
//       <select
//         value={whoIsPaying}
//         onChange={(e) => setWhoIsPaying(e.target.value)}
//       >
//         <option value="user">You</option>
//         <option value="friend">{selectFriend.name}</option>
//       </select>

//       <Button>Split bill</Button>
//     </form>
//   );
// }

// export default App;

import "./App.css";
import { useState } from "react";
const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

function App() {
  const [friends, setFriends] = useState(initialFriends);
  const [showFriend, setShowFriend] = useState(true);
  const [selectFriend, setSelectedFriend] = useState(null);

  function toggleFriend() {
    setShowFriend((showFriend) => !showFriend);
  }
  function AddFriend(friend) {
    setFriends((friends) => [...friends, friend]);
  }
  function handleSelection(friend) {
    // setSelectedFriend(friend);
    setSelectedFriend((cur) => (cur?.id === friend.id ? null : friend));
  }
  return (
    <div className="app">
      <div className="sidebar">
        <FriendList
          friends={friends}
          onAddFriend={AddFriend}
          onSelectedFriend={handleSelection}
          selectFriend={selectFriend}
        />
        {showFriend && <FormAddFriend onAddFriend={AddFriend} />}
        <button className="button" onClick={toggleFriend}>
          {showFriend ? "Close" : "Add Friend"}
        </button>{" "}
      </div>
      {selectFriend && <FormSplitBill selectFriend={selectFriend} />}
    </div>
  );
}

export default App;

function FriendList({ friends, onSelectedFriend, selectFriend }) {
  return (
    <div className="sidebar">
      <h1 className="text-3xl font-bold">List of Friends</h1>
      {friends.map((friend) => (
        <ul>
          <Friend
            friend={friend}
            onSelectedFriend={onSelectedFriend}
            selectFriend={selectFriend}
          />
        </ul>
      ))}{" "}
    </div>
  );
}

function Friend({ friend, onSelectedFriend, selectFriend }) {
  const isSelected = selectFriend?.id === friend.id;
  return (
    <li className={`${isSelected ? "selected" : ""}`} key={friend.id}>
      <img alt={friend.name} src={friend.image} />
      <h3> {friend.name}</h3>
      {friend.balance < 0 && (
        <p className="red">
          {friend.name} owes you GH¢{Math.abs(friend.balance)}.00
        </p>
      )}
      {friend.balance > 0 && (
        <p className="green">
          {friend.name} owes you GH¢{Math.abs(friend.balance)}.00
        </p>
      )}{" "}
      {friend.balance === 0 && (
        <p className="">{friend.name} and you are even</p>
      )}
      <Button onClick={() => onSelectedFriend(friend)}>
        {isSelected ? "Close" : "Select"}
      </Button>
    </li>
  );
}

function Button({ children, onClick }) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}

function FormAddFriend({ onAddFriend }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/48");
  function handleSubmit(e) {
    e.preventDefault();

    if (!name || !image) return;
    const id = crypto.randomUUID();
    const newFriend = {
      id,
      name,
      image: `${image}?=${id}`,
      balance: 0,
    };
    onAddFriend(newFriend);
    setName("");
    setImage("https://i.pravatar.cc/48");
    console.log(newFriend);
  }
  return (
    <form className="form-add-friend  " onSubmit={handleSubmit}>
      <label>🫂Friend name </label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <label>🖼️ Image Url </label>
      <input
        type="text"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />
      <Button>Add</Button>
    </form>
  );
}

function FormSplitBill({ selectFriend }) {
  return (
    <form className="form-split-bill">
      <h2>Split a bill with {selectFriend.name}</h2>
      <label>💰 Bill Value </label>
      <input type="text" /> <label>💵 Your expense </label>
      <input type="text" /> <label>🏧 {selectFriend.name}'s expense</label>
      <input type="text" disabled /> <label>🚀 Who is paying the bill?</label>
      <select>
        <option value={"me"}>You</option>
        <option value={"other"}>{selectFriend.name}</option>
      </select>
      <Button>Split bill</Button>
    </form>
  );
}
