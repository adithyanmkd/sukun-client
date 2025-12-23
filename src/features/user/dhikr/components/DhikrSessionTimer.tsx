import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Clock, Play, RotateCcw } from "lucide-react";

export default function DhikrSessionTimer() {
  const [enabled, setEnabled] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning]);

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleReset = () => {
    setSeconds(0);
    setIsRunning(false);
  };

  return (
    <Card className="sticky top-4">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-base">
            <Clock className="h-5 w-5" />
            Dhikr Session Timer
          </CardTitle>
          <Switch
            checked={enabled}
            onCheckedChange={setEnabled}
            aria-label="Toggle timer"
          />
        </div>
      </CardHeader>

      {enabled && (
        <CardContent className="space-y-4">
          {/* Timer Display */}
          <div className="rounded-lg bg-gray-100 p-6 text-center">
            <p className="font-mono text-4xl font-bold text-green-600">
              {formatTime(seconds)}
            </p>
          </div>

          {/* Control Buttons */}
          <div className="flex gap-3">
            <Button
              onClick={() => setIsRunning(!isRunning)}
              className="flex-1 bg-green-600 hover:bg-green-700"
            >
              <Play className="mr-2 h-4 w-4" />
              {isRunning ? "Pause" : "Start"}
            </Button>

            <Button
              onClick={handleReset}
              variant="outline"
              className="flex-1 border-orange-400 text-orange-600 hover:bg-orange-50"
            >
              <RotateCcw className="mr-2 h-4 w-4" />
              Reset
            </Button>
          </div>
        </CardContent>
      )}
    </Card>
  );
}
