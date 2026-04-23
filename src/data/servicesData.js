// ===== SERVICES DATA =====

export const serviceCategories = [
  {
    id: "disease-management",
    title: "Disease Management",
    icon: "heart",
    path: "/service/disease-management",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&h=400&fit=crop",
    heroTitle: "Specialized Disease Management: Clinical Diet Plans for Long-Term Recovery",
    heroDescription: "Our expert clinical team provides a comprehensive disease management diet specifically engineered for those battling diabetes, thyroid disorders, and PCOS/PCOD. By utilizing highly personalized diet plans that analyze your unique medical history and daily lifestyle, we offer more than just nutrition; we provide a total health transformation.",
    features: [
      {
        title: "Root-Cause Healing",
        description: "We focus on identifying and treating the root cause of chronic conditions through therapeutic nutrition, not just managing symptoms.",
      },
      {
        title: "Medicine-Free Protocols",
        description: "Our evidence-based approach uses food as medicine, reducing dependency on medications through science-backed dietary interventions.",
      },
      {
        title: "Personalized Clinical Plans",
        description: "Every diet plan is customized based on your medical reports, lifestyle, food preferences, and health goals for maximum effectiveness.",
      },
    ],
    services: [
      {
        id: "pcod-pcos",
        title: "PCOD / PCOS",
        description: "Our personalized nutrition and lifestyle programs help balance hormones, manage weight, and improve overall well-being.",
        path: "/service/pcod-pcos",
      },
      {
        id: "thyroid",
        title: "Thyroid",
        description: "Manage thyroid effectively with personalized nutrition and lifestyle plans to boost metabolism, balance hormones and enhance energy.",
        path: "/service/thyroid",
      },
      {
        id: "diabetes",
        title: "Diabetes",
        description: "Our expert-guided approach helps control blood sugar, maintain insulin balance, healthy weight and improve overall energy.",
        path: "/service/diabetes",
      },
    ],
  },
  {
    id: "weight-management",
    title: "Weight Management",
    icon: "dumbbell",
    path: "/service/weight-management",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&h=400&fit=crop",
    heroTitle: "Sustainable Weight Management: Achieve Your Ideal Weight Naturally",
    heroDescription: "Our weight management programs are designed to help you achieve and maintain your ideal weight through sustainable, science-backed nutrition strategies. We focus on metabolic health, portion intelligence, and lifestyle modifications rather than crash diets or extreme workouts.",
    features: [
      {
        title: "Metabolic Optimization",
        description: "We analyze and optimize your metabolism through balanced nutrition, ensuring your body efficiently burns fat while maintaining muscle mass.",
      },
      {
        title: "Sustainable Results",
        description: "Our kitchen-based approach uses everyday Indian ingredients, making long-term adherence easy and realistic for lasting weight management.",
      },
      {
        title: "Holistic Approach",
        description: "Beyond diet, we integrate behavioral coaching, habit stacking, and lifestyle modifications for comprehensive weight wellness.",
      },
    ],
    services: [
      {
        id: "weight-loss",
        title: "Weight Loss",
        description: "Achieve sustainable weight loss with our experts who help boost metabolism, burn fat, maintain energy, and improve overall health for long-term results.",
      },
      {
        id: "weight-gain",
        title: "Weight Gain",
        description: "Our expert-guided approach focuses on muscle building, balanced diet, and sustainable habits to help you gain strength and energy.",
      },
    ],
  },
  {
    id: "lifestyle-management",
    title: "Lifestyle Management",
    icon: "heart-pulse",
    path: "/service/lifestyle-management",
    image: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=500&h=400&fit=crop",
    heroTitle: "Holistic Lifestyle Management: Transform Your Daily Habits for Lasting Wellness",
    heroDescription: "Our lifestyle management programs go beyond diet to transform every aspect of your daily routine. From stress management and sleep optimization to mindful eating and physical activity, we create a comprehensive wellness blueprint tailored to your unique lifestyle.",
    features: [
      {
        title: "Mindful Nutrition",
        description: "Learn to make conscious food choices that nourish your body and mind, developing a healthy relationship with food that lasts a lifetime.",
      },
      {
        title: "Stress & Sleep Management",
        description: "Our holistic approach addresses stress, sleep quality, and emotional well-being as key components of overall health and weight management.",
      },
      {
        title: "Active Living Integration",
        description: "We seamlessly integrate physical activity into your daily routine with practical, enjoyable exercise plans that complement your nutrition goals.",
      },
    ],
    services: [
      {
        id: "healthy-lifestyle",
        title: "Healthy Lifestyle",
        description: "Adopt a healthy lifestyle with personalized nutrition to boost energy, immunity, fitness, and overall well-being for a balanced, sustainable life.",
      },
    ],
  },
]

// Sub-page detailed data keyed by slug
export const serviceSubPages = {
  "weight-management": {
    title: "Weight Management",
    heroTitle: "Expert Clinical Diet Plans Personalized for Your Weight Goals",
    heroSubtitle: "Achieve your ideal weight with personalized diet plans that identify the root cause of weight issues through expert nutrition and lifestyle corrections provided by India's premier online diet service.",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=500&fit=crop",
    sections: [
      {
        title: "Sustainable Weight Loss Programs",
        description: "Our weight loss programs are built on metabolic testing, portion intelligence, and balanced Indian meals. We avoid starvation, crash diets, and extreme workouts. Instead, we focus on improving metabolism, hormonal balance, and gut health while ensuring your body remains nourished and energized throughout the journey.",
        image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=500&h=400&fit=crop",
      },
      {
        title: "Healthy Weight Gain Plans",
        description: "For those looking to gain weight healthily, our plans focus on muscle building through nutrient-dense meals, proper protein intake, and sustainable eating habits. We create personalized plans that help you gain strength and energy without compromising your overall health.",
        image: "https://images.unsplash.com/photo-1547592180-85f173990554?w=500&h=400&fit=crop",
      },
    ],
    benefits: [
      "Personalized meal plans using everyday Indian ingredients",
      "Metabolic analysis and optimization",
      "No crash diets or extreme restrictions",
      "Regular progress tracking and plan adjustments",
      "24/7 expert support and guidance",
      "Kitchen-based nutrition approach",
    ],
  },
  "disease-management": {
    title: "Disease Management",
    heroTitle: "Specialized Disease Management: Clinical Diet Plans for Recovery",
    heroSubtitle: "Our expert clinical team provides comprehensive disease management diets specifically engineered for those battling diabetes, thyroid disorders, and PCOS/PCOD through highly personalized diet plans.",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&h=500&fit=crop",
    sections: [
      {
        title: "Diabetes Management & Reversal",
        description: "Our evidence-based diabetes diet service focuses on blood sugar control, insulin sensitivity improvement, and long-term metabolic health. We use Indian superfoods and millets to create meal plans that naturally regulate glucose levels while keeping you satisfied and energized.",
        image: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=500&h=400&fit=crop",
      },
      {
        title: "Thyroid & Hormonal Balance",
        description: "Our targeted thyroid diet service addresses both hypothyroidism and hyperthyroidism through nutrition that supports thyroid function, metabolism, and energy levels. We focus on selenium, iodine, and zinc-rich foods while eliminating goitrogens that may interfere with thyroid health.",
        image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&h=400&fit=crop",
      },
    ],
    benefits: [
      "Evidence-based clinical nutrition protocols",
      "Medicine-free diet approach for chronic conditions",
      "Regular monitoring and plan optimization",
      "Specialized plans for diabetes, thyroid, and PCOS",
      "Root-cause healing through therapeutic nutrition",
      "Support for cardiac, renal, and liver health",
    ],
  },
  "pcod-pcos": {
    title: "PCOD / PCOS Management",
    heroTitle: "PCOD/PCOS Diet Plan: Hormonal Balance Through Clinical Nutrition",
    heroSubtitle: "Our specialized PCOS nutrition service helps women manage symptoms, balance hormones, regulate periods, and achieve sustainable weight loss through personalized, medicine-free diet protocols.",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=600&h=500&fit=crop",
    sections: [
      {
        title: "Hormonal Balance Through Nutrition",
        description: "PCOD/PCOS requires a targeted nutritional approach that addresses insulin resistance, androgen excess, and inflammation. Our clinical dietitians create personalized plans rich in anti-inflammatory foods, fiber, and nutrients that specifically support hormonal balance and ovarian health.",
        image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=500&h=400&fit=crop",
      },
      {
        title: "Lifestyle Modifications for PCOS",
        description: "Beyond diet, we integrate stress management, sleep optimization, and appropriate exercise routines that complement your nutrition plan. Our holistic approach addresses the root causes of PCOS including insulin resistance, chronic inflammation, and hormonal imbalance.",
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&h=400&fit=crop",
      },
    ],
    benefits: [
      "Personalized anti-inflammatory meal plans",
      "Insulin resistance management through diet",
      "Period regulation and hormonal balance",
      "Sustainable weight loss for PCOS",
      "Fertility nutrition support",
      "Stress and lifestyle management",
    ],
  },
  "thyroid": {
    title: "Thyroid Management",
    heroTitle: "Thyroid Diet Expert: Manage Thyroid Naturally Through Nutrition",
    heroSubtitle: "Our targeted thyroid diet service addresses both hypothyroidism and hyperthyroidism through evidence-based nutrition that supports thyroid function, boosts metabolism, and restores energy levels.",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&h=500&fit=crop",
    sections: [
      {
        title: "Hypothyroidism Management",
        description: "For hypothyroidism, we focus on foods that support thyroid hormone production including selenium, iodine, and zinc-rich Indian foods. We carefully eliminate goitrogens and create meal plans that boost metabolism, combat fatigue, and support healthy weight management.",
        image: "https://images.unsplash.com/photo-1547592180-85f173990554?w=500&h=400&fit=crop",
      },
      {
        title: "Thyroid-Friendly Kitchen Solutions",
        description: "Our kitchen-based approach uses everyday Indian ingredients to create thyroid-supportive meals. From millet-based recipes to anti-inflammatory spice combinations, we ensure your daily cooking becomes a therapeutic intervention for thyroid health.",
        image: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=500&h=400&fit=crop",
      },
    ],
    benefits: [
      "Thyroid function optimization through diet",
      "Metabolism boosting meal plans",
      "Energy restoration and fatigue management",
      "Weight management for thyroid patients",
      "Goitrogen-aware food planning",
      "Medicine-free thyroid support protocols",
    ],
  },
  "diabetes": {
    title: "Diabetes Management",
    heroTitle: "Diabetes Diet Service: Control Blood Sugar Through Clinical Nutrition",
    heroSubtitle: "Our evidence-based diabetes diet service focuses on natural blood sugar regulation, insulin sensitivity improvement, and long-term metabolic health through personalized, kitchen-based nutrition plans.",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&h=500&fit=crop",
    sections: [
      {
        title: "Type 2 Diabetes Reversal",
        description: "Our specialized programs for Type 2 Diabetes focus on insulin sensitivity improvement, glycemic control, and metabolic optimization. Using low-glycemic Indian foods, millets, and portion intelligence, we help patients achieve significant blood sugar improvements without extreme dietary restrictions.",
        image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=500&h=400&fit=crop",
      },
      {
        title: "Diabetes-Friendly Indian Meal Plans",
        description: "We create delicious, satisfying meal plans using everyday Indian ingredients that naturally regulate blood glucose levels. Our clinical dietitians balance macronutrients, fiber, and glycemic load to ensure stable blood sugar throughout the day while keeping meals enjoyable.",
        image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&h=400&fit=crop",
      },
    ],
    benefits: [
      "Blood sugar stabilization through diet",
      "Insulin sensitivity improvement",
      "HbA1c reduction programs",
      "Diabetic-friendly Indian recipes",
      "Weight management for diabetic patients",
      "Medication reduction support (under doctor supervision)",
    ],
  },
  "lifestyle-management": {
    title: "Lifestyle Management",
    heroTitle: "Holistic Lifestyle Management: Transform Your Daily Habits",
    heroSubtitle: "Our lifestyle management programs go beyond diet to transform every aspect of your daily routine — from stress management and sleep optimization to mindful eating and active living.",
    image: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=600&h=500&fit=crop",
    sections: [
      {
        title: "Mindful Eating & Nutrition Coaching",
        description: "Learn to develop a healthy relationship with food through our mindful eating programs. We help you understand hunger cues, make conscious food choices, and develop sustainable eating habits that support long-term health and well-being.",
        image: "https://images.unsplash.com/photo-1547592180-85f173990554?w=500&h=400&fit=crop",
      },
      {
        title: "Comprehensive Wellness Blueprint",
        description: "Our lifestyle programs address all pillars of wellness including nutrition, physical activity, sleep quality, stress management, and emotional well-being. We create a personalized wellness blueprint that fits seamlessly into your daily routine.",
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&h=400&fit=crop",
      },
    ],
    benefits: [
      "Personalized wellness blueprints",
      "Stress and anxiety management through nutrition",
      "Sleep quality optimization",
      "Energy and immunity boosting plans",
      "Habit stacking and behavioral coaching",
      "Work-life balance nutrition strategies",
    ],
  },
}

export const homeExpertiseCards = [
  {
    title: "Our Medical Expertise in Clinical Nutrition",
    description: "As a premier medical diet clinic in India, we provide personalized diet plans for PCOD, thyroid, and diabetes management.",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop",
  },
  {
    title: "Dietitian Shreya Academy: Nutrition Education",
    description: "Empowering future weight loss dietitians through professional education at the Dietitian Shreya Academy.",
    image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=400&h=300&fit=crop",
  },
  {
    title: "Healthy Kitchen & Millet Based Diet Plans",
    description: "Shreya promotes farm-to-plate eating using Indian staples and home-grown produce for sustainable weight loss.",
    image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&h=300&fit=crop",
  },
  {
    title: "Client Transformations: Real Weight Loss Success Stories",
    description: "1,00,000+ lives transformed through expert online diet consultation and clinical nutrition.",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
  },
]
