import { useUsers } from "../../model";
import * as styles from "./user-list.css";

export const UserList = () => {
  const { data: users } = useUsers();

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>User List</h2>
      <div className={styles.listContainer}>
        {users.map((user) => (
          <div key={user.id} className={styles.userCard}>
            <h3 className={styles.userName}>{user.name}</h3>
            <p className={styles.userInfo}>
              <span className={styles.label}>Email:</span>
              {user.email}
            </p>
            <p className={styles.userInfo}>
              <span className={styles.label}>Role:</span>
              {user.role}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
