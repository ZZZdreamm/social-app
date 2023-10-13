import { useCallback, useEffect, useState } from "react";
import Cropper from "react-easy-crop";
import { getCroppedImg } from "./cropImageFunctions";
import styled from "styled-components";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

interface Props {
  file: [File, string] | undefined;
  setCroppedFile: React.Dispatch<
    React.SetStateAction<[File, string] | undefined>
  >;
}

export function CropImage({ setCroppedFile, file }: Props) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const onCropComplete = (croppedArea: any, croppedAreaPixels: any) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const showCroppedImage = useCallback(async () => {
    try {
      const croppedImage: any = await getCroppedImg(
        file![1],
        croppedAreaPixels,
        rotation
      );
      var createdFile = new File(
        [croppedImage.file],
        croppedImage.blob.split("/").slice(-1)[0],
        {
          type: "image/jpeg",
        }
      );
      setCroppedFile([createdFile, croppedImage.blob]);
    } catch (e) {
      console.error(e);
    }
  }, [croppedAreaPixels, rotation, file, setCroppedFile]);

  useEffect(() => {
    if (!file) return;
    showCroppedImage();
  }, [showCroppedImage]);

  return (
    <>
      {file && (
        <>
          <CropContainer>
            <Cropper
              image={file![1]}
              crop={crop}
              rotation={rotation}
              zoom={zoom}
              aspect={9 / 16}
              onCropChange={setCrop}
              onRotationChange={setRotation}
              onCropComplete={onCropComplete}
              onZoomChange={setZoom}
            />
          </CropContainer>
          <div style={{ display: "flex", justifyContent:'space-around' }}>
            <SliderContainer>
              <span className="large-font">Zoom</span>
              <Slider
                value={zoom}
                onChange={(value) => setZoom(value as number)}
                step={0.2}
                min={0.2}
                max={5}
              />
            </SliderContainer>
            <SliderContainer>
              <span className="large-font">Rotate</span>
              <Slider
                value={rotation}
                onChange={(value) => setRotation(value as number)}
                min={0}
                max={360}
              />
            </SliderContainer>
          </div>
        </>
      )}
    </>
  );
}

const CropContainer = styled.div`
  height: 100%;
  width: 100%;
  position: relative;
`;

const SliderContainer = styled.div`
  width: 30%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;
