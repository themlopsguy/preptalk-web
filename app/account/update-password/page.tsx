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
    const handlePasswordReset = async () => {
      try {
        // Check for hash parameter
        const queryParams = new URLSearchParams(window.location.search);
        const hash = queryParams.get('hash');
        
        if (hash) {
          // Use TokenHash with verifyOtp
          const { data, error } = await supabase.auth.verifyOtp({
            token_hash: hash,
            type: 'recovery'
          });
          
          if (error) {
            logDebug('Token verification error', error.message);
            setError(`Authentication error: ${error.message}`);
            setSessionStatus('not-authenticated');
            return;
          }
          
          // Success - user should now be authenticated
          setSessionStatus('authenticated');
          return;
        }
        
        // Fallback to your existing code for handling code parameter
        const code = queryParams.get('code');
        if (code) {
          // Your existing code exchange logic...
        } else {
          // No valid parameters found
          setError('No valid authentication parameters found.');
          setSessionStatus('not-authenticated');
        }
      } catch (err) {
        if (err instanceof Error) {
          logDebug('Unexpected error', err.message);
          setError(`An unexpected error occurred: ${err.message}`);
        } else {
          logDebug('Unexpected error', 'Unknown error occurred');
          setError('An unexpected error occurred');
        }
        setSessionStatus('not-authenticated');
      }
    };
    
    handlePasswordReset();
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
    
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    
    setLoading(true);
    setError('');
    setMessage('');
    
    try {
        // Verify we still have a valid session before updating
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session) {
          setError("Your session has expired. Please request a new password reset link.");
          setSessionStatus('not-authenticated');
          return;
        }
        
        // Update the password using the current session
        const { error: updateError } = await supabase.auth.updateUser({
          password: password
        });
        
        if (updateError) throw updateError;
        
        setMessage('Password updated successfully! You can now return to the app and log in with your new password.');
      } catch (error) {
        // Your existing error handling
      } finally {
        setLoading(false);
      }
    };

  const openApp = () => {
    window.location.href = 'preptalk://reset-success';
  };

    // Fallback if deep link doesn't work
    // setTimeout(() => {
    //     if (document.visibilityState === 'visible') {
    //       setMessage(prev => 
    //         prev + " If the app doesn't open, you may need to install it first."
    //       );
    //     }
    //   }, 1000);
    // };

  // Render different UI components based on state
  const renderContent = () => {
    // Show loading spinner during authentication
    if (sessionStatus === 'loading') {
      return (
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-10 w-10 border-4 border-gray-300 border-t-blue-600"></div>
          <p className="mt-4 text-gray-600">Verifying your reset link...</p>
        </div>
      );
    }
    
    // Show error message and app return button for failed authentication
    if (sessionStatus === 'not-authenticated') {
      return (
        <div className="bg-red-100 text-red-800 p-6 rounded-lg shadow-sm mb-6">
          <p className="font-medium">{error || "This password reset link is invalid or has expired."}</p>
          <p className="mt-3">Please return to the app and request a new password reset link.</p>
          <button 
            onClick={openApp}
            className="block w-full mt-5 bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors font-medium"
          >
            Return to App
          </button>
        </div>
      );
    }
    
    // Show success message after password update
    if (message) {
      return (
        <div className="bg-green-100 text-green-800 p-6 rounded-lg shadow-sm mb-6">
          <p className="font-medium">{message}</p>
          <button 
            onClick={openApp}
            className="block w-full mt-5 bg-green-600 text-white py-3 px-4 rounded-md hover:bg-green-700 transition-colors font-medium"
          >
            Return to App
          </button>
        </div>
      );
    }
    
    // Show password form for authenticated users
    return (
      <>
        {error && (
          <div className="bg-red-100 text-red-800 p-4 rounded-md mb-6">
            <p>{error}</p>
          </div>
        )}
        
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
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
              minLength={6}
              placeholder="Enter your new password"
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
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
              minLength={6}
              placeholder="Confirm your new password"
            />
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 bg-blue-600 text-white rounded-md font-medium ${
              loading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-blue-700'
            } transition-all duration-200 shadow-sm`}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <span className="inline-block animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2"></span>
                Updating...
              </span>
            ) : 'Update Password'}
          </button>
        </form>
      </>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Header with logo and title */}
        <div className="p-6 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-center">
          <div className="mb-3 flex justify-center">
          </div>
          <h1 className="text-2xl font-bold">Reset Your Password</h1>
          <p className="text-blue-100 mt-1">
            Create a new secure password for your PrepTalk account
          </p>
        </div>
        
        {/* Main content area */}
        <div className="p-6">
          {renderContent()}
          
          {/* App return link */}
          <p className="text-center text-sm text-gray-600 mt-6">
            Return to <a href="preptalk://" className="text-blue-600 hover:text-blue-800 font-medium">PrepTalk App</a>
          </p>
        </div>
      </div>
      
      {/* Footer */}
      <div className="mt-8 text-center text-gray-500 text-xs">
        <p>&copy; 2025 PrepTalk. All rights reserved.</p>
      </div>
      
      {/* Debug panel - only shown in development */}
      {process.env.NODE_ENV !== 'production' && Object.keys(debugInfo).length > 0 && (
        <div className="mt-8 p-4 bg-gray-100 rounded-md text-xs max-w-md w-full">
          <h3 className="font-bold mb-2 text-gray-700">Debug Info:</h3>
          <pre className="whitespace-pre-wrap overflow-auto max-h-40 text-gray-600">
            {JSON.stringify(debugInfo, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}