'use client';

import { useState, useEffect } from 'react';
import { 
  Package, Search, ShieldAlert, CheckCircle, RefreshCw, Trash2, 
  Mail, Settings, DollarSign, Filter, ChevronDown, Check, X, AlertTriangle, Info 
} from 'lucide-react';

interface Customer {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  province: string;
  postal_code: string;
  country: string;
}

interface OrderItem {
  id: string;
  product_name: string;
  quantity: number;
  price: number;
}

interface StatusHistory {
  id: string;
  status: string;
  created_at: string;
}

interface Order {
  id: string;
  order_number: string;
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
  payment_method: string;
  status: string;
  created_at: string;
  customer: Customer;
  items: OrderItem[];
  history: StatusHistory[];
  email_logs: any[];
}

interface PaymentMethod {
  id: string;
  name: string;
  enabled: number;
  instructions: string;
}

export default function AdminDashboardPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  
  // Payment methods edit panel
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [loadingMethods, setLoadingMethods] = useState(true);
  const [editingMethodId, setEditingMethodId] = useState<string | null>(null);
  const [editingInstructions, setEditingInstructions] = useState('');

  // Floating notifications
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // Reload trigger
  const [refreshCount, setRefreshCount] = useState(0);

  // Load orders and payment methods
  useEffect(() => {
    async function fetchAdminData() {
      setLoading(true);
      try {
        const queryParams = new URLSearchParams();
        if (searchQuery) queryParams.set('search', searchQuery);
        if (statusFilter && statusFilter !== 'all') queryParams.set('status', statusFilter);

        const [oRes, pRes] = await Promise.all([
          fetch(`/api/admin/orders?${queryParams.toString()}`),
          fetch('/api/payment-methods')
        ]);

        if (oRes.ok) {
          const oData = await oRes.json();
          setOrders(oData);
        }
        if (pRes.ok) {
          const pData = await pRes.json();
          setPaymentMethods(pData);
        }
      } catch (err) {
        console.error('Failed to query admin datasets:', err);
        setErrorMsg('Database query error. Connection dropped.');
      } finally {
        setLoading(false);
        setLoadingMethods(false);
      }
    }
    fetchAdminData();
  }, [searchQuery, statusFilter, refreshCount]);

  const triggerNotify = (text: string, isError = false) => {
    if (isError) {
      setErrorMsg(text);
      setTimeout(() => setErrorMsg(''), 5000);
    } else {
      setSuccessMsg(text);
      setTimeout(() => setSuccessMsg(''), 5000);
    }
  };

  // 1. Action: update order status
  const handleStatusChange = async (orderId: string, newStatus: string) => {
    try {
      const res = await fetch('/api/admin/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'update_status',
          orderId,
          status: newStatus
        })
      });

      if (res.ok) {
        const responseData = await res.json();
        triggerNotify(responseData.message || `Order status updated to ${newStatus}`);
        setRefreshCount(prev => prev + 1);
      } else {
        triggerNotify('Failed to update order status', true);
      }
    } catch (err) {
      console.error(err);
      triggerNotify('Network error updated billing status', true);
    }
  };

  // 2. Action: resend customer confirmation email
  const handleResendEmail = async (orderId: string) => {
    try {
      const res = await fetch('/api/admin/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'resend_email',
          orderId
        })
      });

      if (res.ok) {
        const responseData = await res.json();
        triggerNotify(responseData.message || 'Email successfully queued is dispatching.');
        setRefreshCount(prev => prev + 1);
      } else {
        triggerNotify('Resend email failed.', true);
      }
    } catch (err) {
      console.error(err);
      triggerNotify('Network error re-sending dispatch email', true);
    }
  };

  // 3. Action: Delete and purge order records
  const handleDeleteOrder = async (orderId: string, orderNumber: string) => {
    if (!window.confirm(`⚠️ ARE YOU ABSOLUTELY SURE you want to delete order ${orderNumber}?\nThis action is irreversible and purges all items records and history logs from D1 database.`)) {
      return;
    }

    try {
      const res = await fetch('/api/admin/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'delete_order',
          orderId
        })
      });

      if (res.ok) {
        triggerNotify(`Order ${orderNumber} purged successfully.`);
        setRefreshCount(prev => prev + 1);
      } else {
        triggerNotify('Critical deletion error.', true);
      }
    } catch (err) {
      console.error(err);
      triggerNotify('Network error deleting order records', true);
    }
  };

  // 4. Action: Toggle payment method active/inactive
  const handleTogglePaymentMethod = async (method: PaymentMethod) => {
    try {
      const res = await fetch('/api/payment-methods', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: method.id,
          enabled: method.enabled === 1 ? 0 : 1,
          instructions: method.instructions
        })
      });

      if (res.ok) {
        triggerNotify(`Toggled payment method ${method.name}`);
        setRefreshCount(prev => prev + 1);
      } else {
        triggerNotify('Failed to toggle active payments', true);
      }
    } catch (err) {
      console.error(err);
      triggerNotify('Network error toggling payments', true);
    }
  };

  // 5. Action: Update payment instructions text
  const handleEditInstructionsSubmit = async (methodId: string) => {
    try {
      const res = await fetch('/api/payment-methods', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: methodId,
          enabled: 1, // Auto-enable if admin modifies instructions
          instructions: editingInstructions
        })
      });

      if (res.ok) {
        triggerNotify(`Instructions updated successfully.`);
        setEditingMethodId(null);
        setRefreshCount(prev => prev + 1);
      } else {
        triggerNotify('Failed to save configuration details.', true);
      }
    } catch (err) {
      console.error(err);
      triggerNotify('Network error saving configurations.', true);
    }
  };

  // Statistics calculation
  const totalRevenue = orders.reduce((sum, o) => o.status !== 'Cancelled' ? sum + o.total : sum, 0);
  const activeEnquiries = orders.filter(o => o.status === 'Pending').length;
  const dispatchCompleted = orders.filter(o => o.status === 'Completed').length;
  const avgOrderValue = orders.length > 0 ? totalRevenue / orders.filter(o => o.status !== 'Cancelled').length : 0;

  return (
    <div className="bg-[#070708] min-h-screen text-white py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Alerts panel */}
        {successMsg && (
          <div className="fixed bottom-6 left-6 z-50 bg-emerald-950 border border-emerald-500/40 text-emerald-200 px-5 py-3 rounded-xl flex items-center gap-3 shadow-2xl animate-bounce">
            <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
            <span className="text-xs font-mono font-semibold uppercase">{successMsg}</span>
          </div>
        )}

        {errorMsg && (
          <div className="fixed bottom-6 left-6 z-50 bg-red-955 border border-red-500/40 text-red-100 px-5 py-3 rounded-xl flex items-center gap-3 shadow-2xl">
            <AlertTriangle className="w-5 h-5 text-red-400 shrink-0" />
            <span className="text-xs font-mono font-semibold uppercase text-red-300">{errorMsg}</span>
          </div>
        )}

        {/* Console Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-white/5 pb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-500/10 border border-red-500/20 text-red-500 text-[10px] font-mono font-bold tracking-wider rounded-full mb-3 uppercase">
              🛡️ Admin Security Access Active
            </div>
            <h1 className="text-4xl font-light text-white uppercase tracking-tight">Locker Dispatch Administration</h1>
            <p className="text-sm text-gray-400 font-light mt-1">Real-time orders processing database built on Cloudflare D1 tables ledger.</p>
          </div>
          <button 
            onClick={() => setRefreshCount(prev => prev + 1)}
            className="flex items-center gap-2 text-xs uppercase tracking-widest text-gray-400 hover:text-white bg-white/5 border border-white/10 px-4 py-2.5 rounded hover:bg-white/10 transition-colors font-semibold"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-primary ${loading ? 'animate-spin' : ''}`} /> Force Refresh
          </button>
        </div>

        {/* METRICS DASHBOARD PANELS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white/5 border border-white/10 p-5 rounded-xl space-y-2 relative overflow-hidden">
            <div className="absolute top-2 right-2 p-1.5 bg-primary/10 rounded-lg text-primary">
              <DollarSign className="w-4 h-4" />
            </div>
            <span className="text-[10px] text-gray-500 uppercase tracking-widest block font-bold">Total Sales (Excl. Cancelled)</span>
            <p className="text-3xl font-mono font-bold text-emerald-400">${totalRevenue.toFixed(2)}</p>
            <span className="text-[9px] text-gray-500 block">CAD Currency Valuation</span>
          </div>

          <div className="bg-white/5 border border-white/10 p-5 rounded-xl space-y-2 relative overflow-hidden">
            <div className="absolute top-2 right-2 p-1.5 bg-amber-400/10 rounded-lg text-amber-500">
              <Package className="w-4 h-4" />
            </div>
            <span className="text-[10px] text-gray-500 uppercase tracking-widest block font-bold">Active Enquiries Queue</span>
            <p className="text-3xl font-mono font-bold text-amber-400">{activeEnquiries}</p>
            <span className="text-[9px] text-gray-500 block">Requires Payment Check</span>
          </div>

          <div className="bg-white/5 border border-white/10 p-5 rounded-xl space-y-2 relative overflow-hidden">
            <div className="absolute top-2 right-2 p-1.5 bg-green-500/10 rounded-lg text-green-500">
              <CheckCircle className="w-4 h-4" />
            </div>
            <span className="text-[10px] text-gray-500 uppercase tracking-widest block font-bold">Dispatched Batches</span>
            <p className="text-3xl font-mono font-bold text-green-400">{dispatchCompleted}</p>
            <span className="text-[9px] text-gray-500 block">Courier handoff completed</span>
          </div>

          <div className="bg-white/5 border border-white/10 p-5 rounded-xl space-y-2 relative overflow-hidden">
            <div className="absolute top-2 right-2 p-1.5 bg-blue-500/10 rounded-lg text-blue-400">
              <Info className="w-4 h-4" />
            </div>
            <span className="text-[10px] text-gray-500 uppercase tracking-widest block font-bold">Average Transaction Size</span>
            <p className="text-3xl font-mono font-bold text-blue-400">${avgOrderValue.toFixed(2)}</p>
            <span className="text-[9px] text-gray-500 block">Valuation per active customer</span>
          </div>
        </div>

        {/* PAYMENT METHODS MANAGER PANEL */}
        <div className="bg-white/5 border border-white/10 p-6 sm:p-8 rounded-xl space-y-6 shadow-xl">
          <div className="flex items-center gap-2 border-b border-white/10 pb-4">
            <Settings className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-light uppercase tracking-tight text-white mb-0.5">Toggle Payment Methods &amp; Instructions</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {paymentMethods.map((method) => (
              <div key={method.id} className="bg-black/40 border border-white/5 p-5 rounded-lg space-y-4">
                <div className="flex justify-between items-center">
                  <div className="space-y-0.5">
                    <span className="block text-sm font-bold uppercase tracking-wider text-white">{method.name}</span>
                    <span className="text-[9px] text-gray-400 font-mono">Reference key: {method.id}</span>
                  </div>
                  
                  {/* Toggle button */}
                  <button
                    onClick={() => handleTogglePaymentMethod(method)}
                    className={`px-3 py-1 rounded text-[10px] font-bold uppercase tracking-wider transition ${
                      method.enabled === 1 
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' 
                        : 'bg-red-500/10 text-red-400 border border-red-500/20'
                    }`}
                  >
                    {method.enabled === 1 ? 'Enabled' : 'Disabled'}
                  </button>
                </div>

                {/* Instructions Box */}
                {editingMethodId === method.id ? (
                  <div className="space-y-3 font-mono">
                    <textarea 
                      value={editingInstructions}
                      onChange={(e) => setEditingInstructions(e.target.value)}
                      className="w-full bg-black text-xs p-3 border border-primary text-white rounded font-mono focus:outline-none"
                      rows={3}
                    />
                    <div className="flex justify-end gap-2 text-[10px]">
                      <button 
                        onClick={() => setEditingMethodId(null)}
                        className="py-1 px-3 bg-transparent hover:bg-white/5 border border-white/15 uppercase tracking-wider rounded"
                      >
                        Cancel
                      </button>
                      <button 
                        onClick={() => handleEditInstructionsSubmit(method.id)}
                        className="py-1 px-3 bg-white text-black font-bold uppercase tracking-wider rounded"
                      >
                        Save Details
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="font-mono text-xs text-gray-400 bg-black/50 p-3 rounded border border-white/5 space-y-2">
                    <p className="leading-relaxed whitespace-pre-wrap">{method.instructions}</p>
                    <button 
                      onClick={() => {
                        setEditingMethodId(method.id);
                        setEditingInstructions(method.instructions);
                      }}
                      className="text-primary text-[10px] uppercase font-bold hover:underline block"
                    >
                      🖋️ Modify Instructions
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* SEARCH, FILTERS & MAIN LISTING */}
        <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden shadow-xl space-y-6 p-6 sm:p-8">
          <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4">
            
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search orders, clients, emails, phone..."
                className="w-full bg-black border border-white/10 rounded-lg pl-10 pr-4 py-2.5 text-xs focus:outline-none focus:border-primary text-white"
              />
            </div>

            {/* Filter Status */}
            <div className="flex items-center gap-3">
              <Filter className="w-4 h-4 text-gray-500 shrink-0" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-black text-xs text-white border border-white/10 rounded-lg px-4 py-2.5 focus:outline-none focus:border-primary uppercase font-bold"
              >
                <option value="all">All Statuses</option>
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="shipped">Shipped</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>

          {/* Orders Main Grid/Table */}
          {loading ? (
            <div className="text-center py-20 text-gray-400 flex flex-col items-center gap-3">
              <RefreshCw className="w-8 h-8 animate-spin text-primary" />
              <span className="font-mono text-xs uppercase tracking-widest">Running database queries...</span>
            </div>
          ) : orders.length === 0 ? (
            <div className="text-center py-20 bg-black/20 rounded-lg border border-white/5 border-dashed">
              <ShieldAlert className="w-12 h-12 text-gray-600 mx-auto mb-3" />
              <p className="text-gray-400 font-light">No records matched active search identifiers or filters.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {orders.map((order) => (
                <div 
                  key={order.id} 
                  className={`border rounded-xl bg-black/40 p-5 sm:p-6 space-y-4 hover:border-white/15 transition-all ${
                    order.status === 'Cancelled' ? 'border-red-500/10 opacity-60' : 'border-white/5'
                  }`}
                >
                  
                  {/* Top line detail */}
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-white/5 pb-4 gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2.5 flex-wrap">
                        <span className="text-sm font-mono font-bold text-white uppercase">{order.order_number}</span>
                        <span className="text-xs text-gray-500">placed on {new Date(order.created_at).toLocaleString()}</span>
                      </div>
                      
                      {/* Customer info */}
                      {order.customer && (
                        <p className="text-xs text-gray-400">
                          Client: <strong className="text-white">{order.customer.first_name} {order.customer.last_name}</strong> &bull; {order.customer.email} &bull; {order.customer.phone}
                        </p>
                      )}
                    </div>

                    {/* Interactive Status Changer */}
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] text-gray-500 uppercase block font-bold">Status:</span>
                      <select
                        value={order.status}
                        onChange={(e) => handleStatusChange(order.id, e.target.value)}
                        className={`text-xs font-bold uppercase rounded px-3 py-1.5 focus:outline-none transition ${
                          order.status === 'Pending' ? 'bg-amber-400/10 text-amber-500 border border-amber-400/20' :
                          order.status === 'Processing' ? 'bg-blue-400/10 text-blue-500 border border-blue-400/20' :
                          order.status === 'Shipped' ? 'bg-orange-400/10 text-orange-500 border border-orange-400/20' :
                          order.status === 'Completed' ? 'bg-green-500/10 text-green-500 border border-green-500/20' :
                          'bg-red-500/10 text-red-500 border border-red-500/20'
                        }`}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Processing">Processing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Completed">Completed</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </div>
                  </div>

                  {/* Middle section: items list, financials & shipping detail */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 text-xs text-gray-300">
                    
                    {/* Item list */}
                    <div className="md:col-span-6 space-y-2">
                      <span className="block text-[9px] uppercase font-bold text-gray-500">Products Specs:</span>
                      <ul className="divide-y divide-white/5 font-mono">
                        {order.items?.map((it, idx) => (
                          <li key={idx} className="py-2 flex justify-between items-center bg-black/25 px-2 rounded mt-1">
                            <span>{it.product_name} <span className="text-gray-500">x{it.quantity}</span></span>
                            <span className="text-emerald-400 font-bold">${(it.price * it.quantity).toFixed(2)}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Shipping location */}
                    <div className="md:col-span-3 space-y-1">
                      <span className="block text-[9px] uppercase font-bold text-gray-500">Delivery Address:</span>
                      {order.customer ? (
                        <div className="text-xs text-gray-400 space-y-0.5">
                          <p className="text-white font-medium">{order.customer.address}</p>
                          <p>{order.customer.city}, {order.customer.province}</p>
                          <p className="font-mono text-[10px] text-gray-500">{order.customer.postal_code}, {order.customer.country}</p>
                        </div>
                      ) : (
                        <p className="text-xs text-red-400">Profile missing</p>
                      )}
                    </div>

                    {/* Financial details summary */}
                    <div className="md:col-span-3 space-y-1 font-mono text-left sm:text-right">
                      <span className="block text-[9px] uppercase font-bold text-gray-500 text-left sm:text-right">Financial Ledger:</span>
                      <p className="text-gray-500">Subtotal: ${order.subtotal?.toFixed(2)}</p>
                      <p className="text-gray-500">Shipping: ${order.shipping?.toFixed(2)}</p>
                      <p className="text-emerald-400 text-sm font-bold pt-1 border-t border-white/5 mt-1">Total: ${order.total?.toFixed(2)} CAD</p>
                      <p className="text-[10px] text-gray-400 uppercase tracking-wider pt-0.5">Pay: <span className="text-white font-bold">{order.payment_method}</span></p>
                    </div>

                  </div>

                  {/* Actions buttons and timeline summary */}
                  <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 pt-4 border-t border-white/5">
                    
                    {/* Resend status & Email status logs */}
                    <div className="text-[10px] text-gray-400 font-mono flex items-center gap-2">
                      <span className="text-gray-500 text-[9px] uppercase font-bold">Email Logs:</span>
                      {order.email_logs && order.email_logs.length > 0 ? (
                        <div className="flex gap-2.5 flex-wrap">
                          {order.email_logs.map((log: any, lIdx: number) => (
                            <span 
                              key={lIdx} 
                              className={`px-1.5 py-0.5 rounded text-[9px] ${
                                log.status === 'delivered' ? 'bg-green-500/10 text-green-400' : 'bg-gray-800 text-gray-400'
                              }`}
                              title={`Sent to: ${log.recipient}`}
                            >
                              {log.email_type.replace('_', ' ')}: {log.status}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <span className="text-gray-600">None logged</span>
                      )}
                    </div>

                    {/* Dynamic Action Buttons */}
                    <div className="flex items-center gap-2.5 justify-end">
                      <button 
                        onClick={() => handleResendEmail(order.id)}
                        className="py-1.5 px-3 bg-white/5 hover:bg-white/10 border border-white/10 text-[10px] font-bold uppercase tracking-wider rounded text-gray-300 hover:text-white flex items-center gap-1.5 transition"
                        title="Resend confirmation invoice email"
                      >
                        <Mail className="w-3.5 h-3.5" /> Re-trigger Email
                      </button>
                      <button 
                        onClick={() => handleDeleteOrder(order.id, order.order_number)}
                        className="py-1.5 px-3 bg-red-950/20 hover:bg-red-950/40 border border-red-500/10 text-[10px] font-bold uppercase tracking-wider rounded text-red-400 hover:text-red-300 flex items-center gap-1.5 transition"
                        title="Permanently remove order records"
                      >
                        <Trash2 className="w-3.5 h-3.5" /> Purge Order
                      </button>
                    </div>

                  </div>

                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
