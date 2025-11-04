import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router";
import axios from "axios";
import styles from "./PageComponents/CreateRunStylePage.module.css"

const CreateRunPage = () => {
  const [user, setUser] = useState("");
  const [title, setTitle] = useState("");
  const [distance, setDistance] = useState("");
  const [pace, setPace] = useState("");
  const [time, setTime] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate all fields
    if (!user.trim() || !title.trim() || !distance.trim() || !pace.trim() || !time.trim()) {
      toast.error("All fields are required");
      return;
    }

    setLoading(true);
    try {
      await axios.post("http://localhost:8080/runs/createRun", {
        user,
        title,
        distance,
        pace,
        time,
      });

      toast.success("Run created successfully!");
      navigate("/home");
    } catch (error) {
      console.error("Error creating run:", error);
      toast.error("Failed to create run");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.createRun}>
    <div className="container my-5">
      {/* Back Button */}
      <div className="mb-4">
        <Link to="/home" className="btn btn-outline-secondary">
          &larr; Back to Runs
        </Link>
      </div>

      {/* Form Card */}
      <div className={`card shadow-sm ${styles['create-run-container']}`}>
        <div className="card-body">
          <h2 className="card-title mb-4 text-center">Create New Run</h2>
          
          <form onSubmit={handleSubmit}>
            {/* Username */}
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                Username
              </label>
              <input
                type="text"
                id="user"
                className="form-control"
                placeholder="Enter your username"
                value={user}
                onChange={(e) => setUser(e.target.value)}
              />
            </div>

            {/* Title */}
            <div className="mb-3">
              <label htmlFor="title" className="form-label">
                Run Title
              </label>
              <input
                type="text"
                id="title"
                className="form-control"
                placeholder="Morning Run"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            {/* Distance */}
            <div className="mb-3">
              <label htmlFor="distance" className="form-label">
                Distance (mi)
              </label>
              <input
                type="number"
                id="distance"
                className="form-control"
                placeholder="e.g. 5.0"
                value={distance}
                onChange={(e) => setDistance(e.target.value)}
              />
            </div>

            {/* Pace */}
            <div className="mb-3">
              <label htmlFor="pace" className="form-label">
                Pace (min/mi)
              </label>
              <input
                type="text"
                id="pace"
                className="form-control"
                placeholder="e.g. 5:30"
                value={pace}
                onChange={(e) => setPace(e.target.value)}
              />
            </div>

            {/* Time */}
            <div className="mb-3">
              <label htmlFor="time" className="form-label">
                Time (minutes)
              </label>
              <input
                type="number"
                id="time"
                className="form-control"
                placeholder="e.g. 25"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
            </div>

            {/* Submit */}
            <div className="d-flex justify-content-end">
              <button
                type="submit"
                className="btn btn-success"
                disabled={loading}
              >
                {loading ? "Creating..." : "Create Run"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    </div>
  );
};

export default CreateRunPage;

