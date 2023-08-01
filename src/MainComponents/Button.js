export default function Button({ isOpen, onToggle }) {
  return (
    <button className="btn-toggle" onClick={() => onToggle()}>
      {isOpen ? "–" : "+"}
    </button>
  );
}
