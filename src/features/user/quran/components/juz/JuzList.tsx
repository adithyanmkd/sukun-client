import JuzListItem from "./JuzListItem";

export default function JuzList({ data }: { data: any[] }) {
  // Normalize, dedupe and sort by juz_number to avoid accidental duplicates
  const list = (data ?? [])
    .filter(Boolean)
    .reduce((acc: any[], j: any) => {
      const key = String(
        j?.juz_number ?? j?.number ?? j?.id ?? JSON.stringify(j),
      );
      if (
        !acc.find((x) => String(x?.juz_number ?? x?.number ?? x?.id) === key)
      ) {
        acc.push(j);
      }
      return acc;
    }, [])
    .sort(
      (a: any, b: any) =>
        Number(a.juz_number ?? a.number) - Number(b.juz_number ?? b.number),
    );

  return (
    <div className="flex flex-col gap-3">
      {list.map((juz) => (
        <JuzListItem key={juz.juz_number ?? juz.number} juz={juz} />
      ))}
    </div>
  );
}
