import { Component, type ReactNode } from "react";

type RenderFallbackProps<ErrorType extends Error = Error> = {
  error: ErrorType;
  reset: () => void;
};

interface Props {
  children: ReactNode;
  fallback: (props: RenderFallbackProps) => ReactNode;
  onReset?: () => void;
}

interface State {
  error: Error | null;
}

const initialState: State = {
  error: null,
};

export class ErrorBoundary extends Component<Props, State> {
  state: State = initialState;

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  reset = () => {
    this.props.onReset?.();
    this.setState(initialState);
  };

  render() {
    const { error } = this.state;

    console.log("error", error);

    if (error !== null) {
      return this.props.fallback({
        error,
        reset: this.reset,
      });
    }

    return this.props.children;
  }
}
