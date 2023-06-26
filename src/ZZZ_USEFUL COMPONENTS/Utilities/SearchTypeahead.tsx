import { useEffect, useState } from "react";
import { AsyncTypeahead } from "react-bootstrap-typeahead";

const typeaheadStyle = {
  borderRadius: "1rem",
  margin: "0 auto",
  padding: "0.1rem",
};

export default function SearchTypeahead({
  listOfData,
  handleSearch,
  itemChildren,
  bonusClassName,
}: SearchTypeaheadProps) {
  const [dataList, setDataList] = useState(listOfData);
  const visible = dataList.length > 0 ? "flex" : "none";
  return (
    <>
      <div
        className={`typeaheadContainer ${bonusClassName}`}
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
        {dataList && dataList.length > 0 && (
          <div
            className="typeahead-options big-shadow-around"
            style={{ display: visible }}
          >
            {dataList.map((data) => (
              <span onClick={() => setDataList([])}>{itemChildren(data)}</span>
            ))}
          </div>
        )}
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
