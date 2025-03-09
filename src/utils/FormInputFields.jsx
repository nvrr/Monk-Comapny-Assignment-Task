import { useEffect, useRef, useState } from "react";
import { LuSearch } from "react-icons/lu";

export const SelectCurrencyRangeAmountInput = ({
  operator,
  currency,
  setCurrency,
  minValue,
  setMinValue,
  maxValue,
  setMaxValue,
  currencyOptions=[],
  shouldShowMaxField,
 
}) => {

  // Reset max value when switching from operators that use max to ones that don't
  useEffect(() => {
    
    if (!shouldShowMaxField) {
      setMaxValue('');
    }
  }, [operator, shouldShowMaxField, setMaxValue]);

return (
    <>
    <div className="flex space-x-2 ">
       <div className="flex-1 w-full">
        <div className="flex">
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            className={`border border-[#8A8A8A] focus:outline-none focus:border-[#8A8A8A] text-[#303030] rounded-l w-1/3`}
          >
             {currencyOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <input
            type="number"
            value={minValue}
            onChange={(e) => setMinValue(e.target.value)}
            placeholder={shouldShowMaxField ? "Min value" : "Value"}
            className={`border border-[#8A8A8A] focus:outline-none focus:border-[#8A8A8A] text-[#303030] p-1 rounded-r border-l-0 h-10 w-2/3 `}
          />
        </div>
      </div>

      {shouldShowMaxField && (
        <div className="flex-1 ">
          <input
            type="number"
            value={maxValue}
            onChange={(e) => setMaxValue(e.target.value)}
            placeholder="Max value"
            className="border border-[#8A8A8A] focus:outline-none focus:border-[#8A8A8A] text-[#303030] p-1 rounded h-10 w-full"
          />
        </div>
      )}
      </div>
    </>
);
}

export const TextField = ({
  values,
  setValues,
  placeholder = "Enter text..."
}) => {

return (
  <>
    <input
      type="text"
      value={values || ""}
      onChange={(e) => {setValues(e.target.value)}}
      placeholder={placeholder}
      className="border border-[#8A8A8A] text-[#303030] p-1 rounded h-10 w-full flex-1 focus:outline-none focus:border-[#8A8A8A]"
    />
  </>
);
}

export const OptionsInput = ({
    options,
    value,
    setValue,
    disabledOptions = [],
    
  }) => {

    

  return (
      <>
      <select
      value={value}
            type={"select"}
          onChange={(e) => {
            setValue(e.target.value);
        }}
        
          className="border border-[#8A8A8A] focus:outline-none focus:border-[#8A8A8A] text-[#303030] p-1 rounded h-10 w-full  "
        >
          {options?.map((op) => (
            <option key={op.id} value={op.value} disabled={disabledOptions.includes(op.value)}>
              {op.label}
            </option>
          ))}
        </select>
      </>
  );
}

export const SelectMultiOptionsInput = ({
  values=[],
  setValues,
  data=[],
  placeholder
}) => {
  const [searchText, setSearchText] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Handle selection of an option
  const toggleSelection = (selectedOption) => {

  if (typeof setValues === "function") {
    // Ensure values is an array in case its undefined)
    const currentValues = Array.isArray(values) ? values : [];

    

    // Check if option already exists in the selected values
    const exists = currentValues.some((item) => item.value === selectedOption.value);



    // Create the updated values array
    const updatedValues = exists
      ? currentValues.filter((item) => item.value !== selectedOption.value) // Remove if exists
      : [...currentValues, selectedOption]; // Add if not exists

  

    // Update the state using setValues, which calls 'updateRow'
    setValues(updatedValues);
  } else {
    console.error("setValues is not a function. Ensure values is correctly passed.");
  }
      };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  

return (
    <>
    <div className="relative w-full " ref={dropdownRef}>
      {/* Search Input Field */}
      <div className="flex items-center px-2 border border-[#8A8A8A] text-[#303030] rounded bg-white cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
        <LuSearch className="text-gray-400 mr-1 mt-1" size={18}/>
      <input
      data-testId='rule-selector'
        type="text"
        placeholder={placeholder}
        className="w-full p-0 focus:outline-none h-[38.5px] focus:outline-none focus:border-[#8A8A8A]"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        onFocus={() => setIsOpen(true)}
      />
      <span className="text-gray-500 ml-2">{values?.length}/{data?.length}</span>
    
      </div>

      {/* Dropdown Options */}
      {isOpen && (
        <div className="absolute w-full border bg-white rounded shadow-md mt-1 max-h-40 overflow-auto z-20">
          {data?.length  && data
            ?.filter((option) =>
              option?.label?.toLowerCase()?.includes(searchText?.toLowerCase())
            )
            .map((option) => (
              <label
                key={option?.value}
                className="flex items-center p-2 cursor-pointer hover:bg-gray-200"
              >
                <input
                  type="checkbox"
                  checked={Array.isArray(values) && values.some((item) => item.value === option.value)}
                  onChange={(e) =>{ toggleSelection(option); console.log("toggle:", e,option);}}
                  className="mr-2"
                />
                {option?.label}
              </label>
            ))}
          {values?.filter((option) =>
            option?.label && option?.label?.toLowerCase()?.includes(searchText?.toLowerCase())
          ).length === 0 && (
            <div className="p-2 text-gray-500">No options found</div>
          )}
        </div>
      )}
    </div>
    </>
);
}

