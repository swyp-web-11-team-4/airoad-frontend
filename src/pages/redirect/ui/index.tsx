import { Flex, Heading, Spinner, Text } from "@radix-ui/themes";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { useAuthStore } from "@/entities/auth/model/auth.store";
import { PAGE_ROUTES, SESSION_STORAGE_KEYS, URL_QUERY_KEYS } from "@/shared/config";

export const RedirectPage = () => {
  const setTokens = useAuthStore((state) => state.setTokens);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const accessToken = params.get(URL_QUERY_KEYS.ACCESS_TOKEN);
    const refreshToken = params.get(URL_QUERY_KEYS.REFRESH_TOKEN);

    const redirect = async () => {
      const authRedirectTarget = sessionStorage.getItem(SESSION_STORAGE_KEYS.AUTH_REDIRECT_TARGET);

      if (authRedirectTarget) {
        await navigate(authRedirectTarget);
      } else {
        await navigate(PAGE_ROUTES.ROOT);
      }

      sessionStorage.removeItem(SESSION_STORAGE_KEYS.AUTH_REDIRECT_TARGET);
    };

    if (accessToken && refreshToken) {
      setTokens({ accessToken, refreshToken });
      redirect();
    } else {
      /* TODO 인증 리다이렉트 실패 처리 */
      navigate(PAGE_ROUTES.ROOT);
    }
  }, [location, setTokens, navigate]);

  return (
    <Flex justify="center" align="center" direction="column" gap="26px" minHeight="100vh">
      <Flex justify="center" align="center" direction="column" gap="12px">
        <Heading size="6" align="left" weight="bold">
          로그인 진행 중
        </Heading>
        <Text size="4" weight="regular">
          Google 로그인 진행중입니다. 잠시만 기다려주세요.
        </Text>
      </Flex>
      <Flex justify="center" align="center" height="60px">
        <Spinner size="3" />
      </Flex>
    </Flex>
  );
};
