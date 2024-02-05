const fs = require('fs');
const XLSX = require('xlsx');

const filePath = './employee_data_.xlsx';

try{
const workbook = XLSX.readFile(filePath);

const sh = workbook.SheetNames[0];
const sheet = workbook.Sheets[sh];

const data = XLSX.utils.sheet_to_json(sheet);



function calculateBonus(annualSalary) {
  if (annualSalary < 50000) {
    return { percentage: 5, amount: annualSalary * 0.05 };
  } else if (annualSalary >= 50000 && annualSalary <= 100000) {
    return { percentage: 7, amount: annualSalary * 0.07 };
  } else {
    return { percentage: 10, amount: annualSalary * 0.1 };
  }
}

console.log("Employee Information with Detailed Bonus Information:");
data.forEach(employee => {
  const bonusResult = calculateBonus(employee.AnnualSalary);
  console.log(`EmployeeID: ${employee.EmployeeID}, AnnualSalary: ${employee.AnnualSalary}, Bonuses: ${Math.floor(bonusResult.amount)}`);
  employee.BonusPercentage = bonusResult.percentage;
  employee.BonusAmount = Math.floor(bonusResult.amount);
});

console.log("--------------------------------------------------------");

console.table(data);

const workbook2 = XLSX.utils.book_new();

const worksheet = XLSX.utils.json_to_sheet(data);

XLSX.utils.book_append_sheet(workbook2, worksheet, 'EmployeeData');

XLSX.writeFile(workbook2, './employee_data_with_bonus.xlsx');

} catch (error) {
    console.error(`Error: ${error.message}`);
}