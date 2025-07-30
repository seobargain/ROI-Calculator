import React from 'react';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">ROI Calculator</h1>
        </div>
      </header>
      <main className="py-10">
        <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
          <div className="px-4 py-8 sm:px-0">{
            children
            }</div>
        </div>
      </main>
      <footer className="bg-white">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} Vantage Circle. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
