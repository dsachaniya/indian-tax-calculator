# GST Calculator - Rate Reform Implementation

## Overview
This GST calculator implements the new rate structure that took effect on September 22, 2025, featuring significant reductions in GST rates for both goods and services.

## Rate Structure

### Old Rates (Before Sept 22, 2025)
- **Goods**: 18%
- **Services**: 18%

### New Rates (From Sept 22, 2025)
- **Goods**: 5% (73% reduction)
- **Services**: 12% (33% reduction)

## Calculation Logic

The calculator determines which rate to apply based on the "2-out-of-3 rule":

### Key Events
1. **Supply Date** - When goods/services were supplied
2. **Invoice Date** - When the invoice was issued
3. **Payment Date** - When payment was received

### Rate Application Rule
- **Old Rate (18%)**: Applied if **2 or more** events occurred before Sept 22, 2025
- **New Rate (5%/12%)**: Applied if **fewer than 2** events occurred before Sept 22, 2025

## Examples

### Example 1: Old Rate Applied
- Supply Date: Sept 20, 2025 ✅ (before reform)
- Invoice Date: Sept 21, 2025 ✅ (before reform)  
- Payment Date: Sept 25, 2025 ❌ (after reform)
- **Result**: 2/3 events before reform → **Old rate applies**

### Example 2: New Rate Applied
- Supply Date: Sept 20, 2025 ✅ (before reform)
- Invoice Date: Sept 23, 2025 ❌ (after reform)
- Payment Date: Sept 25, 2025 ❌ (after reform)
- **Result**: 1/3 events before reform → **New rate applies**

## Technical Implementation

```javascript
function calculateGST(type, amount, supplyDate, invoiceDate, paymentDate) {
    const currentRates = {
        "goods": { "old": 0.18, "new": 0.05 },
        "services": { "old": 0.18, "new": 0.12 }
    };

    const rateChangeDate = new Date("2025-09-22");
    
    // Count events before reform date
    let eventCount = 0;
    if (new Date(supplyDate) < rateChangeDate) eventCount++;
    if (new Date(invoiceDate) < rateChangeDate) eventCount++;
    if (new Date(paymentDate) < rateChangeDate) eventCount++;
    
    // Apply rate based on event count
    const applicableRate = eventCount >= 2 
        ? currentRates[type].old 
        : currentRates[type].new;
    
    return amount * applicableRate;
}
```

## Features

- ✅ Real-time calculation with visual feedback
- ✅ Date validation and formatting
- ✅ Event timeline visualization
- ✅ Currency formatting in Indian Rupees
- ✅ Responsive design
- ✅ Transition animations
- ✅ Comprehensive rate information

## Disclaimer

This calculator is based on a hypothetical GST reform scenario for demonstration purposes. Please consult official government sources and tax professionals for actual GST rates and regulations.
