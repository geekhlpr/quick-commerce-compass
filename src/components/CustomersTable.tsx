
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
import { MoreHorizontal, Search, Filter, Plus } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  totalSpent: number;
  status: 'Active' | 'Inactive';
  lastOrder: string;
}

const getInitials = (name: string) => {
  return name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase();
};

const customersData: Customer[] = Array.from({ length: 8 }).map((_, i) => ({
  id: `CUST-${10000 + i}`,
  name: ['John Doe', 'Jane Smith', 'Robert Johnson', 'Emily Davis', 'Michael Wilson', 'Sarah Brown', 'David Taylor', 'Lisa Thomas'][i],
  email: `customer${i + 1}@example.com`,
  phone: `+1-555-${1000 + i}`,
  location: ['New York, NY', 'Los Angeles, CA', 'Chicago, IL', 'Houston, TX', 'Miami, FL', 'Seattle, WA', 'Boston, MA', 'Denver, CO'][i],
  totalSpent: Math.floor(Math.random() * 5000) + 500,
  status: Math.random() > 0.2 ? 'Active' : 'Inactive',
  lastOrder: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toLocaleDateString()
}));

const CustomersTable: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [customers, setCustomers] = useState<Customer[]>(customersData);

  const filteredCustomers = customers.filter(customer => 
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'Active': return 'status-badge status-badge-success';
      case 'Inactive': return 'status-badge status-badge-warning';
      default: return 'status-badge';
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between flex-wrap gap-4">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search customers..." 
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Customer
          </Button>
        </div>
      </div>

      <div className="rounded-md border overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Customer</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Last Order</TableHead>
              <TableHead className="text-right">Total Spent</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCustomers.length > 0 ? (
              filteredCustomers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-primary text-primary-foreground">
                          {getInitials(customer.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{customer.name}</p>
                        <p className="text-xs text-muted-foreground">{customer.phone}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{customer.email}</TableCell>
                  <TableCell>{customer.location}</TableCell>
                  <TableCell>{customer.lastOrder}</TableCell>
                  <TableCell className="text-right">${customer.totalSpent.toLocaleString()}</TableCell>
                  <TableCell>
                    <span className={getStatusBadgeClass(customer.status)}>
                      {customer.status}
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
                        <DropdownMenuItem>View Profile</DropdownMenuItem>
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem>Order History</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-4 text-muted-foreground">
                  No customers found. Try a different search term.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default CustomersTable;
