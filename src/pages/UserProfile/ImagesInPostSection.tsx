import styled from "styled-components";

interface ImagesInPostSectionProps {
  images?: string[];
}

export function ImagesInPostSection({ images }: ImagesInPostSectionProps) {
  return (
    <WholeContainer>
      {images?.map((image) => (
        <ImageContainer>
          <img src={image} alt="" />
        </ImageContainer>
      ))}
    </WholeContainer>
  );
}

const WholeContainer = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  flex-wrap: wrap;
  padding: 0 1rem 1rem 1rem;
  box-sizing: border-box;
`;

const ImageContainer = styled.div`
  width: 30%;
  box-sizing: border-box;
  border-radius: 1rem;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  img {
    flex-shrink: 0;
    width: 100%;
    aspect-ratio: 1;
    &:hover {
      opacity: 0.9;
    }
  }
`;
