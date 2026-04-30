import "./profile.css";

export default function Profile() {
  // MOCK USER (do vijë nga login më vonë)
  const user = {
    name: "Guest User",
    email: "guest@email.com",
    balance: 120.5,
    orders: 8,
    wishlist: 14,
    address: "Tirana, Albania",
    memberSince: "2025",
  };

  return (
    <div className="container">
      <h1 className="title">My Account</h1>

      {/* HEADER CARD */}
      <div className="profileCard">
        <img src="https://i.pravatar.cc/150" alt="avatar" />

        <div>
          <h2>{user.name}</h2>
          <p>{user.email}</p>
          <span className="muted">Member since {user.memberSince}</span>
        </div>
      </div>

      {/* BALANCE */}
      <div className="balanceCard">
        <h3>Wallet Balance</h3>
        <h2>${user.balance.toFixed(2)}</h2>
      </div>

      {/* STATS */}
      <div className="stats">
        <div className="statBox">
          <h3>{user.orders}</h3>
          <p>Orders</p>
        </div>

        <div className="statBox">
          <h3>{user.wishlist}</h3>
          <p>Wishlist</p>
        </div>
      </div>

      {/* ADDRESS */}
      <div className="infoCard">
        <h3>📍 Shipping Address</h3>
        <p>{user.address}</p>
      </div>

      {/* ACTIONS */}
      <div className="actions">
        <button>Edit Profile</button>
        <button>My Orders</button>
        <button>Payment Methods</button>
        <button className="logout">Logout</button>
      </div>
    </div>
  );
}