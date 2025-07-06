

function CustomFooter() {
     const year = new Date().getFullYear();
  return (
    <footer className="bg-dark text-white text-center py-3">
      <p>© {year} Vinicola - Tutti i diritti riservati</p>
    </footer>
  );
}

export default CustomFooter;