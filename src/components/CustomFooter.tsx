import "../App.css";

function CustomFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="custom-footer">
      <p>© {year} VinGest - Tutti i diritti riservati</p>
    </footer>
  );
}

export default CustomFooter;