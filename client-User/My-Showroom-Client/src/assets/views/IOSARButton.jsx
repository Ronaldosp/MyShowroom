function IOSARButton() {
  return (
    <a
      rel="ar"
      href="/models/car.usdz"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "8px",
        padding: "14px 22px",
        background: "#000",
        color: "#fff",
        borderRadius: "12px",
        textDecoration: "none",
        fontWeight: 600,
      }}
    >
      🚗 View in AR
    </a>
  );
}

export default IOSARButton;
