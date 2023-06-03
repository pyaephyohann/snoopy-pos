import { Box } from "@mui/material";
import { useDropzone } from "react-dropzone";

interface Props {
  oneFileSelected: (acceptedFiles: File[]) => void;
}

const FileDropZone = ({ oneFileSelected }: Props) => {
  const onDrop = (acceptedFiles: File[]) => {
    oneFileSelected(acceptedFiles);
  };
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
  });

  return (
    <Box
      {...getRootProps()}
      sx={{
        borderRadius: 4,
        border: "3px dotted lightgray",
        textAlign: "center",
        p: 1,
        cursor: "pointer",
      }}
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>Drag 'n' drop some files here, or click to select files</p>
      )}
    </Box>
  );
};

export default FileDropZone;
