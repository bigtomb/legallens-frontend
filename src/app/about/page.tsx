import { Navbar } from '../../components/Navbar'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-100 text-left">
      <Navbar />
      <main className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">About LegalLens</h1>
        
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Our Mission</h2>
          <p className="text-lg text-gray-700 mb-4">
            At LegalLens, we're dedicated to simplifying legal research and empowering legal professionals with cutting-edge technology. Our mission is to make the complexities of law more accessible and manageable for everyone in the legal field.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Who We Are</h2>
          <p className="text-lg text-gray-700 mb-4">
            Founded by a team of legal experts and tech innovators, LegalLens combines deep legal knowledge with advanced AI and machine learning capabilities. We understand the challenges faced by legal professionals and are committed to providing solutions that save time, increase accuracy, and enhance productivity.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">What We Offer</h2>
          <ul className="list-disc list-inside text-lg text-gray-700 space-y-2">
            <li>Advanced legal document analysis</li>
            <li>Intelligent case law research</li>
            <li>Automated legal citation checking</li>
            <li>Customizable legal research dashboards</li>
            <li>Integration with major legal databases</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Our Commitment</h2>
          <p className="text-lg text-gray-700 mb-4">
            We are committed to continuous innovation, data security, and customer satisfaction. Our team works tirelessly to ensure that LegalLens remains at the forefront of legal technology, providing you with the tools you need to excel in your legal practice.
          </p>
        </section>
      </main>
    </div>
  )
}

