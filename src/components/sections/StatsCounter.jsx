import CounterCard from '../ui/CounterCard'
import { statsData } from '../../data/siteData'

/**
 * Stats counter row displaying animated metrics.
 * Renders a horizontal row of CounterCards driven by siteData.
 *
 * @param {Array} stats - Override default stats (optional)
 * @param {string} className - Additional wrapper classes
 */
const StatsCounter = ({ stats = statsData, className = '' }) => {
  return (
    <section className={`bg-white py-6 md:py-10 border-b border-gray-border/50 ${className}`}>
      <div className="container-custom">
        <div className="grid grid-cols-2 md:flex md:flex-wrap md:justify-center md:items-stretch md:gap-0 md:divide-x md:divide-gray-border gap-4">
          {stats.map((stat, index) => (
            <div key={index} className="md:flex-1 md:min-w-[160px] md:px-6">
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
