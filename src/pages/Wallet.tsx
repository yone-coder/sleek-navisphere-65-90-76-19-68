import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Wallet, 
  CreditCard, 
  Send, 
  Download, 
  History, 
  ChevronRight, 
  Settings,
  PieChart,
  Grid,
  User,
  Bell,
  Search,
  Plus,
  TrendingUp,
  ArrowUpRight,
  ArrowDownLeft,
  Filter,
  Calendar,
  DollarSign,
  ChevronsUpDown,
  CircleDollarSign,
  Lock, 
  Shield, 
  Coffee, 
  ShoppingBag, 
  Utensils, 
  HelpCircle, 
  TrendingDown, 
  LogOut,
  Home
} from "lucide-react";
import { motion } from "framer-motion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import BalanceCard from "@/components/wallet/BalanceCard";

const WalletPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("home");
  const [loadingTransaction, setLoadingTransaction] = useState(false);

  // Sample transactions data
  const recentTransactions = [
    { id: 1, type: "sent", amount: 230, recipient: "John Doe", date: "Today", time: "14:32", status: "completed" },
    { id: 2, type: "received", amount: 1250, sender: "PayRoll Inc", date: "Yesterday", time: "09:15", status: "completed" },
    { id: 3, type: "sent", amount: 45, recipient: "Coffee Shop", date: "Yesterday", time: "08:30", status: "completed" },
    { id: 4, type: "received", amount: 500, sender: "Client Payment", date: "Oct 15", time: "16:45", status: "completed" },
    { id: 5, type: "sent", amount: 120, recipient: "Electric Bill", date: "Oct 12", time: "11:20", status: "completed" },
  ];

  // Quick action buttons
  const quickActions = [
    { icon: Send, label: "Send", action: () => handleQuickAction("send") },
    { icon: Download, label: "Receive", action: () => handleQuickAction("receive") },
    { icon: CreditCard, label: "Cards", action: () => handleQuickAction("cards") },
    { icon: History, label: "History", action: () => handleQuickAction("history") },
    { icon: Plus, label: "Top Up", action: () => handleQuickAction("topup") },
  ];

  // Currencies supported
  const currencies = [
    { code: 'USD', symbol: '$' },
    { code: 'HTG', symbol: 'G' },
    { code: 'USDT', symbol: '₮' }
  ];

  const handleQuickAction = (action) => {
    toast({
      title: `${action.charAt(0).toUpperCase() + action.slice(1)} action`,
      description: `You triggered the ${action} action`,
    });
    
    if (action === "history") {
      setActiveTab("activity");
    }
  };

  const handleSendMoney = () => {
    setLoadingTransaction(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoadingTransaction(false);
      toast({
        title: "Transaction initiated",
        description: "Your money is on its way!",
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-black text-white pb-16">
      {/* Animated gradient background */}
      <div className="fixed inset-0 z-0 opacity-20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900 via-black to-black"></div>
      </div>

      {/* Header with notifications and settings */}
      <header className="sticky top-0 z-10 bg-black/80 backdrop-blur-lg border-b border-gray-800">
        <div className="p-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Grid className="h-5 w-5 text-gray-400" />
            <h1 className="text-xl font-bold">Wallet</h1>
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" size="icon" className="relative text-gray-400">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-4 w-4 bg-purple-600 rounded-full flex items-center justify-center text-[10px]">
                3
              </span>
            </Button>
            <Button variant="ghost" size="icon" className="text-gray-400">
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-gray-400">
              <Settings className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main content with tabs */}
      <main className="relative z-1">
        <Tabs defaultValue="home" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsContent value="home" className="m-0">
            <div className="p-4">
              {/* Balance cards carousel */}
              <ScrollArea className="w-full whitespace-nowrap pb-4">
                <div className="flex space-x-4 px-0.5">
                  {currencies.map((currency) => (
                    <div key={currency.code} className="min-w-[280px] sm:min-w-[320px] first:ml-0 last:mr-4">
                      <BalanceCard defaultCurrency={currency.code} />
                    </div>
                  ))}
                </div>
              </ScrollArea>

              {/* Quick Actions */}
              <div className="mt-6">
                <h2 className="text-lg font-semibold mb-3">Quick Actions</h2>
                <div className="grid grid-cols-5 gap-2">
                  {quickActions.map((action, index) => (
                    <motion.button
                      key={index}
                      className="flex flex-col items-center gap-1.5 p-2 rounded-xl transition-all duration-300"
                      whileTap={{ scale: 0.95 }}
                      onClick={action.action}
                    >
                      <div className="h-10 w-10 rounded-full bg-purple-900/40 flex items-center justify-center mb-1">
                        <action.icon className="h-5 w-5 text-purple-400" />
                      </div>
                      <span className="text-xs text-gray-300">{action.label}</span>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Recent Transactions */}
              <div className="mt-8">
                <div className="flex justify-between items-center mb-3">
                  <h2 className="text-lg font-semibold">Recent Transactions</h2>
                  <Button variant="ghost" size="sm" className="text-purple-400 text-xs" onClick={() => setActiveTab("activity")}>
                    View All <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>

                <div className="space-y-3">
                  {recentTransactions.slice(0, 3).map((transaction) => (
                    <div 
                      key={transaction.id} 
                      className="flex items-center justify-between p-3 bg-gray-900/40 rounded-lg border border-gray-800"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                          transaction.type === "received" ? "bg-green-900/30" : "bg-red-900/30"
                        }`}>
                          {transaction.type === "received" ? (
                            <ArrowDownLeft className="h-5 w-5 text-green-400" />
                          ) : (
                            <ArrowUpRight className="h-5 w-5 text-red-400" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-sm">
                            {transaction.type === "received" ? transaction.sender : transaction.recipient}
                          </p>
                          <p className="text-xs text-gray-400">
                            {transaction.date} • {transaction.time}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`font-semibold ${
                          transaction.type === "received" ? "text-green-400" : "text-red-400"
                        }`}>
                          {transaction.type === "received" ? "+" : "-"}${transaction.amount}
                        </p>
                        <Badge variant="outline" className="text-[10px] px-1.5 bg-gray-800 text-gray-300 border-gray-700">
                          {transaction.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Upcoming Bills */}
              <div className="mt-8">
                <div className="flex justify-between items-center mb-3">
                  <h2 className="text-lg font-semibold">Upcoming Bills</h2>
                  <Button variant="ghost" size="sm" className="text-purple-400 text-xs">
                    Manage <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>

                <Card className="bg-gradient-to-r from-gray-900 to-gray-800 border-gray-800">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-blue-900/30 flex items-center justify-center">
                          <CreditCard className="h-5 w-5 text-blue-400" />
                        </div>
                        <div>
                          <p className="font-medium">Credit Card Payment</p>
                          <p className="text-xs text-gray-400">Due in 3 days</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">$680.00</p>
                        <Button size="sm" variant="outline" className="mt-1 h-7 text-xs bg-transparent border-gray-700 hover:bg-gray-800">
                          Pay Now
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Financial Goals */}
              <div className="mt-8">
                <div className="flex justify-between items-center mb-3">
                  <h2 className="text-lg font-semibold">Financial Goals</h2>
                  <Button variant="ghost" size="sm" className="text-purple-400 text-xs">
                    Add Goal <Plus className="h-3 w-3 ml-1" />
                  </Button>
                </div>

                <Card className="bg-gradient-to-r from-purple-950/50 to-indigo-950/50 border-gray-800">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="h-10 w-10 rounded-full bg-purple-900/40 flex items-center justify-center">
                        <CircleDollarSign className="h-5 w-5 text-purple-400" />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <p className="font-medium">Vacation Fund</p>
                          <p className="text-xs text-gray-300">$1,200 / $5,000</p>
                        </div>
                        <div className="w-full h-1.5 bg-gray-800 rounded-full mt-1.5 overflow-hidden">
                          <div className="h-full bg-purple-600 rounded-full" style={{ width: '24%' }}></div>
                        </div>
                      </div>
                    </div>
                    <Button size="sm" variant="outline" className="w-full h-8 text-xs bg-transparent border-gray-700 hover:bg-gray-800">
                      Add Money
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Send Money */}
              <div className="mt-8">
                <div className="flex justify-between items-center mb-3">
                  <h2 className="text-lg font-semibold">Send Money</h2>
                </div>

                <Card className="bg-gray-900/70 border-gray-800">
                  <CardContent className="p-4 space-y-4">
                    <div className="flex items-center gap-3">
                      <Input 
                        placeholder="Amount" 
                        className="bg-black/40 border-gray-700 focus:border-purple-500 text-white"
                        type="number"
                        min="0"
                      />
                      <Button 
                        variant="outline" 
                        className="w-20 border-gray-700 bg-black/40"
                      >
                        USD <ChevronsUpDown className="h-3 w-3 ml-1 opacity-70" />
                      </Button>
                    </div>
                    
                    <Input 
                      placeholder="Recipient" 
                      className="bg-black/40 border-gray-700 focus:border-purple-500 text-white"
                    />
                    
                    <Input 
                      placeholder="Note (optional)" 
                      className="bg-black/40 border-gray-700 focus:border-purple-500 text-white"
                    />
                    
                    <Button 
                      className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
                      onClick={handleSendMoney}
                      disabled={loadingTransaction}
                    >
                      {loadingTransaction ? "Processing..." : "Send Money"}
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="activity" className="m-0">
            <div className="p-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Transaction History</h2>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="border-gray-700 bg-black/30 text-gray-300 text-xs">
                    <Filter className="h-3 w-3 mr-1" /> Filter
                  </Button>
                  <Button variant="outline" size="sm" className="border-gray-700 bg-black/30 text-gray-300 text-xs">
                    <Calendar className="h-3 w-3 mr-1" /> Date
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                {recentTransactions.map((transaction) => (
                  <div 
                    key={transaction.id} 
                    className="flex items-center justify-between p-4 bg-gray-900/40 rounded-lg border border-gray-800"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`h-12 w-12 rounded-full flex items-center justify-center ${
                        transaction.type === "received" ? "bg-green-900/30" : "bg-red-900/30"
                      }`}>
                        {transaction.type === "received" ? (
                          <ArrowDownLeft className="h-6 w-6 text-green-400" />
                        ) : (
                          <ArrowUpRight className="h-6 w-6 text-red-400" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium">
                          {transaction.type === "received" ? transaction.sender : transaction.recipient}
                        </p>
                        <p className="text-xs text-gray-400">
                          {transaction.date} • {transaction.time}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`font-bold ${
                        transaction.type === "received" ? "text-green-400" : "text-red-400"
                      }`}>
                        {transaction.type === "received" ? "+" : "-"}${transaction.amount}
                      </p>
                      <Badge variant="outline" className="text-[10px] px-1.5 bg-gray-800 text-gray-300 border-gray-700">
                        {transaction.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="cards" className="m-0">
            <div className="p-4">
              <h2 className="text-xl font-bold mb-4">My Cards</h2>
              
              <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 p-4 h-48 flex flex-col justify-between mb-4">
                <div className="absolute right-0 top-0 w-32 h-32 rounded-bl-full bg-white/10"></div>
                <div>
                  <div className="flex justify-between">
                    <div className="text-white/80 text-xs">Current Balance</div>
                    <div className="flex items-center gap-1">
                      <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                      <div className="h-3 w-3 rounded-full bg-yellow-500 opacity-70 -ml-1"></div>
                    </div>
                  </div>
                  <div className="text-white text-2xl font-bold mt-1">$12,850.45</div>
                </div>
                <div>
                  <div className="text-white/60 text-xs mb-1">Card Number</div>
                  <div className="text-white tracking-widest">**** **** **** 5678</div>
                  <div className="flex justify-between mt-2">
                    <div>
                      <div className="text-white/60 text-xs">Valid Thru</div>
                      <div className="text-white text-sm">12/24</div>
                    </div>
                    <div>
                      <div className="text-white/60 text-xs">Card Holder</div>
                      <div className="text-white text-sm">John Doe</div>
                    </div>
                    <div className="self-end">
                      <svg className="h-7" viewBox="0 0 50 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="50" height="30" rx="4" fill="white" fillOpacity="0.1"/>
                        <path d="M17 15C17 11.134 20.134 8 24 8C27.866 8 31 11.134 31 15C31 18.866 27.866 22 24 22C20.134 22 17 18.866 17 15Z" fill="#FF5F00"/>
                        <path d="M17.5 15C17.5 18.5899 20.4101 21.5 24 21.5C27.5899 21.5 30.5 18.5899 30.5 15C30.5 11.4101 27.5899 8.5 24 8.5C20.4101 8.5 17.5 11.4101 17.5 15Z" stroke="white" strokeOpacity="0.1"/>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <Button className="py-6 bg-black border border-gray-800 text-white hover:bg-gray-900">
                  <div className="flex flex-col items-center">
                    <CreditCard className="h-6 w-6 mb-2" />
                    <span>Card Details</span>
                  </div>
                </Button>
                <Button className="py-6 bg-black border border-gray-800 text-white hover:bg-gray-900">
                  <div className="flex flex-col items-center">
                    <Lock className="h-6 w-6 mb-2" />
                    <span>Lock Card</span>
                  </div>
                </Button>
              </div>
              
              <h3 className="text-lg font-semibold mb-3">Recent Card Transactions</h3>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-gray-900/40 rounded-lg border border-gray-800">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-purple-900/30 flex items-center justify-center">
                      <ShoppingBag className="h-5 w-5 text-purple-400" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">Amazon.com</p>
                      <p className="text-xs text-gray-400">Today • 12:45 PM</p>
                    </div>
                  </div>
                  <p className="font-semibold text-red-400">-$34.50</p>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-gray-900/40 rounded-lg border border-gray-800">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-purple-900/30 flex items-center justify-center">
                      <Coffee className="h-5 w-5 text-purple-400" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">Starbucks</p>
                      <p className="text-xs text-gray-400">Yesterday • 09:15 AM</p>
                    </div>
                  </div>
                  <p className="font-semibold text-red-400">-$5.75</p>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-gray-900/40 rounded-lg border border-gray-800">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-purple-900/30 flex items-center justify-center">
                      <Utensils className="h-5 w-5 text-purple-400" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">Restaurant XYZ</p>
                      <p className="text-xs text-gray-400">Oct 15 • 20:30 PM</p>
                    </div>
                  </div>
                  <p className="font-semibold text-red-400">-$42.30</p>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="stats" className="m-0">
            <div className="p-4">
              <h2 className="text-xl font-bold mb-4">Financial Overview</h2>
              
              <div className="bg-gray-900/70 rounded-xl border border-gray-800 p-4 mb-6">
                <h3 className="text-lg font-semibold mb-3">Monthly Summary</h3>
                <div className="h-48 flex items-center justify-center">
                  <div className="text-center">
                    <PieChart className="h-10 w-10 mx-auto mb-2 text-purple-500" />
                    <p className="text-gray-400 text-sm">
                      This feature will display your spending charts and analytics
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <Card className="bg-gray-900/50 border-gray-800">
                  <CardContent className="p-4">
                    <div className="flex flex-col items-center">
                      <div className="h-12 w-12 rounded-full bg-green-900/30 flex items-center justify-center mb-2">
                        <TrendingUp className="h-6 w-6 text-green-500" />
                      </div>
                      <p className="text-sm text-gray-400">Income</p>
                      <p className="text-xl font-bold">$4,580.50</p>
                      <Badge className="mt-1 bg-green-900/30 text-green-400 border-green-800">+12.5%</Badge>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-gray-900/50 border-gray-800">
                  <CardContent className="p-4">
                    <div className="flex flex-col items-center">
                      <div className="h-12 w-12 rounded-full bg-red-900/30 flex items-center justify-center mb-2">
                        <TrendingDown className="h-6 w-6 text-red-500" />
                      </div>
                      <p className="text-sm text-gray-400">Expenses</p>
                      <p className="text-xl font-bold">$2,256.90</p>
                      <Badge className="mt-1 bg-red-900/30 text-red-400 border-red-800">+8.3%</Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <h3 className="text-lg font-semibold mb-3">Spending Categories</h3>
              
              <div className="space-y-3">
                <div className="p-3 bg-gray-900/40 rounded-lg border border-gray-800">
                  <div className="flex justify-between items-center mb-1">
                    <div className="flex items-center gap-2">
                      <ShoppingBag className="h-4 w-4 text-purple-400" />
                      <p className="font-medium text-sm">Shopping</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">$850.65</p>
                      <p className="text-xs text-gray-400">35% of total</p>
                    </div>
                  </div>
                  <div className="w-full h-1.5 bg-gray-800 rounded-full overflow-hidden">
                    <div className="h-full bg-purple-600 rounded-full" style={{ width: '35%' }}></div>
                  </div>
                </div>
                
                <div className="p-3 bg-gray-900/40 rounded-lg border border-gray-800">
                  <div className="flex justify-between items-center mb-1">
                    <div className="flex items-center gap-2">
                      <Utensils className="h-4 w-4 text-blue-400" />
                      <p className="font-medium text-sm">Food & Dining</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">$632.40</p>
                      <p className="text-xs text-gray-400">25% of total</p>
                    </div>
                  </div>
                  <div className="w-full h-1.5 bg-gray-800 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-600 rounded-full" style={{ width: '25%' }}></div>
                  </div>
                </div>
                
                <div className="p-3 bg-gray-900/40 rounded-lg border border-gray-800">
                  <div className="flex justify-between items-center mb-1">
                    <div className="flex items-center gap-2">
                      <Home className="h-4 w-4 text-green-400" />
                      <p className="font-medium text-sm">Housing</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">$540.00</p>
                      <p className="text-xs text-gray-400">20% of total</p>
                    </div>
                  </div>
                  <div className="w-full h-1.5 bg-gray-800 rounded-full overflow-hidden">
                    <div className="h-full bg-green-600 rounded-full" style={{ width: '20%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="profile" className="m-0">
            <div className="p-4">
              <div className="flex flex-col items-center">
                <div className="h-24 w-24 rounded-full bg-gray-800 flex items-center justify-center mb-4 border-2 border-purple-500">
                  <User className="h-12 w-12 text-gray-400" />
                </div>
                <h2 className="text-xl font-bold">John Doe</h2>
                <p className="text-gray-400 text-sm">john.doe@example.com</p>
                <Badge className="mt-2 bg-purple-900/30 text-purple-400 border-purple-900">Premium User</Badge>
              </div>
              
              <div className="mt-8 space-y-4">
                <div className="p-4 bg-gray-900/70 rounded-lg border border-gray-800">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <CreditCard className="h-5 w-5 text-purple-400" />
                      <span>Payment Methods</span>
                    </div>
                    <ChevronRight className="h-5 w-5 text-gray-500" />
                  </div>
                </div>
                
                <div className="p-4 bg-gray-900/70 rounded-lg border border-gray-800">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <Shield className="h-5 w-5 text-purple-400" />
                      <span>Security</span>
                    </div>
                    <ChevronRight className="h-5 w-5 text-gray-500" />
                  </div>
                </div>
                
                <div className="p-4 bg-gray-900/70 rounded-lg border border-gray-800">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <Bell className="h-5 w-5 text-purple-400" />
                      <span>Notifications</span>
                    </div>
                    <ChevronRight className="h-5 w-5 text-gray-500" />
                  </div>
                </div>
                
                <div className="p-4 bg-gray-900/70 rounded-lg border border-gray-800">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <HelpCircle className="h-5 w-5 text-purple-400" />
                      <span>Help & Support</span>
                    </div>
                    <ChevronRight className="h-5 w-5 text-gray-500" />
                  </div>
                </div>
                
                <div className="p-4 bg-gray-900/70 rounded-lg border border-gray-800">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <Settings className="h-5 w-5 text-purple-400" />
                      <span>Settings</span>
                    </div>
                    <ChevronRight className="h-5 w-5 text-gray-500" />
                  </div>
                </div>
                
                <Button variant="outline" className="w-full border-red-800 text-red-400 hover:bg-red-9
