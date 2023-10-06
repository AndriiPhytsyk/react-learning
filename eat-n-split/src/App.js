/* eslint react/prop-types: 0 */

import { useState } from 'react';

const initialFriends = [
  {
    id: 118836,
    name: 'Clark',
    image: 'https://i.pravatar.cc/48?u=118836',
    balance: -7
  },
  {
    id: 933372,
    name: 'Sarah',
    image: 'https://i.pravatar.cc/48?u=933372',
    balance: 20
  },
  {
    id: 499476,
    name: 'Anthony',
    image: 'https://i.pravatar.cc/48?u=499476',
    balance: 0
  }
];

export function App() {
  // const fr = initialFriends;
  const [friends, setFriends] = useState(initialFriends);
  const [isAddFriend, setAddFriend] = useState(true);
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [splitBill, setSplitBill] = useState({});

  function handleSelectedFriend(id) {
    const selectedFriend = friends.find((friend) => friend.id === id);
    console.log(selectedFriend);
    setSelectedFriend(selectedFriend);
  }

  function handleAddFriends(user) {
    setFriends((users) => [...users, { ...user, id: new Date().getTime(), balance: 0 }]);
  }

  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList onSelectFriend={(user) => handleSelectedFriend(user)} friends={friends} />
        <FormAddFriend onAddFriends={(user) => handleAddFriends(user)} isAddFriend={isAddFriend} />
        <Button onClick={() => setAddFriend((isAddFriend) => !isAddFriend)}>Add friend</Button>
      </div>
      <FormSplitBill selectedFriend={selectedFriend} />
    </div>
  );
}

function FormAddFriend({ isAddFriend, onAddFriends }) {
  const [friendInput, setFriend] = useState({ name: '', imageUrl: '' });

  function handleInputChange(value, inputType) {
    setFriend((friendInput) => ({ ...friendInput, [inputType]: value }));
  }

  function handleAddFriend(e) {
    e.preventDefault();
    onAddFriends(friendInput);
  }

  return (
    isAddFriend && (
      <form className="form-add-friend">
        <label htmlFor="name">Friend`s name</label>
        <input
          onChange={(e) => handleInputChange(e.target.value, 'name')}
          value={friendInput.name}
          id="name"
          type="text"
        />

        <label htmlFor="url">Image URL</label>
        <input
          onChange={(e) => handleInputChange(e.target.value, 'imageUrl')}
          value={friendInput.imageUrl}
          id="url"
          type="text"
        />
        <Button onClick={handleAddFriend}>Add</Button>
      </form>
    )
  );
}

function FriendsList({ friends, onSelectFriend }) {
  return (
    <div>
      <ul>
        {friends.map((friend) => (
          <Friend onSelectFriend={(id) => onSelectFriend(id)} key={friend.id} friend={friend} />
        ))}
      </ul>
    </div>
  );
}

function Friend({ friend, onSelectFriend }) {
  function onError(e) {
    console.log(e);
    e.target.src = 'https://cdn-icons-png.flaticon.com/512/149/149071.png';
  }
  return (
    <div>
      <li onClick={() => onSelectFriend(friend.id)}>
        <h3>{friend.name}</h3>
        <img
          src={friend.image}
          onError={({ currentTarget }) => {
            console.log(currentTarget);
            currentTarget.onerror = null; // prevents looping
            currentTarget.src = 'public/logo192.png';
          }}
          alt={friend.name}
        />
        {friend.balance < 0 && (
          <p className="red">
            You owe {friend.name} {Math.abs(friend.balance)}
          </p>
        )}

        {friend.balance > 0 && (
          <p className="green">
            {friend.name} owes you {Math.abs(friend.balance)}
          </p>
        )}

        <p>{friend.balance === 0 && `You and ${friend.name} are even`}</p>
        <Button>Select</Button>
      </li>
    </div>
  );
}

function FormSplitBill({ selectedFriend }) {
  const [formSplitBill, setFormSplitBill] = useState({
    billValue: '',
    myExpense: '',
    friendsExpense: '',
    whoPays: 'you'
  });
  function onInputChange(value, inputType) {
    setFormSplitBill((billForm) => {...billForm, [inputType]: value})
  }

  function handleSplitBill() {}
  return (
    <form className="form-split-bill">
      <h2>Split a bill with {selectedFriend?.name}</h2>

      <label>Bill value</label>
      <input
        value={formSplitBill.billValue}
        onChange={(e) => onInputChange(e.target.value, 'billValue')}
        type="text"
      />

      <label>Your expense value</label>
      <input
        value={formSplitBill.myExpense}
        type="text"
        onChange={(e) => onInputChange(e.target.value, 'myExpense')}
      />

      <label>X expense</label>
      <input value={formSplitBill.friendsExpense} disabled type="text" />

      <label>Who is paying the bill</label>
      <select
        value={formSplitBill.whoPays}
        onChange={(e) => onInputChange(e.target.value, 'whoPays')}>
        <option value="user">User</option>
        <option value={selectedFriend?.id}>{selectedFriend?.name}</option>
      </select>
      <Button onClick={() => handleSplitBill()}>Split bill</Button>
    </form>
  );
}

function Button({ onClick, children }) {
  return (
    <button onClick={onClick} type="button" className="button">
      {children}
    </button>
  );
}
