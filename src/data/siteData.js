// ===== SITE-WIDE DATA =====

export const siteInfo = {
  name: "Dietitian Shreya's Family Diet Clinic",
  tagline: "Guiding modern lifestyles toward mindful nourishment. Balanced plans, uplifting coaching, measurable progress.",
  phone: "+91 73073 03835",
  whatsapp: "919875955806",
  email: "info@dietitianshreya.com",
  copyright: `© ${new Date().getFullYear()} Shreya Nutrition. All rights reserved.`,
}

export const socialLinks = {
  facebook: "https://www.facebook.com/DietitianShreya",
  youtube: "https://www.youtube.com/@dietitianshreya7982",
  instagram: "https://www.instagram.com/dietitianshreya",
  instagramHandle: "@dietitian_shreya",
}

export const navLinks = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about-us" },
  {
    label: "Service",
    path: "/service",
    dropdown: [
      { label: "Weight Management", path: "/service/weight-management" },
      {
        label: "Disease Management",
        path: "/service/disease-management",
        subItems: [
          { label: "Pcod Pcos", path: "/service/pcod-pcos" },
        ],
      },
      { label: "Lifestyle Management", path: "/service/lifestyle-management" },
    ],
  },
  { label: "Review", path: "#review" },
  { label: "Contact Us", path: "/contact-us" },
]

export const footerLinks = {
  company: [
    { label: "About Us", path: "/about-us" },
    { label: "Our Experts", path: "#" },
    { label: "Team", path: "#" },
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
    { label: "Success Stories", path: "#" },
    { label: "BMI Calculator", path: "#" },
    { label: "Lifestyle Quiz", path: "/service/lifestyle-management" },
    { label: "Recipes", path: "#" },
    { label: "Privacy Policy", path: "#" },
  ],
}

export const statsData = [
  { number: 800, suffix: "+", label: "Coaches" },
  { number: 99.3, suffix: "%", label: "Satisfaction Rate", decimals: 1 },
  { number: 2, suffix: " Lakh+", label: "Users globally" },
  { number: 70, suffix: "+", label: "Countries Served Globally" },
  { number: 1.2, suffix: " Cr+", label: "Lives Impacted", decimals: 1 },
]
