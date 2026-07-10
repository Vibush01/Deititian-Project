import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  FaEnvelope, FaUserMd, FaConciergeBell, FaUsers,
  FaTrophy, FaUtensils, FaMapMarkerAlt, FaArrowRight,
  FaClock, FaCheckCircle, FaExclamationCircle, FaCog,
} from 'react-icons/fa'
import { collection, query, where, getDocs, orderBy, limit } from 'firebase/firestore'
import { db } from '../../firebase/config'
import { COLLECTIONS } from '../../firebase/collections'
import { useAuth } from '../../contexts/AuthContext'

const StatCard = ({ icon, label, value, color, to }) => (
  <Link
    to={to}
    className="bg-white rounded-2xl p-5 md:p-6 border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 group"
  >
    <div className="flex items-start justify-between mb-3">
      <div className={`w-11 h-11 rounded-xl flex items-center justify-center text-white shadow-md ${color}`}>
        {icon}
      </div>
      <FaArrowRight className="text-gray-300 text-xs group-hover:text-[#2E7D32] transition-colors" />
    </div>
    <p className="text-2xl md:text-3xl font-extrabold text-gray-900">{value}</p>
    <p className="text-sm text-gray-500 font-medium mt-1">{label}</p>
  </Link>
)

const InquiryRow = ({ inquiry }) => {
  const statusColors = {
    new: 'bg-yellow-100 text-yellow-700',
    contacted: 'bg-blue-100 text-blue-700',
    resolved: 'bg-green-100 text-green-700',
  }

  const statusIcons = {
    new: <FaExclamationCircle className="text-xs" />,
    contacted: <FaClock className="text-xs" />,
    resolved: <FaCheckCircle className="text-xs" />,
  }

  return (
    <div className="flex items-center justify-between py-3.5 border-b border-gray-100 last:border-0 group hover:bg-gray-50/50 px-2 -mx-2 rounded-lg transition-colors">
      <div className="flex items-center gap-3 min-w-0">
        <div className="w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center text-gray-500 font-bold text-sm shrink-0 uppercase">
          {inquiry.name?.[0] || '?'}
        </div>
        <div className="min-w-0">
          <p className="text-sm font-bold text-gray-900 truncate">{inquiry.name || 'Unknown'}</p>
          <p className="text-xs text-gray-500 truncate">{inquiry.email || inquiry.phone || 'No contact'}</p>
        </div>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <span className={`inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full ${statusColors[inquiry.status] || statusColors.new}`}>
          {statusIcons[inquiry.status] || statusIcons.new}
          {inquiry.status || 'new'}
        </span>
        <span className="text-xs text-gray-400 font-medium hidden sm:block">
          {inquiry.source === 'consultation' ? 'Consultation' : 'Contact'}
        </span>
      </div>
    </div>
  )
}

const DashboardPage = () => {
  const { user } = useAuth()
  const [stats, setStats] = useState({
    totalInquiries: 0,
    newInquiries: 0,
    totalServices: 0,
    totalTeam: 0,
    totalExperts: 0,
    totalStories: 0,
    totalRecipes: 0,
    totalLocations: 0,
  })
  const [recentInquiries, setRecentInquiries] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchDashboardData = async () => {
      if (!import.meta.env.VITE_FIREBASE_PROJECT_ID) {
        // No Firebase — load counts from hardcoded data
        try {
          const { serviceCategories } = await import('../../data/servicesData')
          const { clinicLocations } = await import('../../data/locationsData')
          setStats({
            totalInquiries: 0,
            newInquiries: 0,
            totalServices: serviceCategories?.length || 0,
            totalTeam: 0,
            totalExperts: 0,
            totalStories: 0,
            totalRecipes: 0,
            totalLocations: clinicLocations?.length || 0,
          })
        } catch (e) { /* ignore */ }
        setLoading(false)
        return
      }

      try {
        // Fetch counts in parallel
        const [
          inquiriesSnap,
          newInquiriesSnap,
          servicesSnap,
          teamSnap,
          expertsSnap,
          storiesSnap,
          recipesSnap,
          locationsSnap,
        ] = await Promise.all([
          getDocs(collection(db, COLLECTIONS.INQUIRIES)),
          getDocs(query(collection(db, COLLECTIONS.INQUIRIES), where('status', '==', 'new'))),
          getDocs(collection(db, COLLECTIONS.SERVICES)),
          getDocs(collection(db, COLLECTIONS.TEAM)),
          getDocs(collection(db, COLLECTIONS.EXPERTS)),
          getDocs(collection(db, COLLECTIONS.SUCCESS_STORIES)),
          getDocs(collection(db, COLLECTIONS.RECIPES)),
          getDocs(collection(db, COLLECTIONS.LOCATIONS)),
        ])

        // Use Firebase counts, but fallback to hardcoded data if Firebase is empty
        let svcCount = servicesSnap.size
        let locCount = locationsSnap.size

        if (svcCount === 0) {
          try {
            const { serviceCategories } = await import('../../data/servicesData')
            svcCount = serviceCategories?.length || 0
          } catch (e) { /* ignore */ }
        }
        if (locCount === 0) {
          try {
            const { clinicLocations } = await import('../../data/locationsData')
            locCount = clinicLocations?.length || 0
          } catch (e) { /* ignore */ }
        }

        setStats({
          totalInquiries: inquiriesSnap.size,
          newInquiries: newInquiriesSnap.size,
          totalServices: svcCount,
          totalTeam: teamSnap.size,
          totalExperts: expertsSnap.size,
          totalStories: storiesSnap.size,
          totalRecipes: recipesSnap.size,
          totalLocations: locCount,
        })

        // Fetch recent inquiries
        const recentQuery = query(
          collection(db, COLLECTIONS.INQUIRIES),
          orderBy('createdAt', 'desc'),
          limit(5)
        )
        const recentSnap = await getDocs(recentQuery)
        setRecentInquiries(recentSnap.docs.map((d) => ({ id: d.id, ...d.data() })))
      } catch (error) {
        console.error('Error fetching dashboard data:', error)
        // Even on error, try to show fallback counts
        try {
          const { serviceCategories } = await import('../../data/servicesData')
          const { clinicLocations } = await import('../../data/locationsData')
          setStats(prev => ({
            ...prev,
            totalServices: serviceCategories?.length || 0,
            totalLocations: clinicLocations?.length || 0,
          }))
        } catch (e) { /* ignore */ }
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardData()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-[#2E7D32] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-500 font-medium text-sm">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6 md:space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-[#2E7D32] to-[#1B5E20] rounded-2xl p-6 md:p-8 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
        <div className="relative z-10">
          <h1 className="text-2xl md:text-3xl font-extrabold mb-2">
            Welcome back{user?.email ? `, ${user.email.split('@')[0]}` : ''}! 👋
          </h1>
          <p className="text-white/80 text-sm md:text-base">
            Here's an overview of your FitJeeva website content and inquiries.
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
        <StatCard
          icon={<FaEnvelope />}
          label="Total Inquiries"
          value={stats.totalInquiries}
          color="bg-[#2E7D32]"
          to="/admin/inquiries"
        />
        <StatCard
          icon={<FaExclamationCircle />}
          label="New / Unread"
          value={stats.newInquiries}
          color="bg-yellow-500"
          to="/admin/inquiries"
        />
        <StatCard
          icon={<FaConciergeBell />}
          label="Services"
          value={stats.totalServices}
          color="bg-blue-500"
          to="/admin/services"
        />
        <StatCard
          icon={<FaUsers />}
          label="Team Members"
          value={stats.totalTeam}
          color="bg-purple-500"
          to="/admin/team"
        />
        <StatCard
          icon={<FaUserMd />}
          label="Experts"
          value={stats.totalExperts}
          color="bg-indigo-500"
          to="/admin/experts"
        />
        <StatCard
          icon={<FaTrophy />}
          label="Success Stories"
          value={stats.totalStories}
          color="bg-pink-500"
          to="/admin/success-stories"
        />
        <StatCard
          icon={<FaUtensils />}
          label="Recipes"
          value={stats.totalRecipes}
          color="bg-orange-500"
          to="/admin/recipes"
        />
        <StatCard
          icon={<FaMapMarkerAlt />}
          label="Locations"
          value={stats.totalLocations}
          color="bg-teal-500"
          to="/admin/locations"
        />
      </div>

      {/* Recent Inquiries */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-5 md:px-6 py-4 border-b border-gray-100">
          <div>
            <h2 className="text-lg font-extrabold text-gray-900">Recent Inquiries</h2>
            <p className="text-xs text-gray-500 mt-0.5">Latest form submissions from the website</p>
          </div>
          <Link
            to="/admin/inquiries"
            className="text-sm font-bold text-[#2E7D32] hover:text-[#1B5E20] flex items-center gap-1 transition-colors"
          >
            View All <FaArrowRight className="text-xs" />
          </Link>
        </div>

        <div className="px-5 md:px-6 py-2">
          {recentInquiries.length > 0 ? (
            recentInquiries.map((inquiry) => (
              <InquiryRow key={inquiry.id} inquiry={inquiry} />
            ))
          ) : (
            <div className="py-10 text-center">
              <FaEnvelope className="text-3xl text-gray-200 mx-auto mb-3" />
              <p className="text-gray-400 font-medium text-sm">No inquiries yet</p>
              <p className="text-gray-300 text-xs mt-1">
                Form submissions from the website will appear here.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 md:p-6">
        <h2 className="text-lg font-extrabold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {[
            { label: 'Edit Site Info', to: '/admin/site-settings', icon: <FaCog className="text-sm" /> },
            { label: 'Manage Services', to: '/admin/services', icon: <FaConciergeBell className="text-sm" /> },
            { label: 'Add Team Member', to: '/admin/team', icon: <FaUsers className="text-sm" /> },
            { label: 'View Inquiries', to: '/admin/inquiries', icon: <FaEnvelope className="text-sm" /> },
          ].map((action) => (
            <Link
              key={action.to}
              to={action.to}
              className="flex items-center gap-2.5 px-4 py-3 bg-gray-50 hover:bg-[#E8F5E9] border border-gray-100 hover:border-[#2E7D32]/20 rounded-xl text-sm font-medium text-gray-700 hover:text-[#2E7D32] transition-all duration-200"
            >
              {action.icon}
              <span>{action.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default DashboardPage
