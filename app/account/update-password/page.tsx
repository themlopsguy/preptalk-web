'use client';

import { useState, useEffect, FormEvent } from 'react';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true
  }
});

export default function UpdatePassword() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [sessionStatus, setSessionStatus] = useState('loading');
  const [debugInfo, setDebugInfo] = useState({});

  // Function for debug logging
  const logDebug = (label: string, value: any) => {
    setDebugInfo(prev => ({ ...prev, [label]: value }));
  };

  // Check for authentication on component mount
  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        // With the new flow, the user should be authenticated after 
        // being redirected from /auth/confirm
        const { data, error } = await supabase.auth.getSession();
        
        logDebug('Session check performed', 'Yes');
        
        if (error) {
          logDebug('Session error', error.message);
          setError('Authentication error: ' + error.message);
          setSessionStatus('not-authenticated');
          return;
        }
        
        if (data.session) {
          logDebug('User authenticated', 'Yes');
          logDebug('User ID', data.session.user.id);
          setSessionStatus('authenticated');
        } else {
          logDebug('No active session', 'Yes');
          setError('No active session found. The password reset link may have expired.');
          setSessionStatus('not-authenticated');
        }
      } catch (err) {
        if (err instanceof Error) {
          logDebug('Unexpected error', err.message);
          setError('An unexpected error occurred: ' + err.message);
        } else {
          logDebug('Unexpected error', 'Unknown error');
          setError('An unexpected error occurred');
        }
        setSessionStatus('not-authenticated');
      }
    };
    
    checkAuthentication();
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
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
      // Update the user's password
      const { error: updateError } = await supabase.auth.updateUser({
        password: password
      });
      
      if (updateError) throw updateError;
      
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

  // Rest of your JSX remains the same...
  return (
    <div className="max-w-md mx-auto p-6 md:p-10">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold mb-2">Reset Your Password</h1>
        <p className="text-gray-600">
          Enter your new password below
        </p>
      </div>
      
      {/* Debug panel */}
      <div className="bg-gray-100 p-4 mb-6 text-xs rounded">
        <h3 className="font-bold mb-2">Debug Info:</h3>
        <pre className="whitespace-pre-wrap overflow-auto max-h-40">
          {JSON.stringify(debugInfo, null, 2)}
        </pre>
      </div>
      
      {sessionStatus === 'loading' && (
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-gray-300 border-t-blue-600"></div>
          <p className="mt-4 text-gray-600">Verifying your authentication...</p>
        </div>
      )}
      
      {sessionStatus === 'not-authenticated' && (
        <div className="bg-red-100 text-red-800 p-4 rounded-md mb-6">
          <p>{error || "Your password reset session has expired or is invalid."}</p>
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