import SectionHeading from '../components/ui/SectionHeading'
import useSiteSettings from '../hooks/useSiteSettings'
import useDocumentMeta from '../hooks/useDocumentMeta'
import { usePrivacyPolicyData } from '../hooks/usePageData'

const PrivacyPolicyPage = () => {
  const { settings: siteInfo } = useSiteSettings()
  const { heroTitle, heroSubtitle, sections } = usePrivacyPolicyData()
  
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
          <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-6">{heroTitle}</h1>
          <p className="text-lg text-gray-600 whitespace-pre-line">
            {heroSubtitle}
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 md:py-16">
        <div className="container-custom max-w-4xl space-y-12">
          
          {sections && sections.map((section, index) => (
            <div key={index}>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">{section.title}</h2>
              {section.content.split('\n').map((line, lineIndex) => {
                if (line.trim().startsWith('-')) {
                  return (
                    <ul key={lineIndex} className="list-disc list-inside space-y-2 text-gray-600 pl-4 mt-2">
                      <li>{line.replace(/^-/, '').trim()}</li>
                    </ul>
                  )
                }
                return <p key={lineIndex} className="text-gray-600 leading-relaxed mb-4">{line}</p>
              })}
            </div>
          ))}

          {!sections && (
            <div className="text-center text-gray-500 py-10">
              Privacy Policy content is loading or currently unavailable.
            </div>
          )}

          <div className="bg-[#E8F5E9] p-8 rounded-3xl border border-[#C8E6C9] mt-12">
            <h2 className="text-2xl md:text-3xl font-bold text-[#2E7D32] mb-4">Contact Us</h2>
            <p className="text-gray-700 mb-4">If you have any questions or concerns regarding this Privacy Policy, please contact us at:</p>
            <ul className="space-y-2 text-gray-700 font-medium">
              <li><span className="font-bold">Email:</span> {siteInfo.email}</li>
              <li><span className="font-bold">Phone:</span> {siteInfo.phone}</li>
            </ul>
          </div>

        </div>
      </section>
    </div>
  )
}

export default PrivacyPolicyPage
