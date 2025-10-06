import { useId, useState } from "react";
import { useCreateUser } from "../../api";
import * as styles from "./UserForm.css";

export const UserForm = () => {
  const nameId = useId();
  const emailId = useId();
  const roleId = useId();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  const { mutate: createUser, isPending, isSuccess, isError, error } = useCreateUser();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    createUser(
      { name, email, role },
      {
        onSuccess: () => {
          setName("");
          setEmail("");
          setRole("");
        },
      },
    );
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>새 사용자 추가</h2>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor={nameId} className={styles.label}>
            이름
          </label>
          <input
            id={nameId}
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={styles.input}
            required
            placeholder="홍길동"
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor={emailId} className={styles.label}>
            이메일
          </label>
          <input
            id={emailId}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.input}
            required
            placeholder="example@email.com"
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor={roleId} className={styles.label}>
            역할
          </label>
          <input
            id={roleId}
            type="text"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className={styles.input}
            required
            placeholder="Developer"
          />
        </div>

        <button type="submit" className={styles.button} disabled={isPending}>
          {isPending ? "생성 중..." : "사용자 생성"}
        </button>

        {isSuccess && (
          <div className={styles.successMessage}>사용자가 성공적으로 생성되었습니다!</div>
        )}

        {isError && (
          <div className={styles.errorMessage}>
            에러 발생: {error instanceof Error ? error.message : "알 수 없는 에러"}
          </div>
        )}
      </form>
    </div>
  );
};
