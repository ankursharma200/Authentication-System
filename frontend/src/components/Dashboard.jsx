import { useState, useEffect } from 'react';
import { changePassword } from '../api';
import { jwtDecode } from "jwt-decode";

const Dashboard = ({ token, onLogout }) => {
  const [user, setUser] = useState(null);
  const [passData, setPassData] = useState({ oldPassword: '', newPassword: '' });

  useEffect(() => {
    try {
      if (token) {
        const decoded = jwtDecode(token);
        setUser(decoded);
      }
    } catch (error) {
      console.error("Invalid token found, logging out...", error);
      localStorage.removeItem('token');
      onLogout(); 
    }
  }, [token, onLogout]);

  const handleChangePass = async (e) => {
    e.preventDefault();
    try {
      const res = await changePassword(passData, token);
      alert(res.data.msg);
    } catch (err) {
      alert(err.response?.data?.msg || 'Error');
    }
  };

  return (
    <div>
      <h1>Welcome, {user?.name|| "user"}!</h1>
      <p>Email: {user?.email}</p>
      <button onClick={onLogout}>Logout</button>
      
      <hr />
     <div style={{ marginTop: '20px', marginBottom: '20px', padding: '15px', border: '1px solid #444', borderRadius: '8px', backgroundColor: '#222' }}>
        <h3 style={{ marginTop: 0 }}>Access Token Grants</h3>
        <p><strong>Role:</strong> {user?.role || "User"}</p>
        <p><strong>Permissions:</strong> {user?.grants ? user.grants.join(", ") : "None"}</p>
      </div>
      <h3>Change Password</h3>
      <form onSubmit={handleChangePass}>
        <input type="password" placeholder="Old Password" onChange={e => setPassData({...passData, oldPassword: e.target.value})} required />
        <input type="password" placeholder="New Password" onChange={e => setPassData({...passData, newPassword: e.target.value})} required />
        <button type="submit">Update Password</button>
      </form>
    </div>
  );
};
export default Dashboard;