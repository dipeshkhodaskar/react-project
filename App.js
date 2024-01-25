// src/App.js
import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import './App.css';

const Navbar = styled.nav`
  background-color: #333;
  padding: 15px;
  color: white;
  text-align: center;
`;

const BrandName = styled.span`
  font-size: 1.5em;
  font-weight: bold;
`;

const Button = styled.button`
  background-color: #61dafb;
  color: white;
  padding: 10px 15px;
  border: none;
  cursor: pointer;
`;

const Loader = styled.div`
  border: 6px solid #f3f3f3;
  border-top: 6px solid #3498db;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
  margin: auto;
  margin-top: 20px;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const UserCardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  padding: 20px;
`;

const UserCard = styled.div`
  border: 1px solid #ddd;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
`;

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const getUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get('https://reqres.in/api/users?page=1');
      setUsers(response.data.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar>
        <BrandName>User Card App</BrandName>
        <Button onClick={getUsers}>Get Users</Button>
      </Navbar>

      {loading && <Loader />}

      <UserCardGrid>
        {users.map((user) => (
          <UserCard key={user.id}>
            <img src={user.avatar} alt={user.first_name} />
            <h3>{`${user.first_name} ${user.last_name}`}</h3>
            <p>{user.email}</p>
          </UserCard>
        ))}
      </UserCardGrid>
    </div>
  );
}

export default App;
