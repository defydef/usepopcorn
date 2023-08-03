const containerStyle = {
  display: "flex",
  alignItems: "center",
  gap: "16px",
};

const starContainerStyle = {
  display: "flex",
  gap: "4px",
};

const textStyle = {
  lineHeight: "0",
  margin: "0",
};

export default function StarRating({ maxRating = 3 }) {
  const star = Array.from({ length: maxRating }, (_, i) => (
    <span key={i}>✩{i + 1}</span>
  ));

  return (
    <div style={containerStyle}>
      <div style={starContainerStyle}>{star}</div>
      <p style={textStyle}>{star.length}</p>
    </div>
  );
}
