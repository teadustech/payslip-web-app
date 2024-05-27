import './App.css';
import React, { useState } from "react";
import { DatePicker } from 'antd';
import axios from 'axios';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

function App() {
  const [companyName, setCompanyName] = useState('');
  const [companyID, setCompanyID] = useState('');
  const [branch, setBranch] = useState('');
  const [paymentMode, setPaymentMode] = useState('');
  const [date, setDate] = useState('');
  const [excelData, setExcelData] = useState([]);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      const data = new Uint8Array(event.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const dataJson = XLSX.utils.sheet_to_json(sheet);

      setExcelData(dataJson);
      console.log(dataJson, 'json');
    };
    reader.readAsArrayBuffer(file);
  };

  const generatePayslipPDF = () => {
    if (excelData.length === 0) {
      alert("Please upload Excel data first.");
      return;
    }

    excelData.forEach((employee, index) => {
      const doc = new jsPDF();
      const title = "Payslip";
      let y = 30;

      // Render payslip content
      doc.setFontSize(14);
      doc.text(title, 105, 15, { align: 'right' });
      doc.text(`Company Name: ${companyName}`, 20, y);
      y += 10;
      doc.text(`Company ID: ${companyID}`, 20, y);
      y += 10;
      doc.text(`Branch: ${branch}`, 20, y);
      y += 10;
      doc.text(`Payment Mode: ${paymentMode}`, 20, y);
      y += 10;
      doc.text(`Date: ${date}`, 20, y);
      y += 10;
      doc.text(`Employee Name: ${employee.employee_name}`, 20, y);
      y += 10;
      doc.text(`Employee ID: ${employee.emp_id}`, 20, y);
      y += 10;

      // Render Excel table
      const columns = Object.keys(employee);
      const rows = [Object.values(employee)];

      doc.autoTable({
        head: [columns],
        body: rows,
        startY: y + 10 // Start table below previous content
      });

      doc.save(`${employee.employee_name}.pdf`);
      handleSubmit(employee); // call handleSubmit for each employee
    });
  };

  const handleSubmit = (employee) => {
    const data = {
      Name: employee.employee_name,
      EmpId: employee.emp_id
    };

    console.log(employee.employee_name, employee.emp_id);
    axios.post('https://sheet.best/api/sheets/a1eea9d9-8848-4588-aabc-af6a67a10749', data)
      .then((response) => {
        console.log(response);
      });
    alert('Payslip generated and stored successfully!');
  };

  return (
    <div className="App">
      <header className="App-header">
        <nav className="navbar" id="stickynavbar"
          style={{
            zIndex: 1000,
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            backdropFilter: "blur(3px)",
            boxShadow: "0px 3px 12px #b5e5e5",
            backgroundColor: "#9c75aa",
            height: "80px",
            width: "100%",
            position: "fixed",
            top: 0,
            transition: "1s",
            boxSizing: "content-box",
          }}
        >
          <div className="logo">
          </div>
          <div className="menu" style={{
            textDecoration: "none",
            textTransform: "uppercase",
            padding: "10px",
            color: "#ffffff",
            margin: "0 1px",
            gap: "40",
          }}>

          </div>
        </nav>
        <div>
          <p style={{ display: 'flex', color: '#8d3caa', marginTop: "100px", justifyContent: 'center', fontWeight: 'bold', fontSize: '24px' }}>Company Details</p>
          <br /><br />
          <div style={{
            display: "flex",
            flexDirection: 'column',
            alignContent: 'center',
            alignItems: 'center',
            color: '#8d3caa',
            padding: '10px',
          }}>
            <div style={{ display: 'flex', gap: 20 }}>
              <label>Company Name: </label>
              <input type="text" width="100px" onChange={(e) => setCompanyName(e.target.value)} />
            </div>
            <br />
            <div>
              <label>Company ID: </label>
              <input style={{ marginLeft: '40px' }} type="number" width="100px" onChange={(e) => setCompanyID(e.target.value)} />
            </div>
            <br />
            <div>
              <label style={{ marginLeft: '40px' }}>Branch: </label>
              <input style={{ marginLeft: '40px' }} type="text" width="100px" onChange={(e) => setBranch(e.target.value)} />
            </div>
            <br />
            <div>
              <label style={{ marginLeft: '10px' }}>Payment Mode: </label>
              <input style={{ marginLeft: '10px' }} type="text" width="100px" onChange={(e) => setPaymentMode(e.target.value)} />
            </div>
            <div style={{ marginTop: '10px', }}>
              <label style={{ marginLeft: '40px', }}>Date:  </label>
              <DatePicker onChange={(date, dateString) => setDate(dateString)} style={{ marginLeft: '40px' }} width="120px" />
            </div>
            <div style={{ marginTop: '20px' }}>
              <button onClick={generatePayslipPDF} style={{ color: 'white', backgroundColor: 'maroon', height: '30px', width: '100px', borderRadius: '5px' }}>Submit</button>
            </div>
          </div>

          <p style={{ display: 'flex', color: '#8d3caa', marginTop: "50px", justifyContent: 'center', fontWeight: 'bold', fontSize: '24px' }}>Employee Details</p>

          <div style={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'row',
            alignItems: 'center',
            gap: 20,
            marginTop: '20px'
          }}>
            <input type="file" placeholder='Please upload excel file' accept=".xlsx, .xls" onChange={handleFileUpload} />
            <button onClick={generatePayslipPDF} style={{ color: 'white', backgroundColor: 'green', height: '30px', width: '100px', borderRadius: '5px' }}>Export as Pdf</button>
          </div>
        </div>
      </header>
      <footer>
        <div style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          backdropFilter: "blur(3px)",
          boxShadow: "0px 3px 12px #b5e5e5",
          backgroundColor: "#9c75aa",
          height: "40px",
          width: "100%",
          position: "fixed",
          bottom: 0,
          boxSizing: "content-box",
        }}>
          <p style={{
            color: 'white'
          }}>Copyright @ TeadusTech 2023</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
