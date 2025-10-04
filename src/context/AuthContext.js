import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { supabase } from "../lib/supabase";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const restore = async () => {
      try {
        const { data } = await supabase.auth.getSession();
        const currentSession = data?.session ?? null;

        if (currentSession) {
          setSession(currentSession);
          setUser(currentSession.user ?? null);
          await AsyncStorage.setItem("sb_session", JSON.stringify(currentSession));
        } else {
        
          const raw = await AsyncStorage.getItem("sb_session");
          if (raw) {
            const saved = JSON.parse(raw);
            if (mounted) {
              setSession(saved);
              setUser(saved.user ?? null);
            }
          }
        }
      } catch (e) {
        console.warn("restore session error:", e);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    restore();

    const { data: listener } = supabase.auth.onAuthStateChange(async (_event, newSession) => {
      try {
        setSession(newSession);
        setUser(newSession?.user ?? null);
        if (newSession) {
          await AsyncStorage.setItem("sb_session", JSON.stringify(newSession));
        } else {
          await AsyncStorage.removeItem("sb_session");
        }
      } catch (e) {
        console.warn("onAuthStateChange error:", e);
      }
    });

    return () => {
      mounted = false;
      listener?.subscription?.unsubscribe();
    };
  }, []);

 
  const signUp = async ({ email, password, full_name }) => {
    const { data, error } = await supabase.auth.signUp(
      { email, password },
      { data: { full_name } }
    );
    if (error) throw error;
    return data;
  };

  const signIn = async ({ email, password }) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    return data;
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    await AsyncStorage.removeItem("sb_session");
    setSession(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ session, user, loading, signUp, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
