import styled from "styled-components";
import { MagnifyingGlassIcon } from "../../_utils/icons/MagnifyingGlassIcon";
import { useRef, useState } from "react";
import SearchOption from "../Users/SearchOption";
import { profileDTO } from "../../services/Models/profiles.models";
import useClickedNotOnElement from "../../_utils/2Hooks/useClickedNotOnElement";
import { ReadyImagesURL } from "../../globals/appUrls";

type Colors = "navColor" | "backColor";

const StringToColors = {
  navColor: { main: "var(--navColor)", second: "var(--reverseToNavColor)" },
  backColor: { main: "var(--backColor)", second: "var(--navColor)" },
};

interface UserSearchTypeaheadProps {
  onSearch: (query: string) => any;
  searchOption?: (profile: profileDTO) => React.ReactElement;
  expand?: boolean;
  color?: Colors;
}

export function UserSearchTypeaheadd({
  onSearch,
  searchOption,
  expand = true,
  color = "backColor",
}: UserSearchTypeaheadProps) {
  const [profiles, setProfiles] = useState<profileDTO[]>([]);
  const [isFocused, setIsFocused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const magnifyingGlassRef = useRef<HTMLDivElement>(null);

  const animateMagnifyingGlass = () => {
    setIsFocused(true);
    searchProfiles(inputRef.current?.value || "");
  };

  const reverseAnimation = () => {
    if (magnifyingGlassRef.current?.style.opacity === "1") return;
    setProfiles([]);
    setIsFocused(false);
  };

  const focusOnInput = () => {
    animateMagnifyingGlass();
    inputRef.current?.focus();
  };

  async function searchProfiles(query: string) {
    if (query) {
      const searchedUsers = await onSearch(query);
      setProfiles(searchedUsers);
    } else {
      setProfiles([]);
    }
  }

  useClickedNotOnElement(containerRef, reverseAnimation);
  return (
    <Container
      ref={containerRef}
      className={profiles && profiles.length > 0 ? "big-shadow-around" : ""}
      onFocus={animateMagnifyingGlass}
      isFocused={isFocused}
    >
      <ArrowAndInputContainer isFocused={isFocused} expand={expand}>
        <GoBackArrow
          src={`${ReadyImagesURL}/goBackArrow.png`}
          alt=""
          onClick={reverseAnimation}
          isFocused={isFocused}
        />
        <InputContainer color={color}>
          <MagnifierContainer
            ref={magnifyingGlassRef}
            onClick={focusOnInput}
            isFocused={isFocused}
          >
            <MagnifyingGlassIcon />
          </MagnifierContainer>
          <Input
            ref={inputRef}
            placeholder="Search users"
            onChange={(e) => searchProfiles(e.target.value)}
            color={color}
          />
        </InputContainer>
      </ArrowAndInputContainer>
      {profiles && profiles.length > 0 && (
        <Options className="big-shadow-around">
          {profiles.map((profile) => (
            <span
              onClick={() => {
                inputRef.current!.value = "";
                setProfiles([]);
              }}
            >
              {searchOption ? (
                <>{searchOption(profile)}</>
              ) : (
                <SearchOption userProfile={profile} />
              )}
            </span>
          ))}
        </Options>
      )}
    </Container>
  );
}

interface TypeaheadProps {
  isFocused: boolean;
}

interface ExpandedTypeaheadProps extends TypeaheadProps {
  expand: boolean;
}


const Container = styled.div<TypeaheadProps>`
  position: relative;
  display: flex;
  flex-direction: column;
  border-radius: 0.5rem 0.5rem 0 0;
  padding: 0.35rem 0.5rem;
  box-sizing: border-box;
  gap: 0.5rem;
  width: 100%;
  align-items: flex-end;
  transition: all 0.2s ease-in-out;
  background-color: ${({ isFocused }) =>
    isFocused ? "var(--navColor)" : "transparent"};
  z-index: ${({ isFocused }) => (isFocused ? "200" : "0")};
`;

const ArrowAndInputContainer = styled.div<ExpandedTypeaheadProps>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  width: ${({ isFocused, expand }) =>
    expand ? (isFocused ? "100%" : "calc(100% - 4rem)") : "100%"};
  box-sizing: border-box;
  position: relative;
  transition: all 0.2s ease-in-out;
`;

const InputContainer = styled.div<{
  color: Colors;
}>`
  display: flex;
  cursor: pointer;
  border-radius: 1rem;
  padding: 0.35rem 0.5rem;
  gap: 0.5rem;
  background-color: ${({ color }) => StringToColors[color].main};
  width: 100%;
  box-sizing: border-box;
  position: relative;
  transition: all 0.2s ease-in-out;
`;

const MagnifierContainer = styled.div<TypeaheadProps>`
  width: ${({ isFocused }) => (isFocused ? "0" : "1.5rem")};
  opacity: ${({ isFocused }) => (isFocused ? "0" : "1")};
  transition: all 0.2s ease-in-out;
`;

const Input = styled.input<{
  color: Colors;
}>`
  outline: none;
  border: none;
  background-color: transparent;
  color: ${({ color }) => StringToColors[color].second};
  width: 100%;
`;

const Options = styled.div`
  position: absolute;
  width: 100%;
  top: 100%;
  left: 0;
  background-color: inherit;
  box-sizing: border-box;
  border-radius: 0 0 0.5rem 0.5rem;
  padding: 0.5rem;
  overflow: hidden;
  z-index: 100;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const GoBackArrow = styled.img<TypeaheadProps>`
  width: ${({ isFocused }) => (isFocused ? "1.5rem" : "0")};
  opacity: ${({ isFocused }) => (isFocused ? "1" : "0")};
  transition: all 0.2s ease-in-out;
  cursor: pointer;
`;
