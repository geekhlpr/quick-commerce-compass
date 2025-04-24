
import React, { useState } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MoreHorizontal, Search, Filter, Plus, ArrowDownToLine } from 'lucide-react';

interface Sale {
  id: string;
  customer: string;
  date: string;
  amount: number;
  items: number;
  status: 'Paid' | 'Pending' | 'Failed';
  paymentMethod: string;
}

const salesData: Sale[] = Array.from({ length: 8 }).map((_, i) => ({
  id: `INV-${2000 + i}`,
  customer: ['John Doe', 'Jane Smith', 'Robert Johnson', 'Emily Davis', 'Michael Wilson', 'Sarah Brown', 'David Taylor', 'Lisa Thomas'][i],
  date: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toLocaleDateString(),
  amount: parseFloat((100 + Math.random() * 500).toFixed(2)),
  items: Math.floor(Math.random() * 5) + 1,
  status: ['Paid', 'Pending', 'Failed'][Math.floor(Math.random() * 3)] as any,
  paymentMethod: ['Credit Card', 'PayPal', 'Bank Transfer'][Math.floor(Math.random() * 3)]
}));

const SalesTable: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sales, setSales] = useState<Sale[]>(salesData);

  const filteredSales = sales.filter(sale => 
    sale.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
    sale.customer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'Paid': return 'status-badge status-badge-success';
      case 'Pending': return 'status-badge status-badge-warning';
      case 'Failed': return 'status-badge status-badge-danger';
      default: return 'status-badge';
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between flex-wrap gap-4">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search sales..." 
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <ArrowDownToLine className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            New Sale
          </Button>
        </div>
      </div>

      <div className="rounded-md border overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Invoice</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Items</TableHead>
              <TableHead>Payment</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredSales.length > 0 ? (
              filteredSales.map((sale) => (
                <TableRow key={sale.id}>
                  <TableCell className="font-medium">{sale.id}</TableCell>
                  <TableCell>{sale.customer}</TableCell>
                  <TableCell>{sale.date}</TableCell>
                  <TableCell>{sale.items}</TableCell>
                  <TableCell>{sale.paymentMethod}</TableCell>
                  <TableCell className="text-right">${sale.amount.toFixed(2)}</TableCell>
                  <TableCell>
                    <span className={getStatusBadgeClass(sale.status)}>
                      {sale.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Print Invoice</DropdownMenuItem>
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">Void Sale</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-4 text-muted-foreground">
                  No sales found. Try a different search term.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default SalesTable;
