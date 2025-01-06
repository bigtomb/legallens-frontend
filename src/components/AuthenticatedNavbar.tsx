'use client'
import {Link, useLocation} from "react-router"
import { MicroscopeIcon as MagnifyingGlassIcon, UserCircle, Search, BookOpen, LogOut, Shield, Settings, Menu, Home, FileText } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu.tsx"
import { Button } from "./ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "./ui/sheet"
import { Separator } from "./ui/separator"
import useAuth from "../hooks/useAuth.ts";

export function AuthenticatedNavbar() {
  const location = useLocation()
  const {auth} = useAuth()

  const navItems = [
    { to: '/', label: 'Dashboard', icon: Home },
    { to: '/research', label: 'Research', icon: Search },
    { to: '/cases', label: 'My Cases', icon: FileText },
  ]

  const profileItems = [
    { to: '/profile', label: 'Profile', icon: UserCircle },
    { to: '/settings', label: 'Settings', icon: Settings },
    ...(auth?.role === 'ADMIN' ? [{ to: '/admin/dashboard', label: 'Admin Dashboard', icon: Shield }] : []),
  ]


  // @ts-ignore
  return (
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/dashboard" className="flex-shrink-0 flex items-center">
                <MagnifyingGlassIcon className="h-8 w-8 text-blue-600" />
                <span className="ml-2 text-xl font-bold text-gray-800">LegalLens</span>
              </Link>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                {navItems.map((item) => (
                    <Link
                        key={item.to}
                        to={item.to}
                        className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                            location === item.to
                                ? 'border-blue-500 text-gray-900'
                                : 'border-transparent text-gray-500 hover:text-gray-900 hover:border-gray-300'
                        }`}
                    >
                      {item.label}
                    </Link>
                ))}
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
                  {profileItems.map((item) => (
                      <DropdownMenuItem key={item.to}>
                        <Link to={item.to} className="flex w-full items-center">
                          <item.icon className="mr-2 h-4 w-4" />
                          <span>{item.label}</span>
                        </Link>
                      </DropdownMenuItem>
                  ))}
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
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" aria-label="Open menu">
                    <Menu className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                  <SheetHeader>
                    <SheetTitle className="text-left">Menu</SheetTitle>
                  </SheetHeader>
                  <nav className="flex flex-col mt-6">
                    {navItems.map((item) => (
                        <SheetClose asChild key={item.to}>
                          <Link
                              to={item.to}
                              className={`flex items-center space-x-2 px-4 py-3 text-sm transition-colors ${
                                  location === item.to
                                      ? 'bg-blue-50 text-blue-700'
                                      : 'text-gray-700 hover:bg-gray-100'
                              }`}
                          >
                            <item.icon className="h-5 w-5" />
                            <span>{item.label}</span>
                          </Link>
                        </SheetClose>
                    ))}
                    <Separator className="my-4" />
                    {profileItems.map((item) => (
                        <SheetClose asChild key={item.to}>
                          <Link
                              to={item.to}
                              className="flex items-center space-x-2 px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                          >
                            <item.icon className="h-5 w-5" />
                            <span>{item.label}</span>
                          </Link>
                        </SheetClose>
                    ))}
                    <Separator className="my-4" />
                    <SheetClose asChild>
                      <button
                          className="flex items-center space-x-2 px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors w-full text-left"
                          onClick={() => console.log('Logout clicked')}
                      >
                        <LogOut className="h-5 w-5" />
                        <span>Log out</span>
                      </button>
                    </SheetClose>
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </nav>
  )
}

