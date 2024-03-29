/* eslint react/prop-types: 0 */

import { useState } from 'react';

const initialFriends = [
  {
    id: 118836,
    name: 'Clark',
    imageUrl: 'https://i.pravatar.cc/48?u=118836',
    balance: -7
  },
  {
    id: 933372,
    name: 'Sarah',
    imageUrl: 'https://i.pravatar.cc/48?u=933372',
    balance: 20
  },
  {
    id: 499476,
    name: 'Anthony',
    imageUrl: 'https://i.pravatar.cc/48?u=499476',
    balance: 0
  }
];

export function App() {
  const [friends, setFriends] = useState(initialFriends);
  const [isAddFriend, setAddFriend] = useState(true);
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [splitBill, setSplitBill] = useState({});

  function handleSelectedFriend(id) {
    const selectedFriend = friends.find((friend) => friend.id === id);
    setSelectedFriend((selected) => (selected?.id === id ? null : selectedFriend));
  }

  function handleAddFriends(user) {
    setFriends((users) => [...users, user]);
    setAddFriend(false);
  }

  function handleOnSplitBill(splitBillForm) {
    const { billValue, myExpense } = splitBillForm;
    const balance =
      splitBillForm.whoPays === 'user' ? +billValue - +myExpense : +myExpense - +billValue;
    setFriends((friends) =>
      friends.map((friend) => (friend.id === selectedFriend.id ? { ...friend, balance } : friend))
    );
  }

  function handleFriendClick(id) {
    console.log(id);
    const status = selectedFriend.id === id;
    if (status) {
      setSelectedFriend(null);
    }
  }

  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList
          selectedFriend={selectedFriend}
          onSelectFriend={(user) => handleSelectedFriend(user)}
          onFriendClick={(userId) => handleFriendClick(userId)}
          friends={friends}
        />
        <FormAddFriend onAddFriends={(user) => handleAddFriends(user)} isAddFriend={isAddFriend} />
        <Button onClick={() => setAddFriend((isAddFriend) => !isAddFriend)}>Add friend</Button>
      </div>
      {selectedFriend && (
        <FormSplitBill
          onSplitBill={(splitBillForm) => handleOnSplitBill(splitBillForm)}
          selectedFriend={selectedFriend}
        />
      )}
    </div>
  );
}

function FormAddFriend({ isAddFriend, onAddFriends }) {
  const [friendInput, setFriend] = useState({
    name: '',
    imageUrl: 'https://i.pravatar.cc/48'
  });

  function handleInputChange(value, inputType) {
    setFriend((friendInput) => ({ ...friendInput, [inputType]: value }));
  }

  function handleAddFriend(e) {
    e.preventDefault();
    const id = crypto.randomUUID();
    const friend = { ...friendInput, id, imageUrl: `${friendInput.imageUrl}?=${id}` };
    onAddFriends(friend);
  }

  return (
    isAddFriend && (
      <form className="form-add-friend">
        <label htmlFor="name">Friend`s name</label>
        <input
          onChange={(e) => handleInputChange(e.target.value, 'name')}
          value={friendInput?.name}
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

function FriendsList({ friends, onSelectFriend, selectedFriend, onFriendClick }) {
  return (
    <div>
      <ul>
        {friends.map((friend) => (
          <Friend
            onFriendClick={onFriendClick}
            selectedFriend={selectedFriend}
            onSelectFriend={(id) => onSelectFriend(id)}
            key={friend.id}
            friend={friend}
          />
        ))}
      </ul>
    </div>
  );
}

function Friend({ friend, onSelectFriend, selectedFriend, onFriendClick }) {
  const isSelected = selectedFriend?.id === friend.id;

  console.log(selectedFriend);

  return (
    <div>
      <li className={isSelected ? 'selected' : ''} onClick={() => onSelectFriend(friend.id)}>
        <h3>{friend.name}</h3>
        <img src={friend.imageUrl} alt={friend.name} />
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
        <Button onClick={onFriendClick}>{isSelected ? 'Close' : 'Select'}</Button>
      </li>
    </div>
  );
}

function FormSplitBill({ selectedFriend, onSplitBill }) {
  const [formSplitBill, setFormSplitBill] = useState({
    billValue: '',
    myExpense: '',
    friendsExpense: '',
    whoPays: 'you'
  });
  function onInputChange(value, inputType) {
    setFormSplitBill((billForm) => ({ ...billForm, [inputType]: value }));
  }

  function handleSplitBill() {
    onSplitBill(formSplitBill);
  }
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

      <label>{selectedFriend?.name} expense</label>
      <input value={formSplitBill.billValue - formSplitBill.myExpense} disabled type="text" />

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
