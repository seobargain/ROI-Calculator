import React,{useState,useEffect} from 'react';
import Layout from "../../../components/layout";
import FormCard from '../../../components/FormCard';
import ResultCard from '../../../components/FormResult/Result';
import DataViz from '../../../components/FormResult/DataVisualize';
import PdfForm from '../../../components/FormResult/DownloadPdf';

const RoiCalculatorER = () => {

const [results, setResults] = useState(null);


 const [metrics, setMetrics] = useState({
  industry: '',
  numberOfEmployees: 0,
  averageSalary: 0,
    currentTurnoverRate: 0,
    expectedTurnoverReduction: 0,
    costOfTurnover: 0,
    revenuePerEmployee: 0,
    expectedProductivityIncrease: 0,
    currentAbsenteeismDays: 0,
    expectedAbsenteeismReduction: 0,
    dailyCostOfAbsenteeism: 0,
    monthlySubscriptionFee: 0,
    percentageForRewards: 0,
    additionalProgramCosts: 0
});


// Industry-specific default values
const industryDefaults = {
  'tech': {
    numberOfEmployees: 500,
    averageSalary: 85000,
    currentTurnoverRate: 15,
    expectedTurnoverReduction: 25,
    costOfTurnover: 75,
    revenuePerEmployee: 150000,
    expectedProductivityIncrease: 8,
    currentAbsenteeismDays: 8,
    expectedAbsenteeismReduction: 30,
    dailyCostOfAbsenteeism: 300,
    monthlySubscriptionFee: 8,
    percentageForRewards: 70,
    additionalProgramCosts: 15000
  },
  'finance': {
    numberOfEmployees: 600,
    averageSalary: 75000,
    currentTurnoverRate: 12,
    expectedTurnoverReduction: 20,
    costOfTurnover: 90,
    revenuePerEmployee: 180000,
    expectedProductivityIncrease: 7,
    currentAbsenteeismDays: 6,
    expectedAbsenteeismReduction: 25,
    dailyCostOfAbsenteeism: 350,
    monthlySubscriptionFee: 10,
    percentageForRewards: 60,
    additionalProgramCosts: 18000
  },
  'healthcare': {
    numberOfEmployees: 1000,
    averageSalary: 65000,
    currentTurnoverRate: 22,
    expectedTurnoverReduction: 30,
    costOfTurnover: 85,
    revenuePerEmployee: 120000,
    expectedProductivityIncrease: 6,
    currentAbsenteeismDays: 12,
    expectedAbsenteeismReduction: 35,
    dailyCostOfAbsenteeism: 250,
    monthlySubscriptionFee: 6,
    percentageForRewards: 75,
    additionalProgramCosts: 20000
  },
  'retail': {
    numberOfEmployees: 800,
    averageSalary: 35000,
    currentTurnoverRate: 35,
    expectedTurnoverReduction: 40,
    costOfTurnover: 50,
    revenuePerEmployee: 80000,
    expectedProductivityIncrease: 10,
    currentAbsenteeismDays: 10,
    expectedAbsenteeismReduction: 25,
    dailyCostOfAbsenteeism: 150,
    monthlySubscriptionFee: 5,
    percentageForRewards: 80,
    additionalProgramCosts: 10000
  },
  'manufacturing': {
    numberOfEmployees: 1200,
    averageSalary: 55000,
    currentTurnoverRate: 18,
    expectedTurnoverReduction: 28,
    costOfTurnover: 65,
    revenuePerEmployee: 200000,
    expectedProductivityIncrease: 12,
    currentAbsenteeismDays: 9,
    expectedAbsenteeismReduction: 40,
    dailyCostOfAbsenteeism: 400,
    monthlySubscriptionFee: 7,
    percentageForRewards: 65,
    additionalProgramCosts: 25000
  },
}

const handleChange = (field, value) => {
  if (field === 'industry') {
    const defaults = industryDefaults[value] || {};
    setMetrics({
      industry: value,
      ...defaults
    });
  } else {
    setMetrics(prev => ({
      ...prev,
      [field]: typeof prev[field] === 'number' ? Number(value) : value
    }));
  }
};


const calculateRoi = () => {
  const {
    numberOfEmployees,
    averageSalary,
    currentTurnoverRate,
    expectedTurnoverReduction,
    costOfTurnover,
    revenuePerEmployee,
    expectedProductivityIncrease,
    currentAbsenteeismDays,
    expectedAbsenteeismReduction,
    dailyCostOfAbsenteeism,
    monthlySubscriptionFee,
    percentageForRewards,
    additionalProgramCosts,
  } = metrics;

  const subscriptionCosts = numberOfEmployees * monthlySubscriptionFee * 12;
  const rewardsBudget = numberOfEmployees * averageSalary * (percentageForRewards / 100) * 0.01;
  const totalInvestment = subscriptionCosts + rewardsBudget + additionalProgramCosts;

  const turnoverEmployees = numberOfEmployees * (currentTurnoverRate / 100);
  const retainedEmployees = turnoverEmployees * (expectedTurnoverReduction / 100);
  const costPerTurnover = averageSalary * (costOfTurnover / 100);
  const retentionSavings = retainedEmployees * costPerTurnover;

  const productivityGainPerEmployee = revenuePerEmployee * (expectedProductivityIncrease / 100);
  const productivitySavings = productivityGainPerEmployee * numberOfEmployees;

  const totalAbsenteeismDays = numberOfEmployees * currentAbsenteeismDays;
  const reducedAbsenteeismDays = totalAbsenteeismDays * (expectedAbsenteeismReduction / 100);
  const absenteeismSavings = reducedAbsenteeismDays * dailyCostOfAbsenteeism;

  const totalSavings = retentionSavings + productivitySavings + absenteeismSavings;
  const netSavings = totalSavings - totalInvestment;
  const roi = (netSavings / totalInvestment) * 100;

  setResults({
    subscriptionCosts,
    rewardsBudget,
    additionalProgramCosts,
    totalInvestment,
    retentionSavings,
    productivitySavings,
    absenteeismSavings,
    totalSavings,
    netSavings,
    roi,
    metrics,
  });
};


// Only run calculation if at input field is changed
useEffect(() => {
  if (metrics.industry) {
    calculateRoi();
  }
}, [metrics]);

  
  return (
    <Layout>
      <div className="bg-purple-light shadow-sm">
        <div className="w-full px-0 sm:px-6 lg:px-0 pb-10 pt-0">
          <div className="w-full mx-auto flex items-center h-44 space-x-3 bg-[#29294c]">
            <div className='max-w-7xl w-full mx-auto pt-3 px-4 lg:px-0 flex items-center justify-center space-x-3'>
              <div>
                <h1 className="text-xl lg:text-4xl text-center font-medium text-white">
                  Employee Recognition ROI Calculator
                </h1>
                <p className="text-white mt-1 text-center">
                  Calculate the financial impact of your employee recognition program
                </p>
              </div>
            </div>
          </div>
          <div className='max-w-7xl px-4 lg:px-0 mx-auto mt-8 grid grid-cols-1 md:grid-cols-2 gap-6'>
            <div className='flex flex-col space-y-6'>
                <FormCard
                  title="Industry Selection"
                  subtitle="Choose your industry to load default values"
                  dropdownLabel="Industry"
                  dropdownOptions={[
                    { value: 'tech', label: 'Technology' },
                    { value: 'finance', label: 'Finance' },
                    { value: 'healthcare', label: 'Healthcare' },
                    { value: 'retail', label: 'Retail' },
                    { value: 'manufacturing', label: 'Manufacturing' },
                  ]}
                  values={metrics}
                  onChange={handleChange}
                />

                 {/* Company Information */}
                <FormCard
                  title="Company Information"
                  subtitle="Basic information about your organization"
                  fields={[
                    { name: 'numberOfEmployees', label: 'Number of Employees', type: 'number' },
                    { name: 'averageSalary', label: 'Average Employee Salary ($)', type: 'number' },
                    { name: 'revenuePerEmployee', label: 'Revenue per Employee ($)', type: 'number' },
                  ]}
                  values={metrics}
                  onChange={handleChange}
                />

                {/* Turnover Information */}
                <FormCard
                  title="Employee Turnover Impact"
                  subtitle="Current turnover rates and expected improvements"
                  fields={[
                    { name: 'currentTurnoverRate', label: 'Current Annual Turnover Rate (%)', type: 'number' },
                    { name: 'expectedTurnoverReduction', label: 'Expected Turnover Reduction (%)', type: 'number' },
                    { name: 'costOfTurnover', label: 'Cost of Turnover (% of salary)', type: 'number' },
                  ]}
                  values={metrics}
                  onChange={handleChange}
                />

                 {/* Productivity Impact */}
                <FormCard
                  title="Productivity Impact"
                  subtitle="Expected productivity improvements from recognition"
                  fields={[
                    { name: 'expectedProductivityIncrease', label: 'Expected Productivity Increase (%)', type: 'number' },
                  ]}
                  values={metrics}
                  onChange={handleChange}
                />

                {/* Absenteeism Impact */}
                <FormCard
                  title="Absenteeism Impact"
                  subtitle="Current absenteeism rates and expected improvements"
                  fields={[
                    { name: 'currentAbsenteeismDays', label: 'Current Absenteeism Days/Employee', type: 'number' },
                    { name: 'expectedAbsenteeismReduction', label: 'Expected Absenteeism Reduction (%)', type: 'number' },
                    { name: 'dailyCostOfAbsenteeism', label: 'Daily Cost of Absenteeism per Employee ($)', type: 'number' },
                  ]}
                  values={metrics}
                  onChange={handleChange}
                />

                {/* Program Costs */}
                <FormCard
                  title="Program Costs"
                  subtitle="Recognition program investment details"
                  fields={[
                    { name: 'monthlySubscriptionFee', label: 'Monthly Subscription per Employee ($)', type: 'number' },
                    { name: 'percentageForRewards', label: 'Percentage of Budget for Rewards (%)', type: 'number' },
                    { name: 'additionalProgramCosts', label: 'Additional Program Costs ($)', type: 'number' },
                  ]}
                  values={metrics}
                  onChange={handleChange}
                />
                
            </div>
            <div className='flex flex-col space-y-6'>
                <ResultCard
                  title="ROI Results"
                  subtitle= "Here's your ROI breakdown"
                  result={results}
                />

              <DataViz
                title="Data Visualization"
                subtitle="Visual breakdown of your ROI analysis"
                result={results}
              />

              <PdfForm
                title="Download Report"
                result={results}
                metrics={metrics}
              />
            </div>
          </div>
          <div className='max-w-7xl px-4 lg:px-0 mx-auto lg:mt-8'>
            <section className="px-5 w-full flex justify-center py-10 xl:py-0">
              <div className="w-full">
                <h2 className="text-3xl pb-5 md:pb-10 pt-5 md:pt-10">About this ROI calculator</h2>
                <p className="text-indigo-100">
                  The <strong>Employee Recognition ROI Calculator</strong> is a simple but powerful tool designed to show you the real financial impact of your employee recognition program. By just entering some key details about your company—like size, turnover rates, absenteeism, and productivity—you’ll get a clear picture of how much ROI your recognition efforts could generate.
                </p>
                <p className="text-indigo-100">The calculator evaluates several key areas of impact:</p>
                <ul>
                  <li className="pb-5">
                    <strong>Employee Turnover:</strong> This shows you how much turnover is costing you and how much you could save by improving retention with a recognition program.
                  </li>
                  <li className="pb-5">
                    <strong>Productivity:</strong> It estimates how much a solid recognition program could boost your employees' productivity. Happy, appreciated employees tend to do better work!
                  </li>
                  <li className="pb-5">
                    <strong>Absenteeism:</strong> By reducing absenteeism through better engagement, this calculator helps you see how much you can save when employees are more connected to their work.
                  </li>
                </ul>

                <h2 className="text-3xl pb-5 md:pb-10 pt-5 md:pt-10">Why is it important to calculate the ROI of your recognition program?</h2>
                <p className="text-indigo-100">
                  Calculating the Return on Investment (ROI) for employee recognition programs is crucial for several reasons:
                </p>
                <ol style={{ listStyleType: 'auto' }}>
                  <li className="pb-5">
                    <strong>Justifying Budget Allocation:</strong> By showing the value of the program, ROI helps you secure the resources you need. It makes sure every dollar spent is well worth it.
                  </li>
                  <li className="pb-5">
                    <strong>Measures Effectiveness:</strong> ROI gives you a clear picture of how your recognition efforts are impacting retention and productivity. It helps you see what's working and what needs improvement.
                  </li>
                  <li className="pb-5">
                    <strong>Optimizing Program Design:</strong> With ROI data, you can pinpoint areas that need tweaking. This helps refine your strategy to make the program even more effective for your team.
                  </li>
                  <li className="pb-5">
                    <strong>Informed Decision-Making:</strong> The insights from ROI help you make smarter decisions about scaling or adjusting your program. You’ll know exactly where to focus your efforts.
                  </li>
                  <li className="pb-5">
                    <strong>Demonstrate Values:</strong> ROI shows your leadership how recognition drives real results. It makes the business case for why investing in employee engagement is a smart move.
                  </li>
                  <li className="pb-5">
                    <strong>Aligns HR with Business:</strong> By linking recognition to company goals, ROI proves that HR isn’t just about people—it’s about delivering measurable results for the business.
                  </li>
                </ol>

                <h2 className="text-3xl pb-5 md:pb-10 pt-5 md:pt-10">Key Terms Defined</h2>
                <ul>
                  <li className="pb-5">
                    <strong>Net Savings:</strong> The total amount your organization can save from improved retention, increased productivity, and reduced absenteeism after factoring in the program costs.
                  </li>
                  <li className="pb-5">
                    <strong>Return on Investment (ROI):</strong> A percentage figure that represents the return you get for every dollar invested in the recognition program. It’s calculated as
                  </li>
                </ul>

                <div
                  className="pb-5"
                  style={{
                    textAlign: 'center',
                    margin: 'auto',
                    padding: '20px',
                    border: '1px solid #ccc',
                    borderRadius: '8px',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                    width:'fit-content'
                  }}
                >
                  <div style={{ padding: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <span style={{ marginRight: '10px' }}>Return on Investment (ROI) =</span>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ borderBottom: '2px solid #000', paddingBottom: '5px' }}>(Total Investment - Total Savings)</div>
                      <div style={{ paddingTop: '5px' }}>Total Investment</div>
                    </div>
                    <span style={{ marginLeft: '5px' }}>× 100</span>
                  </div>
                </div>

                <ul>
                  <li className="pb-5 pt-5">
                    <strong>Investment Breakdown:</strong> A detailed view of the total costs associated with the recognition program, including subscription fees, rewards budget, and additional costs
                  </li>
                  <li className="pb-5">
                    <strong>Retention Savings:</strong> Savings generated from reducing employee turnover, including the cost of hiring and training new employees.
                  </li>
                  <li className="pb-5">
                    <strong>Productivity Savings:</strong> Gains in productivity attributed to higher employee motivation, engagement, and satisfaction.
                  </li>
                  <li className="pb-5">
                    <strong>Absenteeism Savings:</strong> Reduced costs resulting from fewer employee absences due to better engagement and job satisfaction.
                  </li>
                  <li className="pb-5">
                    <strong>Annual Savings:</strong> The sum of retention, productivity, and absenteeism savings.
                  </li>
                </ul>
              </div>
            </section>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default RoiCalculatorER;
