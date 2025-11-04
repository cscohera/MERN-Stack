import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./PageComponents/CoachStylePage.module.css";
import toast from "react-hot-toast";

const CoachPage = () => {
  const [clubs, setClubs] = useState([]);
  const [runners, setRunners] = useState([]);
  const [selectedClub, setSelectedClub] = useState(null);
  const [assignRunnerId, setAssignRunnerId] = useState("");
  const [newClubName, setNewClubName] = useState("");

  // Fetch all clubs
  const fetchClubs = async () => {
    try {
      const { data } = await axios.get("http://localhost:8080/clubs/getAllClubs");
      setClubs(data);
    } catch (err) {
      console.error("Failed to fetch clubs", err);
    }
  };

  // Fetch all runners
  const fetchRunners = async () => {
    try {
      const { data } = await axios.get("http://localhost:8080/users/getAllUsers");
      console.log("Runners fetched:", data); // confirm structure
      setRunners(data);
    } catch (err) {
      console.error("Failed to fetch runners", err);
    }
  };

  useEffect(() => {
    fetchClubs();
    fetchRunners();
  }, []);

  // Select a club
  const handleSelectClub = async (clubId) => {
    try {
      const { data } = await axios.get(`http://localhost:8080/clubs/getClubById/${clubId}`);
      setSelectedClub({ ...data.club, runners: data.users });
    } catch (err) {
      console.error("Failed to fetch club runners", err);
    }
  };

  // Assign runner to a club
  const handleAssignRunner = async () => {
    console.log("Assigning runner:", assignRunnerId, "to club:", selectedClub?._id);
    if (!assignRunnerId || !selectedClub?._id) return toast.error("Select a runner and club!");
    try {
      await axios.post("http://localhost:8080/clubs/assignRunner", {
        runnerId: assignRunnerId,
        clubId: selectedClub._id,
      });
      toast.success("Runner assigned successfully!");
      fetchRunners();
      handleSelectClub(selectedClub._id);
      setAssignRunnerId("");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to assign runner");
      console.error(err);
    }
  };

  // Unassign runner from a club
  const handleUnassignRunner = async (runnerId) => {
    if (!selectedClub?._id) return;
    try {
      await axios.post("http://localhost:8080/clubs/unassignRunner", {
        runnerId,
        clubId: selectedClub._id,
      });
      fetchRunners();
      handleSelectClub(selectedClub._id);
    } catch (err) {
      console.error("Failed to unassign runner", err);
    }
  };

  // Add new club
  const handleAddClub = async () => {
    if (!newClubName) return alert("Enter a club name");
    try {
      await axios.post("http://localhost:8080/clubs/createClub", { name: newClubName });
      setNewClubName("");
      fetchClubs();
      toast.success("Club added!")
    } catch (err) {
      console.error("Failed to add club", err);
    }
  };

  // Delete a club
  const handleDeleteClub = async (clubId) => {
    if (!window.confirm("Are you sure you want to delete this club?")) return;
    try {
      await axios.delete(`http://localhost:8080/clubs/deleteClub/${clubId}`);
      if (selectedClub?._id === clubId) setSelectedClub(null);
      fetchClubs();
      toast.success("Club deleted successfully!")
    } catch (err) {
      console.error("Failed to delete club", err);
    }
  };


  // Delete runner
  const handleDeleteRunner = async (runnerId) => {
    if (!window.confirm("Are you sure you want to delete this runner?")) return;
    try {
      await axios.delete(`http://localhost:8080/users/deleteUser/${runnerId}`);
      fetchRunners();
      if (selectedClub) handleSelectClub(selectedClub._id);
      toast.success("Runner deleted successfully!")
    } catch (err) {
      console.error("Failed to delete runner", err);
    }
  };

  return (
    <div className={styles.coachPage}>
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
            <li className="nav-item">
              <a className="nav-link" href="/">
                Logout
              </a>
            </li>
            
          </ul>
          
        </div>
      </nav>

      <div className="container my-5">
        <h1 className="mb-4">Coach Dashboard</h1>
        <div className="row">
          {/* Clubs List */}
          <div className="col-md-4 mb-4">
            <h3>Clubs</h3>
            <ul className="list-group mb-3">
              {clubs.map((club) => (
                <li
                  key={club._id}
                  className={`list-group-item d-flex justify-content-between align-items-center bg-dark text-white ${
                    selectedClub?._id === club._id ? "active" : ""
                  }`}
                  style={{ cursor: "pointer" }}
                >
                  <span onClick={() => handleSelectClub(club._id)}>{club.name}</span>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDeleteClub(club._id)}
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
            <div className="input-group">
              <input
                type="text"
                className="form-control bg-dark text-white"
                placeholder="New Club Name"
                value={newClubName}
                onChange={(e) => setNewClubName(e.target.value)}
              />
              <button className="btn btn-primary" onClick={handleAddClub}>
                Add Club
              </button>
            </div>
          </div>

          {/* Selected Club Runners */}
          <div className="col-md-8">
            {selectedClub ? (
              <>
                <h3>{selectedClub.name} Runners</h3>
                {selectedClub.runners?.length ? (
                  <ul className="list-group mb-4">
                    {selectedClub.runners.map((runner) => (
                      <li
                        key={runner._id}
                        className="list-group-item d-flex justify-content-between align-items-center bg-dark text-white"
                      >
                        {runner.username}
                        <button
                          className="btn btn-warning btn-sm"
                          onClick={() => handleUnassignRunner(runner._id)}
                        >
                          Unassign
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No runners in this club yet.</p>
                )}

                {/* Assign Runner Form */}
                <div className="card p-3 mb-4 bg-dark text-white">
                  <h5 className="mb-3">Assign Runner to Club</h5>
                  <div className="mb-3">
                    <select
                      className="form-select bg-dark text-white"
                      value={assignRunnerId}
                      onChange={(e) => setAssignRunnerId(e.target.value)}
                    >
                      <option value="">Select Runner</option>
                      {runners.map((r) => (
                        <option key={r._id} value={r._id}>
                          {r.username} {r.club ? "(Already in a club)" : ""}
                        </option>
                      ))}
                    </select>
                  </div>
                  <button className="btn btn-success" onClick={handleAssignRunner}>
                    Assign Runner
                  </button>
                </div>
              </>
            ) : (
              <p>Select a club to see its runners.</p>
            )}

            
            <h3>All Runners</h3>
            <ul className="list-group mb-3">
              {runners.map((runner) => (
                <li
                  key={runner._id}
                  className="list-group-item d-flex justify-content-between align-items-center bg-dark text-white"
                >
                  {runner.username} {runner.club ? `(In ${runner.club.name})` : ""}
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDeleteRunner(runner._id)}
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoachPage;
