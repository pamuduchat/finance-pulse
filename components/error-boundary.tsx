import React, { Component, ReactNode } from "react";

type ErrorBoundaryState = {
  hasError: boolean;
  error?: Error;
};

type ErrorBoundaryProps = {
  children: ReactNode;
};

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  // Update state if an error occurs
  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  // Log the error (you can log it to an error reporting service like Sentry)
  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error("Error caught by Error Boundary:", error, info);
  }

  render() {
    if (this.state.hasError) {
      // Fallback UI when error occurs
      return (
        <div>
          <h2>Something went wrong.</h2>
          <p>We encountered an unexpected error. Please try again later.</p>
        </div>
      );
    }

    // If no error, render children components
    return this.props.children;
  }
}

export default ErrorBoundary;
