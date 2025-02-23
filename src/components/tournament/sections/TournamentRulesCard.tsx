
import { useState } from "react";
import { ScrollText, ChevronUpIcon, ChevronDownIcon } from "lucide-react";

const rules = [
  {
    id: 'general',
    title: 'General Rules',
    rules: [
      'All matches will be played on the latest tournament patch (v2.34)',
      'Players must arrive 30 minutes before scheduled match time',
      'Match results are final once submitted to tournament officials',
      'Players must use tournament-provided equipment',
      'Unsportsmanlike conduct will result in immediate disqualification'
    ]
  },
  {
    id: 'competition',
    title: 'Competition Format',
    rules: [
      'Double elimination bracket system',
      'Best-of-three matches for all rounds except finals',
      'Finals will be best-of-five',
      'Map selection alternates between players, loser picks next map',
      'No map may be played twice in the same match'
    ]
  },
  {
    id: 'conduct',
    title: 'Player Conduct',
    rules: [
      'Players must maintain professional behavior at all times',
      'Verbal abuse of opponents or officials is prohibited',
      'Intentional disconnects without approval will count as a forfeit',
      'Players may not receive coaching during matches',
      'All disputes must be reported to tournament officials immediately'
    ]
  },
  {
    id: 'technical',
    title: 'Technical Rules',
    rules: [
      'In case of technical failure, match may be paused up to 15 minutes',
      'Only approved peripherals may be used (list available at check-in)',
      'Settings must be configured before match start',
      'Recording software must be approved by tournament officials',
      'Streaming is prohibited during tournament hours'
    ]
  }
];

export function TournamentRulesCard() {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <div className="w-full max-w-2xl mx-auto shadow-lg">
      <div className="bg-slate-800 text-white p-4">
        <div className="flex items-center gap-2">
          <ScrollText className="h-5 w-5" />
          <h2 className="text-lg font-bold">Official Tournament Rule Book</h2>
        </div>
      </div>

      <div className="p-5">
        <div className="space-y-4">
          {rules.map((section) => (
            <div key={section.id} className="border border-slate-200 rounded-lg overflow-hidden">
              <button 
                onClick={() => toggleSection(section.id)}
                className="flex items-center justify-between w-full p-4 text-left bg-slate-50 hover:bg-slate-100 transition"
              >
                <span className="font-semibold text-slate-800">{section.title}</span>
                {expandedSection === section.id ? 
                  <ChevronUpIcon className="h-5 w-5 text-slate-500" /> : 
                  <ChevronDownIcon className="h-5 w-5 text-slate-500" />
                }
              </button>
              
              {expandedSection === section.id && (
                <div className="p-4 bg-white">
                  <ul className="space-y-2">
                    {section.rules.map((rule, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-slate-400 mt-1">•</span>
                        <span className="text-slate-700">{rule}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="my-6 border-t border-slate-200"></div>
        
        <div className="text-sm text-slate-500">
          <p>All rules are subject to interpretation by the tournament committee. Additional rules may be announced before the tournament. Players are responsible for staying updated on any rule changes.</p>
        </div>
      </div>
    </div>
  );
}
