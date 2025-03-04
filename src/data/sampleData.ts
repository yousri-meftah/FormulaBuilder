export const sampleFormulas = [
  {
    id: 1,
    name: "University Grade Calculator",
    description: "Calculate your weighted average grade based on subject coefficients.",
    category: "education",
    expression: "((Math * 2) + (Physics * 3) + (Chemistry * 1)) / (2+3+1)",
    rating: 4.8,
    usageCount: 1245,
    tags: ["grades", "university", "weighted average"],
    variables: [
      { name: "Math", symbol: "Math", description: "Your math grade" },
      { name: "Physics", symbol: "Physics", description: "Your physics grade" },
      { name: "Chemistry", symbol: "Chemistry", description: "Your chemistry grade" }
    ],
    explanation: "This formula calculates a weighted average of your grades based on the coefficient (importance) of each subject. Each grade is multiplied by its coefficient, then divided by the sum of all coefficients.",
    example: "If Math = 16, Physics = 14, Chemistry = 18, then: ((16*2) + (14*3) + (18*1)) / (2+3+1) = (32 + 42 + 18) / 6 = 92 / 6 = 15.33",
    applications: [
      "University grade calculations",
      "High school grade averages",
      "Any weighted scoring system"
    ]
  },
  {
    id: 2,
    name: "Loan Payment Calculator",
    description: "Calculate monthly loan payments based on principal, interest rate, and term.",
    category: "finance",
    expression: "P * (r * (1 + r)^n) / ((1 + r)^n - 1)",
    rating: 4.7,
    usageCount: 987,
    tags: ["loans", "finance", "payments"],
    variables: [
      { name: "Principal", symbol: "P", description: "The loan amount" },
      { name: "Monthly Interest Rate", symbol: "r", description: "Annual interest rate divided by 12 (in decimal)" },
      { name: "Number of Payments", symbol: "n", description: "Total number of monthly payments" }
    ],
    explanation: "This formula calculates the monthly payment for a loan with a fixed interest rate and term. It accounts for compound interest over the life of the loan.",
    example: "For a $200,000 loan with 5% annual interest (0.05/12 monthly) for 30 years (360 payments): $200,000 * (0.00417 * (1.00417)^360) / ((1.00417)^360 - 1) = $1,073.64 per month",
    applications: [
      "Mortgage payments",
      "Auto loan calculations",
      "Personal loan planning"
    ]
  },
  {
    id: 3,
    name: "BMI Calculator",
    description: "Calculate Body Mass Index based on height and weight.",
    category: "health",
    expression: "weight / (height^2)",
    rating: 4.9,
    usageCount: 756,
    tags: ["health", "fitness", "body metrics"],
    variables: [
      { name: "Weight", symbol: "weight", description: "Weight in kilograms" },
      { name: "Height", symbol: "height", description: "Height in meters" }
    ]
  },
  {
    id: 4,
    name: "Compound Interest",
    description: "Calculate the future value of an investment with compound interest.",
    category: "finance",
    expression: "P * (1 + r/n)^(n*t)",
    rating: 4.5,
    usageCount: 1089,
    tags: ["investment", "interest", "savings"],
    variables: [
      { name: "Principal", symbol: "P", description: "The initial investment amount" },
      { name: "Annual Interest Rate", symbol: "r", description: "The annual interest rate (decimal)" },
      { name: "Compounding Frequency", symbol: "n", description: "Number of times interest is compounded per year" },
      { name: "Time", symbol: "t", description: "Time in years" }
    ]
  },
  {
    id: 5,
    name: "Sales Commission Calculator",
    description: "Calculate commission based on sales amount and rate.",
    category: "business",
    expression: "sales * rate",
    rating: 4.6,
    usageCount: 823,
    tags: ["sales", "commission", "business"],
    variables: [
      { name: "Sales Amount", symbol: "sales", description: "Total sales amount" },
      { name: "Commission Rate", symbol: "rate", description: "Commission rate as a decimal (e.g., 0.05 for 5%)" }
    ]
  },
  {
    id: 6,
    name: "Weighted Performance Score",
    description: "Calculate a weighted performance score based on multiple metrics.",
    category: "business",
    expression: "(Sales * 0.4) + (CustomerSat * 0.3) + (Attendance * 0.3)",
    rating: 4.7,
    usageCount: 912,
    tags: ["performance", "evaluation", "metrics"],
    variables: [
      { name: "Sales Performance", symbol: "Sales", description: "Sales performance score (0-100)" },
      { name: "Customer Satisfaction", symbol: "CustomerSat", description: "Customer satisfaction score (0-100)" },
      { name: "Attendance", symbol: "Attendance", description: "Attendance score (0-100)" }
    ]
  }
];