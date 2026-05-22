import SectionHeading from '../components/ui/SectionHeading'
import { siteInfo } from '../data/siteData'
import useDocumentMeta from '../hooks/useDocumentMeta'

const PrivacyPolicyPage = () => {
  useDocumentMeta({
    title: 'Privacy Policy',
    description: 'Read FitJeeva\'s Privacy Policy. Learn how we collect, use, and protect your personal and medical information when using our nutrition services.',
    canonical: '/privacy-policy',
  })

  return (
    <div className="flex flex-col bg-white overflow-hidden pb-20">
      {/* Header */}
      <section className="py-12 md:py-20 bg-gray-50 border-b border-gray-100">
        <div className="container-custom text-center max-w-4xl">
          <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-6">Privacy Policy</h1>
          <p className="text-lg text-gray-600">
            At {siteInfo.name}, we respect your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard your data when you visit our website or use our services.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 md:py-16">
        <div className="container-custom max-w-4xl space-y-12">
          
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Information We Collect</h2>
            <p className="text-gray-600 mb-4">We may collect the following information when you interact with our website or services:</p>
            <ul className="list-disc list-inside space-y-2 text-gray-600 pl-4">
              <li>Name, phone number, email address</li>
              <li>Health-related information shared voluntarily through forms</li>
              <li>Appointment and consultation details</li>
              <li>Website usage data (cookies, IP address, browser type)</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">How We Use Your Information</h2>
            <p className="text-gray-600 mb-4">The information collected is used to:</p>
            <ul className="list-disc list-inside space-y-2 text-gray-600 pl-4">
              <li>Schedule consultations and appointments</li>
              <li>Provide personalized diet and lifestyle guidance</li>
              <li>Respond to queries and support requests</li>
              <li>Improve our services and website experience</li>
              <li>Send updates, reminders, or health-related communication (with consent)</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Medical & Health Information</h2>
            <p className="text-gray-600 leading-relaxed">
              Any medical or health information shared with us is treated as strictly confidential and is used only for consultation, guidance, and service delivery purposes.
            </p>
          </div>

          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Data Protection & Security</h2>
            <p className="text-gray-600 leading-relaxed">
              We implement appropriate technical and organizational measures to protect your personal data from unauthorized access, misuse, or disclosure.
            </p>
          </div>

          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Sharing of Information</h2>
            <p className="text-gray-600 leading-relaxed">
              We do not sell, trade, or rent your personal information to third parties. Information may only be shared with trusted professionals within our organization for consultation purposes or when required by law.
            </p>
          </div>

          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Cookies</h2>
            <p className="text-gray-600 leading-relaxed">
              Our website may use cookies to enhance user experience and analyze website traffic. You may choose to disable cookies through your browser settings.
            </p>
          </div>

          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Third-Party Links</h2>
            <p className="text-gray-600 leading-relaxed">
              Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of such external sites.
            </p>
          </div>

          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Policy Updates</h2>
            <p className="text-gray-600 leading-relaxed">
              {siteInfo.name} reserves the right to update or modify this Privacy Policy at any time. Changes will be reflected on this page.
            </p>
          </div>

          <div className="bg-[#E8F5E9] p-8 rounded-3xl border border-[#C8E6C9]">
            <h2 className="text-2xl md:text-3xl font-bold text-[#2E7D32] mb-4">Contact Us</h2>
            <p className="text-gray-700 mb-4">If you have any questions or concerns regarding this Privacy Policy, please contact us at:</p>
            <ul className="space-y-2 text-gray-700 font-medium">
              <li><span className="font-bold">Email:</span> {siteInfo.email}</li>
              <li><span className="font-bold">Phone:</span> {siteInfo.phone}</li>
            </ul>
            <p className="text-gray-600 mt-6 text-sm">
              Your privacy matters to us. All personal and medical information shared is kept secure and confidential.
            </p>
          </div>

        </div>
      </section>
    </div>
  )
}

export default PrivacyPolicyPage
