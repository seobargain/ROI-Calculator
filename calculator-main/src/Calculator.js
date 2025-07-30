import React, { useState, useEffect } from 'react';
import Layout from "./Layout";
import FormCard from './FormCard';
import ResultCard from './ResultCard';
import DataViz from './DataViz';
import PdfForm from './PdfForm';

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

  const industryDefaults = {
    'tech': { numberOfEmployees: 500, averageSalary: 85000, currentTurnoverRate: 15, expectedTurnoverReduction: 25, costOfTurnover: 75, revenuePerEmployee: 150000, expectedProductivityIncrease: 8, currentAbsenteeismDays: 8, expectedAbsenteeismReduction: 30, dailyCostOfAbsenteeism: 300, monthlySubscriptionFee: 8, percentageForRewards: 70, additionalProgramCosts: 15000 },
    'finance': { numberOfEmployees: 600, averageSalary: 75000, currentTurnoverRate: 12, expectedTurnoverReduction: 20, costOfTurnover: 90, revenuePerEmployee: 180000, expectedProductivityIncrease: 7, currentAbsenteeismDays: 6, expectedAbsenteeismReduction: 25, dailyCostOfAbsenteeism: 350, monthlySubscriptionFee: 10, percentageForRewards: 60, additionalProgramCosts: 18000 },
    'healthcare': { numberOfEmployees: 1000, averageSalary: 65000, currentTurnoverRate: 22, expectedTurnoverReduction: 30, costOfTurnover: 85, revenuePerEmployee: 120000, expectedProductivityIncrease: 6, currentAbsenteeismDays: 12, expectedAbsenteeismReduction: 35, dailyCostOfAbsenteeism: 250, monthlySubscriptionFee: 6, percentageForRewards: 75, additionalProgramCosts: 20000 },
    'retail': { numberOfEmployees: 800, averageSalary: 35000, currentTurnoverRate: 35, expectedTurnoverReduction: 40, costOfTurnover: 50, revenuePerEmployee: 80000, expectedProductivityIncrease: 10, currentAbsenteeismDays: 10, expectedAbsenteeismReduction: 25, dailyCostOfAbsenteeism: 150, monthlySubscriptionFee: 5, percentageForRewards: 80, additionalProgramCosts: 10000 },
    'manufacturing': { numberOfEmployees: 1200, averageSalary: 55000, currentTurnoverRate: 18, expectedTurnoverReduction: 28, costOfTurnover: 65, revenuePerEmployee: 200000, expectedProductivityIncrease: 12, currentAbsenteeismDays: 9, expectedAbsenteeismReduction: 40, dailyCostOfAbsenteeism: 400, monthlySubscriptionFee: 7, percentageForRewards: 65, additionalProgramCosts: 25000 },
  };

  const handleChange = (field, value) => {
    if (field === 'industry') {
      const defaults = industryDefaults[value] || {};
      setMetrics({ industry: value, ...defaults });
    } else {
      setMetrics(prev => ({ ...prev, [field]: typeof prev[field] === 'number' ? Number(value) : value }));
    }
  };

  const calculateRoi = () => {
    const { numberOfEmployees, averageSalary, currentTurnoverRate, expectedTurnoverReduction, costOfTurnover, revenuePerEmployee, expectedProductivityIncrease, currentAbsenteeismDays, expectedAbsenteeismReduction, dailyCostOfAbsenteeism, monthlySubscriptionFee, percentageForRewards, additionalProgramCosts } = metrics;
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
    setResults({ subscriptionCosts, rewardsBudget, additionalProgramCosts, totalInvestment, retentionSavings, productivitySavings, absenteeismSavings, totalSavings, netSavings, roi, metrics });
  };

  useEffect(() => { if (metrics.industry) { calculateRoi(); } }, [metrics]);

  return (
    <Layout>
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className='flex flex-col space-y-8'>
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
          <FormCard
            title="Productivity & Absenteeism Impact"
            subtitle="Expected improvements from recognition"
            fields={[
              { name: 'expectedProductivityIncrease', label: 'Expected Productivity Increase (%)', type: 'number' },
              { name: 'currentAbsenteeismDays', label: 'Current Absenteeism Days/Employee', type: 'number' },
              { name: 'expectedAbsenteeismReduction', label: 'Expected Absenteeism Reduction (%)', type: 'number' },
              { name: 'dailyCostOfAbsenteeism', label: 'Daily Cost of Absenteeism per Employee ($)', type: 'number' },
            ]}
            values={metrics}
            onChange={handleChange}
          />
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
        <div className='flex flex-col space-y-8'>
          <ResultCard
            title="ROI Results"
            subtitle="Here's your ROI breakdown"
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
    </Layout>
  );
};

export default RoiCalculatorER;
