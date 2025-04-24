
import React from 'react';
import { Button } from '@/components/ui/button';
import { Calendar, FileText, Plus, User } from 'lucide-react';
import DashboardMetrics from '@/components/DashboardMetrics';
import SalesChart from '@/components/charts/SalesChart';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Dashboard: React.FC = () => {
  const recentActivities = [
    { id: 1, action: 'New customer registered', time: '2 minutes ago', icon: <User className="h-4 w-4" /> },
    { id: 2, action: 'New order #1234 received', time: '1 hour ago', icon: <FileText className="h-4 w-4" /> },
    { id: 3, action: 'Inventory update: 5 items low in stock', time: '3 hours ago', icon: <FileText className="h-4 w-4" /> },
    { id: 4, action: 'Invoice #5678 paid', time: 'Yesterday', icon: <FileText className="h-4 w-4" /> },
  ];

  const upcomingEvents = [
    { id: 1, title: 'Inventory Audit', date: 'April 25, 2025', icon: <Calendar className="h-4 w-4" /> },
    { id: 2, title: 'Quarterly Review', date: 'April 30, 2025', icon: <Calendar className="h-4 w-4" /> },
    { id: 3, title: 'Supplier Meeting', date: 'May 2, 2025', icon: <Calendar className="h-4 w-4" /> },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Overview of your business performance
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> New Order
        </Button>
      </div>

      <DashboardMetrics />

      <SalesChart />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <Card className="card-hover">
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
            <CardDescription>Latest events and updates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-center gap-4 border-b pb-4 last:border-0 last:pb-0">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                    {activity.icon}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{activity.action}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Events */}
        <Card className="card-hover">
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
            <CardDescription>Scheduled tasks and events</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="flex items-center gap-4 border-b pb-4 last:border-0 last:pb-0">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                    {event.icon}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{event.title}</p>
                    <p className="text-xs text-muted-foreground">{event.date}</p>
                  </div>
                  <Button variant="outline" size="sm">View</Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
