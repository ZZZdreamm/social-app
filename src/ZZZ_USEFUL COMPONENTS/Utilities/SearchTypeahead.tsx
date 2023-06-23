import { useEffect, useState } from "react";
import { AsyncTypeahead } from "react-bootstrap-typeahead";

const typeaheadStyle = {
  borderRadius: "1rem",
  margin: "0.3rem",
  padding: "0.1rem",
};

export default function SearchTypeahead({
  listOfData,
  handleSearch,
  itemChildren,
  bonusClassName,
}: SearchTypeaheadProps) {
  const [dataList, setDataList] = useState(listOfData);
  return (
    <>
      <div
        className="typeaheadContainer"
        style={typeaheadStyle}
        onBlur={() => {
          setTimeout(() => {
            setDataList([]);
          }, 100);
        }}
      >
        <input
          id="user-search-typeahead"
          onChange={(e: any) => handleSearch(e.target.value, setDataList)}
          onFocus={(e: any) => handleSearch(e.target.value, setDataList)}
        />
        {dataList.map((data) => itemChildren(data))}
      </div>
    </>
  );
}

interface SearchTypeaheadProps {
  listOfData: any[];
  itemChildren: (data: any) => React.ReactElement;
  handleSearch: (query: string, setData: (data: any) => void) => void;
  bonusClassName?: string;
}
