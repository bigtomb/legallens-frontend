
import { MicroscopeIcon as MagnifyingGlassIcon } from 'lucide-react'
import {NavLink} from "react-router";

export function Navbar() {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <NavLink to="/" className="flex-shrink-0 flex items-center">
              <MagnifyingGlassIcon className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-800">LegalLens</span>
            </NavLink>
          </div>
          <div className="flex items-center space-x-4">
            <NavLink to="/login" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
              Login
            </NavLink>
            <NavLink to="/signup" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
              Signup
            </NavLink>
            <NavLink to="/About" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
              About
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  )
}

