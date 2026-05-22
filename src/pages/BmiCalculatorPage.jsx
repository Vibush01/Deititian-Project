import { useState } from 'react'
import SectionHeading from '../components/ui/SectionHeading'
import Button from '../components/ui/Button'
import ConsultationCTA from '../components/sections/ConsultationCTA'
import useDocumentMeta from '../hooks/useDocumentMeta'

const BmiCalculatorPage = () => {
  const [weight, setWeight] = useState('')
  const [height, setHeight] = useState('')
  const [bmi, setBmi] = useState(null)
  const [category, setCategory] = useState('')

  useDocumentMeta({
    title: 'BMI Calculator – Check Your Body Mass Index',
    description: 'Use FitJeeva\'s free BMI Calculator to check your Body Mass Index. Understand your health status and get personalized nutrition guidance from expert dietitians.',
    canonical: '/bmi-calculator',
  })

  const calculateBmi = (e) => {
    e.preventDefault()
    if (!weight || !height) return

    const heightInMeters = height / 100
    const bmiValue = (weight / (heightInMeters * heightInMeters)).toFixed(1)
    setBmi(bmiValue)

    if (bmiValue < 18.5) setCategory('Underweight')
    else if (bmiValue >= 18.5 && bmiValue < 24.9) setCategory('Normal weight')
    else if (bmiValue >= 25 && bmiValue < 29.9) setCategory('Overweight')
    else setCategory('Obese')
  }

  const getCategoryColor = () => {
    switch (category) {
      case 'Underweight': return 'text-blue-500'
      case 'Normal weight': return 'text-[#2E7D32]'
      case 'Overweight': return 'text-yellow-600'
      case 'Obese': return 'text-red-500'
      default: return 'text-gray-900'
    }
  }

  return (
    <div className="flex flex-col bg-white overflow-hidden pb-10">
      <section className="py-12 md:py-20 bg-[#E8F5E9] relative overflow-hidden">
        <div className="container-custom text-center max-w-3xl relative z-10">
          <h1 className="text-3xl md:text-5xl font-extrabold text-[#1B5E20] mb-4">BMI Calculator</h1>
          <p className="text-lg text-gray-700">Calculate your Body Mass Index (BMI) to understand your current health status and take the first step towards a healthier lifestyle.</p>
        </div>
      </section>

      <section className="py-16">
        <div className="container-custom max-w-lg">
          <div className="bg-white p-8 md:p-10 rounded-3xl shadow-xl border border-gray-100">
            <form onSubmit={calculateBmi} className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Weight (kg)</label>
                <input 
                  type="number" 
                  value={weight} 
                  onChange={(e) => setWeight(e.target.value)} 
                  placeholder="e.g. 70" 
                  className="w-full px-5 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#2E7D32]/30 focus:border-[#2E7D32] bg-gray-50 text-gray-900 transition-all"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Height (cm)</label>
                <input 
                  type="number" 
                  value={height} 
                  onChange={(e) => setHeight(e.target.value)} 
                  placeholder="e.g. 175" 
                  className="w-full px-5 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#2E7D32]/30 focus:border-[#2E7D32] bg-gray-50 text-gray-900 transition-all"
                  required
                />
              </div>
              <Button type="submit" className="w-full bg-[#2E7D32] hover:bg-[#1B5E20] py-3.5">Calculate BMI</Button>
            </form>

            {bmi && (
              <div className="mt-10 p-6 bg-gray-50 rounded-2xl border border-gray-100 text-center animate-fade-in">
                <p className="text-gray-500 text-sm font-bold uppercase tracking-wider mb-2">Your Result</p>
                <div className="text-5xl font-black text-gray-900 mb-2">{bmi}</div>
                <p className={`text-xl font-bold ${getCategoryColor()}`}>{category}</p>
                <p className="text-gray-600 mt-4 text-sm">
                  {category === 'Normal weight' ? 'Great job! You are in a healthy weight range.' : 'Consider consulting our expert dietitians to reach your ideal weight safely.'}
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      <ConsultationCTA />
    </div>
  )
}

export default BmiCalculatorPage
