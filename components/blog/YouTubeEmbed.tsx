// Privacy-friendly responsive YouTube embed with a plain link fallback.
export function YouTubeEmbed({ id, title }: { id: string; title: string }) {
  return (
    <figure style={{ margin: "28px 0" }}>
      <div style={{ position: "relative", paddingBottom: "56.25%", height: 0, overflow: "hidden", borderRadius: 12 }}>
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}`}
          title={title}
          loading="lazy"
          allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: 0 }}
        />
      </div>
      <figcaption style={{ fontSize: 14, marginTop: 8, lineHeight: 1.5 }}>
        Watch the video:{" "}
        <a href={`https://youtu.be/${id}`} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "underline" }}>
          {title}
        </a>
      </figcaption>
    </figure>
  );
}
