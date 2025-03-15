
import React, { useState } from 'react';
import { Shuffle, RefreshCw, Copy } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent
} from "@/components/ui/card";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";

export const BorletteQuickPick = () => {
  const { toast } = useToast();
  const [pickType, setPickType] = useState("bolita");
  const [numbers, setNumbers] = useState<number[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const generateNumbers = () => {
    setIsGenerating(true);
    
    // Simulate loading
    setTimeout(() => {
      let generatedNumbers: number[] = [];
      
      switch (pickType) {
        case "bolita":
          // Generate 1 number between 1-100
          generatedNumbers = [Math.floor(Math.random() * 100) + 1];
          break;
        case "3-pick":
          // Generate 3 unique numbers between 1-999
          while (generatedNumbers.length < 3) {
            const num = Math.floor(Math.random() * 999) + 1;
            if (!generatedNumbers.includes(num)) {
              generatedNumbers.push(num);
            }
          }
          break;
        case "daily":
          // Generate 4 unique numbers between 1-9
          while (generatedNumbers.length < 4) {
            const num = Math.floor(Math.random() * 9) + 1;
            if (!generatedNumbers.includes(num)) {
              generatedNumbers.push(num);
            }
          }
          break;
        default:
          generatedNumbers = [Math.floor(Math.random() * 100) + 1];
      }
      
      setNumbers(generatedNumbers);
      setIsGenerating(false);
    }, 800);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(numbers.join(", "));
    toast({
      title: "Copied to clipboard",
      description: `Numbers: ${numbers.join(", ")}`,
      duration: 3000,
    });
  };

  return (
    <Card className="overflow-hidden border-0 shadow-md">
      <CardContent className="p-4">
        <div className="flex items-center gap-3 mb-4">
          <Select value={pickType} onValueChange={setPickType}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select game type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="bolita">Bolita (1-100)</SelectItem>
              <SelectItem value="3-pick">3-Pick (1-999)</SelectItem>
              <SelectItem value="daily">Daily 4 (1-9)</SelectItem>
            </SelectContent>
          </Select>
          <Button 
            variant="outline" 
            size="icon"
            onClick={generateNumbers}
            disabled={isGenerating}
            className="h-10 w-10 flex-shrink-0"
          >
            {isGenerating ? (
              <RefreshCw className="h-4 w-4 animate-spin" />
            ) : (
              <Shuffle className="h-4 w-4" />
            )}
          </Button>
        </div>
        
        <div className="flex justify-center items-center gap-3 my-3 min-h-16">
          {numbers.length > 0 ? (
            <>
              {numbers.map((num, index) => (
                <div 
                  key={index} 
                  className="flex items-center justify-center w-16 h-16 rounded-lg bg-gray-50 border border-gray-200 text-2xl font-bold"
                >
                  {num}
                </div>
              ))}
            </>
          ) : (
            <div className="text-gray-400 italic">Click shuffle to generate numbers</div>
          )}
        </div>

        {numbers.length > 0 && (
          <div className="flex justify-end mt-2">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={copyToClipboard}
              className="text-xs flex items-center gap-1"
            >
              <Copy className="h-3 w-3" /> Copy
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
