import { PropagateLoader } from "react-spinners";

function Spinner() {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        zIndex: 9999,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      aria-live="polite"
      aria-busy="true"
    >
      <PropagateLoader color="#4b7bbe" size={15} />
    </div>
  );
}

export default Spinner;

