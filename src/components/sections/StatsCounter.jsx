import CounterCard from '../ui/CounterCard'
import useSiteSettings from '../../hooks/useSiteSettings'

const StatsCounter = ({ stats: propStats, className = '' }) => {
  const { settings } = useSiteSettings()
  const stats = propStats || settings.statsData || []
  return (
    <section className={`py-12 md:py-16 bg-white border-b border-gray-100 ${className}`}>
      <div className="container-custom">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 divide-x divide-gray-100">
          {stats.map((stat, index) => (
            <div key={index} className="flex justify-center">
              <CounterCard
                number={stat.number}
                suffix={stat.suffix}
                label={stat.label}
                decimals={stat.decimals || 0}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default StatsCounter
