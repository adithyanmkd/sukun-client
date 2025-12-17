interface AyahItemProps {
  ayah: any;
}

export default function AyahItem({ ayah }: AyahItemProps) {
  return (
    <div className="border-b pb-4">
      <p className="font-arabic mb-2 text-right text-2xl leading-relaxed">
        {ayah.text_uthmani}
      </p>

      <p className="text-sm text-gray-700">{ayah.translation?.text}</p>
    </div>
  );
}
