HTML

Copy Code
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>CHECK YOUR SALARY TAX WITH EKTA'S CALCULATOR</title>
  <style>
    body { font-family: Arial, sans-serif; background: #007bff; margin:0; padding:0; }
    .container { max-width: 980px; margin: 30px auto; padding: 20px; background: white; border-radius: 12px; box-shadow: 0 0 15px rgba(0,0,0,0.2); }
    h1 { text-align: center; margin-bottom: 20px; color: #007bff; }
    h2 { text-align:center; color:#007bff; }
    input, select { width: 100%; padding: 8px; margin: 5px 0; border-radius: 6px; border: 1px solid #ccc; }
    button { margin:10px 5px; padding:10px 15px; background:#007bff; color:white; border:none; border-radius:6px; font-weight:bold; cursor:pointer; }
    .page { display:none; }
    .active { display:block; }
    .progress { text-align:center; margin-bottom:15px; font-weight:bold; color:#fff; }
    table { width: 100%; border-collapse: collapse; margin-top: 20px; }
    th, td { border: 1px solid #007bff; padding: 10px; text-align: center; font-weight:bold; color:black; }
    th { background: #007bff; color: white; }
    td { background:#e6f0ff; }
    .better { background:#28a745; color:white; font-weight:bold; padding:10px; text-align:center; margin-top:15px; border-radius:6px; }
    .note { margin-top:20px; font-size:14px; background:#f0f8ff; padding:10px; border-radius:6px; }
    .grid-2 { display:grid; grid-template-columns:1fr 1fr; gap:12px; }
  </style>
</head>
<body>
  <div class="container">
    <h1>CHECK YOUR SALARY TAX WITH EKTA'S CALCULATOR</h1>
    <div class="progress" id="progress">Step 1 of 3: Salary Details</div>

    <!-- Page 1: Salary Details -->
    <div class="page active" id="page1">
      <h2>Salary Details</h2>
      <div class="grid-2">
        <input type="number" id="basic" placeholder="Basic Salary">
        <input type="number" id="da" placeholder="DA (if retirement benefit)">
        <input type="number" id="hra" placeholder="HRA Received">
        <input type="number" id="rent" placeholder="Rent Paid">
        <select id="city"><option value="metro">Metro</option><option value="non-metro">Non-Metro</option></select>
        <input type="number" id="pf" placeholder="Provident Fund Contribution (Employer+Employee)">
        <input type="number" id="bonus" placeholder="Bonus/Commission">
        <input type="number" id="allowances" placeholder="Other Allowances">
        <input type="number" id="perquisites" placeholder="Perquisites">
      </div>
      <button onclick="nextPage(2)">Next ➡️</button>
    </div>

    <!-- Page 2: Deductions -->
    <div class="page" id="page2">
      <h2>Deductions (Chapter VI-A)</h2>
      <p><b>80C:</b> LIC, PPF, ELSS, EPF, NSC, Tuition Fees, Housing Loan Principal (Max ₹1,50,000)</p>
      <input type="number" id="ded80c" placeholder="Enter Amount for 80C">
      <p><b>80D:</b> Medical Insurance for self/family/parents (₹25,000 / ₹50,000 if senior citizens)</p>
      <input type="number" id="ded80d" placeholder="Enter Amount for 80D">
      <p><b>80G:</b> Donations to approved institutions (50%/100% depending on approval)</p>
      <input type="number" id="ded80g" placeholder="Enter Amount for 80G">
      <p><b>80E:</b> Interest on Education Loan (No limit, max 8 years)</p>
      <input type="number" id="ded80e" placeholder="Enter Amount for 80E">
      <p><b>80TTA:</b> Savings Bank Interest (Max ₹10,000, Non-senior citizens)</p>
      <input type="number" id="ded80tta" placeholder="Enter Amount for 80TTA">
      <p><b>80TTB:</b> Savings/FD Interest (Max ₹50,000, Senior citizens only)</p>
      <input type="number" id="ded80ttb" placeholder="Enter Amount for 80TTB">

      <button onclick="prevPage(1)">⬅️ Back</button>
      <button onclick="nextPage(3)">Next ➡️</button>
    </div>

    <!-- Page 3: Tax Comparison -->
    <div class="page" id="page3">
      <h2>Tax Comparison</h2>
      <div id="output"></div>
      <div class="note">
        <h3>Income Tax Slabs (Awareness)</h3>
        <p><b>Old Regime:</b><br>
        Up to ₹2,50,000 – Nil<br>
        ₹2,50,001 to ₹5,00,000 – 5%<br>
        ₹5,00,001 to ₹10,00,000 – 20%<br>
        Above ₹10,00,000 – 30%</p>
        <p><b>New Regime (AY 2024-25):</b><br>
        Up to ₹3,00,000 – Nil<br>
        ₹3,00,001 to ₹6,00,000 – 5%<br>
        ₹6,00,001 to ₹9,00,000 – 10%<br>
        ₹9,00,001 to ₹12,00,000 – 15%<br>
        ₹12,00,001 to ₹15,00,000 – 20%<br>
        Above ₹15,00,000 – 30%</p>
        <p><b>Surcharge:</b><br>
        10% if income > ₹50L, 15% > ₹1Cr, 25% > ₹2Cr, 37% > ₹5Cr (New Regime capped at 25%).</p>
        <p><b>Note:</b> Health & Education Cess = 4% of (Tax + Surcharge).</p>
      </div>
      <button onclick="prevPage(2)">⬅️ Back</button>
    </div>
  </div>

  <script>
    function nextPage(p){
      document.querySelectorAll('.page').forEach(x=>x.classList.remove('active'));
      document.getElementById('page'+p).classList.add('active');
      document.getElementById('progress').innerText = `Step ${p} of 3: ${p==1?"Salary Details":p==2?"Deductions":"Tax Comparison"}`;
      if(p==3) calculateSalary();
    }
    function prevPage(p){
      nextPage(p);
    }

    function calculateSalary(){
      let basic=+document.getElementById("basic").value||0;
      let da=+document.getElementById("da").value||0;
      let hra=+document.getElementById("hra").value||0;
      let rent=+document.getElementById("rent").value||0;
      let city=document.getElementById("city").value;
      let pf=+document.getElementById("pf").value||0;
      let bonus=+document.getElementById("bonus").value||0;
      let allowances=+document.getElementById("allowances").value||0;
      let perquisites=+document.getElementById("perquisites").value||0;

      let gross=basic+da+hra+pf+bonus+allowances+perquisites;

      // HRA exemption (old only)
      let salaryForHRA=basic+da;
      let hraExempt=Math.min(hra,(city=="metro"?0.5:0.4)*salaryForHRA,Math.max(rent-0.1*salaryForHRA,0));

      let netOld=gross-hraExempt-75000;
      let netNew=gross-75000;

      // deductions
      let ded80c=Math.min(+document.getElementById("ded80c").value||0,150000);
      let ded80d=Math.min(+document.getElementById("ded80d").value||0,50000);
      let ded80g=+document.getElementById("ded80g").value||0;
      let ded80e=+document.getElementById("ded80e").value||0;
      let ded80tta=Math.min(+document.getElementById("ded80tta").value||0,10000);
      let ded80ttb=Math.min(+document.getElementById("ded80ttb").value||0,50000);
      let totalDeductions=ded80c+ded80d+ded80g+ded80e+ded80tta+ded80ttb;

      let taxableOld=Math.max(netOld-totalDeductions,0);
      let taxableNew=Math.max(netNew,0);

      function taxOld(x){
        if(x<=250000)return 0; else if(x<=500000)return (x-250000)*.05; else if(x<=1000000)return 12500+(x-500000)*.2; else return 112500+(x-1000000)*.3;
      }
      function taxNew(x){
        if(x<=300000)return 0; else if(x<=600000)return (x-300000)*.05; else if(x<=900000)return 15000+(x-600000)*.1; else if(x<=1200000)return 45000+(x-900000)*.15; else if(x<=1500000)return 90000+(x-1200000)*.2; else return 150000+(x-1500000)*.3;
      }

      let taxO=taxOld(taxableOld); if(taxableOld<=500000)taxO=0;
      let taxN=taxNew(taxableNew); if(taxableNew<=700000)taxN=0;

      function surcharge(income,tax,regime){
        if(income>50000000)return tax*(regime=="new"?0.25:0.37);
        else if(income>20000000)return tax*0.25;
        else if(income>10000000)return tax*0.15;
        else if(income>5000000)return tax*0.10;
        return 0;
      }

      let surO=surcharge(taxableOld,taxO,"old"), surN=surcharge(taxableNew,taxN,"new");
      let cessO=(taxO+surO)*0.04, cessN=(taxN+surN)*0.04;
      let totO=taxO+surO+cessO, totN=taxN+surN+cessN;

      let better=(totO<totN?"Old Regime":totN<totO?"New Regime":"Both Equal");

      document.getElementById("output").innerHTML=`<table>
        <tr><th>Particulars</th><th>Old Regime</th><th>New Regime</th></tr>
        <tr><td>Gross Salary</td><td>₹${gross.toLocaleString()}</td><td>₹${gross.toLocaleString()}</td></tr>
        <tr><td>HRA Exemption</td><td>₹${hraExempt.toLocaleString()}</td><td>-</td></tr>
        <tr><td>Standard Deduction</td><td>₹75,000</td><td>₹75,000</td></tr>
        <tr><td>Total Deductions (80C–80TTB)</td><td>₹${totalDeductions.toLocaleString()}</td><td>-</td></tr>
        <tr><td><b>Taxable Income</b></td><td>₹${taxableOld.toLocaleString()}</td><td>₹${taxableNew.toLocaleString()}</td></tr>
        <tr><td>Income Tax</td><td>₹${taxO.toLocaleString()}</td><td>₹${taxN.toLocaleString()}</td></tr>
        <tr><td>Surcharge</td><td>₹${surO.toLocaleString()}</td><td>₹${surN.toLocaleString()}</td></tr>
        <tr><td>Cess @4%</td><td>₹${cessO.toLocaleString()}</td><td>₹${cessN.toLocaleString()}</td></tr>
        <tr><td><b>Total Tax Payable</b></td><td>₹${totO.toLocaleString()}</td><td>₹${totN.toLocaleString()}</td></tr>
      </table>
      <div class='better'>Best Option: ${better}</div>`;
    }
  </script>
</body>
</html>