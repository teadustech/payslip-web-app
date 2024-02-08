import React from 'react';
import { Form, Input } from 'antd';
import './App.css';
// import 'antd/dist/antd.css'; 

function App() {
  return (
    <div className="App">
      <header className="headersec">
      <a href="#" style={{marginLeft:"20px"}}> Home</a>
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        {/* <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React 
        </a> */}
        <nav class="navbar" id="stickynavbar"
          style={{
            zIndex:1000,
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            backdropFilter: "blur(3px)",
            boxShadow: "0px 3px 12px #b5e5e5",
            backgroundColor:"#9c75aa",
            height: "80px",
            width: "100%",
            position:"fixed",
            top: 0,
            transition: "1s",
            boxSizing: "content-box",
            // z-index: 1000;
          }}
        >
                    <div class="logo">
                    {/* <a href="#" style={{marginLeft:"20px"}}> Home</a> */}
                        {/* <img src="img/logo_edit.png" alt="Logo" srcset=""> */}
                    </div>
                    <div class="menu " style={{
                        textDecoration: "none",
                        textTransform: "uppercase",
                        padding: "10px",
                        color: "#ffffff",
                        margin: "0 1px",
                        gap:"40",
                    }}>
                        <a href="#" style={{marginLeft:"20px", color:'white'}}> Home</a>
                        <a href="#" style={{marginLeft:"20px", color:'white'}}>Icon</a>
                        <a href="#" style={{marginLeft:"20px", color:'white'}}></a>
                        <a href="#" style={{marginLeft: "50px",color:'white'
                        }}>Login</a>
        
                    </div>
                </nav>
                <div>
                <p style={{ display:'flex',color:'#8d3caa', marginTop:"100px",justifyContent:'center', fontWeight:'bold', fontSize:'24px' }}>Company Details</p>
                <br/><br/>
                <div style={{
                  display:"flex",
                  justifyContent:"center",
                  
                }}>
                  <p>Company ID:</p><br/>
                  <p>Company Name:</p><br/>
                  <p>Branch:</p><br/>
                  <p>Payment Mode:</p><br/>

                </div>
                <div>
                  <p style={{ display:'flex',color:'#8d3caa', marginTop:"100px",justifyContent:'center', fontWeight:'bold', fontSize:'24px' }}>Employee Details</p>
                    
                </div>
                <Form>
                    <Form.Item>
                      <label>Company Name</label>
                      <Input type="text" width="100px"/>
                    </Form.Item>
                </Form>
                </div>
      </header>
      <body>
        <div>
        </div>
      </body>
    </div>
  );
}

export default App;
