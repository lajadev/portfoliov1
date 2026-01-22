import clsx from "clsx";

export default function Section({
  id,
  className,
  children,
}: {
  id?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className={clsx("section anchor bg-black text-white", className)}
    >
      <div className="mx-auto max-w-6xl px-6">{children}</div>
    </section>
  );
}
