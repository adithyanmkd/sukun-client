import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

type Props = {
  filter: string;
  setFilter: (value: string) => void;
};

export default function TabsFilter({ filter, setFilter }: Props) {
  return (
    <Tabs value={filter} onValueChange={setFilter} className="mb-6 w-full">
      <TabsList className="mx-auto flex w-max gap-2 rounded-full bg-gray-100 p-1">
        <TabsTrigger
          value="surah"
          className="rounded-full px-5 py-2 data-[state=active]:bg-green-600 data-[state=active]:text-white"
        >
          Surahs
        </TabsTrigger>
        <TabsTrigger
          value="juz"
          className="rounded-full px-5 py-2 data-[state=active]:bg-green-600 data-[state=active]:text-white"
        >
          Juz
        </TabsTrigger>
        <TabsTrigger
          value="bookmark"
          className="rounded-full px-5 py-2 data-[state=active]:bg-green-600 data-[state=active]:text-white"
        >
          Bookmarks
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
