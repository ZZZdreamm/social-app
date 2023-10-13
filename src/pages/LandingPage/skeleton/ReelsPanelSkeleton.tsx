import styled from "styled-components";

export function ReelsPanelSkeleton() {
  const numbers = [1, 2, 3, 4, 5, 6];
  return (
    <div className="box">
      <ReelsPanelContainer>
        {numbers.map((number) => (
          <ReelsPanelItem key={number}>
            <div
              className="skeleton"
              style={{ height: "100%", width: "100%" }}
            ></div>
          </ReelsPanelItem>
        ))}
      </ReelsPanelContainer>
    </div>
  );
}

const ReelsPanelContainer = styled.div`
  display: flex;
  width: 100%;
  box-sizing: border-box;
  margin: 0 auto;
  gap: 0.5rem;
  overflow-x: hidden;
  overflow-y: hidden;
`;

const ReelsPanelItem = styled.div`
  border-radius: 1rem;
  min-width: 22.2%;
  max-width: 22.2%;
  height: 15rem;
  overflow: hidden;
`;
