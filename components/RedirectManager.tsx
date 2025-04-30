'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { RedirectLink } from '@/types/redirect';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Trash2 } from 'lucide-react';

// Form validation schema
const formSchema = z.object({
  destinationUrl: z
    .string()
    .url('Please enter a valid URL')
    .min(1, 'Destination URL is required'),
});

type FormValues = z.infer<typeof formSchema>;

export default function RedirectManager() {
  const [redirects, setRedirects] = useState<RedirectLink[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [baseUrl, setBaseUrl] = useState('');

  // Initialize form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      destinationUrl: '',
    },
  });

  // Fetch all redirects on component mount
  useEffect(() => {
    setBaseUrl(`${window.location.protocol}//${window.location.host}`);
    fetchRedirects();
  }, []);

  // Function to fetch all redirects
  const fetchRedirects = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await fetch('/api/redirects');
      
      if (!response.ok) {
        throw new Error('Failed to fetch redirects');
      }
      
      const data = await response.json();
      setRedirects(data);
    } catch (err) {
      console.error('Error fetching redirects:', err);
      setError('Failed to load redirects. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Function to create a new redirect
  const createRedirect = async (values: FormValues) => {
    try {
      setError(null);
      
      const response = await fetch('/api/redirects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });
      
      if (!response.ok) {
        throw new Error('Failed to create redirect');
      }
      
      const newRedirect = await response.json();
      setRedirects([newRedirect, ...redirects]);
      
      // Reset form
      form.reset();
    } catch (err) {
      console.error('Error creating redirect:', err);
      setError('Failed to create redirect. Please try again.');
    }
  };

  // Function to delete a redirect
  const deleteRedirect = async (uuid: string) => {
    try {
      setError(null);
      
      const response = await fetch(`/api/redirects/${uuid}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete redirect');
      }
      
      // Remove the deleted redirect from the state
      setRedirects(redirects.filter(redirect => redirect.uuid !== uuid));
    } catch (err) {
      console.error('Error deleting redirect:', err);
      setError('Failed to delete redirect. Please try again.');
    }
  };

  // Function to copy link to clipboard
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="space-y-8">
      {/* Create Redirect Form */}
      <div className="bg-card p-6 rounded-lg shadow-sm border">
        <h2 className="text-xl font-semibold mb-4">Create New Redirect</h2>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(createRedirect)} className="space-y-4">
            <FormField
              control={form.control}
              name="destinationUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Destination URL</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="https://example.com" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button type="submit" className="w-full">
              Generate Redirect Link
            </Button>
          </form>
        </Form>
      </div>

      {/* Redirects List */}
      <div className="bg-card p-6 rounded-lg shadow-sm border">
        <h2 className="text-xl font-semibold mb-4">Your Redirect Links</h2>
        
        {error && (
          <div className="bg-destructive/10 text-destructive p-3 rounded-md mb-4">
            {error}
          </div>
        )}
        
        {isLoading ? (
          <div className="text-center py-8">Loading...</div>
        ) : redirects.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            No redirect links created yet.
          </div>
        ) : (
          <div className="space-y-4">
            {redirects.map((redirect) => (
              <div 
                key={redirect.uuid} 
                className="flex flex-col md:flex-row md:items-center justify-between p-4 bg-muted/50 rounded-md"
              >
                <div className="flex-1 min-w-0 mb-2 md:mb-0 md:mr-4">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="font-medium">Short Link:</span>
                    <a 
                      href={`/r/${redirect.uuid}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline truncate"
                    >
                      {`${baseUrl}/r/${redirect.uuid}`}
                    </a>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => copyToClipboard(`${baseUrl}/r/${redirect.uuid}`)}
                      className="h-6 px-2"
                    >
                      Copy
                    </Button>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="font-medium">Target:</span>
                    <a 
                      href={redirect.destinationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:underline truncate"
                    >
                      {redirect.destinationUrl}
                    </a>
                  </div>
                </div>
                
                <Button 
                  variant="destructive" 
                  size="sm" 
                  onClick={() => deleteRedirect(redirect.uuid)}
                  className="self-end md:self-auto"
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  Delete
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
