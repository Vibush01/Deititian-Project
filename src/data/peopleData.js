import fitjeevaDietitian from '../assets/images/fitjeeva-dietitian.webp'
import fitjeevaClinical from '../assets/images/fitjeeva-clinical.webp'
import teamImg from '../assets/images/team-img.webp' // placeholder if needed

export const defaultExperts = [
  {
    id: 1,
    name: 'Dr. Anjali Sharma',
    role: 'Chief Clinical Nutritionist',
    image: fitjeevaDietitian,
    bio: 'With over 15 years of experience in clinical nutrition, Dr. Sharma specializes in metabolic disorders and therapeutic diets.'
  },
  {
    id: 2,
    name: 'Neha Verma',
    role: 'PCOS & Thyroid Specialist',
    image: fitjeevaClinical,
    bio: 'Neha holds a Masters in Food & Nutrition and has successfully helped over 500+ women reverse their hormonal imbalances naturally.'
  },
  {
    id: 3,
    name: 'Rohan Gupta',
    role: 'Sports Nutritionist',
    image: fitjeevaDietitian,
    bio: 'Rohan specializes in athletic performance and muscle building, creating customized macros for optimal fitness results.'
  }
]

export const defaultTeamMembers = [
  {
    id: 1,
    name: 'Simran Kaur',
    role: 'Head of Operations',
    image: teamImg, // using a fallback image for team
    bio: 'Ensuring seamless clinic operations and best-in-class customer experience for all our clients.'
  },
  {
    id: 2,
    name: 'Amanpreet Singh',
    role: 'Customer Success Manager',
    image: teamImg,
    bio: 'Dedicated to supporting clients throughout their transformation journey and ensuring all their queries are resolved.'
  },
  {
    id: 3,
    name: 'Pooja Sharma',
    role: 'Lead Developer',
    image: teamImg,
    bio: 'Building and maintaining the FitJeeva digital platform to provide a seamless online experience.'
  }
]
