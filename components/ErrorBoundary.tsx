"use client";

import React from "react";

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Error caught by boundary:", error, errorInfo);
    this.setState({ error, errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gradient-to-b from-red-50 to-orange-50 flex items-center justify-center p-4">
          <div className="max-w-2xl w-full bg-white rounded-3xl shadow-xl p-8">
            <div className="text-center mb-6">
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl">⚠️</span>
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Oops! Ada Kesalahan
              </h1>
              <p className="text-gray-600">
                Aplikasi mengalami error. Berikut detailnya:
              </p>
            </div>

            <div className="bg-gray-100 rounded-2xl p-4 mb-6 overflow-auto max-h-96">
              <p className="font-mono text-sm text-red-600 mb-2">
                <strong>Error:</strong> {this.state.error?.message}
              </p>
              <p className="font-mono text-xs text-gray-700 whitespace-pre-wrap">
                {this.state.error?.stack}
              </p>
              {this.state.errorInfo && (
                <details className="mt-4">
                  <summary className="cursor-pointer text-sm font-semibold text-gray-700">
                    Component Stack
                  </summary>
                  <pre className="font-mono text-xs text-gray-600 mt-2 whitespace-pre-wrap">
                    {this.state.errorInfo.componentStack}
                  </pre>
                </details>
              )}
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => window.location.reload()}
                className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold py-3 px-6 rounded-2xl hover:shadow-lg transition-all"
              >
                Muat Ulang Halaman
              </button>
              <button
                onClick={() => window.history.back()}
                className="flex-1 bg-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-2xl hover:bg-gray-300 transition-all"
              >
                Kembali
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
