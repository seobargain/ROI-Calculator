import React, { useEffect, useState } from 'react';
import {
  Document,
  Page,
  Text,
  View,
  Image,
  StyleSheet,
  pdf,
  Font,
} from '@react-pdf/renderer';

// Registering a font from gemini.md
Font.register({
  family: 'Lato',
  fonts: [
    { src: 'https://fonts.googleapis.com/css2?family=Lato:wght@400;700&display=swap', fontWeight: 'normal' },
    { src: 'https://fonts.googleapis.com/css2?family=Lato:wght@400;700&display=swap', fontWeight: 'bold' },
  ],
});

const styles = StyleSheet.create({
  page: {
    fontFamily: 'Lato',
    fontSize: 11,
    padding: '50px 60px',
    backgroundColor: '#f0f2f5', // --primary-bg
    color: '#333333', // --text-color
  },
  slide: {
    backgroundColor: '#ffffff',
    padding: '50px 60px',
    borderRadius: 15,
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
    borderTop: '8px solid #ff6700', // --accent-color
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
    borderBottomWidth: 2,
    borderBottomColor: '#f0f2f5', // --primary-bg
    paddingBottom: 20,
  },
  logo: {
    width: 160,
    height: 'auto',
  },
  headerText: {
    fontSize: 14,
    color: '#0d2a4d', // --header-color
    fontWeight: 'bold',
  },
  title: {
    fontSize: 28,
    textAlign: 'center',
    marginBottom: 30,
    color: '#0d2a4d', // --header-color
    fontWeight: 'bold',
    textTransform: 'capitalize',
    borderBottomWidth: 2,
    borderBottomColor: '#f0f2f5', // --primary-bg
    paddingBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 15,
    color: '#0d2a4d', // --header-color
    fontWeight: 'bold',
    borderBottomWidth: 1,
    borderBottomColor: '#EAEAEA',
    paddingBottom: 8,
  },
  section: {
    marginBottom: 25,
    padding: 20,
    backgroundColor: '#ffffff', // --slide-bg
    borderRadius: 15,
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
  },
  text: {
    marginBottom: 10,
    lineHeight: 1.7,
    fontSize: 12,
    color: '#333333', // --text-color
  },
  table: {
    display: 'table',
    width: '100%',
    marginTop: 15,
    borderRadius: 5,
    overflow: 'hidden',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  tableColHeader: {
    width: '50%',
    padding: '12px 10px',
    backgroundColor: '#0d2a4d', // --header-color
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  tableCol: {
    width: '50%',
    padding: '12px 10px',
  },
  tableCell: {
    fontSize: 11,
    color: '#FFFFFF',
  },
  footer: {
    position: 'absolute',
    bottom: 25,
    left: 40,
    right: 40,
    textAlign: 'center',
    color: '#999999',
    fontSize: 9,
    borderTopWidth: 1,
    borderTopColor: '#EAEAEA',
    paddingTop: 12,
  },
  executiveSummary: {
    backgroundColor: '#f0f2f5', // --primary-bg
    padding: 20,
    borderRadius: 15,
    marginBottom: 25,
  },
  roiHighlight: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#28A745', // Green for positive ROI
    textAlign: 'center',
    marginTop: 15,
  },
});

const PdfHeader = () => (
  <View style={styles.header}>
    <Image
      src="https://res.cloudinary.com/vantagecircle/image/upload/gatsbycms/uploads/2023/07/new-vc-logo.png"
      style={styles.logo}
    />
    <Text style={styles.headerText}>ROI Calculation Report</Text>
  </View>
);

const PdfForm = ({ title, subtitle, result, metrics }) => {
  const [showForm, setShowForm] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [userName, setUserName] = useState('');
  const [companyName, setCompanyName] = useState('');

  useEffect(() => {
    if (showForm && !formSubmitted) {
      const script = document.createElement('script');
      script.src = 'https://js.hsforms.net/forms/embed/v2.js';
      script.async = true;
      script.onload = () => {
        if (window.hbspt) {
          window.hbspt.forms.create({
            region: 'na1',
            portalId: '6153052',
            formId: 'bd19ff99-c7f2-4717-99be-a9b2d490fdff',
            target: '#hubspot-form',
            onFormSubmitted: () => {
              const form = document.querySelector('#hubspot-form form');
              const nameInput = form.querySelector('input[name="firstname"]');
              const companyInput = form.querySelector('input[name="company"]');

              const name = nameInput?.value || '';
              const company = companyInput?.value || '';

              setUserName(name);
              setCompanyName(company);
              setFormSubmitted(true);
              handleDownload(name, company);
            },
          });
        }
      };
      document.body.appendChild(script);
    }
  }, [showForm, formSubmitted]);

  const formatCurrency = (val) =>
    `$${val.toLocaleString(undefined, { maximumFractionDigits: 2 })}`;
  const formatPercent = (val) => `${val?.toFixed(1)}%`;

  const ReportPDF = ({ name, company }) => (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.slide}>
          <PdfHeader />
          <Text style={styles.title}>Employee Recognition ROI Report</Text>

          <View style={styles.section}>
            <Text style={styles.text}>Generated for: {name}</Text>
            <Text style={styles.text}>Company: {company}</Text>
            <Text style={styles.text}>Date: {new Date().toLocaleDateString()}</Text>
          </View>

          <View style={styles.executiveSummary}>
            <Text style={styles.subtitle}>Executive Summary</Text>
            <Text style={styles.text}>
              This report analyzes the potential ROI of implementing an employee recognition program. The findings suggest a significant positive impact on cost savings and productivity.
            </Text>
            <Text style={styles.roiHighlight}>
              Potential ROI: {formatPercent(result.roi)}
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.subtitle}>Company Profile</Text>
            <View style={styles.table}>
              <View style={styles.tableRow}>
                <View style={styles.tableColHeader}><Text style={styles.tableCell}>Number of Employees</Text></View>
                <View style={styles.tableCol}><Text style={{...styles.tableCell, color: '#333333'}}>{metrics?.numberOfEmployees}</Text></View>
              </View>
              <View style={styles.tableRow}>
                <View style={styles.tableColHeader}><Text style={styles.tableCell}>Average Employee Salary</Text></View>
                <View style={styles.tableCol}><Text style={{...styles.tableCell, color: '#333333'}}>{formatCurrency(metrics?.averageSalary)}</Text></View>
              </View>
              <View style={styles.tableRow}>
                <View style={styles.tableColHeader}><Text style={styles.tableCell}>Revenue per Employee</Text></View>
                <View style={styles.tableCol}><Text style={{...styles.tableCell, color: '#333333'}}>{formatCurrency(metrics?.revenuePerEmployee)}</Text></View>
              </View>
            </View>
          </View>

          <Text style={styles.footer} fixed>
            Vantage Circle | www.vantagecircle.com | Confidential Report
          </Text>
        </View>
      </Page>

      <Page size="A4" style={styles.page}>
        <View style={styles.slide}>
          <PdfHeader />
          <View style={styles.section}>
            <Text style={styles.subtitle}>Program Investment</Text>
            <View style={styles.table}>
              <View style={styles.tableRow}>
                <View style={styles.tableColHeader}><Text style={styles.tableCell}>Annual Subscription Cost</Text></View>
                <View style={styles.tableCol}><Text style={{...styles.tableCell, color: '#333333'}}>{formatCurrency(result.subscriptionCosts)}</Text></View>
              </View>
              <View style={styles.tableRow}>
                <View style={styles.tableColHeader}><Text style={styles.tableCell}>Budget for Rewards (70%)</Text></View>
                <View style={styles.tableCol}><Text style={{...styles.tableCell, color: '#333333'}}>{formatCurrency(result.rewardsBudget)}</Text></View>
              </View>
              <View style={styles.tableRow}>
                <View style={styles.tableColHeader}><Text style={styles.tableCell}>Total Program Cost</Text></View>
                <View style={styles.tableCol}><Text style={{...styles.tableCell, color: '#333333'}}>{formatCurrency(result.totalInvestment)}</Text></View>
              </View>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.subtitle}>Projected Savings & ROI</Text>
            <View style={styles.table}>
              <View style={styles.tableRow}>
                <View style={styles.tableColHeader}><Text style={styles.tableCell}>Retention Savings</Text></View>
                <View style={styles.tableCol}><Text style={{...styles.tableCell, color: '#333333'}}>{formatCurrency(result.retentionSavings)}</Text></View>
              </View>
              <View style={styles.tableRow}>
                <View style={styles.tableColHeader}><Text style={styles.tableCell}>Productivity Savings</Text></View>
                <View style={styles.tableCol}><Text style={{...styles.tableCell, color: '#333333'}}>{formatCurrency(result.productivitySavings)}</Text></View>
              </View>
              <View style={styles.tableRow}>
                <View style={styles.tableColHeader}><Text style={styles.tableCell}>Absenteeism Savings</Text></View>
                <View style={styles.tableCol}><Text style={{...styles.tableCell, color: '#333333'}}>{formatCurrency(result.absenteeismSavings)}</Text></View>
              </View>
              <View style={styles.tableRow}>
                <View style={styles.tableColHeader}><Text style={styles.tableCell}>Total Annual Savings</Text></View>
                <View style={styles.tableCol}><Text style={{...styles.tableCell, color: '#333333'}}>{formatCurrency(result.totalSavings)}</Text></View>
              </View>
              <View style={styles.tableRow}>
                <View style={styles.tableColHeader}><Text style={styles.tableCell}>Return on Investment (ROI)</Text></View>
                <View style={styles.tableCol}><Text style={{...styles.tableCell, color: '#333333'}}>{formatPercent(result.roi)}</Text></View>
              </View>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.subtitle}>Recommendations</Text>
            <Text style={styles.text}>
              The exceptional ROI indicates this program should be implemented immediately. To maximize benefits, consider expanding the program scope. Key success factors include strong leadership support, clear and consistent communication, and regular program evaluation and refinement.
            </Text>
          </View>

          <Text style={styles.footer} fixed>
            Vantage Circle | www.vantagecircle.com | Confidential Report
          </Text>
        </View>
      </Page>
    </Document>
  );

  const handleDownload = async (name, company) => {
    const blob = await pdf(<ReportPDF name={name} company={company} />).toBlob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Employee_Recognition_ROI_Report.pdf';
    a.click();
    URL.revokeObjectURL(url);
    setShowForm(false);
  };

  if (!result) {
    return (
      <div className="w-full mx-auto p-6 bg-white shadow-md rounded-lg space-y-8">
        <h2 className="text-lg lg:text-3xl font-medium">{title}</h2>
        <p className="text-gray-500 mt-2 text-base">{subtitle}</p>
      </div>
    );
  }

  return (
    <div className="w-full mx-auto p-6 bg-white shadow-md rounded-lg space-y-6">
      <h2 className="text-lg lg:text-2xl font-medium text-indigo-100">{title}</h2>
      {subtitle && <p className="text-gray-500 mt-1">{subtitle}</p>}

      {!showForm && (
        <button
          onClick={() => setShowForm(true)}
          className="bg-orange text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
        >
          Download PDF Report
        </button>
      )}

      {showForm && !formSubmitted && (
        <div id="hubspot-form" className="mt-4" />
      )}

      {formSubmitted && (
        <div className="mt-4 text-green-600 font-medium">
          Your report is downloading...
        </div>
      )}
    </div>
  );
};

export default PdfForm;
