import { Button } from "@radix-ui/themes";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import * as styles from "./index.css";
import { UserForm } from "./user-form/user-form";
import { UserList } from "./user-list/user-list";

const ErrorFallback = ({
  error,
  resetErrorBoundary,
}: {
  error: Error;
  resetErrorBoundary: () => void;
}) => {
  return (
    <div className={styles.errorContainer}>
      <h3 className={styles.errorTitle}>Something went wrong:</h3>
      <pre className={styles.errorMessage}>{error.message}</pre>
      <Button type="button" onClick={resetErrorBoundary} className={styles.retryButton}>
        Try again
      </Button>
    </div>
  );
};

export const UsersPage = () => {
  return (
    <div className={styles.pageContainer}>
      <h1 className={styles.header}>Users Dashboard</h1>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <UserForm />
        <Suspense fallback={<div className={styles.loadingContainer}>Loading users...</div>}>
          <UserList />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};
