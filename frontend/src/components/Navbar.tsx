import { Link } from "react-router-dom";
import { ThemeToggle } from "./ThemeToggle";

export default function Navbar({
  isAuth,
  onLogout,
}: {
  isAuth: boolean;
  onLogout: () => void;
}) {
  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background-light/80 backdrop-blur-md dark:bg-background-dark/80 dark:border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-2 text-xl font-bold text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
          >
            <img src="/logo.png" alt="JobTracker Logo" className="h-7" />
            JobTracker
          </Link>

          <div className="flex items-center gap-2">
            {isAuth ? (
              <>
                <Link
                  to="/dashboard"
                  className="px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                >
                  Dashboard
                </Link>
                <Link
                  to="/analytics"
                  className="px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                >
                  Analytics
                </Link>
                <div className="h-4 w-px bg-gray-300 dark:bg-gray-600 mx-2" />
                <ThemeToggle />
                <button
                  onClick={onLogout}
                  className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <ThemeToggle />
                <Link
                  to="/login"
                  className="px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
