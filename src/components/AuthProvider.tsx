
import { useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { AuthContext } from '@/lib/auth';
import { useToast } from '@/hooks/use-toast';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          // Need to defer this call to avoid potential deadlocks
          setTimeout(async () => {
            try {
              const { data, error } = await supabase
                .rpc('is_admin', { _user_id: session.user.id });
              
              if (!error) {
                setIsAdmin(!!data);
              }
            } catch (err) {
              console.error('Error checking admin status:', err);
            }
          }, 0);
        } else {
          setIsAdmin(false);
        }
        
        setIsLoading(false);
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        supabase.rpc('is_admin', { _user_id: session.user.id })
          .then(({ data, error }) => {
            if (!error) {
              setIsAdmin(!!data);
            }
          });
      }
      
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAdmin, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}
