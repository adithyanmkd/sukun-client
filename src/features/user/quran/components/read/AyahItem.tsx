interface AyahItemProps {
  ayah: any;
}

export default function AyahItem({ ayah }: AyahItemProps) {
  const toArabicIndic = (n: number | string) =>
    String(n).replace(/\d/g, (d) => "٠١٢٣٤٥٦٧٨٩"[Number(d)]);

  const num = ayah.verse_number ?? ayah.id;

  return (
    <>
      <span className="ayah" dir="rtl">
        {ayah.text_uthmani}
      </span>

      <span className="verse-marker" aria-hidden>
        {toArabicIndic(num)}
      </span>

      {ayah.translation?.text && (
        <span className="translation">{ayah.translation.text}</span>
      )}
    </>
  );
}
