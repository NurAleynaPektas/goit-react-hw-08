const AuthNav = () => {
  return (
    <div style={{ display: "flex", gap: "10px" }}>
      <a
        style={{
          fontSize: "25px",
          fontWeight: "700",
          color: "rgb(8, 8, 8)",
          textDecoration: "none",
          border: "1px solid #ccc",
          borderRadius: "10px",
          boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
          padding: "10px",
          backgroundColor: "rgb(248, 231, 231)",
        }}
        href="/login"
      >
        Login
      </a>
      <a
        style={{
          fontSize: "25px",
          fontWeight: "700",
          color: "rgb(8, 8, 8)",
          textDecoration: "none",
          border: "1px solid #ccc",
          borderRadius: "10px",
          boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
          padding: "10px",
          backgroundColor: "rgb(248, 231, 231)",
        }}
        href="/register"
      >
        Register
      </a>
    </div>
  );
};

export default AuthNav;
