// Database manager for Cloudflare D1
// Uses Cloudflare D1 Database binding 'env.DB' (or process.env.DB) when deployed,
// and falls back to a clean, fully typed in-memory simulation for local preview testing.

export interface Customer {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  country: string;
  province: string;
  city: string;
  address: string;
  postal_code: string;
  created_at: string;
}

export interface Order {
  id: string;
  order_number: string;
  customer_id: string;
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
  payment_method: string;
  status: string;
  created_at: string;
  payment_instructions?: string | null;
  email_history?: string | null;
  email_sent_at?: string | null;
  last_email_subject?: string | null;
  payment_deadline?: string | null;
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  product_name: string;
  quantity: number;
  price: number;
}

export interface OrderStatusHistory {
  id: string;
  order_id: string;
  status: string;
  created_at: string;
}

export interface EmailLog {
  id: string;
  order_id: string;
  email_type: string;
  recipient: string;
  status: string;
  created_at: string;
}

export interface D1Result<T = any> {
  results: T[];
  success: boolean;
  meta: {
    duration: number;
    changes: number;
    last_row_id: number | null;
  };
}

export interface D1PreparedStatement {
  bind(...values: any[]): D1PreparedStatement;
  first<T = any>(colName?: string): Promise<T | null>;
  run<T = any>(): Promise<D1Result<T>>;
  all<T = any>(): Promise<D1Result<T>>;
  raw<T = any>(): Promise<T[]>;
}

export interface D1Database {
  prepare(sql: string): D1PreparedStatement;
  batch(statements: D1PreparedStatement[]): Promise<any[]>;
  exec(sql: string): Promise<any>;
}

// In-memory Database Store for local/development runtimes where D1 is not bound
class InMemoryD1Database implements D1Database {
  private getStore() {
    const globalAny = globalThis as any;
    if (!globalAny.__mockD1Store) {
      globalAny.__mockD1Store = {
        customers: [] as Customer[],
        orders: [] as Order[],
        order_items: [] as OrderItem[],
        order_status_history: [] as OrderStatusHistory[],
        email_logs: [] as EmailLog[],
        payment_methods: [
          { id: "bank_transfer", name: "Bank Transfer", enabled: 1, instructions: "Transfer the amount to Hollywood North Group: Transit: 09210, Institution: 004, Account: 1092-882-9." },
          { id: "bitcoin", name: "Bitcoin", enabled: 1, instructions: "BTC Deposit Address: bc1qprop99bills763060089957dfwe45a" },
          { id: "usdt", name: "USDT", enabled: 1, instructions: "USDT Address (TRC-20 Network): TXprop550dollars763060089c9210a" },
          { id: "litecoin", name: "Litecoin", enabled: 1, instructions: "LTC Address: Lprop200stack76306e9210ac04dfa" }
        ] as any[]
      };

      // Seed initial dummy data so the admin visualizes some order history right away
      // REMOVED seed data to prevent fallback mock customer data loading
    }
    return globalAny.__mockD1Store;
  }

  prepare(sql: string): D1PreparedStatement {
    const store = this.getStore();
    return new InMemoryPreparedStatement(sql, store);
  }

  async batch(statements: D1PreparedStatement[]): Promise<any[]> {
    const results = [];
    for (const statement of statements) {
      results.push(await statement.all());
    }
    return results;
  }

  async exec(sql: string): Promise<any> {
    // Basic multi-query execute (no-op or simple logging)
    return { success: true };
  }
}

class InMemoryPreparedStatement implements D1PreparedStatement {
  private sql: string;
  private params: any[] = [];
  private store: any;

  constructor(sql: string, store: any) {
    this.sql = sql.trim();
    this.store = store;
  }

  bind(...values: any[]): D1PreparedStatement {
    this.params = values;
    return this;
  }

  async first<T = any>(colName?: string): Promise<T | null> {
    const result = await this.all<T>();
    if (result.results.length === 0) return null;
    const row = result.results[0];
    if (colName) return (row as any)[colName] ?? null;
    return row;
  }

  async run<T = any>(): Promise<D1Result<T>> {
    return this.all<T>();
  }

  async raw<T = any>(): Promise<T[]> {
    const result = await this.all<T>();
    return result.results.map(row => Object.values(row as any)) as unknown as T[];
  }

  async all<T = any>(): Promise<D1Result<T>> {
    const normalized = this.sql.replace(/\s+/g, " ");
    let results: T[] = [];
    let changes = 0;

    try {
      // 1. INSERTS
      if (/^insert into/i.test(normalized)) {
        if (/insert into customers/i.test(normalized)) {
          const cust: Customer = {
            id: this.params[0],
            first_name: this.params[1],
            last_name: this.params[2],
            email: this.params[3],
            phone: this.params[4],
            country: this.params[5],
            province: this.params[6],
            city: this.params[7],
            address: this.params[8],
            postal_code: this.params[9],
            created_at: this.params[10]
          };
          this.store.customers.push(cust);
          changes = 1;
        } else if (/insert into orders/i.test(normalized)) {
          const ord: Order = {
            id: this.params[0],
            order_number: this.params[1],
            customer_id: this.params[2],
            subtotal: Number(this.params[3]),
            shipping: Number(this.params[4]),
            discount: Number(this.params[5]),
            total: Number(this.params[6]),
            payment_method: this.params[7],
            status: this.params[8],
            created_at: this.params[9],
            payment_instructions: this.params[10] || null,
            email_history: this.params[11] || null,
            email_sent_at: this.params[12] || null,
            last_email_subject: this.params[13] || null,
            payment_deadline: this.params[14] || null
          };
          this.store.orders.push(ord);
          changes = 1;
        } else if (/insert into order_items/i.test(normalized)) {
          const item: OrderItem = {
            id: this.params[0],
            order_id: this.params[1],
            product_id: this.params[2],
            product_name: this.params[3],
            quantity: Number(this.params[4]),
            price: Number(this.params[5])
          };
          this.store.order_items.push(item);
          changes = 1;
        } else if (/insert into order_status_history/i.test(normalized)) {
          const hist: OrderStatusHistory = {
            id: this.params[0],
            order_id: this.params[1],
            status: this.params[2],
            created_at: this.params[3]
          };
          this.store.order_status_history.push(hist);
          changes = 1;
        } else if (/insert into email_logs/i.test(normalized)) {
          const log: EmailLog = {
            id: this.params[0],
            order_id: this.params[1],
            email_type: this.params[2],
            recipient: this.params[3],
            status: this.params[4],
            created_at: this.params[5]
          };
          this.store.email_logs.push(log);
          changes = 1;
        }
      }

      // 2. UPDATES
      else if (/^update payment_methods/i.test(normalized)) {
        // e.g. "UPDATE payment_methods SET enabled = ?, instructions = ? WHERE id = ?"
        const enabled = Number(this.params[0]);
        const instructions = this.params[1];
        const id = this.params[2];
        this.store.payment_methods = this.store.payment_methods.map((pm: any) => {
          if (pm.id === id) {
            changes++;
            return { ...pm, enabled, instructions };
          }
          return pm;
        });
      }
      else if (/^update orders/i.test(normalized)) {
        // We parse set columns dynamically
        const setPart = normalized.substring(
          normalized.toLowerCase().indexOf("set") + 3,
          normalized.toLowerCase().indexOf("where")
        ).trim();
        
        const cols = setPart.split(',').map(c => {
          const eqIdx = c.indexOf('=');
          const colNameRaw = eqIdx !== -1 ? c.substring(0, eqIdx) : c;
          return colNameRaw.trim().toLowerCase().replace(/^o\./, '');
        });
        
        const idVal = this.params[this.params.length - 1]; // standard pattern where the last parameter is binded inside WHERE clause
        
        this.store.orders = this.store.orders.map((ord: any) => {
          if (ord.id === idVal || ord.order_number === idVal) {
            changes++;
            const updatedOrd = { ...ord };
            cols.forEach((col, idx) => {
              updatedOrd[col] = this.params[idx];
            });
            return updatedOrd;
          }
          return ord;
        });
      }

      // 3. DELETES
      else if (/^delete from order_items/i.test(normalized)) {
        const orderId = this.params[0];
        const before = this.store.order_items.length;
        this.store.order_items = this.store.order_items.filter((item: OrderItem) => item.order_id !== orderId);
        changes = before - this.store.order_items.length;
      } 
      else if (/^delete from orders/i.test(normalized)) {
        const orderId = this.params[0];
        const before = this.store.orders.length;
        this.store.orders = this.store.orders.filter((ord: Order) => ord.id !== orderId);
        changes = before - this.store.orders.length;
      }

      // 4. SELECTS (Standard Read Queries)
      else if (/^select/i.test(normalized)) {
        if (/from customers/i.test(normalized)) {
          const bindVal = this.params[0];
          if (bindVal) {
            results = this.store.customers.filter((c: any) => 
              c.id === bindVal || c.email.toLowerCase() === String(bindVal).toLowerCase()
            ) as unknown as T[];
          } else {
            results = [...this.store.customers] as unknown as T[];
          }
        }
        else if (/from order_items/i.test(normalized)) {
          const orderId = this.params[0];
          results = (orderId ? this.store.order_items.filter((item: any) => item.order_id === orderId) : [...this.store.order_items]) as unknown as T[];
        }
        else if (/from order_status_history/i.test(normalized)) {
          const orderId = this.params[0];
          const hist = [...this.store.order_status_history];
          results = (orderId ? hist.filter((h: any) => h.order_id === orderId) : hist) as unknown as T[];
        }
        else if (/from email_logs/i.test(normalized)) {
          const orderId = this.params[0];
          results = (orderId ? this.store.email_logs.filter((log: any) => log.order_id === orderId) : [...this.store.email_logs]) as unknown as T[];
        }
        else if (/from payment_methods/i.test(normalized)) {
          results = [...this.store.payment_methods] as unknown as T[];
        }
        else if (/from orders/i.test(normalized)) {
          if (/join customers/i.test(normalized)) {
            // E.g. SELECT o.* FROM orders o JOIN customers c ON o.customer_id = c.id WHERE o.order_number = ? AND c.email = ?
            const orderNum = this.params[0];
            const custEmail = this.params[1];
            const matchingOrder = this.store.orders.find((o: any) => o.order_number.toLowerCase() === orderNum.toLowerCase());
            if (matchingOrder) {
              const customer = this.store.customers.find((c: any) => c.id === matchingOrder.customer_id && c.email.toLowerCase() === custEmail.toLowerCase());
              if (customer) {
                results = [matchingOrder] as unknown as T[];
              }
            }
          } else {
            // E.g. SELECT o.* FROM orders o WHERE o.order_number = ? or id = ?
            const bindVal = this.params[0];
            if (bindVal) {
              const valLower = String(bindVal).toLowerCase();
              results = this.store.orders.filter((o: any) => 
                o.order_number.toLowerCase() === valLower || 
                o.id.toLowerCase() === valLower
              ) as unknown as T[];
            } else {
              results = [...this.store.orders] as unknown as T[];
            }
          }
        }
        else {
          // Fallback legacy JOIN assembler
          results = this.store.orders.map((o: Order) => {
            const customer = this.store.customers.find((c: Customer) => c.id === o.customer_id) || {
              id: '', first_name: '', last_name: '', email: '', phone: '', country: '', province: '', city: '', address: '', postal_code: '', created_at: ''
            };
            const items = this.store.order_items.filter((i: OrderItem) => i.order_id === o.id);
            const history = this.store.order_status_history.filter((h: OrderStatusHistory) => h.order_id === o.id);
            
            return {
              ...o,
              first_name: customer.first_name,
              last_name: customer.last_name,
              email: customer.email,
              phone: customer.phone,
              country: customer.country,
              province: customer.province,
              city: customer.city,
              address: customer.address,
              postal_code: customer.postal_code,
              items,
              history
            };
          }).sort((a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()) as unknown as T[];
        }
      }
    } catch (err) {
      console.error("Mock D1 Statement Error:", err);
    }

    return {
      results,
      success: true,
      meta: {
        duration: 0.1,
        changes,
        last_row_id: null
      }
    };
  }
}

// Global accessor to fetch the configured Cloudflare D1 database or the fallback
export function getD1(): D1Database {
  const globalAny = globalThis as any;
  
  // 1. Check Cloudflare environment binding process.env.DB
  if (process.env.DB && (process.env.DB as any).prepare) {
    return process.env.DB as unknown as D1Database;
  }
  
  // 2. Check general platform context
  if (globalAny.env?.DB && typeof globalAny.env.DB.prepare === 'function') {
    return globalAny.env.DB as D1Database;
  }

  // 3. Fallback to local compliant in-memory D1 Engine
  if (!globalAny.__mockD1DatabaseInstance) {
    globalAny.__mockD1DatabaseInstance = new InMemoryD1Database();
  }
  return globalAny.__mockD1DatabaseInstance;
}
