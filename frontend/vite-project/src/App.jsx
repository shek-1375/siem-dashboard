import { useEffect, useState } from "react"
import axios from "axios"

function App() {

  const [logs, setLogs] = useState([])
  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState("All")

  const criticalCount = logs.filter(
    (log) => log.severity === "Critical"
  ).length

  const highCount = logs.filter(
    (log) => log.severity === "High"
  ).length

  const lowCount = logs.filter(
    (log) => log.severity === "Low"
  ).length

  useEffect(() => {

    axios.get("http://127.0.0.1:5000/logs")
      .then((response) => {
        setLogs(response.data)
      })
      .catch((error) => {
        console.log(error)
      })

  }, [])

  return (
    <div>

      <h1>SIEM Dashboard</h1>

      <input
        type="text"
        placeholder="Search logs..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          padding: "10px",
          width: "300px",
          marginBottom: "20px",
          borderRadius: "5px",
          border: "1px solid gray",
          backgroundColor: "#111827",
          color: "white"
        }}
      />

      <div
        style={{
          marginBottom: "20px"
        }}
      >

        <button onClick={() => setFilter("All")}>
          All
        </button>

        <button onClick={() => setFilter("Critical")}>
          Critical
        </button>

        <button onClick={() => setFilter("High")}>
          High
        </button>

        <button onClick={() => setFilter("Low")}>
          Low
        </button>

      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "20px",
          marginBottom: "30px"
        }}
      >

        <div
          style={{
            backgroundColor: "#111827",
            border: "1px solid white",
            padding: "20px",
            width: "200px"
          }}
        >
          <h2>Total Logs</h2>
          <p>{logs.length}</p>
        </div>

        <div
          style={{
            backgroundColor: "#111827",
            border: "1px solid red",
            padding: "20px",
            width: "200px"
          }}
        >
          <h2>Critical Alerts</h2>
          <p>{criticalCount}</p>
        </div>

        <div
          style={{
            backgroundColor: "#111827",
            border: "1px solid orange",
            padding: "20px",
            width: "200px"
          }}
        >
          <h2>High Alerts</h2>
          <p>{highCount}</p>
        </div>

        <div
          style={{
            backgroundColor: "#111827",
            border: "1px solid green",
            padding: "20px",
            width: "200px"
          }}
        >
          <h2>Low Alerts</h2>
          <p>{lowCount}</p>
        </div>

      </div>

      {
        logs
        .filter((log) =>
  log.event.toLowerCase().includes(search.toLowerCase()) ||

  log.ip.toLowerCase().includes(search.toLowerCase())
)
          .filter((log) =>
            filter === "All"
              ? true
              : log.severity === filter
          )
          .map((log) => (
            <div
              key={log.id}
              style={{
                border:
                  log.severity === "Critical"
                    ? "2px solid red"
                    : log.severity === "High"
                    ? "2px solid orange"
                    : "2px solid green",

                backgroundColor: "#111827",
                padding: "20px",
                margin: "20px auto",
                width: "70%",
                borderRadius: "10px",

                boxShadow:
                  log.severity === "Critical"
                    ? "0 0 15px red"
                    : log.severity === "High"
                    ? "0 0 15px orange"
                    : "0 0 15px green",

                transition: "0.3s ease",
                cursor: "pointer",
              }}
            >

              <h2>{log.event}</h2>

              <p
                style={{
                  backgroundColor:
                    log.severity === "Critical"
                      ? "red"
                      : log.severity === "High"
                        ? "orange"
                        : "green",

                  color: "white",
                  padding: "8px",
                  borderRadius: "5px",
                  width: "fit-content",
                  margin: "10px auto"
                }}
              >
                Severity: {log.severity}
              </p>

              <p>IP Address: {log.ip}</p>

              <hr />

            </div>
          ))
      }

    </div>
  )
}

export default App