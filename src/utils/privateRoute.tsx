import React, { useEffect, useState } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
// Ajuste este import para onde seu cliente supabase está exportado no projeto
import { supabase } from '../supabase/supabaseClient.ts';

const PrivateRoute: React.FC = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    let mounted = true;

    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (!mounted) return;
      setAuthenticated(Boolean(data.session?.user));
      setLoading(false);
    };

    checkSession();

    const { data: listener } = supabase.auth.onAuthStateChange((_event: any, session: any) => {
      setAuthenticated(Boolean(session?.user));
      setLoading(false);
    });

    return () => {
      mounted = false;
      listener?.subscription?.unsubscribe?.();
    };
  }, []);

  if (loading) return null;

  return authenticated
    ? <Outlet />
    : <Navigate to="/sign-in" state={{ from: location }} replace />;
};

export default PrivateRoute;