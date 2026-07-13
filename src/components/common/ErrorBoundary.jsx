import { Component } from 'react'

/**
 * ErrorBoundary — Catches unhandled React rendering errors
 * and displays a user-friendly fallback UI instead of a blank white screen.
 */
class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo)
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null })
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
          <div className="max-w-md w-full text-center">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h1 className="text-2xl font-extrabold text-gray-900 mb-3">Something went wrong</h1>
            <p className="text-gray-500 mb-8 text-sm leading-relaxed">
              We encountered an unexpected error. Please try refreshing the page or go back to the homepage.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={this.handleReset}
                className="px-6 py-3 bg-[#2E7D32] text-white font-bold text-sm rounded-xl hover:bg-[#1B5E20] transition-colors shadow-sm"
              >
                Try Again
              </button>
              <a
                href="/"
                className="px-6 py-3 bg-white text-gray-700 font-bold text-sm rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors shadow-sm"
              >
                Go to Homepage
              </a>
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
