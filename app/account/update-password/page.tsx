'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import Image from 'next/image';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function UpdatePassword() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [sessionStatus, setSessionStatus] = useState<'loading' | 'authenticated' | 'not-authenticated'>('loading');

  // Check for recovery session when component mounts
  useEffect(() => {
    const checkSession = async () => {
      // 1. Get the hash fragment from the URL
      const hash = window.location.hash;
      
      // 2. Check if we have recovery tokens in the URL
      if (hash && hash.includes('type=recovery')) {
        // Parse the hash to get access_token and refresh_token
        const params = new URLSearchParams(hash.substring(1));
        const access_token = params.get('access_token');
        const refresh_token = params.get('refresh_token');
        
        // Make sure both tokens exist before proceeding
        if (access_token && refresh_token) {
          try {
            // 3. Set the session with the recovery tokens
            const { data, error } = await supabase.auth.setSession({
              access_token,
              refresh_token
            });
            
            if (error) throw error;
            
            console.log("Recovery session established:", data);
            setSessionStatus('authenticated');
            return;
          } catch (error) {
            console.error("Error setting recovery session:", error);
          }
        } else {
          console.error("Missing required tokens in recovery URL");
          setSessionStatus('not-authenticated');
          setError("Invalid password reset link. Some required parameters are missing.");
        }
      } else {
        // Fall back to checking for an existing session if no tokens in URL
        const { data, error } = await supabase.auth.getSession();
        
        console.log("Session check:", data);
        
        if (error) {
          console.error("Session error:", error);
          setSessionStatus('not-authenticated');
          setError("Authentication error. This reset link may have expired.");
          return;
        }
        
        if (data?.session) {
          setSessionStatus('authenticated');
        } else {
          setSessionStatus('not-authenticated');
          setError("No active reset session. This reset link may have expired or already been used.");
        }
      }
    };
    
    checkSession();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (sessionStatus !== 'authenticated') {
      setError("You're not authenticated. Please request a new password reset link.");
      return;
    }
    
    // Basic validation
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    if (password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }
    
    setLoading(true);
    setError('');
    setMessage('');
    
    try {
      // Update password using the existing session
      const { error } = await supabase.auth.updateUser({
        password: password
      });
      
      if (error) throw error;
      
      setMessage('Password updated successfully! You can now return to the app and log in with your new password.');
    } catch (error: any) {
      console.error("Password update error:", error);
      setError(error.message || 'Failed to update password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const openApp = () => {
    window.location.href = 'preptalk://reset-success';
  };

  return (
    <div className="max-w-md mx-auto p-6 md:p-10">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold mb-2">Reset Your Password</h1>
        <p className="text-gray-600">
          Enter your new password below
        </p>
      </div>
      
      {sessionStatus === 'loading' && (
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-gray-300 border-t-blue-600"></div>
          <p className="mt-4 text-gray-600">Verifying your reset link...</p>
        </div>
      )}
      
      {sessionStatus === 'not-authenticated' && (
        <div className="bg-red-100 text-red-800 p-4 rounded-md mb-6">
          <p>{error || "This password reset link is invalid or has expired."}</p>
          <p className="mt-2">Please return to the app and request a new password reset link.</p>
          <button 
            onClick={openApp}
            className="block w-full mt-4 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
          >
            Return to App
          </button>
        </div>
      )}
      
      {message && (
        <div className="bg-green-100 text-green-800 p-4 rounded-md mb-6">
          {message}
          <button 
            onClick={openApp}
            className="block w-full mt-4 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors"
          >
            Return to App
          </button>
        </div>
      )}
      
      {error && sessionStatus === 'authenticated' && (
        <div className="bg-red-100 text-red-800 p-4 rounded-md mb-6">
          {error}
        </div>
      )}
      
      {sessionStatus === 'authenticated' && !message && (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label 
              htmlFor="password" 
              className="block text-sm font-medium mb-2"
            >
              New Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          
          <div>
            <label 
              htmlFor="confirmPassword" 
              className="block text-sm font-medium mb-2"
            >
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 bg-blue-600 text-white rounded-md font-medium ${
              loading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-blue-700'
            }`}
          >
            {loading ? 'Updating...' : 'Update Password'}
          </button>
        </form>
      )}
      
      <p className="text-center text-sm text-gray-600 mt-8">
        Return to <a href="preptalk://" className="text-blue-600">PrepTalk App</a>
      </p>
    </div>
  );
}