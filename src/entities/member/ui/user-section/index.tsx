import { Avatar, DropdownMenu, Skeleton } from "@radix-ui/themes";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { useAuthStore } from "@/entities/auth/model";
import { LoginDialog } from "@/entities/auth/ui";

import defaultUserImage from "@/shared/asset/default-user.jpg";
import { PAGE_ROUTES } from "@/shared/config";
import { memberQueries } from "../../model";
import * as styles from "./index.css";

export const UserSection = () => {
  const logout = useAuthStore((state) => state.logout);

  const queryClient = useQueryClient();

  const navigate = useNavigate();

  const signOut = async () => {
    try {
      await logout();
      queryClient.removeQueries({ queryKey: memberQueries.me().queryKey });
      navigate(PAGE_ROUTES.ROOT);
    } catch (err) {
      console.error(err);
    }
  };

  const { data: user, isLoading } = useQuery(memberQueries.me());

  if (isLoading) return <Skeleton width="40px" height="40px" />;

  if (user === undefined) {
    return <LoginDialog />;
  }

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger className={styles.trigger}>
        <Avatar src={user.imageUrl ?? defaultUserImage} alt="유저 이미지" fallback={user.name[0]} />
      </DropdownMenu.Trigger>
      <DropdownMenu.Content className={styles.menu} side="bottom" align="end">
        <DropdownMenu.Item onClick={signOut}>로그아웃</DropdownMenu.Item>
        <DropdownMenu.Item className={styles.deleteAccount}>계정삭제</DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};
