interface Props {
  tags: string[];
  active: string | null;
  onChange: (tag: string | null) => void;
}

export function TagFilterTabs({ tags, active, onChange }: Props) {
  if (tags.length === 0) return null;

  return (
    <div className="blog-tag-tabs">
      <button
        type="button"
        className={`blog-tag-tab${active === null ? " active" : ""}`}
        onClick={() => onChange(null)}
      >
        All
      </button>
      {tags.map(tag => (
        <button
          key={tag}
          type="button"
          className={`blog-tag-tab${active === tag ? " active" : ""}`}
          onClick={() => onChange(tag === active ? null : tag)}
        >
          {tag}
        </button>
      ))}
    </div>
  );
}
