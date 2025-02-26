import React, { useState, useEffect } from 'react';
import { 
  Eye, EyeOff, Lock, Unlock, CreditCard, Send, 
  Download, Search, Filter, Calendar, DollarSign, 
  Euro, Circle, Fingerprint, User, Globe, 
  ChevronDown, Info, AlertTriangle, RefreshCw
} from 'lucide-react';
import { cn } from "@/lib/utils";

interface BalanceCardProps {
  defaultCurrency?: string;
}

const BalanceCard = ({ defaultCurrency = 'USD' }: BalanceCardProps) => {
  // State management
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hideBalance, setHideBalance] = useState(false);
  const [currentAccount, setCurrentAccount] = useState('checking');
  const [currency, setCurrency] = useState(defaultCurrency);
  const [darkMode, setDarkMode] = useState(false);
  const [securityStatus, setSecurityStatus] = useState('secure');
  const [showDropdown, setShowDropdown] = useState(false);
  const [budgetProgress, setBudgetProgress] = useState(65);
  const [isHovered, setIsHovered] = useState(false);
  const [showTooltip, setShowTooltip] = useState('');

  // Sample data with different currencies
  const accounts = {
    checking: { 
      balance: currency === 'HTG' ? 425785.75 : (currency === 'USDT' ? 4285.75 : 4285.75), 
      type: 'Checking', 
      number: '**** 4523',
      budget: { 
        current: currency === 'HTG' ? 210000 : (currency === 'USDT' ? 2100 : 2100), 
        max: currency === 'HTG' ? 320000 : (currency === 'USDT' ? 3200 : 3200) 
      }
    },
    savings: { 
      balance: currency === 'HTG' ? 1265042.42 : (currency === 'USDT' ? 12650.42 : 12650.42), 
      type: 'Savings', 
      number: '**** 7802',
      budget: { 
        current: currency === 'HTG' ? 1265042.42 : (currency === 'USDT' ? 12650.42 : 12650.42), 
        max: currency === 'HTG' ? 2000000 : (currency === 'USDT' ? 20000 : 20000) 
      }
    },
    credit: { 
      balance: currency === 'HTG' ? 74218.18 : (currency === 'USDT' ? 742.18 : 742.18), 
      type: 'Credit', 
      number: '**** 9245',
      budget: { 
        current: currency === 'HTG' ? 74218.18 : (currency === 'USDT' ? 742.18 : 742.18), 
        max: currency === 'HTG' ? 500000 : (currency === 'USDT' ? 5000 : 5000) 
      }
    }
  };

  const tooltips = {
    'APR': 'Annual Percentage Rate - The yearly interest rate charged for borrowing.',
    'Budget': 'Your monthly spending limit that you set for this account.',
    'Pending': 'Transactions that have not yet been fully processed.',
    'Security': 'Current security status of your account.'
  };

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  // Format large numbers with K, M, B suffixes
  const formatLargeNumber = (num: number) => {
    if (num >= 1000000000) {
      return (num / 1000000000).toFixed(1) + 'B';
    }
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toFixed(2);
  };

  // Format currency based on selected currency
  const formatCurrency = (amount: number) => {
    if (hideBalance) return '●●●●';
    
    // Format the number first
    const formattedNumber = formatLargeNumber(amount);
    
    // Special handling for USDT
    if (defaultCurrency === 'USDT') {
      return `₮${formattedNumber}`;
    }
    
    // For other currencies, use the currency symbol
    const symbol = defaultCurrency === 'HTG' ? 'G' : '$';
    return `${symbol}${formattedNumber}`;
  };

  // Get gradient class based on currency
  const getGradientClass = () => {
    switch(defaultCurrency) {
      case 'USD':
        return 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white';
      case 'HTG':
        return 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white';
      case 'USDT':
        return 'bg-gradient-to-r from-green-400 to-emerald-500 text-white';
      default:
        return 'bg-white';
    }
  };

  // Handle account toggle
  const handleAccountChange = (account) => {
    setLoading(true);
    setCurrentAccount(account);
    setShowDropdown(false);
    setTimeout(() => setLoading(false), 800);
  };

  // Handle security actions
  const handleSecurityAction = () => {
    setSecurityStatus(securityStatus === 'secure' ? 'unlocked' : 'secure');
  };

  // Handle biometric authentication 
  const handleBiometricAuth = () => {
    setLoading(true);
    setTimeout(() => {
      setHideBalance(false);
      setLoading(false);
    }, 1000);
  };

  // Handle tooltip display
  const handleTooltipShow = (key) => {
    setShowTooltip(key);
  };

  const handleTooltipHide = () => {
    setShowTooltip('');
  };

  // Render loading skeleton
  if (loading) {
    return (
      <div className="w-full overflow-hidden">
        <div className="p-4 animate-pulse">
          <div className="h-3 bg-gray-300 rounded w-1/4 mb-3"></div>
          <div className="h-6 bg-gray-300 rounded w-3/4 mb-4"></div>
          <div className="h-3 bg-gray-300 rounded w-1/2 mb-4"></div>
          <div className="flex space-x-2 mb-4">
            <div className="h-8 bg-gray-300 rounded w-1/3"></div>
            <div className="h-8 bg-gray-300 rounded w-1/3"></div>
            <div className="h-8 bg-gray-300 rounded w-1/3"></div>
          </div>
          <div className="h-3 bg-gray-300 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-300 rounded w-full"></div>
        </div>
      </div>
    );
  }

  // Render error state
  if (error) {
    return (
      <div className="w-full overflow-hidden">
        <div className="p-4 text-center">
          <AlertTriangle className="mx-auto mb-3 text-red-500" size={32} />
          <h3 className="text-lg font-bold mb-2">Unable to Load Account</h3>
          <p className="mb-3 text-sm">We're having trouble connecting to your account. Please try again later.</p>
          <button 
            className="px-3 py-1.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center mx-auto text-sm"
            onClick={() => window.location.reload()}
          >
            <RefreshCw className="mr-2" size={14} />
            Retry
          </button>
        </div>
      </div>
    );
  }

  // Main component render
  return (
    <div className={cn(
      "w-full overflow-hidden rounded-lg border border-gray-100 shadow-sm",
      getGradientClass()
    )}>
      {/* Header */}
      <div className="px-4 py-3">
        <div className="flex justify-between items-center mb-3">
          <div className="relative">
            <button 
              className="flex items-center text-xs font-medium text-white/90"
              onClick={() => setShowDropdown(!showDropdown)}
              aria-label="Select account"
            >
              {accounts[currentAccount].type} Account
              <ChevronDown size={14} className="ml-1" />
            </button>
            
            {showDropdown && (
              <div className="absolute top-full left-0 mt-1 w-40 rounded-md shadow-lg z-10 bg-white">
                <div className="py-1">
                  <button 
                    className={`block px-3 py-1.5 text-xs w-full text-left text-gray-700 ${currentAccount === 'checking' ? 'bg-gray-50' : ''} hover:bg-gray-50`}
                    onClick={() => handleAccountChange('checking')}
                  >
                    Checking Account
                  </button>
                  <button 
                    className={`block px-3 py-1.5 text-xs w-full text-left text-gray-700 ${currentAccount === 'savings' ? 'bg-gray-50' : ''} hover:bg-gray-50`}
                    onClick={() => handleAccountChange('savings')}
                  >
                    Savings Account
                  </button>
                  <button 
                    className={`block px-3 py-1.5 text-xs w-full text-left text-gray-700 ${currentAccount === 'credit' ? 'bg-gray-50' : ''} hover:bg-gray-50`}
                    onClick={() => handleAccountChange('credit')}
                  >
                    Credit Card
                  </button>
                </div>
              </div>
            )}
          </div>
          
          <div className="flex space-x-1">
            <button 
              className="p-1.5 rounded-full text-white/90 hover:bg-white/10"
              onClick={() => setSecurityStatus(securityStatus === 'secure' ? 'unlocked' : 'secure')}
              aria-label="Security status"
            >
              {securityStatus === 'secure' ? <Lock size={14} /> : <Unlock size={14} />}
            </button>
          </div>
        </div>
        
        {/* Balance display */}
        <div className="mb-3">
          <div className="flex items-center justify-between">
            <span className="text-xs text-white/75">Available Balance</span>
            <button 
              className="p-1 rounded-full hover:bg-white/10"
              onClick={() => setHideBalance(!hideBalance)}
              aria-label="Toggle balance visibility"
            >
              {hideBalance ? <EyeOff size={14} className="text-white/90" /> : <Eye size={14} className="text-white/90" />}
            </button>
          </div>
          <div className="flex items-baseline">
            <h1 className="text-2xl font-bold tracking-tight text-white">
              {formatCurrency(accounts[currentAccount].balance)}
            </h1>
            <span className="text-xs ml-2 text-white/75">{accounts[currentAccount].number}</span>
          </div>
        </div>
        
        {/* Quick actions */}
        <div className="flex space-x-2 mb-4">
          <button className="flex-1 py-1.5 px-2 rounded-lg flex items-center justify-center text-xs font-medium bg-white/20 hover:bg-white/30 text-white transition-colors backdrop-blur-sm">
            <Send size={14} className="mr-1.5" />
            Send
          </button>
          <button className="flex-1 py-1.5 px-2 rounded-lg flex items-center justify-center text-xs font-medium bg-white/20 hover:bg-white/30 text-white transition-colors backdrop-blur-sm">
            <Download size={14} className="mr-1.5" />
            Receive
          </button>
          <button className="flex-1 py-1.5 px-2 rounded-lg flex items-center justify-center text-xs font-medium bg-white/20 hover:bg-white/30 text-white transition-colors backdrop-blur-sm">
            <CreditCard size={14} className="mr-1.5" />
            Card
          </button>
        </div>
        
        {/* Budget progress */}
        <div className="mb-3">
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs text-white/75">Monthly Budget</span>
            <span className="text-xs text-white/75">
              {formatCurrency(accounts[currentAccount].budget.current)} of {formatCurrency(accounts[currentAccount].budget.max)}
            </span>
          </div>
          <div className="h-1.5 bg-white/20 rounded-full overflow-hidden backdrop-blur-sm">
            <div 
              className="h-full bg-white/40"
              style={{ 
                width: `${(accounts[currentAccount].budget.current / accounts[currentAccount].budget.max) * 100}%`
              }}
            />
          </div>
        </div>
      </div>
      
      {/* Footer with advanced features */}
      <div className="px-4 py-3 flex justify-between items-center border-t border-gray-100">
        <div className="flex items-center space-x-1">
          <button className="p-1.5 rounded-full hover:bg-gray-100 transition-colors" aria-label="Search transactions">
            <Search size={14} />
          </button>
          <button className="p-1.5 rounded-full hover:bg-gray-100 transition-colors" aria-label="Filter">
            <Filter size={14} />
          </button>
          <button className="p-1.5 rounded-full hover:bg-gray-100 transition-colors" aria-label="Calendar view">
            <Calendar size={14} />
          </button>
        </div>
        
        <div className="flex items-center space-x-1">
          <button 
            className="p-1.5 rounded-full hover:bg-gray-100 transition-colors"
            onClick={handleBiometricAuth}
            aria-label="Biometric authentication"
          >
            <Fingerprint size={14} />
          </button>
          <button className="p-1.5 rounded-full hover:bg-gray-100 transition-colors" aria-label="User settings">
            <User size={14} />
          </button>
          <button className="p-1.5 rounded-full hover:bg-gray-100 transition-colors" aria-label="Language settings">
            <Globe size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BalanceCard;
