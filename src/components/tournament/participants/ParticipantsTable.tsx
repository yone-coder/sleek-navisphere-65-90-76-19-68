
import { useState } from "react";
import { Search, ChevronDown } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function ParticipantsTable() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder="Search participants..."
            className="pl-10 pr-4 py-2 border rounded-lg w-64"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 border rounded-lg text-sm">
          Filter
          <ChevronDown className="h-4 w-4" />
        </button>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Player</TableHead>
              <TableHead>Rank</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Joined</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">
                <div className="flex items-center gap-3">
                  <img
                    src="https://storage.googleapis.com/a1aa/image/u9QlGEQDPW0dq8Wric7AsU_j7PkzMnKLIgLMlSRCv5I.jpg"
                    alt="Player"
                    className="w-8 h-8 rounded-full"
                  />
                  <div>
                    <div className="font-medium">Alex Johnson</div>
                    <div className="text-sm text-gray-500">New York, USA</div>
                  </div>
                </div>
              </TableCell>
              <TableCell>#1</TableCell>
              <TableCell>
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                  Confirmed
                </span>
              </TableCell>
              <TableCell>2 days ago</TableCell>
            </TableRow>
            {/* Add more rows as needed */}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
