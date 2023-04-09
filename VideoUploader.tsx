import React, { useState } from 'react';
import axios, { AxiosResponse } from 'axios';

type Props = {
  endpoint: string;
 
};

const VideoUploader: React.FC<Props> = ({ endpoint }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFile(e.target.files ? e.target.files[0] : null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (selectedFile) {
      setIsUploading(true);

      const formData = new FormData();
      formData.append('video', selectedFile);

      try {
        const response: AxiosResponse = await axios.post(endpoint, formData, {
          onUploadProgress: (progressEvent: ProgressEvent) => {
            const progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
            setUploadProgress(progress);
          },
        });

        if (response.status === 200) {
          console.log('Video uploaded successfully');
        } else {
          console.error('Error uploading video');
        }
      } catch (error) {
        console.error(error);
      }

      setIsUploading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="file" accept="video/*" onChange={handleFileInputChange} />
        <button type="submit" disabled={isUploading || !selectedFile}>
          {isUploading ? 'Uploading...' : 'Upload'}
        </button>
      </form>
      {isUploading && (
        <div>
          <progress value={uploadProgress} max={100} />
          <span>{uploadProgress}%</span>
        </div>
      )}
    </div>
  );
};

export default VideoUploader;
