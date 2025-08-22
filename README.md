# 🧮 TaxGenius.in - Advanced India Tax Calculator

[![Live Website](https://img.shields.io/badge/Live-taxgenius.in-blue?style=for-the-badge&logo=web)](https://taxgenius.in)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)
[![Tech Stack](https://img.shields.io/badge/Tech-Modern%20Web-orange?style=for-the-badge)](#tech-stack)

## 🚀 Advanced Tax Calculation Engine for AY 2025-26

TaxGenius.in is a comprehensive, modern web application that provides accurate India income tax calculations with complete old vs new regime comparison. Built with cutting-edge web technologies and designed for the future of tax planning.

## Features

### Current Features
- **Complete Tax Calculation**: Compare both Old and New tax regimes side by side
- **All Major Deductions**: Includes HRA, 80C, 80D, Home Loan Interest, Education Loan, NPS, etc.
- **Real-time Calculations**: Updates automatically as you enter values
- **Visual Comparison**: Clear visual indication of which regime is better
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Modern UI**: Beautiful, intuitive interface with smooth animations

### Tax Regime Coverage

#### Old Tax Regime (FY 2024-25)
- Standard Deduction: ₹50,000
- HRA exemption calculation
- Section 80C deductions (up to ₹1.5 lakh)
- Section 80D medical insurance (up to ₹25,000)
- Home loan interest deduction (up to ₹2 lakh)
- Education loan interest (no limit)
- NPS additional deduction (up to ₹50,000)

#### New Tax Regime (FY 2024-25)
- Standard Deduction: ₹75,000
- Lower tax rates with revised slabs:
  - 0% up to ₹3 lakh
  - 5% from ₹3-6 lakh
  - 10% from ₹6-9 lakh
  - 15% from ₹9-12 lakh
  - 20% from ₹12-15 lakh
  - 30% above ₹15 lakh

## How to Use

1. **Open the Website**: Open `index.html` in any modern web browser
2. **Enter Your Details**: Fill in your annual salary and various deductions/investments
3. **View Results**: The calculator automatically compares both regimes and shows:
   - Detailed tax breakdown for both regimes
   - Which regime is better for you
   - Annual savings amount
   - Net take-home income

## File Structure

```
tax-calculator-website/
├── index.html          # Main HTML file
├── styles.css          # CSS styling and responsive design
├── script.js           # JavaScript for tax calculations
└── README.md           # This file
```

## Future Improvements (Planned)

### 1. PDF Document Analysis with AI
- **Feature**: Upload Form 16 or salary slips for automatic data extraction
- **Technology**: AI-powered OCR and document parsing
- **Benefit**: Eliminates manual data entry and reduces errors

### 2. AI Tax Advisor
- **Feature**: Personalized tax planning suggestions
- **Functionality**: 
  - Investment recommendations based on your profile
  - Tax-saving strategies
  - Optimal deduction planning
- **Technology**: Machine learning algorithms

### 3. Advanced Investment Recommendations
- **Feature**: Smart suggestions for tax-efficient investments
- **Coverage**: ELSS, PPF, NPS, Tax-saving FDs, Insurance
- **Personalization**: Based on risk profile and financial goals

### 4. Multi-Year Tax Planning
- **Feature**: Project taxes for multiple financial years
- **Functionality**:
  - Salary growth projections
  - Investment planning across years
  - Long-term tax optimization strategies

### 5. Additional Enhancements
- **Export Features**: PDF reports of tax calculations
- **Comparison Charts**: Visual graphs and charts
- **Tax Calendar**: Important dates and deadlines
- **Notification System**: Reminders for tax-saving investments

## Technical Implementation

### Technologies Used
- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Styling**: Modern CSS with Grid and Flexbox
- **Fonts**: Google Fonts (Inter)
- **Icons**: Font Awesome
- **Responsive**: Mobile-first design approach

### Browser Compatibility
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Tax Calculation Logic

The calculator implements the exact tax calculation logic as per Indian Income Tax rules:

1. **Gross Income Calculation**
2. **Deduction Application** (Old Regime only)
3. **Taxable Income Determination**
4. **Slab-wise Tax Calculation**
5. **Cess Addition** (4% on total tax)
6. **Net Income Calculation**

## Installation and Setup

1. **Clone or Download** the repository
2. **No Build Process Required** - Pure HTML/CSS/JS
3. **Open `index.html`** in any web browser
4. **Start Calculating** your taxes immediately

## Sample Calculation

The application comes pre-loaded with sample data:
- Annual Salary: ₹12,00,000
- HRA: ₹2,40,000
- Rent Paid: ₹1,80,000
- Various investments and deductions

## Accuracy Disclaimer

This calculator is designed for educational and planning purposes. Tax calculations are based on standard rules and may not cover all individual circumstances. Always consult with a qualified tax professional for official tax advice and filing.

## Contributing

Feel free to contribute to this project by:
- Reporting bugs or issues
- Suggesting new features
- Improving the UI/UX
- Adding more tax calculation scenarios

## License

This project is open source and available for educational use.

## Contact

For questions, suggestions, or issues, please create an issue in the repository or contact the development team.

---

**Note**: Tax rates and rules are subject to change. This calculator is updated for FY 2024-25. Please verify current tax rates with official sources before making financial decisions.
