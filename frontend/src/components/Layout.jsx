import Header from "./Header";
import Footer from "./Footer";

function Layout({ children }) {
  return (
    <div style={{ 
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column"
    }}>
      <Header />
      <main style={{ 
        padding: "20px",
        marginTop: "60px", // Space for fixed header
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        maxWidth: "1200px",
        margin: "60px auto 0",
        marginBottom: "80px" // Space for footer
      }}>
        {children}
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
