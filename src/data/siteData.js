// ===== SITE-WIDE DATA =====

export const siteInfo = {
  name: "FitJeeva",
  tagline: "Nourish | Transform | Thrive. We are a Medical Nutrition Clinic dedicated to your well-being.",
  phone: "+91 70912 89342",
  whatsapp: "917091289342",
  email: "info@fitjeeva.com",
  website: "www.fitjeeva.com",
  copyright: `© ${new Date().getFullYear()} FitJeeva Nutrition. All rights reserved.`,
}

export const socialLinks = {
  facebook: "https://www.facebook.com/fitjeeva",
  youtube: "https://www.youtube.com/",
  instagram: "https://www.instagram.com/",
  instagramHandle: "@fitjeeva",
}

export const navLinks = [
  { label: "HOME", path: "/" },
  { label: "ABOUT-US", path: "/about-us" },
  {
    label: "SERVICE",
    path: "/service",
    megaMenu: {
      column1: {
        title: "Disease Management",
        items: [
          { label: "PCOD / PCOS", path: "/service/pcod-pcos", desc: "Our personalized nutrition and lifestyle programs help balance hormones, manage weight, and improve overall well-being." },
          { label: "Thyroid", path: "/service/thyroid", desc: "Manage thyroid effectively with personalized nutrition and lifestyle plans to boost metabolism, balance hormones and enhance energy." },
          { label: "Diabetes", path: "/service/diabetes", desc: "Our expert-guided approach helps control blood sugar, maintain insulin balance, healthy weight and improve overall energy." },
        ],
        action: { label: "Plan Overview", path: "/service" }
      },
      column2: [
        {
          title: "Weight Management",
          items: [
            { label: "Weight Loss", path: "/service/weight-management", desc: "Achieve sustainable weight loss with our experts who help boost metabolism, burn fat, maintain energy, and improve overall health for long-term results." },
            { label: "Weight Gain", path: "/service/weight-management", desc: "Our expert-guided approach focuses on muscle building, balanced diet, and sustainable habits to help you gain strength and energy." }
          ]
        },
        {
          title: "Lifestyle Management",
          items: [
            { label: "Healthy Lifestyle", path: "/service/lifestyle-management", desc: "Adopt a healthy lifestyle with personalized nutrition to boost energy, immunity, fitness, and overall well-being for a balanced, sustainable life." }
          ]
        }
      ],
      column3: {
        title: "Success Stories",
        image: new URL('../assets/images/SS2.JPG', import.meta.url).href,
        buttons: [
          { label: "Weight Lose Success", path: "/success-stories", type: "primary" },
          { label: "Story Success", path: "/success-stories", type: "green" }
        ],
        storyTitle: "Weight Loss Success Story",
        storyDesc: "Discover how our personalized nutrition plans helped achieve remarkable transformation results and improved overall health..."
      }
    }
  },
  { label: "CAREERS", path: "/careers" },
  { label: "CONTACT-US", path: "/contact-us" },
]

export const footerLinks = {
  company: [
    { label: "About Us", path: "/about-us" },
    { label: "Our Experts", path: "/experts" },
    { label: "Team", path: "/team" },
    { label: "Careers", path: "/careers" },
    { label: "Contact Us", path: "/contact-us" },
  ],
  wellnessPrograms: [
    { label: "Weight Loss", path: "/service/weight-management" },
    { label: "Hormonal Balance", path: "/service/disease-management" },
    { label: "PCOS & PCOD", path: "/service/pcod-pcos" },
    { label: "Thyroid Health", path: "/service/thyroid" },
    { label: "Diabetes Care", path: "/service/diabetes" },
  ],
  explore: [
    { label: "Success Stories", path: "/success-stories" },
    { label: "BMI Calculator", path: "/bmi-calculator" },
    { label: "Lifestyle Quiz", path: "/service/lifestyle-management" },
    { label: "Recipes", path: "/recipes" },
    { label: "Privacy Policy", path: "/privacy-policy" },
  ],
}

export const statsData = [
  { number: 10, suffix: "+", label: "Coaches" },
  { number: 99.3, suffix: "%", label: "Satisfaction Rate", decimals: 1 },
  { number: 340, suffix: "+", label: "Users globally" },
  { number: 4, suffix: "+", label: "Countries Served Globally" },
  { number: 1200, suffix: "+", label: "Lives Impacted" },
]
