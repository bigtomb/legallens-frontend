import {Link} from 'react-router'

export function Hero() {
  return (
    <div className="bg-blue-600">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl">
            <span className="block">Simplify Legal Research</span>
            <span className="block text-blue-200">with LegalLens</span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-blue-100 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Navigate the complexities of law with ease. LegalLens provides cutting-edge tools for legal professionals and researchers.
          </p>
          <div className="mt-10 sm:flex sm:justify-center">
            <div className="rounded-md shadow">
              <Link to="/signup" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50 md:py-4 md:text-lg md:px-10">
                Get Started
              </Link>
            </div>
            <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
              <Link to="/demo" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600 md:py-4 md:text-lg md:px-10">
                Live Demo
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

