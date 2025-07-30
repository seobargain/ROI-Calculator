import React from 'react';

const ResultCard = ({ title, subtitle, result }) => {
  if (!result) {
    return (
      <div className="bg-white shadow-lg rounded-xl p-8">
        <h2 className="text-2xl lg:text-3xl font-bold text-gray-800">{title}</h2>
        <p className="text-gray-600 mt-3 text-lg">{subtitle}</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 rounded-xl p-8 bg-white shadow-2xl">

      {/* ROI Summary */}
      <div 
        className="rounded-xl p-6" 
        style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}
      >
        <h3 className="text-2xl font-bold text-white">ROI Summary</h3>
        <div className="flex justify-between items-center text-white mt-4">
          <span className='text-lg'>Net Savings</span>
          <span className='text-xl font-semibold'>${result.netSavings.toLocaleString()}</span>
        </div>
        <div className="mt-4 bg-white/20 flex justify-between text-white text-center py-4 px-5 text-2xl rounded-lg">
          <span className='text-lg font-medium'>Return on Investment</span>
          <span className='font-bold'> 
            {result.roi.toFixed(1)}%
          </span>
        </div>
      </div>

      <div>
        <h2 className="text-2xl lg:text-3xl font-bold text-gray-800">{title}</h2>
        <p className="text-gray-600 text-lg mt-3">{subtitle}</p>
      </div>

      {/* Investment Breakdown */}
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 space-y-5">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Investment Breakdown</h3>
        <div className="flex justify-between text-gray-700 text-lg">
          <span>Subscription Costs</span>
          <span className='font-semibold'>${result.subscriptionCosts.toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-gray-700 text-lg">
          <span>Rewards Budget</span>
          <span className='font-semibold'>${result.rewardsBudget.toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-gray-700 text-lg">
          <span>Additional Costs</span>
          <span className='font-semibold'>${result.additionalProgramCosts.toLocaleString()}</span>
        </div>
        <hr className="border-t-2 border-gray-300 my-3" />
        <div className="flex justify-between font-bold text-xl text-indigo-600">
          <span>Total Investment</span>
          <span>${result.totalInvestment.toLocaleString()}</span>
        </div>
      </div>

      {/* Annual Savings Breakdown */}
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 space-y-5">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Annual Savings Breakdown</h3>
        <div className="flex justify-between text-gray-700 text-lg">
          <span>Retention Savings</span>
          <span className='font-semibold'>${result.retentionSavings.toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-gray-700 text-lg">
          <span>Productivity Savings</span>
          <span className='font-semibold'>${result.productivitySavings.toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-gray-700 text-lg">
          <span>Absenteeism Savings</span>
          <span className='font-semibold'>${result.absenteeismSavings.toLocaleString()}</span>
        </div>
        <hr className="border-t-2 border-gray-300 my-3" />
        <div className="flex justify-between font-bold text-xl text-green-600">
          <span>Total Annual Savings</span>
          <span>${result.totalSavings.toLocaleString()}</span>
        </div>
      </div>

    </div>
  );
};

export default ResultCard;