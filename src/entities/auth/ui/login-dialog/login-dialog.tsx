import { Button, Dialog, Flex } from "@radix-ui/themes";
import googleLogo from "@/shared/asset/google-logo.png";
import { GOOGLE_OAUTH_REDIRECT_URL, SESSION_STORAGE_KEYS } from "@/shared/config";
import { useAuthStore } from "../../model/auth.store";
import * as styles from "./login-dialog.css";

export const LoginDialog = () => {
  const isAuthenticated = useAuthStore((state) => !!state.accessToken);
  const authRedirectTarget = sessionStorage.getItem(SESSION_STORAGE_KEYS.AUTH_REDIRECT_TARGET);

  return (
    <Dialog.Root defaultOpen={!isAuthenticated && !!authRedirectTarget}>
      <Dialog.Trigger>
        <Button color="gray" variant="surface">
          로그인
        </Button>
      </Dialog.Trigger>
      <Dialog.Content className={styles.content} maxWidth="480px">
        <Dialog.Title size="6" align="left" weight="bold">
          시작하기
        </Dialog.Title>
        <Dialog.Description size="3" mb="5">
          Google로 1초만에 로그인하고, 여행계획을 만들어보세요!
        </Dialog.Description>

        <button
          type="button"
          className={styles.googleLoginButton}
          onClick={() => {
            window.location.href = GOOGLE_OAUTH_REDIRECT_URL;
          }}
        >
          <img src={googleLogo} alt="구글 로고" />
          Google로 로그인
        </button>

        <Flex gap="3" mt="5" justify="end">
          <Dialog.Close>
            <Button variant="soft" color="gray" size="3">
              닫기
            </Button>
          </Dialog.Close>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
};
