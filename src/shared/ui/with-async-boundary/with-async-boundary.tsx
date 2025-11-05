import { type ComponentProps, type ComponentType, Suspense } from "react";
import { ErrorBoundary } from "../error-boundary/error-boundary";

type ErrorBoundaryProps = ComponentProps<typeof ErrorBoundary>;

type SuspenseProps = ComponentProps<typeof Suspense>;

type AsyncBoundaryProps = {
  rejectedFallback: ErrorBoundaryProps["fallback"];
  pendingFallback: SuspenseProps["fallback"];
};

export function withAsyncBoundary<Props = Record<string, never>>(
  WrappedComponent: ComponentType<Props>,
  { rejectedFallback, pendingFallback }: AsyncBoundaryProps,
) {
  return (props: Props) => {
    return (
      <ErrorBoundary fallback={rejectedFallback}>
        <Suspense fallback={pendingFallback}>
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          <WrappedComponent {...(props as any)} />
        </Suspense>
      </ErrorBoundary>
    );
  };
}
