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
        <div className="flex flex-wrap justify-center items-stretch gap-0 divide-x divide-gray-border">
          {stats.map((stat, index) => (
            <div key={index} className="flex-1 min-w-[140px] md:min-w-[160px] px-4 md:px-6">
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
