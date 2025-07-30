import React from 'react';

const FormCard = ({ title, subtitle, fields, dropdownLabel, dropdownOptions, values, onChange }) => {
  return (
    <div className="bg-white shadow-lg rounded-xl p-8 space-y-6">
      <div>
        <h2 className="text-2xl lg:text-3xl font-bold text-gray-800">{title}</h2>
        <p className="text-gray-600 mt-2 text-lg">{subtitle}</p>
      </div>
      
      {dropdownLabel && (
        <div className="flex flex-col space-y-2">
          <label className="text-lg font-medium text-gray-700">{dropdownLabel}</label>
          <select 
            onChange={(e) => onChange('industry', e.target.value)} 
            value={values.industry}
            className="p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
          >
            <option value="">Select an industry</option>
            {dropdownOptions.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>
      )}
      
      {fields && fields.map(field => (
        <div key={field.name} className="flex flex-col space-y-2">
          <label className="text-lg font-medium text-gray-700">{field.label}</label>
          <input
            type={field.type}
            value={values[field.name]}
            onChange={(e) => onChange(field.name, e.target.value)}
            className="p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
          />
        </div>
      ))}
    </div>
  );
};

export default FormCard;
