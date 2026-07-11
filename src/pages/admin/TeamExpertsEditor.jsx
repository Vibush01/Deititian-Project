import { useState } from 'react'
import { FaUsers, FaUserMd } from 'react-icons/fa'
import TeamEditor from './TeamEditor'
import ExpertsEditor from './ExpertsEditor'

const TeamExpertsEditor = () => {
  const [activeTab, setActiveTab] = useState('team')

  return (
    <div className="max-w-6xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900 flex items-center gap-2">
            <FaUsers className="text-[#2E7D32]" />
            Team & Experts
          </h1>
          <p className="text-gray-500 text-sm mt-1">Manage your core team and medical nutrition experts.</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-4 mb-6 border-b border-gray-200">
        <button
          onClick={() => setActiveTab('team')}
          className={`py-3 px-6 font-bold text-sm flex items-center gap-2 border-b-2 transition-colors ${
            activeTab === 'team'
              ? 'border-[#2E7D32] text-[#2E7D32]'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          }`}
        >
          <FaUsers />
          Core Team
        </button>
        <button
          onClick={() => setActiveTab('experts')}
          className={`py-3 px-6 font-bold text-sm flex items-center gap-2 border-b-2 transition-colors ${
            activeTab === 'experts'
              ? 'border-[#2E7D32] text-[#2E7D32]'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          }`}
        >
          <FaUserMd />
          Nutrition Experts
        </button>
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
        {activeTab === 'team' && <TeamEditor isEmbedded={true} />}
        {activeTab === 'experts' && <ExpertsEditor isEmbedded={true} />}
      </div>
    </div>
  )
}

export default TeamExpertsEditor
