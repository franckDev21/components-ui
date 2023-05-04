import React, { useState } from "react";
import { Document, Page } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "tailwindcss/tailwind.css";

interface Props {
  fileUrl: string;
}

const PDFPreviewer: React.FC<Props> = ({ fileUrl }) => {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  const handlePrevPage = () => {
    setPageNumber((prevPageNumber) => prevPageNumber - 1);
  };

  const handleNextPage = () => {
    setPageNumber((prevPageNumber) => prevPageNumber + 1);
  };

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center">
      <div className="flex items-center mb-4">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handlePrevPage}
          disabled={pageNumber <= 1}
        >
          Précédent
        </button>
        <p className="mx-4">
          Page {pageNumber} sur {numPages || "--"}
        </p>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleNextPage}
          disabled={pageNumber >= (numPages || 1)}
        >
          Suivant
        </button>
      </div>
      <div className="w-full max-w-screen-lg">
        <Document
          file={fileUrl}
          onLoadSuccess={onDocumentLoadSuccess}
          className="border-2 border-gray-400"
        >
          <Page pageNumber={pageNumber} />
        </Document>
      </div>
    </div>
  );
};

export default PDFPreviewer;
