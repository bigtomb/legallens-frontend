import {Link, useLocation} from 'react-router'
import { MicroscopeIcon as MagnifyingGlassIcon, UserCircle, Search, BookOpen, LogOut } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import { Button } from "./ui/button"

export function AuthenticatedNavbar() {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
              <MagnifyingGlassIcon className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-800">LegalLens</span>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                  to="/"
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                      isActive('/')
                          ? 'border-blue-500 text-gray-900'
                          : 'border-transparent text-gray-500 hover:text-gray-900 hover:border-gray-300'
                  }`}
              >
                Dashboard
              </Link>
              <Link
                  to="/research"
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                      isActive('/research')
                          ? 'border-blue-500 text-gray-900'
                          : 'border-transparent text-gray-500 hover:text-gray-900 hover:border-gray-300'
                  }`}
              >
                Research
              </Link>
              <Link
                  to="/cases"
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                      isActive('/cases')
                          ? 'border-blue-500 text-gray-900'
                          : 'border-transparent text-gray-500 hover:text-gray-900 hover:border-gray-300'
                  }`}
              >
                My Cases
              </Link>
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            <Button variant="ghost" size="icon">
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <BookOpen className="h-5 w-5" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <UserCircle className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link to="/profile" className="flex w-full">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/settings" className="flex w-full">Settings</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <button className="flex w-full items-center text-red-600" onClick={() => console.log('Logout clicked')}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="flex items-center sm:hidden">
            {/* Mobile menu button */}
            <Button variant="ghost" size="icon">
              <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}

