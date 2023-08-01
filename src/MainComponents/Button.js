export default function Button({ onToggle, isOpen, type }) {
  return (
    <button className="btn-toggle" onClick={() => onToggle(type)}>
      {isOpen ? "–" : "+"}
    </button>
  );
}
