
import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { 
  ArrowDownToLine, 
  Calendar, 
  ChevronDown 
} from 'lucide-react';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

const salesData = [
  { name: 'Jan', sales: 4000, revenue: 2400, expenses: 1400 },
  { name: 'Feb', sales: 3000, revenue: 1980, expenses: 1200 },
  { name: 'Mar', sales: 5000, revenue: 3280, expenses: 2100 },
  { name: 'Apr', sales: 2780, revenue: 1908, expenses: 1380 },
  { name: 'May', sales: 1890, revenue: 1500, expenses: 980 },
  { name: 'Jun', sales: 2390, revenue: 1800, expenses: 1180 },
  { name: 'Jul', sales: 3490, revenue: 2300, expenses: 1680 },
];

const topProducts = [
  { name: 'Product A', value: 400 },
  { name: 'Product B', value: 300 },
  { name: 'Product C', value: 200 },
  { name: 'Product D', value: 150 },
  { name: 'Product E', value: 100 },
];

const customerData = [
  { name: 'New', value: 45 },
  { name: 'Returning', value: 55 },
];

const COLORS = ['#4f46e5', '#8b5cf6', '#0ea5e9', '#10b981', '#f59e0b'];
const CUSTOMER_COLORS = ['#4f46e5', '#8b5cf6'];

const Analytics: React.FC = () => {
  const [timeRange, setTimeRange] = useState('Last 30 Days');

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Track performance and business insights
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Calendar className="mr-2 h-4 w-4" />
            {timeRange}
          </Button>
          <Button variant="outline">
            <ArrowDownToLine className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <Tabs defaultValue="sales" className="mb-6">
        <TabsList>
          <TabsTrigger value="sales">Sales</TabsTrigger>
          <TabsTrigger value="inventory">Inventory</TabsTrigger>
          <TabsTrigger value="customers">Customers</TabsTrigger>
          <TabsTrigger value="expenses">Expenses</TabsTrigger>
        </TabsList>
        
        <TabsContent value="sales" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Revenue Trends Chart */}
            <Card className="card-hover">
              <CardHeader>
                <CardTitle>Revenue Trends</CardTitle>
                <CardDescription>Monthly revenue analysis</CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={salesData} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
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
                    <Line 
                      type="monotone" 
                      dataKey="revenue" 
                      stroke="#4f46e5" 
                      strokeWidth={2} 
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Top Products Chart */}
            <Card className="card-hover">
              <CardHeader>
                <CardTitle>Top Products</CardTitle>
                <CardDescription>Best selling items</CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={topProducts} layout="vertical" margin={{ top: 10, right: 10, left: 40, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                    <XAxis type="number" tick={{ fontSize: 12 }} />
                    <YAxis 
                      type="category" 
                      dataKey="name" 
                      tick={{ fontSize: 12 }} 
                    />
                    <Tooltip />
                    <Bar dataKey="value" fill="#4f46e5" radius={[0, 4, 4, 0]}>
                      {topProducts.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Sales Comparison */}
            <Card className="lg:col-span-2 card-hover">
              <CardHeader>
                <CardTitle>Sales Comparison</CardTitle>
                <CardDescription>This period vs. previous period</CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={salesData} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
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
                    <Bar dataKey="sales" name="Sales" fill="#4f46e5" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="expenses" name="Expenses" fill="#ef4444" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Customer Distribution */}
            <Card className="card-hover">
              <CardHeader>
                <CardTitle>Customer Distribution</CardTitle>
                <CardDescription>New vs. returning customers</CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={customerData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      innerRadius={40}
                      fill="#8b5cf6"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      labelLine={false}
                    >
                      {customerData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={CUSTOMER_COLORS[index % CUSTOMER_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value) => [`${value}%`, '']} 
                      labelStyle={{ fontWeight: 'bold' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="inventory">
          <div className="grid grid-cols-1 gap-6">
            <Card className="h-96 flex items-center justify-center">
              <p className="text-muted-foreground">Inventory analytics content will go here</p>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="customers">
          <div className="grid grid-cols-1 gap-6">
            <Card className="h-96 flex items-center justify-center">
              <p className="text-muted-foreground">Customer analytics content will go here</p>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="expenses">
          <div className="grid grid-cols-1 gap-6">
            <Card className="h-96 flex items-center justify-center">
              <p className="text-muted-foreground">Expense analytics content will go here</p>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Analytics;
