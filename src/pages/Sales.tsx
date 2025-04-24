
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import SalesTable from '@/components/SalesTable';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Sales: React.FC = () => {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Sales</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage your orders and transactions
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> New Sale
        </Button>
      </div>

      <Tabs defaultValue="all" className="mb-6">
        <TabsList>
          <TabsTrigger value="all">All Sales</TabsTrigger>
          <TabsTrigger value="paid">Paid</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="failed">Failed</TabsTrigger>
        </TabsList>
      </Tabs>
      
      <SalesTable />
    </div>
  );
};

export default Sales;
