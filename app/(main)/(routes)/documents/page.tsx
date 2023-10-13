'use client';

import Image from 'next/image';
import { PlusCircle } from 'lucide-react';
import { useMutation } from 'convex/react';
import { toast } from 'sonner';

import { useUser } from '@clerk/clerk-react';
import { api } from '@/convex/_generated/api';

import { Button } from '@/components/ui/button';

const DocumentsPage = () => {
  const { user } = useUser();
  const create = useMutation(api.documents.create);

  const onCreate = () => {
    const promise = create({ title: 'Untitled' });
    toast.promise(promise, {
      loading: 'Creating a new note...',
      success: 'New note created!',
      error: 'Failed to create a new note.',
    });
  };

  return (
    <div className="h-full flex flex-col items-center justify-center space-y-4">
      <Image
        src="/empty.png"
        alt="empty"
        height="300"
        width="300"
        className="dark:hidden"
      />
      <Image
        src="/empty.png"
        alt="empty"
        height="300"
        width="300"
        className="hidden dark:block"
      />
      <h2 className="text-xl font-medium">
        Welcome to {user?.firstName}&apos;s aNotion
      </h2>
      <Button onClick={onCreate}>
        <PlusCircle className="h-4 w-4 mr-2" />
        Create a note
      </Button>
    </div>
  );
};

export default DocumentsPage;
