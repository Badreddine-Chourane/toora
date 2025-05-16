import { useEffect, useState } from 'react';
import userAPI from '../../../api/users';

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    userAPI.list()
      .then(res => setUsers(res.data))
      .catch(() => setUsers([]));
  }, [refresh]);

  const handleRoleChange = (id, newRole) => {
    userAPI.update(id, { role: newRole })
      .then(() => setRefresh(r => !r));
  };

  const handleDelete = (id) => {
    userAPI.delete(id)
      .then(() => setRefresh(r => !r));
  };

  const handleEdit = (user) => {
    const name = prompt('Edit name:', user.name);
    const email = prompt('Edit email:', user.email);
    const role = prompt('Edit role (user/admin):', user.role);
    if (name && email && role) {
      userAPI.update(user.id, { name, email, role })
        .then(() => setRefresh(r => !r));
    }
  };

  return (
    <div className="container mt-4">
      <h3>Users</h3>
      <table className="table">
        <thead>
          <tr>
            <th>Email</th>
            <th>Name</th>
            <th>Role</th>
            <th>Change Role</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u.id}>
              <td>{u.email}</td>
              <td>{u.name}</td>
              <td>{u.role}</td>
              <td>
                <select
                  value={u.role}
                  onChange={e => handleRoleChange(u.id, e.target.value)}
                  className="form-select"
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </td>
              <td>
                <button className="btn btn-info btn-sm" onClick={() => handleEdit(u)}>
                  Edit
                </button>
              </td>
              <td>
                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(u.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersList;