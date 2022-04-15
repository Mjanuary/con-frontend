import React, { useEffect, useState } from "react";
// import { isEmptyOrSpaces } from "../../shared/dataTest";

export const isEmptyOrSpaces = (str: string): boolean => {
  return str === null || str.match(/^ *$/) !== null;
};

type PDFViewerProps = {
  file_url: string;
  class_name: string;
  frame_title: string;
  setLoadingFile: (state: boolean) => void;
};

const PDFViewer: React.FC<PDFViewerProps> = (props) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<{ element: string; msg: string } | null>(
    null
  );
  useEffect(() => {
    if (loading) {
      if (isEmptyOrSpaces(props.file_url)) {
        setError({ element: "PDF_FILE", msg: "File url is required" });
      } else if (error !== null) {
        setError(null);
      }
      setLoading(false);
    }
  }, [error, loading, props.file_url]);

  return (
    <div className="w-full">
      {error ? (
        <div className="alert-warning mt-2 mx-14">{error.msg}</div>
      ) : (
        <object
          data={props.file_url}
          type="application/pdf"
          className={props.class_name}
          onLoad={() => props.setLoadingFile(false)}
        >
          <iframe
            src={props.file_url}
            className={props.class_name}
            title={props.frame_title}
            onLoad={() => props.setLoadingFile(false)}
          >
            <p>This browser does not support PDF!</p>
          </iframe>
        </object>
      )}
    </div>
  );
};

export default PDFViewer;

// class_name={`w-full h-screen md:max-h-screen mx-auto ${
//     this.props.loadingImage && "hidden"
//   }`}
//   frame_title={"application PDF file view"}
