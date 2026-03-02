export default function SectionHeading({ eyebrow, title, sub }) {
  return (
    <div className="max-w-2xl">
      {eyebrow ? (
        <p className="text-xs tracking-[0.35em] uppercase text-white/60">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="mt-3 text-3xl md:text-4xl font-semibold tracking-tight">
        {title}
      </h2>
      {sub ? (
        <p className="mt-3 text-white/70 leading-relaxed">{sub}</p>
      ) : null}
    </div>
  );
}