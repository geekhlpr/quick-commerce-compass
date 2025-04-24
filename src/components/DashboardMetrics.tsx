
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  TrendingUp, 
  Users, 
  ShoppingCart, 
  Package, 
  AlertCircle 
} from 'lucide-react';

const DashboardMetrics: React.FC = () => {
  const metrics = [
    {
      title: "Total Revenue",
      value: "$12,345",
      change: "+12.5%",
      positive: true,
      icon: <TrendingUp className="h-5 w-5 text-green-600" />
    },
    {
      title: "Active Customers",
      value: "534",
      change: "+3.2%",
      positive: true,
      icon: <Users className="h-5 w-5 text-blue-600" />
    },
    {
      title: "Sales Today",
      value: "48",
      change: "-2.4%",
      positive: false,
      icon: <ShoppingCart className="h-5 w-5 text-indigo-600" />
    },
    {
      title: "Low Stock Items",
      value: "12",
      change: "+4",
      positive: false,
      icon: <AlertCircle className="h-5 w-5 text-red-600" />
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {metrics.map((metric, index) => (
        <Card key={index} className="card-hover">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
            <div className="p-1 bg-muted rounded-md">
              {metric.icon}
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metric.value}</div>
            <p className={`text-xs flex items-center ${metric.positive ? "text-green-600" : "text-red-600"}`}>
              {metric.change}
              <span className="ml-1">from previous period</span>
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default DashboardMetrics;
