import React, { useEffect, useState } from 'react'
import styles from "./PageComponents/HomeStylePage.module.css"
import toast from "react-hot-toast";
import axios from "axios";
import RunCard from "./PageComponents/RunCard.jsx"


const HomePage = () => {

  const [runs, setRuns] = useState([]);
  const [loading, setloading] = useState(true);

  useEffect(()=>{
    const fetchRuns = async () => {
      try {
        const res = await axios.get("http://localhost:8080/runs/getAllRuns");
        console.log(res.data);
        setRuns(res.data);
      } catch (error) {
        console.log("Error fetching runs");
        toast.error("Failed to load runs");
      } finally {
        setloading(false);
      }
    };
    fetchRuns();
  },[]);

  return (
    <div className={styles.home}>
      <nav className="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
        
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarsExampleDefault"
          aria-controls="navbarsExampleDefault"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarsExampleDefault">
          <ul className="navbar-nav me-auto mb-2 mb-md-0">
            <li className="nav-item active">
              <a className="nav-link" href="#">
                Home <span className="visually-hidden">(current)</span>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/createRun">
                Create a run
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/">
                Logout
              </a>
            </li>
            
          </ul>
          
        </div>
      </nav>

      {/* Main content */}
      <main role="main" className="container" style={{ paddingTop: '80px' }}>
        <div className="starter-template text-center mt-5">
          
        <div className="container my-5 px-3">
          {loading && <div className="text-center text-light py-5">Loading runs...</div>}

          <div className="container my-5 px-3">
            {runs.length > 0 ? (
          <div className="row g-4">
            {runs.map((run) => (
          <div key={run._id} className="col-12 col-md-6 col-lg-4 d-flex">
            <div className="card flex-fill h-100">
            <RunCard run={run} setRuns={setRuns} />
                </div>
              </div>
               ))}
            </div>
            ) : (
            <div className="text-center text-muted py-5">No runs found</div>
             )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default HomePage
