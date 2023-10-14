'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { useMutation } from 'convex/react';

import { useEdgeStore } from '@/lib/edgestore';
import { useCoverImage } from '@/hooks/use-cover-image';

import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';

import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog';
import { SingleImageDropzone } from '@/components/single-image-dropzone';

export const CoverImageModal = () => {
  const params = useParams();
  const update = useMutation(api.documents.update);

  const coverImage = useCoverImage();
  const { edgestore } = useEdgeStore();

  const [file, setFile] = useState<File>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onClose = () => {
    setFile(undefined);
    setIsSubmitting(false);
    coverImage.onClose();
  };

  const onChange = async (file?: File) => {
    if (file) {
      setIsSubmitting(true);
      setFile(file);

      const rest = await edgestore.publicFiles.upload({
        file,
      });

      await update({
        id: params.documentId as Id<'documents'>,
        coverImage: rest.url,
      });

      onClose();
    }
  };

  return (
    <Dialog open={coverImage.isOpen} onOpenChange={coverImage.onClose}>
      <DialogContent>
        <DialogHeader>
          <h2 className="text-center text-lg font-semibold">Cover Image</h2>
        </DialogHeader>
        <SingleImageDropzone
          className="w-full outline-none"
          disabled={isSubmitting}
          value={file}
          onChange={onChange}
        />
      </DialogContent>
    </Dialog>
  );
};
