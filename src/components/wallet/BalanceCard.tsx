import React, { useState, useEffect } from 'react';
import { 
  Eye, EyeOff, Lock, Unlock, CreditCard, Send, 
  Download, Search, Filter, Calendar, DollarSign, 
  Euro, Circle, Fingerprint, User, Globe, 
  ChevronDown, Info
} from 'lucide-react';

const BalanceCard = () => {
  // State management
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hideBalance, setHideBalance] = useState(false);
  const [currentAccount, setCurrentAccount] = useState('checking');
  const [currency, setCurrency] = useState('USD');
  const [darkMode, setDarkMode] = useState(false);
  const [securityStatus, setSecurityStatus] = useState('secure');
  const [showDropdown, setShowDropdown] = useState(false);
  const [budgetProgress, setBudgetProgress] = useState(65);
  const [isHovered, setIsHovered] = useState(false);
  const [showTooltip, setShowTooltip] = useState('');

  // Sample data
  const accounts = {
    checking: { 
      balance: 4285.75, 
      type: 'Checking', 
      number: '**** 4523',
      budget: { current: 2100, max: 3200 }
    },
    savings: { 
      balance: 12650.42, 
      type: 'Savings', 
      number: '**** 7802',
      budget: { current: 12650.42, max: 20000 }
    },
    credit: { 
      balance: 742.18, 
      type: 'Credit', 
      number: '**** 9245',
      budget: { current: 742.18, max: 5000 }
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

  // Format currency based on selected currency
  const formatCurrency = (amount) => {
    if (hideBalance) return '●●●●';
    
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2
    });
    
    return formatter.format(amount);
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
      <div className={`w-full max-w-md mx-auto rounded-xl shadow-lg overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="p-6 animate-pulse">
          <div className="h-4 bg-gray-300 rounded w-1/4 mb-4"></div>
          <div className="h-8 bg-gray-300 rounded w-3/4 mb-6"></div>
          <div className="h-4 bg-gray-300 rounded w-1/2 mb-6"></div>
          <div className="flex space-x-4 mb-6">
            <div className="h-10 bg-gray-300 rounded w-1/3"></div>
            <div className="h-10 bg-gray-300 rounded w-1/3"></div>
            <div className="h-10 bg-gray-300 rounded w-1/3"></div>
          </div>
          <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
          <div className="h-6 bg-gray-300 rounded w-full"></div>
        </div>
      </div>
    );
  }

  // Render error state
  if (error) {
    return (
      <div className={`w-full max-w-md mx-auto rounded-xl shadow-lg overflow-hidden ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}>
        <div className="p-6 text-center">
          {/*<AlertTriangle className="mx-auto mb-4 text-red-500" size={48} />*/}
          <h3 className="text-xl font-bold mb-2">Unable to Load Account</h3>
          <p className="mb-4">We're having trouble connecting to your account. Please try again later.</p>
          <button 
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center mx-auto"
            onClick={() => window.location.reload()}
          >
            {/*<RefreshCw className="mr-2" size={16} />*/}
            Retry
          </button>
        </div>
      </div>
    );
  }

  // Main component render
  return (
    <div 
      className={`w-full max-w-md mx-auto rounded-xl shadow-lg overflow-hidden transition-all duration-300 ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}
      style={{ transform: isHovered ? 'translateY(-4px)' : 'translateY(0)', boxShadow: isHovered ? '0 10px 25px rgba(0, 0, 0, 0.1)' : '0 4px 6px rgba(0, 0, 0, 0.1)' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Header */}
      <div className="p-6 pb-4">
        <div className="flex justify-between items-center mb-4">
          <div className="relative">
            <button 
              className="flex items-center text-sm font-medium"
              onClick={() => setShowDropdown(!showDropdown)}
              aria-label="Select account"
            >
              {accounts[currentAccount].type} Account
              <ChevronDown size={16} className="ml-1" />
            </button>
            
            {/* Account dropdown */}
            {showDropdown && (
              <div className={`absolute top-full left-0 mt-1 w-48 rounded-md shadow-lg z-10 ${darkMode ? 'bg-gray-700' : 'bg-white'}`}>
                <div className="py-1">
                  <button 
                    className={`block px-4 py-2 text-sm w-full text-left ${currentAccount === 'checking' ? 'bg-blue-50 text-blue-700' : ''} ${darkMode ? 'hover:bg-gray-600' : 'hover:bg-gray-100'}`}
                    onClick={() => handleAccountChange('checking')}
                  >
                    Checking Account
                  </button>
                  <button 
                    className={`block px-4 py-2 text-sm w-full text-left ${currentAccount === 'savings' ? 'bg-blue-50 text-blue-700' : ''} ${darkMode ? 'hover:bg-gray-600' : 'hover:bg-gray-100'}`}
                    onClick={() => handleAccountChange('savings')}
                  >
                    Savings Account
                  </button>
                  <button 
                    className={`block px-4 py-2 text-sm w-full text-left ${currentAccount === 'credit' ? 'bg-blue-50 text-blue-700' : ''} ${darkMode ? 'hover:bg-gray-600' : 'hover:bg-gray-100'}`}
                    onClick={() => handleAccountChange('credit')}
                  >
                    Credit Card
                  </button>
                </div>
              </div>
            )}
          </div>
          
          <div className="flex space-x-2">
            {/* Currency toggle */}
            <button 
              className={`p-2 rounded-full ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
              onClick={() => setCurrency(currency === 'USD' ? 'EUR' : 'USD')}
              aria-label="Toggle currency"
            >
              {currency === 'USD' ? <DollarSign size={18} /> : <Euro size={18} />}
            </button>
            
            {/* Dark mode toggle */}
            <button 
              className={`p-2 rounded-full ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
              onClick={() => setDarkMode(!darkMode)}
              aria-label="Toggle dark mode"
            >
              {darkMode ? <Circle size={18} /> : <Circle size={18} fill="black" />}
            </button>
            
            {/* Security status */}
            <button 
              className={`p-2 rounded-full ${securityStatus === 'secure' ? 'text-green-500' : 'text-yellow-500'}`}
              onClick={handleSecurityAction}
              aria-label="Security status"
              onMouseEnter={() => handleTooltipShow('Security')}
              onMouseLeave={handleTooltipHide}
            >
              {securityStatus === 'secure' ? <Lock size={18} /> : <Unlock size={18} />}
              {showTooltip === 'Security' && (
                <div className="absolute bg-black text-white p-2 rounded text-xs -mt-10 whitespace-nowrap">
                  {tooltips['Security']}
                </div>
              )}
            </button>
          </div>
        </div>
        
        {/* Balance display */}
        <div className="mb-4">
          <div className="flex items-center justify-between">
            <span className="text-sm opacity-75">Available Balance</span>
            <button 
              className={`p-1 rounded-full ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
              onClick={() => setHideBalance(!hideBalance)}
              aria-label="Hide balance"
            >
              {hideBalance ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          <div className="flex items-baseline">
            <h1 className="text-4xl font-bold tracking-tight">
              {formatCurrency(accounts[currentAccount].balance)}
            </h1>
            <span className="text-sm ml-2 opacity-75">{accounts[currentAccount].number}</span>
          </div>
        </div>
        
        {/* Quick action buttons */}
        <div className="flex space-x-2 mb-6">
          <button className={`flex-1 py-2 px-3 rounded-lg flex items-center justify-center text-sm font-medium ${darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'} text-white transition-colors`}>
            <Send size={16} className="mr-2" />
            Transfer
          </button>
          <button className={`flex-1 py-2 px-3 rounded-lg flex items-center justify-center text-sm font-medium ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'} transition-colors`}>
            <Download size={16} className="mr-2" />
            Deposit
          </button>
          <button className={`flex-1 py-2 px-3 rounded-lg flex items-center justify-center text-sm font-medium ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'} transition-colors`}>
            <CreditCard size={16} className="mr-2" />
            Card
          </button>
        </div>
        
        {/* Budget progress */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-1">
            <div className="flex items-center">
              <span className="text-sm font-medium mr-1">Monthly Budget</span>
              <button 
                className="p-1"
                onMouseEnter={() => handleTooltipShow('Budget')}
                onMouseLeave={handleTooltipHide}
                aria-label="Budget info"
              >
                <Info size={14} />
                {showTooltip === 'Budget' && (
                  <div className="absolute bg-black text-white p-2 rounded text-xs -mt-10 whitespace-nowrap">
                    {tooltips['Budget']}
                  </div>
                )}
              </button>
            </div>
            <span className="text-sm">
              {formatCurrency(accounts[currentAccount].budget.current)} of {formatCurrency(accounts[currentAccount].budget.max)}
            </span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className={`h-full ${budgetProgress > 80 ? 'bg-red-500' : 'bg-green-500'}`}
              style={{ width: `${(accounts[currentAccount].budget.current / accounts[currentAccount].budget.max) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>
      
      {/* Footer with advanced features */}
      <div className={`px-6 py-4 flex justify-between items-center ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
        <div className="flex items-center space-x-2">
          <button className={`p-2 rounded-full ${darkMode ? 'hover:bg-gray-600' : 'hover:bg-gray-200'} transition-colors`} aria-label="Search transactions">
            <Search size={18} />
          </button>
          <button className={`p-2 rounded-full ${darkMode ? 'hover:bg-gray-600' : 'hover:bg-gray-200'} transition-colors`} aria-label="Filter">
            <Filter size={18} />
          </button>
          <button className={`p-2 rounded-full ${darkMode ? 'hover:bg-gray-600' : 'hover:bg-gray-200'} transition-colors`} aria-label="Calendar view">
            <Calendar size={18} />
          </button>
        </div>
        
        <div className="flex items-center space-x-2">
          <button 
            className={`p-2 rounded-full ${darkMode ? 'hover:bg-gray-600' : 'hover:bg-gray-200'} transition-colors`}
            onClick={handleBiometricAuth}
            aria-label="Biometric authentication"
          >
            <Fingerprint size={18} />
          </button>
          <button className={`p-2 rounded-full ${darkMode ? 'hover:bg-gray-600' : 'hover:bg-gray-200'} transition-colors`} aria-label="User settings">
            <User size={18} />
          </button>
          <button className={`p-2 rounded-full ${darkMode ? 'hover:bg-gray-600' : 'hover:bg-gray-200'} transition-colors`} aria-label="Language settings">
            <Globe size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BalanceCard;
