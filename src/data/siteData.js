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
        image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=600&h=400&fit=crop", // placeholder
        buttons: [
          { label: "Weight Lose Success", path: "#", type: "pink" },
          { label: "Story Success", path: "#", type: "green" }
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
