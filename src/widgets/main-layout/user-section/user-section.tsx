import { Avatar, DropdownMenu, Skeleton } from "@radix-ui/themes";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { LoginDialog } from "@/entities/auth";
import { useAuthStore } from "@/entities/auth/model/auth.store";
import { memberQueries, useMeQuery } from "@/entities/member";
import defaultUserImage from "@/shared/asset/default-user.jpg";
import { PAGE_ROUTES } from "@/shared/config";
import * as styles from "./user-section.css";

export const UserSection = () => {
  const accessToken = useAuthStore((state) => state.accessToken);
  const logout = useAuthStore((state) => state.logout);

  const queryClient = useQueryClient();

  const navigate = useNavigate();

  const signOut = async () => {
    try {
      await logout();
      queryClient.removeQueries({ queryKey: memberQueries.me() });
      navigate(PAGE_ROUTES.ROOT);
    } catch (err) {
      console.error(err);
    }
  };

  const { data: user, isLoading } = useMeQuery({
    enabled: !!accessToken,
  });

  if (isLoading) return <Skeleton width="40px" height="40px" />;

  if (user === undefined) {
    return <LoginDialog />;
  }

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger className={styles.trigger}>
        <Avatar
          src={user.data.imageUrl ?? defaultUserImage}
          alt="유저 이미지"
          fallback={user.data.name[0]}
        />
      </DropdownMenu.Trigger>
      <DropdownMenu.Content className={styles.menu} side="bottom" align="end">
        <DropdownMenu.Item onClick={signOut}>로그아웃</DropdownMenu.Item>
        <DropdownMenu.Item className={styles.deleteAccount}>계정삭제</DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};
