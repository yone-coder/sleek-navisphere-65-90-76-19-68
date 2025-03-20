
import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp, MessageSquare, Search, Send, ThumbsUp, MessageCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

type Question = {
  id: string;
  text: string;
  answer?: string;
  date: string;
  helpful: number;
  isHelpful?: boolean;
  user: {
    name: string;
    avatar?: string;
  };
  seller?: {
    name: string;
    isOfficial: boolean;
    avatar?: string;
  };
};

type ModishQuestionsProps = {
  productId: string;
};

export function ModishQuestions({ productId }: ModishQuestionsProps) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [newQuestion, setNewQuestion] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedQuestion, setExpandedQuestion] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Mock API call to fetch questions
    const fetchQuestions = async () => {
      // Simulate loading delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Mock questions data
      const mockQuestions: Question[] = [
        {
          id: '1',
          text: 'Does this speaker have a microphone for hands-free calling?',
          answer: 'Yes, it comes with a built-in microphone that allows you to take calls hands-free when connected to your phone via Bluetooth.',
          date: '2023-08-15',
          helpful: 24,
          user: {
            name: 'Michael T.',
            avatar: '/api/placeholder/30/30',
          },
          seller: {
            name: 'AudioTech Support',
            isOfficial: true,
            avatar: '/api/placeholder/30/30',
          },
        },
        {
          id: '2',
          text: 'What is the battery life like? How long does it take to fully charge?',
          answer: 'The battery lasts approximately 10 hours at medium volume. A full charge takes about 2.5 hours with the included USB-C cable.',
          date: '2023-07-22',
          helpful: 18,
          user: {
            name: 'Sarah K.',
          },
          seller: {
            name: 'AudioTech Support',
            isOfficial: true,
          },
        },
        {
          id: '3',
          text: 'Is this speaker compatible with devices that don\'t have Bluetooth?',
          answer: 'Yes, in addition to Bluetooth connectivity, it also has an auxiliary input (3.5mm jack) for connecting non-Bluetooth devices.',
          date: '2023-09-03',
          helpful: 12,
          user: {
            name: 'James R.',
          },
          seller: {
            name: 'AudioTech Support',
            isOfficial: true,
          },
        },
        {
          id: '4',
          text: 'Can you connect two speakers together for stereo sound?',
          date: '2023-09-10',
          helpful: 5,
          user: {
            name: 'Emily W.',
          },
        },
        {
          id: '5',
          text: 'What colors does this speaker come in?',
          answer: 'This speaker is available in Black, White, and Blue colors. All colors have the same features and specifications.',
          date: '2023-08-28',
          helpful: 8,
          user: {
            name: 'David M.',
          },
          seller: {
            name: 'AudioTech Support',
            isOfficial: true,
          },
        },
      ];
      
      setQuestions(mockQuestions);
      setLoading(false);
    };
    
    fetchQuestions();
  }, [productId]);

  const handleSubmitQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newQuestion.trim()) {
      toast({
        title: "Empty question",
        description: "Please enter your question before submitting",
        duration: 3000,
      });
      return;
    }
    
    // Add new question to list
    const newQuestionObj: Question = {
      id: `new-${Date.now()}`,
      text: newQuestion,
      date: new Date().toISOString().split('T')[0],
      helpful: 0,
      user: {
        name: 'You',
      },
    };
    
    setQuestions([newQuestionObj, ...questions]);
    setNewQuestion('');
    
    toast({
      title: "Question submitted",
      description: "Your question has been sent to the seller",
      duration: 2000,
    });
  };

  const toggleQuestionExpand = (questionId: string) => {
    if (expandedQuestion === questionId) {
      setExpandedQuestion(null);
    } else {
      setExpandedQuestion(questionId);
    }
  };

  const markHelpful = (questionId: string) => {
    setQuestions(prevQuestions => 
      prevQuestions.map(question => 
        question.id === questionId 
          ? { 
              ...question, 
              helpful: question.isHelpful ? question.helpful - 1 : question.helpful + 1,
              isHelpful: !question.isHelpful
            }
          : question
      )
    );
  };

  const filteredQuestions = searchQuery
    ? questions.filter(q => 
        q.text.toLowerCase().includes(searchQuery.toLowerCase()) || 
        (q.answer && q.answer.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : questions;

  return (
    <div className="space-y-4">
      {/* Search and ask section */}
      <div className="bg-gray-50 rounded-lg p-3 space-y-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input
            type="text"
            placeholder="Search in questions & answers"
            className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <form onSubmit={handleSubmitQuestion} className="flex gap-2">
          <input
            type="text"
            placeholder="Ask a question about this product..."
            className="flex-1 pl-4 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            value={newQuestion}
            onChange={(e) => setNewQuestion(e.target.value)}
          />
          <Button type="submit" size="sm" className="bg-red-500 hover:bg-red-600 h-full">
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
      
      {/* Display question count */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-1.5">
          <MessageSquare className="h-4 w-4 text-gray-600" />
          <span className="text-sm font-medium text-gray-700">
            {questions.length} Questions
          </span>
        </div>
        <Button variant="ghost" size="sm" className="text-blue-600 h-8 px-3 py-1" onClick={() => setExpandedQuestion(questions[0]?.id || null)}>
          See All
        </Button>
      </div>
      
      {/* Loading state */}
      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-lg p-3 border border-gray-100 space-y-2">
              <div className="animate-pulse h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="animate-pulse h-3 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      ) : (
        /* Questions list */
        <div className="space-y-3">
          {filteredQuestions.length > 0 ? (
            filteredQuestions.map((question) => (
              <div 
                key={question.id} 
                className={cn(
                  "bg-white rounded-lg border border-gray-200 overflow-hidden transition-all duration-200",
                  expandedQuestion === question.id ? "shadow-sm" : ""
                )}
              >
                <div 
                  className="flex justify-between p-3 cursor-pointer"
                  onClick={() => toggleQuestionExpand(question.id)}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <div className="text-sm font-medium text-gray-800">{question.text}</div>
                      {question.answer && (
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          Answered
                        </Badge>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <span>Asked by {question.user.name}</span>
                      <span>•</span>
                      <span>{question.date}</span>
                    </div>
                  </div>
                  
                  {expandedQuestion === question.id ? (
                    <ChevronUp className="h-5 w-5 text-gray-400 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-400 flex-shrink-0" />
                  )}
                </div>
                
                {/* Expanded answer */}
                {expandedQuestion === question.id && (
                  <div className="px-3 pb-3 border-t border-gray-100 pt-2">
                    {question.answer ? (
                      <div className="space-y-2">
                        <div className="flex items-start gap-2">
                          <div className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white text-xs flex-shrink-0">
                            S
                          </div>
                          <div>
                            <div className="flex items-center mb-1">
                              <span className="text-xs font-medium mr-1">{question.seller?.name}</span>
                              {question.seller?.isOfficial && (
                                <Badge variant="outline" className="h-4 text-[10px] bg-blue-50 text-blue-600 border-blue-200">
                                  Official
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-gray-700">{question.answer}</p>
                          </div>
                        </div>
                        
                        <div className="flex justify-between items-center mt-2 pt-2 border-t border-gray-100">
                          <button 
                            className={cn(
                              "flex items-center gap-1 text-xs",
                              question.isHelpful ? "text-blue-600" : "text-gray-500 hover:text-gray-700"
                            )}
                            onClick={(e) => {
                              e.stopPropagation();
                              markHelpful(question.id);
                            }}
                          >
                            <ThumbsUp className="h-3.5 w-3.5" />
                            <span>Helpful ({question.helpful})</span>
                          </button>
                          
                          <span className="text-xs text-gray-500">Answered on {question.date}</span>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center py-4 border border-dashed border-gray-200 rounded-lg bg-gray-50">
                        <MessageCircle className="h-5 w-5 text-gray-400 mr-2" />
                        <span className="text-sm text-gray-500">Waiting for seller's response</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-6 bg-gray-50 rounded-lg border border-dashed border-gray-200">
              <MessageSquare className="h-10 w-10 text-gray-300 mb-2" />
              <p className="text-gray-500">No questions found</p>
              <p className="text-sm text-gray-400">Be the first to ask a question!</p>
            </div>
          )}
        </div>
      )}
      
      {/* Ask more questions CTA */}
      <div className="flex flex-col items-center justify-center p-4 bg-blue-50 rounded-lg mt-4">
        <h3 className="font-medium text-blue-800 mb-1">Still have questions?</h3>
        <p className="text-sm text-blue-600 mb-3 text-center">Our product experts are ready to help you</p>
        <Button 
          className="bg-blue-600 hover:bg-blue-700"
          onClick={() => {
            document.querySelector('input[placeholder="Ask a question about this product..."]')?.scrollIntoView({ behavior: 'smooth' });
            setTimeout(() => {
              const inputEl = document.querySelector('input[placeholder="Ask a question about this product..."]') as HTMLInputElement;
              if (inputEl) inputEl.focus();
            }, 500);
          }}
        >
          Ask a Question
        </Button>
      </div>
    </div>
  );
}
