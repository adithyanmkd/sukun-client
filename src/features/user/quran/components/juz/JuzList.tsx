import JuzListItem from "./JuzListItem";

export default function JuzList({ data }: { data: any[] }) {
  return (
    <div className="flex flex-col gap-3">
      {data.map((juz, index) => (
        <JuzListItem key={index} juz={juz} />
      ))}
    </div>
  );
}
