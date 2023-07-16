import { useState } from "react";
import "./style.scss";



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
              <span onClick={() => {
                const input = document.getElementById("user-search-typeahead") as HTMLInputElement
                input.value = ""
                setDataList([])
              }}>{itemChildren(data)}</span>
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
