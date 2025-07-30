import React from 'react';

const DataViz = ({ title, subtitle, result }) => {
  if (!result) {
    return (
      <div className="bg-white shadow-lg rounded-xl p-8">
        <h2 className="text-2xl lg:text-3xl font-bold text-gray-800">{title}</h2>
        <p className="text-gray-600 mt-3 text-lg">{subtitle}</p>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-lg rounded-xl p-8">
      <h2 className="text-2xl lg:text-3xl font-bold text-gray-800">{title}</h2>
      <p className="text-gray-600 mt-3 text-lg">{subtitle}</p>
      
      <div className="mt-6">
        <div className="mb-4">
          <h3 className="text-xl font-semibold text-gray-700">Financial Summary</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-red-100 p-4 rounded-lg">
            <p className="text-lg font-medium">Total Investment</p>
            <p className="text-2xl font-bold">${result.totalInvestment.toLocaleString()}</p>
          </div>
          
          <div className="bg-green-100 p-4 rounded-lg">
            <p className="text-lg font-medium">Total Savings</p>
            <p className="text-2xl font-bold">${result.totalSavings.toLocaleString()}</p>
          </div>
          
          <div className="bg-blue-100 p-4 rounded-lg">
            <p className="text-lg font-medium">Net Savings</p>
            <p className="text-2xl font-bold">${result.netSavings.toLocaleString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataViz;
