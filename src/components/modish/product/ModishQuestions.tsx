
import React, { useState } from 'react';
import { MessageCircle, ThumbsUp, ThumbsDown, Search, Filter, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

type Question = {
  id: string;
  user: string;
  date: string;
  question: string;
  answer?: {
    user: string;
    date: string;
    text: string;
    helpful: number;
    notHelpful: number;
  };
};

export function ModishQuestions() {
  const [questions, setQuestions] = useState<Question[]>([
    {
      id: "1",
      user: "Michael T.",
      date: "August 15, 2023",
      question: "Does this speaker support aptX codec for Bluetooth streaming?",
      answer: {
        user: "Seller",
        date: "August 16, 2023",
        text: "Yes, this speaker supports aptX, aptX HD, and LDAC codecs for high-quality Bluetooth streaming.",
        helpful: 24,
        notHelpful: 2
      }
    },
    {
      id: "2",
      user: "Jessica R.",
      date: "July 28, 2023",
      question: "What is the battery life on a single charge?",
      answer: {
        user: "Seller",
        date: "July 29, 2023",
        text: "The battery life is approximately 10 hours at moderate volume levels. If you use it at maximum volume, it will last about 6-7 hours.",
        helpful: 18,
        notHelpful: 1
      }
    },
    {
      id: "3",
      user: "David K.",
      date: "July 10, 2023",
      question: "Can I connect two of these speakers together for stereo sound?",
      answer: {
        user: "Seller",
        date: "July 11, 2023",
        text: "Yes, you can pair two of these speakers together for true wireless stereo (TWS) sound. Simply enable pairing mode on both speakers and they will connect to each other automatically.",
        helpful: 32,
        notHelpful: 0
      }
    }
  ]);
  
  const [expandedAnswers, setExpandedAnswers] = useState<Record<string, boolean>>({});
  const [newQuestion, setNewQuestion] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterBy, setFilterBy] = useState("all");
  const { toast } = useToast();

  const toggleAnswer = (questionId: string) => {
    setExpandedAnswers(prev => ({
      ...prev,
      [questionId]: !prev[questionId]
    }));
  };

  const handleSubmitQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (newQuestion.trim()) {
      toast({
        title: "Question submitted",
        description: "Your question has been sent to the seller",
        duration: 2000,
      });
      setNewQuestion("");
    }
  };

  const handleHelpful = (questionId: string, helpful: boolean) => {
    setQuestions(prev => 
      prev.map(q => {
        if (q.id === questionId && q.answer) {
          return {
            ...q,
            answer: {
              ...q.answer,
              helpful: helpful ? q.answer.helpful + 1 : q.answer.helpful,
              notHelpful: !helpful ? q.answer.notHelpful + 1 : q.answer.notHelpful
            }
          };
        }
        return q;
      })
    );
    
    toast({
      title: helpful ? "Marked as helpful" : "Marked as not helpful",
      description: "Thank you for your feedback",
      duration: 2000,
    });
  };

  const filteredQuestions = questions.filter(q => {
    if (searchQuery) {
      const searchLower = searchQuery.toLowerCase();
      return (
        q.question.toLowerCase().includes(searchLower) || 
        (q.answer && q.answer.text.toLowerCase().includes(searchLower))
      );
    }
    
    if (filterBy === "answered") {
      return !!q.answer;
    } else if (filterBy === "unanswered") {
      return !q.answer;
    }
    
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-900">Customer Questions</h3>
        <span className="text-sm text-gray-500">{questions.length} questions</span>
      </div>

      {/* Ask a question form */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h4 className="font-medium text-gray-900 mb-2">Ask a question</h4>
        <form onSubmit={handleSubmitQuestion} className="space-y-3">
          <textarea
            className="w-full border border-gray-300 rounded-md p-2 text-sm min-h-[80px] focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
            placeholder="What would you like to know about this product?"
            value={newQuestion}
            onChange={(e) => setNewQuestion(e.target.value)}
          />
          <div className="flex justify-end">
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">
              <MessageCircle className="h-4 w-4 mr-2" />
              Submit Question
            </Button>
          </div>
        </form>
      </div>

      {/* Search and filters */}
      <div className="flex flex-col md:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input
            type="search"
            placeholder="Search in questions..."
            className="pl-10 pr-4 py-2 w-full border rounded-md"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div>
          <select
            className="py-2 px-3 border rounded-md w-full md:w-auto bg-white"
            value={filterBy}
            onChange={(e) => setFilterBy(e.target.value)}
          >
            <option value="all">All Questions</option>
            <option value="answered">Answered</option>
            <option value="unanswered">Unanswered</option>
          </select>
        </div>
      </div>

      {/* Questions list */}
      <div className="space-y-4">
        {filteredQuestions.length > 0 ? (
          filteredQuestions.map((item) => (
            <div key={item.id} className="border border-gray-200 rounded-lg overflow-hidden">
              <div className="bg-gray-50 p-3">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2">
                      <MessageCircle className="h-4 w-4 text-blue-500" />
                      <span className="font-medium text-gray-900">Question</span>
                    </div>
                    <p className="text-gray-800 mt-1">{item.question}</p>
                  </div>
                  <div className="text-xs text-gray-500">
                    {item.user} • {item.date}
                  </div>
                </div>
              </div>

              {item.answer && (
                <div className="p-3 bg-white border-t border-gray-200">
                  <div className="flex justify-between items-start">
                    <div className="flex items-start gap-2">
                      <Badge className="bg-blue-50 text-blue-600 border-blue-100 mt-0.5">Seller</Badge>
                      <div>
                        <div className="text-xs text-gray-500 mb-1">
                          Answered by {item.answer.user} • {item.answer.date}
                        </div>
                        <p className={`text-gray-700 ${!expandedAnswers[item.id] && 'line-clamp-2'}`}>
                          {item.answer.text}
                        </p>
                        {item.answer.text.length > 100 && (
                          <button 
                            className="text-blue-500 text-sm mt-1 flex items-center"
                            onClick={() => toggleAnswer(item.id)}
                          >
                            {expandedAnswers[item.id] ? (
                              <>
                                <ChevronUp className="h-4 w-4 mr-1" />
                                Show less
                              </>
                            ) : (
                              <>
                                <ChevronDown className="h-4 w-4 mr-1" />
                                Read more
                              </>
                            )}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 mt-3">
                    <button 
                      className="text-xs text-gray-500 flex items-center hover:text-blue-500"
                      onClick={() => handleHelpful(item.id, true)}
                    >
                      <ThumbsUp className="h-3.5 w-3.5 mr-1" />
                      Helpful ({item.answer.helpful})
                    </button>
                    <button 
                      className="text-xs text-gray-500 flex items-center hover:text-red-500"
                      onClick={() => handleHelpful(item.id, false)}
                    >
                      <ThumbsDown className="h-3.5 w-3.5 mr-1" />
                      Not helpful ({item.answer.notHelpful})
                    </button>
                  </div>
                </div>
              )}
              
              {!item.answer && (
                <div className="p-3 bg-white border-t border-gray-200 text-sm text-gray-500 italic">
                  This question has not been answered yet.
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="text-center py-6">
            <MessageCircle className="h-10 w-10 mx-auto text-gray-300 mb-2" />
            <p className="text-gray-500">No questions found matching your criteria</p>
          </div>
        )}
      </div>
    </div>
  );
}
