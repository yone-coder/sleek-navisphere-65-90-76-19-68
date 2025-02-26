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
  DollarSignIcon,
  Search as SearchIcon
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Progress } from "@/components/ui/progress"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { useState } from "react"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from "@/components/ui/command"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Skeleton } from "@/components/ui/skeleton"
import { useToast } from "@/hooks/use-toast"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  HoverCard,
  HoverCardContent,
  HoverCardDescription,
  HoverCardHeader,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import * as React from "react"
import { CardClose } from "@radix-ui/react-card"
import { ProgressDemo } from "@/components/ui/progress"
import { SkeletonDemo } from "@/components/ui/skeleton"
import { CalendarDemo } from "@/components/ui/calendar"
import { SliderDemo } from "@/components/ui/slider"
import { SwitchDemo } from "@/components/ui/switch"
import { CheckboxDemo } from "@/components/ui/checkbox"
import { RadioGroupDemo } from "@/components/ui/radio-group"
import { AlertDialogDemo } from "@/components/ui/alert-dialog"
import { DropdownMenuDemo } from "@/components/ui/dropdown-menu"
import { HoverCardDemo } from "@/components/ui/hover-card"
import { AspectRatioDemo } from "@/components/ui/aspect-ratio"
import { CarouselDemo } from "@/components/ui/carousel"
import { CommandDemo } from "@/components/ui/command"
import { AvatarDemo } from "@/components/ui/avatar"
import { BadgeDemo } from "@/components/ui/badge"
import { SeparatorDemo } from "@/components/ui/separator"
import { ScrollAreaDemo } from "@/components/ui/scroll-area"
import { TooltipDemo } from "@/components/ui/tooltip"
import { AccordionDemo } from "@/components/ui/accordion"
import { DrawerDemo } from "@/components/ui/drawer"
import { PopoverDemo } from "@/components/ui/popover"
import { CardDemo } from "@/components/ui/card"
import { TableDemo } from "@/components/ui/table"
import { InputDemo } from "@/components/ui/input"
import { ButtonDemo } from "@/components/ui/button"
import { LabelDemo } from "@/components/ui/label"
import { TextareaDemo } from "@/components/ui/textarea"
import { SelectDemo } from "@/components/ui/select"
import { AlertDemo } from "@/components/ui/alert"
import { Alert } from "@/components/ui/alert"

export default function Wallet() {
  const { t } = useLanguage();
  const [showBalance, setShowBalance] = useState(false);
  const [transactions, setTransactions] = useState([
    { id: 1, type: 'Income', date: '2024-03-15', amount: 1500, description: 'Salary' },
    { id: 2, type: 'Expense', date: '2024-03-10', amount: -250, description: 'Groceries' },
    { id: 3, type: 'Expense', date: '2024-03-05', amount: -100, description: 'Utilities' },
  ]);

  const toggleBalanceVisibility = () => {
    setShowBalance(!showBalance);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="md:flex md:items-center md:justify-between">
          <div className="flex-1 min-w-0">
            <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
              {t('My Wallet')}
            </h2>
          </div>
          <div className="mt-4 flex md:mt-0 md:ml-4">
            <Button>
              <PlusCircleIcon className="mr-2 h-5 w-5" />
              {t('Add Funds')}
            </Button>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>{t('Current Balance')}</CardTitle>
              <CardDescription>{t('Total funds available')}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-semibold">
                  {showBalance ? '$10,000' : '******'}
                </span>
                <Button variant="outline" size="icon" onClick={toggleBalanceVisibility}>
                  {showBalance ? <EyeOffIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t('Recent Transactions')}</CardTitle>
              <CardDescription>{t('Last 3 transactions')}</CardDescription>
            </CardHeader>
            <CardContent>
              <ul>
                {transactions.slice(0, 3).map(transaction => (
                  <li key={transaction.id} className="py-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{transaction.description}</p>
                        <p className="text-sm text-gray-500">{transaction.date}</p>
                      </div>
                      <span className={transaction.type === 'Income' ? 'text-green-500' : 'text-red-500'}>
                        {transaction.type === 'Income' ? '+' : '-'} ${Math.abs(transaction.amount)}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button variant="link">{t('View All Transactions')}</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t('Linked Accounts')}</CardTitle>
              <CardDescription>{t('Manage your linked bank accounts')}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <LockIcon className="mx-auto h-6 w-6 text-gray-400" />
                <p className="mt-2 text-sm text-gray-500">{t('No accounts linked')}</p>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="link">{t('Link Account')}</Button>
            </CardFooter>
          </Card>
        </div>

        <div className="mt-8">
          <h3 className="text-lg font-medium leading-6 text-gray-900">{t('Transaction History')}</h3>
          <div className="mt-4">
            <div className="flex items-center">
              <div className="relative w-full">
                <Input
                  type="text"
                  placeholder={t('Search transactions')}
                  className="pr-12"
                />
                <div className="absolute inset-y-0 right-0 flex py-1.5 pr-1.5">
                  <Button size="sm" className="h-8">
                    <SearchIcon className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>
            <Table className="mt-4">
              <TableCaption>{t('A comprehensive list of your transactions')}</TableCaption>
              <TableHead>
                <TableRow>
                  <TableHead>{t('Date')}</TableHead>
                  <TableHead>{t('Description')}</TableHead>
                  <TableHead className="text-right">{t('Amount')}</TableHead>
                </TableRow>
              </TableHead>
              <TableBody>
                {transactions.map(transaction => (
                  <TableRow key={transaction.id}>
                    <TableCell>{transaction.date}</TableCell>
                    <TableCell>{transaction.description}</TableCell>
                    <TableCell className="text-right">
                      <span className={transaction.type === 'Income' ? 'text-green-500' : 'text-red-500'}>
                        {transaction.type === 'Income' ? '+' : '-'} ${Math.abs(transaction.amount)}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}
