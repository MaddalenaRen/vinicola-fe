import { PropagateLoader } from "react-spinners";

function Spinner() {
  return (
    <div className="flex justify-center items-center h-full">
      <PropagateLoader color="#4b7bbe" size={15} />
    </div>
  );
}

export default Spinner;
