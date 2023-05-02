import { useState, useRef } from 'react';
import Head from 'next/head';

export default function DownloadExcel() {
  const [file, setFile] = useState<string | null>(null);
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const downloadExcel = async () => {
    const fileInput = inputFileRef.current;
    setLoading(true);
    if (!fileInput) {
      setLoading(false);
      console.log('File input element not found');
      return;
    }

    const formData = new FormData();
    if (fileInput.files != null) {
      formData.append('file', fileInput.files[0]);
      formData.append('filename', 'example.xlsx');
    } else {
      setLoading(false);
      console.log('no File Selected');
      return;
    }
    const response = await fetch(
      'https://ephemera.cloud/restoran/suggest_restoran',
      {
        method: 'POST',
        body: formData,
      },
    );
    // Check if the response was successful
    if (!response.ok) {
      setLoading(false);
      console.log('Error downloading file');
      return;
    }
    // Create a blob from the downloaded data
    const data = await response.blob();
    // Create a URL for the blob and set it as the download link
    const url = window.URL.createObjectURL(data);
    setFile(url);
    setLoading(false);
  };

  return (
    <div>
      <Head>
        <title>Advice Restoran</title>
        <meta
          name="description"
          content="Upload File berisi Data restoran Akan diberikan saran restoran terbaik."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div
        className="flex h-screen flex-col items-center justify-center bg-[#0E1117] px-4 pb-20 text-neutral-200 sm:px-10"
        style={{
          backgroundImage:
            "url('https://wallpaperaccess.com/full/3353887.jpg')",
          backgroundSize: 'cover',
        }}
      >
        <div className="mt-10 flex flex-col items-center justify-center sm:mt-20">
          <div className="mb-5 mt-10 text-4xl font-bold">
            AI Restoran Advice
          </div>
        </div>
        <input type="file" ref={inputFileRef} />
        <button
          className="w-[140px] cursor-pointer rounded-md bg-violet-500 px-4 py-2 font-bold hover:bg-violet-600 active:bg-violet-700"
          onClick={downloadExcel}
          disabled={loading}
        >
          {loading ? 'Analysis...' : 'Analysis'}
        </button>
        {file && (
          <a href={file} download="peringkat.xlsx">
            Download Link
          </a>
        )}
      </div>
    </div>
  );
}
