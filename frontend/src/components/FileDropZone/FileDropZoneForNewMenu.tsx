import { Box } from "@mui/material";
import { useDropzone } from "react-dropzone";

interface Props {
  onFileSelected: (acceptedFiles: File[]) => void;
  assetUrl: string;
}

const FileDropZoneForNewMenu = ({ onFileSelected, assetUrl }: Props) => {
  const onDrop = (acceptedFiles: File[]) => {
    onFileSelected(acceptedFiles);
  };
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
  });

  return (
    <Box
      {...getRootProps()}
      sx={{
        cursor: "pointer",
      }}
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <img
          style={{ height: "12rem", borderRadius: "2rem" }}
          alt={assetUrl}
          src={assetUrl}
        />
      ) : (
        <img
          style={{
            height: "12rem",
            borderRadius: "2rem",
          }}
          alt={assetUrl}
          src={assetUrl}
        />
      )}
    </Box>
  );
};

export default FileDropZoneForNewMenu;
