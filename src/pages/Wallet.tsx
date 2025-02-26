import { useLanguage } from "@/contexts/LanguageContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Grid, 
  Search, 
  ScanLine, 
  Bell, 
  Settings,
  ChevronRight,
  X,
  EyeIcon, 
  EyeOffIcon, 
  LockIcon, 
  CreditCardIcon, 
  RefreshCwIcon, 
  ArrowRightIcon, 
  PlusCircleIcon, 
  AlertTriangleIcon, 
  BarChart2Icon, 
  DollarSignIcon
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { 
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer, XAxis, Tooltip } from 'recharts';

// Mock notifications for demo
const notifications = [
  { id: 1, title: "Payment Received", message: "$50.00 from John Doe", time: "2m ago", isNew: true },
  { id: 2, title: "Transfer Complete", message: "Successfully sent $30.00", time: "1h ago", isNew: true },
  { id: 3, title: "Weekly Summary", message: "View your spending report", time: "3h ago", isNew: false },
];

export default function Wallet() {
  const { t } = useLanguage();
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Finance Dashboard State
  const [showBalance, setShowBalance] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [activeAccount, setActiveAccount] = useState('checking');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Mock data
  const accounts = {
    checking: {
      name: "Checking Account",
      balance: 4567.89,
      currency: "USD",
      transactions: [
        { id: 1, date: "2025-02-24", merchant: "Grocery Store", amount: -87.32, category: "Groceries" },
        { id: 2, date: "2025-02-23", merchant: "Gas Station", amount: -45.67, category: "Transportation" },
        { id: 3, date: "2025-02-22", merchant: "Coffee Shop", amount: -4.50, category: "Food" },
        { id: 4, date: "2025-02-21", merchant: "Paycheck", amount: 1245.67, category: "Income" },
        { id: 5, date: "2025-02-20", merchant: "Electric Bill", amount: -89.99, category: "Utilities" },
        { id: 6, date: "2025-02-19", merchant: "Restaurant", amount: -67.80, category: "Food" },
      ]
    },
    savings: {
      name: "Savings Account",
      balance: 12500.00,
      currency: "USD",
      transactions: [
        { id: 1, date: "2025-02-20", merchant: "Transfer from Checking", amount: 500.00, category: "Transfer" },
        { id: 2, date: "2025-01-20", merchant: "Transfer from Checking", amount: 500.00, category: "Transfer" },
        { id: 3, date: "2025-01-15", merchant: "Interest Payment", amount: 12.50, category: "Income" },
      ]
    },
    credit: {
      name: "Credit Card",
      balance: -1245.67,
      currency: "USD",
      transactions: [
        { id: 1, date: "2025-02-24", merchant: "Online Shopping", amount: -123.45, category: "Shopping" },
        { id: 2, date: "2025-02-22", merchant: "Streaming Service", amount: -14.99, category: "Entertainment" },
        { id: 3, date: "2025-02-21", merchant: "Ride Share", amount: -32.50, category: "Transportation" },
        { id: 4, date: "2025-02-20", merchant: "Restaurant", amount: -78.90, category: "Food" },
      ]
    }
  };

  // Budget data
  const budgetGoals = {
    Food: 400,
    Transportation: 300,
    Utilities: 200,
    Shopping: 250,
    Entertainment: 150
  };

  // Calculate spending by category for active account
  const calculateSpendingByCategory = () => {
    const categories: { [key: string]: number } = {};
    
    accounts[activeAccount as keyof typeof accounts].transactions.forEach(transaction => {
      if (transaction.amount < 0 && transaction.category !== 'Transfer') {
        const category = transaction.category;
        categories[category] = (categories[category] || 0) + Math.abs(transaction.amount);
      }
    });
    
    return Object.keys(categories).map(category => ({
      name: category,
      value: categories[category]
    }));
  };

  // Calculate budget progress
  const calculateBudgetProgress = () => {
    const spendingByCategory = calculateSpendingByCategory();
    return spendingByCategory.map(item => {
      const budget = budgetGoals[item.name as keyof typeof budgetGoals] || 0;
      return {
        category: item.name,
        spent: item.value,
        remaining: Math.max(0, budget - item.value),
        total: budget,
        percentage: budget > 0 ? Math.min(100, (item.value / budget) * 100) : 0
      };
    });
  };

  // Filter transactions based on search term
  const filteredTransactions = accounts[activeAccount as keyof typeof accounts].transactions.filter(transaction => {
    return transaction.merchant.toLowerCase().includes(searchTerm.toLowerCase()) ||
           transaction.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
           transaction.date.includes(searchTerm);
  });

  // Format currency
  const formatCurrency = (amount: number, currency = "USD") => {
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
    });
    return formatter.format(amount);
  };

  // Simulated data refresh
  const refreshData = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  };

  useEffect(() => {
    // Initial load
    refreshData();
  }, []);

  // Pie chart colors
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A28BFF'];

  return (
    <div className="min-h-screen animate-fade-in">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50">
        <div className="relative">
          {/* Main Header */}
          <div className={cn(
            "h-14 bg-white/80 backdrop-blur-xl border-b border-gray-100 transition-all duration-300",
            showSearch && "opacity-0 pointer-events-none"
          )}>
            <div className="h-full px-3 flex items-center gap-2 max-w-2xl mx-auto">
              <Button 
                variant="ghost" 
                size="icon"
                className="h-8 w-8 shrink-0"
              >
                <Grid className="h-4 w-4 text-gray-700" />
              </Button>

              <div 
                className="flex-1 min-w-0 px-1"
                onClick={() => setShowSearch(true)}
              >
                <div className="relative cursor-pointer">
                  <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
                  <div className="w-full h-8 pl-8 pr-3 flex items-center bg-gray-50 rounded-full border border-gray-100">
                    <span className="text-sm text-gray-500 truncate">Search transactions, contacts...</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="h-7 w-7 shrink-0"
                >
                  <ScanLine className="h-3.5 w-3.5 text-gray-700" />
                </Button>

                <Sheet>
                  <SheetTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      className="relative h-7 w-7 shrink-0"
                    >
                      <Bell className="h-3.5 w-3.5 text-gray-700" />
                      <Badge 
                        className="absolute -top-0.5 -right-0.5 h-3 min-w-3 p-0.5 flex items-center justify-center bg-blue-500 text-[10px]"
                      >
                        2
                      </Badge>
                    </Button>
                  </SheetTrigger>
                  <SheetContent className="w-full sm:max-w-sm">
                    <SheetHeader>
                      <SheetTitle>Notifications</SheetTitle>
                    </SheetHeader>
                    <div className="mt-4 space-y-2">
                      {notifications.map((notification) => (
                        <div 
                          key={notification.id}
                          className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          <div className="flex-1 space-y-0.5">
                            <div className="flex items-center gap-2">
                              <p className="text-sm font-medium">{notification.title}</p>
                              {notification.isNew && (
                                <Badge variant="secondary" className="bg-blue-50 text-blue-600 text-[10px] px-1.5">New</Badge>
                              )}
                            </div>
                            <p className="text-xs text-gray-500">{notification.message}</p>
                            <p className="text-[10px] text-gray-400">{notification.time}</p>
                          </div>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 shrink-0 text-gray-400"
                          >
                            <ChevronRight className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </SheetContent>
                </Sheet>

                <Button 
                  variant="ghost" 
                  size="icon"
                  className="h-7 w-7 shrink-0"
                >
                  <Settings className="h-3.5 w-3.5 text-gray-700" />
                </Button>
              </div>
            </div>
          </div>

          {/* Search Overlay */}
          <div className={cn(
            "absolute inset-0 bg-white h-14 transition-all duration-300",
            !showSearch && "opacity-0 pointer-events-none"
          )}>
            <div className="h-full px-3 flex items-center gap-2 max-w-2xl mx-auto">
              <div className="flex-1 min-w-0">
                <div className="relative">
                  <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
                  <Input
                    placeholder="Search transactions, contacts..."
                    className="pl-8 h-8 bg-gray-50 border-gray-100"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    autoFocus
                  />
                </div>
              </div>
              <Button 
                variant="ghost" 
                size="icon"
                className="h-7 w-7 shrink-0"
                onClick={() => {
                  setShowSearch(false);
                  setSearchQuery("");
                }}
              >
                <X className="h-3.5 w-3.5 text-gray-700" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Content (with header spacing) */}
      <div className="pt-14">
        <div className="p-4 max-w-6xl mx-auto">
          <h1 className="text-2xl font-semibold mb-6">{t('nav.wallet')}</h1>
          
          {/* Finance Dashboard */}
          <div className="w-full">
            {/* Header with account selection */}
            <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
              <div className="flex space-x-2">
                <button 
                  onClick={() => setActiveAccount('checking')} 
                  className={`px-3 py-1 rounded-md ${activeAccount === 'checking' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                >
                  Checking
                </button>
                <button 
                  onClick={() => setActiveAccount('savings')} 
                  className={`px-3 py-1 rounded-md ${activeAccount === 'savings' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                >
                  Savings
                </button>
                <button 
                  onClick={() => setActiveAccount('credit')} 
                  className={`px-3 py-1 rounded-md ${activeAccount === 'credit' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                >
                  Credit
                </button>
              </div>
            </div>

            {isLoading ? (
              /* Skeleton loading state */
              <div className="animate-pulse">
                <div className="h-32 bg-gray-200 rounded-lg mb-6"></div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                  <div className="h-32 bg-gray-200 rounded-lg"></div>
                  <div className="h-32 bg-gray-200 rounded-lg"></div>
                  <div className="h-32 bg-gray-200 rounded-lg"></div>
                </div>
                <div className="h-64 bg-gray-200 rounded-lg"></div>
              </div>
            ) : (
              <div>
                {/* Core Display Features */}
                <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <h2 className="text-lg font-semibold text-gray-600">
                      {accounts[activeAccount as keyof typeof accounts].name}
                    </h2>
                    <button 
                      onClick={() => setShowBalance(!showBalance)} 
                      className="text-gray-500 hover:text-gray-700"
                      aria-label={showBalance ? "Hide balance" : "Show balance"}
                    >
                      {showBalance ? <EyeOffIcon size={20} /> : <EyeIcon size={20} />}
                    </button>
                  </div>
                  <div className="flex items-baseline">
                    <span className="text-3xl font-bold text-gray-800">
                      {showBalance ? formatCurrency(
                        accounts[activeAccount as keyof typeof accounts].balance, 
                        accounts[activeAccount as keyof typeof accounts].currency
                      ) : '••••••'}
                    </span>
                    {activeAccount === 'credit' && accounts[activeAccount as keyof typeof accounts].balance < 0 && (
                      <span className="ml-2 text-sm text-gray-500">Available Credit</span>
                    )}
                  </div>
                  
                  {/* Security status indicator */}
                  <div className="mt-4 flex items-center">
                    <LockIcon size={16} className="text-green-500 mr-2" />
                    <span className="text-sm text-gray-600">Secure Connection</span>
                    {activeAccount === 'credit' && (
                      <span className="ml-4 flex items-center text-sm text-gray-600">
                        <CreditCardIcon size={16} className="text-blue-500 mr-2" />
                        Card Active
                      </span>
                    )}
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2 mb-6">
                  <button className="flex flex-col items-center justify-center bg-white p-3 rounded-lg shadow-sm hover:bg-blue-50 transition-colors">
                    <ArrowRightIcon size={20} className="text-blue-600 mb-1" />
                    <span className="text-xs text-gray-700">Transfer</span>
                  </button>
                  <button className="flex flex-col items-center justify-center bg-white p-3 rounded-lg shadow-sm hover:bg-blue-50 transition-colors">
                    <PlusCircleIcon size={20} className="text-blue-600 mb-1" />
                    <span className="text-xs text-gray-700">Deposit</span>
                  </button>
                  <button className="flex flex-col items-center justify-center bg-white p-3 rounded-lg shadow-sm hover:bg-blue-50 transition-colors">
                    <LockIcon size={20} className="text-blue-600 mb-1" />
                    <span className="text-xs text-gray-700">Lock Card</span>
                  </button>
                  <button className="flex flex-col items-center justify-center bg-white p-3 rounded-lg shadow-sm hover:bg-blue-50 transition-colors">
                    <AlertTriangleIcon size={20} className="text-blue-600 mb-1" />
                    <span className="text-xs text-gray-700">Report</span>
                  </button>
                  <button className="flex flex-col items-center justify-center bg-white p-3 rounded-lg shadow-sm hover:bg-blue-50 transition-colors">
                    <BarChart2Icon size={20} className="text-blue-600 mb-1" />
                    <span className="text-xs text-gray-700">Insights</span>
                  </button>
                  <button className="flex flex-col items-center justify-center bg-white p-3 rounded-lg shadow-sm hover:bg-blue-50 transition-colors">
                    <DollarSignIcon size={20} className="text-blue-600 mb-1" />
                    <span className="text-xs text-gray-700">Pay Bill</span>
                  </button>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Left Column - Transaction History */}
                  <div className="md:col-span-2">
                    <div className="bg-white p-4 rounded-lg shadow-md">
                      <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-semibold text-gray-700">Recent Transactions</h2>
                        <button 
                          onClick={refreshData} 
                          className="text-blue-600 hover:text-blue-800"
                          aria-label="Refresh transactions"
                        >
                          <RefreshCwIcon size={18} />
                        </button>
                      </div>
                      
                      {/* Search bar */}
                      <div className="relative mb-4">
                        <input
                          type="text"
                          placeholder="Search transactions..."
                          className="w-full p-2 pl-8 border border-gray-300 rounded-md"
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <SearchIcon size={16} className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      </div>
                      
                      {/* Transactions list */}
                      {filteredTransactions.length > 0 ? (
                        <div className="max-h-96 overflow-y-auto">
                          {filteredTransactions.map(transaction => (
                            <div key={transaction.id} className="flex justify-between items-center p-3 border-b border-gray-100 hover:bg-gray-50">
                              <div>
                                <p className="font-medium text-gray-800">{transaction.merchant}</p>
                                <p className="text-xs text-gray-500">{transaction.date} • {transaction.category}</p>
                              </div>
                              <span className={`font-medium ${transaction.amount >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                {formatCurrency(transaction.amount)}
                              </span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="py-10 text-center">
                          <p className="text-gray-500">No transactions found</p>
                          <p className="text-sm text-gray-400 mt-1">Try adjusting your search</p>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Right Column - Insights & Budget */}
                  <div>
                    {/* Spending by Category */}
                    <div className="bg-white p-4 rounded-lg shadow-md mb-6">
                      <h2 className="text-lg font-semibold text-gray-700 mb-4">Spending by Category</h2>
                      <div className="h-48">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={calculateSpendingByCategory()}
                              cx="50%"
                              cy="50%"
                              outerRadius={60}
                              fill="#8884d8"
                              dataKey="value"
                              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                            >
                              {calculateSpendingByCategory().map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                              ))}
                            </Pie>
                            <Tooltip formatter={(value) => formatCurrency(value as number)} />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                    
                    {/* Budget Progress */}
                    <div className="bg-white p-4 rounded-lg shadow-md">
                      <h2 className="text-lg font-semibold text-gray-700 mb-4">Budget Progress</h2>
                      {calculateBudgetProgress().map((budget) => (
                        <div key={budget.category} className="mb-3">
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-sm font-medium text-gray-700">{budget.category}</span>
                            <span className="text-xs text-gray-500">
                              {formatCurrency(budget.spent)} of {formatCurrency(budget.total)}
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div 
                              className={`h-2.5 rounded-full ${budget.percentage > 85 ? 'bg-red-500' : 'bg-blue-600'}`} 
                              style={{ width: `${budget.percentage}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
