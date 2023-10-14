'use client';

import { useQuery } from 'convex/react';

import { Id } from '@/convex/_generated/dataModel';
import { api } from '@/convex/_generated/api';

import { Toolbar } from '@/components/toolbar';
import { Cover } from '@/components/cover';

interface DocumentIdPageProps {
  params: {
    documentId: Id<'documents'>;
  };
}

const DocumentIdPage = ({ params }: DocumentIdPageProps) => {
  const document = useQuery(api.documents.getById, {
    documentId: params.documentId,
  });

  if (document === undefined) {
    return <div>Loading...</div>;
  }

  if (document === null) {
    return <div>Not found</div>;
  }

  return (
    <div className="pb-40">
      <Cover url={document.coverImage} />
      <div className="md:max-w-3xl lg:max-4xl mx-auto"></div>
      <Toolbar initialData={document} />
    </div>
  );
};

export default DocumentIdPage;
