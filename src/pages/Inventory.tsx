
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import InventoryTable from '@/components/InventoryTable';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Inventory: React.FC = () => {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Inventory</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage your products and stock levels
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Add Product
        </Button>
      </div>

      <Tabs defaultValue="all" className="mb-6">
        <TabsList>
          <TabsTrigger value="all">All Products</TabsTrigger>
          <TabsTrigger value="in-stock">In Stock</TabsTrigger>
          <TabsTrigger value="low-stock">Low Stock</TabsTrigger>
          <TabsTrigger value="out-of-stock">Out of Stock</TabsTrigger>
        </TabsList>
      </Tabs>
      
      <InventoryTable />
    </div>
  );
};

export default Inventory;
