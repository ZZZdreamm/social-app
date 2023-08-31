import "./style.scss";

export default function MultipleFileInput({
  handleFileChange,
}: FileInputProps) {

  const handleChange = function (e: any) {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      for (var i = 0; i < e.target.files.length; i++) {
        var file = e.target.files[i];
        handleFileChange(file);
      }
    }
  };

  return (
    <>
      <input
        className="custom-file-input"
        type="file"
        accept=".jpg,.jpeg,.png"
        multiple={true}
        onChange={handleChange}
      />
    </>
  );
}

interface FileInputProps {
  handleFileChange: (file: any) => void;
}
