import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { RotateCcw, Plus, Trash2 } from "lucide-react";
import DhikrSessionTimer from "../components/DhikrSessionTimer";

interface DhikrItem {
  id: string;
  arabic: string;
  english: string;
  count: number;
  target?: number;
}

interface SavedProgress {
  timestamp: string;
  counts: Record<string, number>;
}

const DEFAULT_DHIKRS: DhikrItem[] = [
  {
    id: "1",
    arabic: "سبحان الله",
    english: "Subhan'Allah",
    count: 0,
    target: 33,
  },
  {
    id: "2",
    arabic: "الحمد لله",
    english: "Alhamdulillah",
    count: 0,
    target: 33,
  },
  {
    id: "3",
    arabic: "الله أكبر",
    english: "Allahu Akbar",
    count: 0,
    target: 34,
  },
  {
    id: "4",
    arabic: "لا حول ولا قوة إلا بالله",
    english: "La hawla wa la quwwata illa billah",
    count: 0,
    target: 100,
  },
  {
    id: "5",
    arabic: "استغفر الله",
    english: "Astaghfirullah",
    count: 0,
    target: 70,
  },
];

export default function DhikrCounterPage() {
  const [dhikrs, setDhikrs] = useState<DhikrItem[]>(DEFAULT_DHIKRS);
  const [selectedId, setSelectedId] = useState<string>("1");
  const [savedProgresses, setSavedProgresses] = useState<SavedProgress[]>([]);

  const selected = dhikrs.find((d) => d.id === selectedId);

  const handleIncrement = () => {
    setDhikrs(
      dhikrs.map((d) =>
        d.id === selectedId ? { ...d, count: d.count + 1 } : d,
      ),
    );
  };

  const handleReset = () => {
    setDhikrs(
      dhikrs.map((d) => (d.id === selectedId ? { ...d, count: 0 } : d)),
    );
  };

  const handleSaveProgress = () => {
    const counts = dhikrs.reduce(
      (acc, d) => {
        acc[d.id] = d.count;
        return acc;
      },
      {} as Record<string, number>,
    );

    const newProgress: SavedProgress = {
      timestamp: new Date().toLocaleString(),
      counts,
    };

    setSavedProgresses([newProgress, ...savedProgresses]);
  };

  const handleDeleteProgress = (index: number) => {
    setSavedProgresses(savedProgresses.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-green-50 to-green-100 p-4">
      <div className="mx-auto max-w-6xl">
        {/* Breadcrumb */}
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Dhikr Counter</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Main Grid */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Left Column - Counter */}
          <div className="lg:col-span-2">
            {/* Current Dhikr Card */}
            <Card className="mb-6">
              <CardHeader className="text-center">
                <CardTitle className="text-lg text-gray-600">
                  Current Dhikr
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Arabic Text */}
                <div className="text-center">
                  <p className="text-4xl font-bold text-green-600">
                    {selected?.arabic}
                  </p>
                </div>

                {/* Count Display */}
                <div className="text-center">
                  <p className="text-6xl font-bold text-green-500">
                    {selected?.count || 0}
                  </p>
                  {selected?.target && (
                    <p className="text-sm text-gray-500">
                      Target: {selected.target}
                    </p>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <Button
                    onClick={handleIncrement}
                    className="w-full bg-green-600 py-6 text-lg hover:bg-green-700"
                  >
                    <Plus className="h-5 w-5" />1
                  </Button>

                  <Button
                    onClick={handleReset}
                    variant="outline"
                    className="w-full border-orange-400 py-6 text-lg text-orange-600 hover:bg-orange-50"
                  >
                    <RotateCcw className="mr-2 h-5 w-5" />
                    Reset
                  </Button>

                  <Button
                    onClick={handleSaveProgress}
                    variant="outline"
                    className="w-full border-yellow-400 py-6 text-lg text-yellow-600 hover:bg-yellow-50"
                  >
                    Save Progress
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Select Dhikr Card */}
            <Card>
              <CardHeader>
                <CardTitle>Select Dhikr</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {dhikrs.map((dhikr) => (
                    <button
                      key={dhikr.id}
                      onClick={() => setSelectedId(dhikr.id)}
                      className={`w-full rounded-lg p-3 text-left transition ${
                        selectedId === dhikr.id
                          ? "bg-green-600 text-white"
                          : "bg-gray-100 text-gray-900 hover:bg-gray-200"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <p className="font-semibold">{dhikr.arabic}</p>
                          <p className="text-sm opacity-75">{dhikr.english}</p>
                        </div>
                        <span className="ml-2 text-lg font-bold">
                          ({dhikr.target || "-"})
                        </span>
                      </div>
                    </button>
                  ))}
                </div>

                {/* Saved Progress Section */}
                {savedProgresses.length > 0 && (
                  <div className="mt-6 border-t pt-6">
                    <h3 className="mb-3 font-semibold text-gray-900">
                      Saved Progress
                    </h3>
                    <div className="space-y-2">
                      {savedProgresses.map((progress, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between rounded-lg bg-blue-50 p-3"
                        >
                          <div className="text-sm">
                            <p className="font-medium text-gray-900">
                              {progress.timestamp}
                            </p>
                            <p className="text-xs text-gray-600">
                              {Object.values(progress.counts).reduce(
                                (a, b) => a + b,
                                0,
                              )}{" "}
                              total count(s)
                            </p>
                          </div>
                          <button
                            onClick={() => handleDeleteProgress(index)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Session Timer */}
          <div className="lg:col-span-1">
            <DhikrSessionTimer />
          </div>
        </div>
      </div>
    </div>
  );
}
