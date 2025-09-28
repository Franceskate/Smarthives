import React, { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import AuthStack from "./AuthStack";
import AppTabs from "./AppTabs";

export default function RootNavigator() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });


    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);


  return session ? <AppTabs /> : <AuthStack />;
}
