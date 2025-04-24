
import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';

const salesData = [
  { name: 'Jan', sales: 4000, revenue: 2400, expenses: 1400 },
  { name: 'Feb', sales: 3000, revenue: 1980, expenses: 1200 },
  { name: 'Mar', sales: 5000, revenue: 3280, expenses: 2100 },
  { name: 'Apr', sales: 2780, revenue: 1908, expenses: 1380 },
  { name: 'May', sales: 1890, revenue: 1500, expenses: 980 },
  { name: 'Jun', sales: 2390, revenue: 1800, expenses: 1180 },
  { name: 'Jul', sales: 3490, revenue: 2300, expenses: 1680 },
];

const pieData = [
  { name: 'Electronics', value: 400 },
  { name: 'Clothing', value: 300 },
  { name: 'Food', value: 200 },
  { name: 'Books', value: 100 },
  { name: 'Toys', value: 150 },
];

const COLORS = ['#4f46e5', '#8b5cf6', '#0ea5e9', '#10b981', '#f59e0b'];

const SalesChart: React.FC = () => {
  const [timeRange, setTimeRange] = useState('This Month');

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
      {/* Revenue Chart */}
      <Card className="lg:col-span-2 card-hover">
        <CardHeader className="flex flex-row items-center justify-between pb-8">
          <div>
            <CardTitle>Revenue Overview</CardTitle>
            <CardDescription>Monthly revenue and expenses</CardDescription>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                {timeRange} <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTimeRange('Today')}>Today</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTimeRange('This Week')}>This Week</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTimeRange('This Month')}>This Month</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTimeRange('This Year')}>This Year</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardHeader>
        <CardContent className="pt-0">
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={salesData} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#4f46e5" stopOpacity={0.1} />
                </linearGradient>
                <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis 
                tick={{ fontSize: 12 }} 
                tickFormatter={(value) => `$${value}`}
              />
              <Tooltip 
                formatter={(value) => [`$${value}`, '']}
                labelStyle={{ fontWeight: 'bold' }}
              />
              <Legend />
              <Area 
                type="monotone" 
                dataKey="revenue" 
                stroke="#4f46e5" 
                fillOpacity={1} 
                fill="url(#colorRevenue)" 
              />
              <Area 
                type="monotone" 
                dataKey="expenses" 
                stroke="#ef4444" 
                fillOpacity={1} 
                fill="url(#colorExpenses)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Category Sales Chart */}
      <Card className="card-hover">
        <CardHeader>
          <CardTitle>Sales by Category</CardTitle>
          <CardDescription>Distribution across product categories</CardDescription>
        </CardHeader>
        <CardContent className="pt-0">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                innerRadius={40}
                fill="#8b5cf6"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                labelLine={false}
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value) => [`${value} units`, '']} 
                labelStyle={{ fontWeight: 'bold' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default SalesChart;
