'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import Image from 'next/image';
import { FormEvent } from 'react';

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
  const [sessionStatus, setSessionStatus] = useState('loading');
  const [debugInfo, setDebugInfo] = useState({});

  // Function for debug logging that shows up in the UI
// Function for debug logging that shows up in the UI
const logDebug = (label: string, value: string | number | boolean) => {
    setDebugInfo(prev => ({ ...prev, [label]: value }));
  };

  // Handle recovery when component mounts
  useEffect(() => {
    const processRecoveryTokens = async () => {
      try {
        // 1. Get the URL hash (everything after #)
        const hash = window.location.hash;
        logDebug('Hash present', hash ? 'Yes' : 'No');
        
        if (!hash) {
          // If no hash is present, check if we already have a session
          const { data: sessionData } = await supabase.auth.getSession();
          
          if (sessionData?.session) {
            logDebug('Existing session found', 'Yes');
            setSessionStatus('authenticated');
            return;
          }
          
          setError('No recovery tokens found in URL. Please request a new password reset link.');
          setSessionStatus('not-authenticated');
          return;
        }
        
        // 2. Handle hash with recovery tokens
        if (hash.includes('type=recovery')) {
          logDebug('Recovery hash detected', 'Yes');
          
          // Parse the hash fragments
          const hashParams = new URLSearchParams(hash.substring(1)); // Remove the # character
          const accessToken = hashParams.get('access_token');
          const refreshToken = hashParams.get('refresh_token');
          
          logDebug('Access token present', accessToken ? 'Yes' : 'No');
          logDebug('Refresh token present', refreshToken ? 'Yes' : 'No');
          
          if (!accessToken || !refreshToken) {
            setError('Invalid recovery link. Missing authentication tokens.');
            setSessionStatus('not-authenticated');
            return;
          }
          
          // 3. Set the recovery session
          const { data, error: sessionError } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken
          });
          
          if (sessionError) {
            logDebug('Session error', sessionError.message);
            setError(`Authentication error: ${sessionError.message}`);
            setSessionStatus('not-authenticated');
            return;
          }
          
          logDebug('Session established', 'Yes');
          logDebug('User ID', data?.user?.id || 'None');
          setSessionStatus('authenticated');
          return;
        }
        
        // If there's a hash but it's not a recovery link
        setError('Invalid recovery link format.');
        setSessionStatus('not-authenticated');
      } catch (err: unknown) {
        // Type guard to check if err is an Error object
        if (err instanceof Error) {
          logDebug('Unexpected error', err.message);
          setError(`An unexpected error occurred: ${err.message}`);
        } else {
          // Handle case where err is not an Error object
          logDebug('Unexpected error', 'Unknown error occurred');
          setError('An unexpected error occurred');
        }
        setSessionStatus('not-authenticated');
      }
    };
    
    processRecoveryTokens();
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
      // Update password using the existing session
      const { error: updateError } = await supabase.auth.updateUser({
        password: password
      });
      
      if (updateError) throw updateError;
      
      setMessage('Password updated successfully! You can now return to the app and log in with your new password.');
    } catch (error: unknown) {
        console.error("Password update error:", error);
        
        // Safely access the error message with type checking
        if (error instanceof Error) {
          setError(error.message);
        } else if (typeof error === 'object' && error !== null && 'message' in error) {
          // Handle case where error is an object with a message property but not an Error instance
          setError((error as { message: string }).message);
        } else {
          // Fallback for other error types
          setError('Failed to update password. Please try again.');
        }
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
      
      {/* Debug panel - can be removed in production */}
      <div className="bg-gray-100 p-4 mb-6 text-xs rounded">
        <h3 className="font-bold mb-2">Debug Info:</h3>
        <pre className="whitespace-pre-wrap overflow-auto max-h-40">
          {JSON.stringify(debugInfo, null, 2)}
        </pre>
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