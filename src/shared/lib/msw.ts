import { HttpResponse, type HttpResponseResolver, http } from "msw";
import { env } from "../config";

type Method = "get" | "post" | "put" | "patch" | "delete";

interface HandlerConfig<T = unknown> {
  path: string;
  method: Method;
  resolver: HttpResponseResolver | (() => T | Promise<T>);
  status?: number;
  delay?: number;
}

const createHandler = <T = unknown>({
  path,
  method,
  resolver,
  status = 200,
  delay = 0,
}: HandlerConfig<T>) => {
  const responder: HttpResponseResolver = async (info) => {
    if (delay > 0) {
      await new Promise((resolve) => setTimeout(resolve, delay));
    }

    if (resolver.length > 0) {
      return (resolver as HttpResponseResolver)(info);
    }

    const data = await (resolver as () => T | Promise<T>)();
    return HttpResponse.json(data as Record<string, unknown>, { status });
  };

  return http[method](`${env.API_BASE_URL}${path}`, responder);
};

export const createHandlers = {
  get: <T = unknown>(
    path: string,
    resolver: HttpResponseResolver | (() => T | Promise<T>),
    options = {},
  ) => createHandler({ path, method: "get", resolver, ...options }),

  post: <T = unknown>(
    path: string,
    resolver: HttpResponseResolver | (() => T | Promise<T>),
    options = {},
  ) => createHandler({ path, method: "post", resolver, ...options }),

  put: <T = unknown>(
    path: string,
    resolver: HttpResponseResolver | (() => T | Promise<T>),
    options = {},
  ) => createHandler({ path, method: "put", resolver, ...options }),

  patch: <T = unknown>(
    path: string,
    resolver: HttpResponseResolver | (() => T | Promise<T>),
    options = {},
  ) => createHandler({ path, method: "patch", resolver, ...options }),

  delete: <T = unknown>(
    path: string,
    resolver: HttpResponseResolver | (() => T | Promise<T>),
    options = {},
  ) => createHandler({ path, method: "delete", resolver, ...options }),
};
