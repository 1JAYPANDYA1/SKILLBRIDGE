import { useParams } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

const ResetPassword = () => {
  const { resetToken } = useParams();
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
<<<<<<< HEAD
  const myIP = import.meta.env.VITE_MY_IP;
=======
  const myIP = import.meta.env.VITE_BACKEND_URL;
>>>>>>> 2cca578 (Initial commit or reconnect)

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
<<<<<<< HEAD
      await axios.post(`http://${myIP}:3000/auth/reset-password/${resetToken}`, { password });
=======
      await axios.post(`${myIP}/auth/reset-password/${resetToken}`, { password });
>>>>>>> 2cca578 (Initial commit or reconnect)
      setMessage('Password has been reset successfully!');
    } catch (error) {
      setMessage('Error resetting password. Please try again.');
    }
  };

  return (
    <div>
      <h2>Reset Password</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="password">New Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Reset Password</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ResetPassword;
