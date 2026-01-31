import "./FlavorSelector.css";

const FlavorSelector = ({ flavors, value, onChange }) => {
  if (!flavors || flavors.length === 0) return null;

  return (
    <div className="flavor-selector">
      {flavors.map((flavor) => (
        <button
          key={flavor}
          onClick={() => onChange(flavor)}
          className={flavor === value ? "active" : ""}
        >
          {flavor}
        </button>
      ))}
    </div>
  );
};

export default FlavorSelector;
