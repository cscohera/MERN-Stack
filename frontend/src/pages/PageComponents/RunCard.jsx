import { Link } from "react-router";
import { formatDate } from "../../lib/utils.js";
import toast from "react-hot-toast";
import axios from "axios";

const RunCard = ({ run, setRuns }) => {
  const handleDelete = async (e, id) => {
    e.preventDefault(); // prevent link navigation

    if (!window.confirm("Are you sure you want to delete this run?")) return;

    try {
      await axios.delete(`http://localhost:8080/runs/deleteRun/${id}`);
      setRuns((prev) => prev.filter((r) => r._id !== id));
      toast.success("Run deleted successfully");
    } catch (error) {
      console.error("Error deleting run:", error);
      toast.error("Failed to delete run");
    }
  };

  return (
    <div
      className="text-decoration-none text-reset"
    >
      <div className="card h-100 border-top border-4 border-success shadow-sm transition">
        <div className="card-body d-flex flex-column">
          {/* Username */}
          <h6 className="text-secondary mb-2">
            <strong>@{run.user || "Unknown User"}</strong>
          </h6>

          {/* Title */}
          <h5 className="card-title mb-3">{run.title}</h5>

          {/* Run Stats */}
          <ul className="list-unstyled mb-3 text-muted">
            <li><strong>Distance:</strong> {run.distance ? `${run.distance} mi` : "N/A"}</li>
            <li><strong>Pace:</strong> {run.pace ? `${run.pace} min/min` : "N/A"}</li>
            <li><strong>Time:</strong> {run.time ? `${run.time} min` : "N/A"}</li>
          </ul>

          {/* Footer (Date + Delete button) */}
          <div className="d-flex justify-content-between align-items-center mt-auto pt-3 border-top">
            <small className="text-secondary">
              {formatDate(new Date(run.createdAt))}
            </small>
            <button
              className="btn btn-outline-danger btn-sm"
              onClick={(e) => handleDelete(e, run._id)}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RunCard;

