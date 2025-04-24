
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import CustomersTable from '@/components/CustomersTable';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Customers: React.FC = () => {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Customers</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage your customer relationships
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Add Customer
        </Button>
      </div>

      <Tabs defaultValue="all" className="mb-6">
        <TabsList>
          <TabsTrigger value="all">All Customers</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="inactive">Inactive</TabsTrigger>
          <TabsTrigger value="new">New</TabsTrigger>
        </TabsList>
      </Tabs>
      
      <CustomersTable />
    </div>
  );
};

export default Customers;
