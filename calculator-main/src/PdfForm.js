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

// Registering a font
Font.register({
  family: 'Helvetica',
  fonts: [
    { src: 'https://fonts.gstatic.com/s/helvetica/v10/_2q_5l_i_b_g_b_g_b_g_b_g_b_g_b_g_b_g.ttf', fontWeight: 'normal' },
    { src: 'https://fonts.gstatic.com/s/helvetica/v10/_2q_5l_i_b_g_b_g_b_g_b_g_b_g_b_g_b_g_b.ttf', fontWeight: 'bold' },
  ],
});

const styles = StyleSheet.create({
  page: {
    fontFamily: 'Helvetica',
    fontSize: 11,
    paddingTop: 30,
    paddingLeft: 40,
    paddingRight: 40,
    paddingBottom: 50,
    color: '#333333',
    backgroundColor: '#F8F9FA',
  },
  header: {
    marginBottom: 20,
    textAlign: 'center',
    borderBottomWidth: 2,
    borderBottomColor: '#4F46E5',
    paddingBottom: 10,
  },
  logo: {
    width: 180,
    height: 'auto',
    margin: '0 auto',
  },
  title: {
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 25,
    color: '#4F46E5',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 12,
    color: '#333333',
    fontWeight: 'bold',
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC',
    paddingBottom: 6,
  },
  section: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  text: {
    marginBottom: 8,
    lineHeight: 1.6,
    fontSize: 11,
  },
  table: {
    display: 'table',
    width: 'auto',
    marginTop: 10,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    alignItems: 'center',
  },
  tableColHeader: {
    width: '50%',
    padding: 10,
    backgroundColor: '#F1F5F9',
    fontWeight: 'bold',
  },
  tableCol: {
    width: '50%',
    padding: 10,
  },
  tableCell: {
    fontSize: 11,
  },
  footer: {
    position: 'absolute',
    bottom: 20,
    left: 40,
    right: 40,
    textAlign: 'center',
    color: '#888888',
    fontSize: 9,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    paddingTop: 10,
  },
  executiveSummary: {
    backgroundColor: '#E8EAF6',
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
  },
  roiHighlight: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4CAF50',
    textAlign: 'center',
    marginTop: 10,
  },
});

const PdfHeader = () => (
  <View style={styles.header}>
    <Image
      src="https://res.cloudinary.com/vantagecircle/image/upload/gatsbycms/uploads/2023/07/new-vc-logo.png"
      style={styles.logo}
    />
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
      {/* Page 1 */}
      <Page size="A4" style={styles.page}>
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
              <View style={styles.tableCol}><Text style={styles.tableCell}>{metrics?.numberOfEmployees}</Text></View>
            </View>
            <View style={styles.tableRow}>
              <View style={styles.tableColHeader}><Text style={styles.tableCell}>Average Employee Salary</Text></View>
              <View style={styles.tableCol}><Text style={styles.tableCell}>{formatCurrency(metrics?.averageSalary)}</Text></View>
            </View>
            <View style={styles.tableRow}>
              <View style={styles.tableColHeader}><Text style={styles.tableCell}>Revenue per Employee</Text></View>
              <View style={styles.tableCol}><Text style={styles.tableCell}>{formatCurrency(metrics?.revenuePerEmployee)}</Text></View>
            </View>
          </View>
        </View>

        <Text style={styles.footer} fixed>
          Vantage Circle | www.vantagecircle.com | Confidential Report
        </Text>
      </Page>

      {/* Page 2 */}
      <Page size="A4" style={styles.page}>
        <PdfHeader />
        <View style={styles.section}>
          <Text style={styles.subtitle}>Program Investment</Text>
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <View style={styles.tableColHeader}><Text style={styles.tableCell}>Annual Subscription Cost</Text></View>
              <View style={styles.tableCol}><Text style={styles.tableCell}>{formatCurrency(result.subscriptionCosts)}</Text></View>
            </View>
            <View style={styles.tableRow}>
              <View style={styles.tableColHeader}><Text style={styles.tableCell}>Budget for Rewards (70%)</Text></View>
              <View style={styles.tableCol}><Text style={styles.tableCell}>{formatCurrency(result.rewardsBudget)}</Text></View>
            </View>
            <View style={styles.tableRow}>
              <View style={styles.tableColHeader}><Text style={styles.tableCell}>Total Program Cost</Text></View>
              <View style={styles.tableCol}><Text style={styles.tableCell}>{formatCurrency(result.totalInvestment)}</Text></View>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.subtitle}>Projected Savings & ROI</Text>
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <View style={styles.tableColHeader}><Text style={styles.tableCell}>Retention Savings</Text></View>
              <View style={styles.tableCol}><Text style={styles.tableCell}>{formatCurrency(result.retentionSavings)}</Text></View>
            </View>
            <View style={styles.tableRow}>
              <View style={styles.tableColHeader}><Text style={styles.tableCell}>Productivity Savings</Text></View>
              <View style={styles.tableCol}><Text style={styles.tableCell}>{formatCurrency(result.productivitySavings)}</Text></View>
            </View>
            <View style={styles.tableRow}>
              <View style={styles.tableColHeader}><Text style={styles.tableCell}>Absenteeism Savings</Text></View>
              <View style={styles.tableCol}><Text style={styles.tableCell}>{formatCurrency(result.absenteeismSavings)}</Text></View>
            </View>
            <View style={styles.tableRow}>
              <View style={styles.tableColHeader}><Text style={styles.tableCell}>Total Annual Savings</Text></View>
              <View style={styles.tableCol}><Text style={styles.tableCell}>{formatCurrency(result.totalSavings)}</Text></View>
            </View>
            <View style={styles.tableRow}>
              <View style={styles.tableColHeader}><Text style={styles.tableCell}>Return on Investment (ROI)</Text></View>
              <View style={styles.tableCol}><Text style={styles.tableCell}>{formatPercent(result.roi)}</Text></View>
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