import { NextPage } from 'next';
import Head from 'next/head';
import DownloadExcel from '@/components/download_excel';

const Home: NextPage = () => {
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
      <div className="flex h-full min-h-screen flex-col items-center bg-[#0E1117] px-4 pb-20 text-neutral-200 sm:px-10">
        <div className="mt-10 flex flex-col items-center justify-center sm:mt-20">
          <div className="text-4xl font-bold">AI Restoran Advice</div>
        </div>
        <main>
          <DownloadExcel />
        </main>
      </div>
    </div>
  );
};

export default DownloadExcel;
