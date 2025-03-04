import { React, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { VscClose } from "react-icons/vsc";
import { FiPlus } from "react-icons/fi";
import { OptionsInput, SelectCurrencyRangeAmountInput, SelectMultiOptionsInput, TextField } from "../utils/FormInputFields";
import { EligibilityRulesData } from "../data/EligibilityRulesData";

export default function EligibilityRules() {

  const [rows, setRows] = useState([{ 
    id: Date.now(),
      rule: "specificCollection",
      specificCollectionOperator: "contains any",
      specificProductOperator: "equals anything",
      productTagOperator: 'contains any',      
      subscribed: 'yes',
      textCode: "",
      collections: [],
      productTags:[],
      products:[],
      currency: "USD",
      minValue: "",
      maxValue: "",
      cartRangeOperator: "is between"
   }]);

   // Calculate height dynamically 
   const lineRefs = useRef({});
   const [lineStyles, setLineStyles] = useState({});

   useEffect(() => {
    console.log("Updated rows state:", JSON.stringify(rows, null, 2));
  }, [rows]);
 
   // Only run animation effect when rows change
  useEffect(() => {
    const updateLinePositions = () => {
      const newStyles = {};
      rows.forEach((row, index) => {
        if (index > 0) {
          const prevRow = document.getElementById(`row-${rows[index - 1].id}`);
          const currentRow = document.getElementById(`row-${row.id}`);

          if (prevRow && currentRow) {
            const prevBottom = prevRow.getBoundingClientRect().bottom;
            const currentTop = currentRow.getBoundingClientRect().top;
            const distance = currentTop - prevBottom;
            newStyles[row.id] = { height: distance };
          }
        }
      });
      setLineStyles((prev) => (JSON.stringify(prev) === JSON.stringify(newStyles) ? prev : newStyles));
    };

    updateLinePositions();
    window.addEventListener("resize", updateLinePositions);
    return () => window.removeEventListener("resize", updateLinePositions);
  }, [rows]);

     // Get all selected rules
     const selectedRules = useMemo(() => rows.map(row => row.rule), [rows]);


     // creates rules priority object
     const rulePriorityMap = useMemo(() => {
      return EligibilityRulesData.reduce((acc, rule) => {
        acc[rule.value] = rule.priority || 0; // Store rule priority in an object
        return acc;
      }, {});
    }, []);

 // Function to sort rows based on rule priority
 const sortRowsByPriority = (rows) => {
  return [...rows].sort((a, b) => {
    const priorityA = rulePriorityMap[a.rule] || 0;
    const priorityB = rulePriorityMap[b.rule] || 0;
    return priorityA - priorityB;
  });
};

const updateRow = useCallback((id, field, value) => {
  setRows((prevRows) => {
    const updatedRows = prevRows.map(row => ({
      ...row,
      [field]: value,  // Apply the same value to all rows
    }));
    return updatedRows;
  });
}, []);


// Function to add a new rule row
const addRow = useCallback(() => {
  setRows((prevRows) => {
    const availableRule = EligibilityRulesData.find(
      (rule) => !prevRows.some((row) => row.rule === rule.value)
    );

    if (!availableRule) return prevRows; // Prevent adding duplicate rules

    const newRow = {
      id: Date.now(),
      rule: availableRule.value,
      specificCollectionOperator: "contains any",
      specificProductOperator: "equals anything",
      productTagOperator: "contains any",
      textCode: "",
      collections: [],
      productTags: [],
      products: [],
      subscribed: "yes",
      currency: "USD",
      minValue: "",
      maxValue: "",
      cartRangeOperator: "is between",
    };

    return sortRowsByPriority([...prevRows, newRow]);
  });
}, []);

// Remove row function
const removeRow = (id) => {
  setRows((prevRows) => {
    const updatedRows = prevRows.filter((row) => row.id !== id);
    return updatedRows;
  },[]);
};



  const getOperators = useCallback((ruleId) => {
    const rule = EligibilityRulesData.find((rule) => rule.value === ruleId);
    return rule?.operators || [];
  }, []);

  
  return (
    <div className=" pl-12 pr-4 p-2">
      
      {rows.map((row, index) =>{
const selectedRuleConfig = EligibilityRulesData.find((config) => config.value === row.rule);
const data = selectedRuleConfig ? selectedRuleConfig.data : [];
const operators = selectedRuleConfig ? selectedRuleConfig.operators : [];
// console.log("Line height:", lineStyles[row.id]?.height);
// console.log('specificCollectionOperator:',row.specificCollectionOperator, 
// );
// console.log('specificProductOperator:',row.specificProductOperator ,)
// console.log('productTagOperator:',row.productTagOperator, )
// console.log('------productSubscribed-----:',row.productSubscribed,)
// console.log('------specificDiscountCodes-----:',row.specificDiscountCodes,)
// console.log('-----collections-----:',row.collections,)
// console.log('-----productTags------:',row.productTags,)
// console.log('-----products------:',row.products,)
// console.log('-----currency--------:',row.currency,)
// console.log('----minValue----:',row.minValue,)
// console.log('---maxValue----:',row.maxValue,)
// console.log('--cartRangeOperator---:',row.cartRangeOperator)

        return(
        <div key={row.id} id={`row-${row.id}`} className='relative'>
        {index===0 &&  <div className="bg-white h-5 w-5 absolute z-10 -left-10"></div>}
        <div className="relative gap-2 flex items-center">
          {/* Vertical connecting line UI -start */}
       
          {index > 0 && (
            <div
              ref={(el) => (lineRefs.current[row.id] = el)}
              className="absolute -left-12"
              style={{ height: `${lineStyles[row.id]?.height || 50}px`, top: "-25px" }}
            >

              <div className="relative min-h-[1px] w-10">
                {/* Vertical Line controlled by JS --start*/}
               <div
                  className="absolute left-1/2 translate-y-6 -top-16 w-[1.5px] bg-[#D9D9D9] transform -translate-x-1/2"
                  style={{ 
                    minHeight: "92px", 
                  height: "100%", 
                  }}
                ></div> 


                <div
                  className="absolute -translate-y-5 left-1/2 -bottom-10 w-[1.5px] bg-[#D9D9D9] transform -translate-x-1/2"
                  style={{ height: "100%" }}
                ></div> 


                {/* Vertical Line controlled by JS --end */}

                {/* "AND" Text */}
                <div className="absolute left-1/2 top-1 transform -translate-x-1/2 -translate-y-1 bg-white px-1 z-10">
                  <span className="text-[#595959] font-medium whitespace-nowrap">AND</span>
                </div>
              </div>
            </div>
          )}

    {/* Vertical connecting line UI -end */}
        <div className="relative flex gap-2 items-center  w-6/12 max-w-full">
        {/* Horizontal connecting Line ui start */}
     <div className="relative mt-4">
     {index < rows.length - 1 && (
                <div className="absolute z-20 -translate-x-7 left-0 top-1/2 w-9 h-[1px] bg-[#D9D9D9]"></div>
              )}

              {/* Connector Box */}
              <div className="bg-white z-10 h-4 w-6 -translate-y-4 absolute -translate-x-8 left-0 top-1/2"></div>

              {/* Leftward Horizontal Line */}
              {index > 0 && (
                <div className="absolute z-20 -translate-y-4 -translate-x-7 left-0 top-1/2 w-9 h-[1px] bg-[#D9D9D9]"></div>
              )}
     </div>
      {/* Horizontal connecting Line ui end */}
      
          <div className={EligibilityRulesData.find((config) => config.value === row.rule)?.operators > 0 ? 'w-1/2':'w-full'}>
          <OptionsInput
          value={row.rule}
          setValue={(value) => updateRow(row.id, "rule", value)}
          options={EligibilityRulesData}
  disabledOptions={selectedRules.filter((selected) => selected !== row.rule)} // Pass selected rules except the current row
        />
         </div>
         
          {row.rule === 'cartValueRange' && (
                <div className="w-1/2">
                  <OptionsInput
                    value={row.currancyOperator}
                    setValue={(value) => updateRow(row.id, "cartRangeOperator", value)}
                    options={getOperators(row.rule)}
                  />
                </div>
              ) }
              
              { (operators.length > 0 && row.rule==="productTags") && (
                <div className="w-1/2">
                  <OptionsInput
                    value={row.productTagOperator}
                    setValue={(value) => updateRow(row.id, "productTagOperator", value)}
                    options={getOperators(row.rule)}
                    
                  />
                </div>
              )}

{ (operators.length > 0 && row.rule==="specificCollection" ) && (
                <div className="w-1/2">
                  <OptionsInput
      value={row.specificCollectionOperator}
      setValue={(value) => updateRow(row.id, "specificCollectionOperator", value)}
      options={getOperators(row.rule)} 
      disabledOptions={
        rows
          .filter((r) => r.rule === "specificProduct") // Find specificProduct rule
          .flatMap((r) => 
            ["contains any", "is not"].includes(r.specificProductOperator) 
              ? [r.specificProductOperator] 
              : []
          )
      }
    />
                </div>
              )}

{ (operators.length > 0 && row.rule==="specificProduct" ) && (
                <div className="w-1/2">
                  <OptionsInput
      value={row.specificProductOperator}
      setValue={(value) => updateRow(row.id, "specificProductOperator", value)}
      options={getOperators(row.rule)} 
      disabledOptions={
        rows
          .filter((r) => r.rule === "specificCollection") // Find specificCollection rule
          .flatMap((r) => 
            ["contains any", "is not"].includes(r.specificCollectionOperator) 
              ? [r.specificCollectionOperator] 
              : []
          )
      }
    />
                </div>
              )}
      </div>

         <div className="w-6/12">
         
         {(row.rule === "specificCollection") 
         && <SelectMultiOptionsInput
          values={row.collections}
          setValues={(value) => updateRow(row.id, "collections", value)}
          data={EligibilityRulesData.find((config) => config.value === row.rule)?.data || []}
          placeholder='Search collections'
          />}

{(row.rule === "productTags") 
         && <SelectMultiOptionsInput
          values={row.productTags}
          setValues={(value) => updateRow(row.id, "productTags", value)}
          data={EligibilityRulesData.find((config) => config.value === row.rule)?.data || []}
          placeholder='Search product tags'
          />}

{(row.rule === "specificProduct") 
         && <SelectMultiOptionsInput
          values={row.products}
          setValues={(value) => updateRow(row.id, "products", value)}
          data={EligibilityRulesData.find((config) => config.value === row.rule)?.data || []}
          placeholder='Search product'
          />}

          { (row.rule==="productSubscribed") &&
            <OptionsInput
            value={row.subscribed}
            setValue={(value) => updateRow(row.id, "subscribed", value)}
            options={EligibilityRulesData.find((config) => config.value === row.rule)?.subscribed || []}
            
            />
          }
          
          {(row.rule === "specificDiscountCodes" ) 
         && <TextField
              values={row.textCode}
              setValues={(value) => updateRow(row.id, "textCode", value)}
               
          />}

          {(row.rule==='cartValueRange') && 
            <SelectCurrencyRangeAmountInput
             currencyOptions={EligibilityRulesData.find((config) => config.value === row.rule)?.currencyOptions}
             currency={row.currency}
             setCurrency={(value) => updateRow(row.id, "currency", value)}
             minValue={row.minValue}
             setMinValue={(value) => updateRow(row.id, "minValue", value)}
             maxValue={row.maxValue}
             setMaxValue={(value) => updateRow(row.id, "maxValue", value)}
             operators={row.operators}
             setOperator={(value) => updateRow(row.id, "operator", value)}
             shouldShowMaxField={row.cartRangeOperator !== "is less than"}
             />
          }

         </div>
  
       
        <div>
          <VscClose onClick={() => removeRow(row.id)} className="mx-4 cursor-pointer" size={18} />
        </div>
      
      </div>
  
      {/* display selected collections, products, product tags  --start */}
      <div className="flex flex-wrap gap-2 items-center mt-2 mb-5 pl-2">
  {["collections", "products", "productTags"].map((key) => 
    row[key]?.length > 0 &&
    row[key].map((item) => (
      <div key={item.value} className="bg-[#E3E3E3] rounded text-[#303030] justify-center px-2 py-[2px] items-center flex space-x-1">
        <span>{item.value}</span>
        <VscClose 
          onClick={() => updateRow(row.id, key, row[key].filter((i) => i.value !== item.value))} 
          className="cursor-pointer" 
          size={16} 
        />
      </div>
    ))
  )}
</div>
      {/* display selected collections, products, product tags  --end */}
     </div>
      )})}
   
    <div className="grid justify-center">
    <button
        onClick={addRow}
        className={`${EligibilityRulesData.length === rows.length && 'bg-[#8A8A8A] text-white' } cursor-pointer border border-[#8A8A8A] my-6 justify-center px-4 py-2 text-[#303030] rounded flex items-center`}
      >
        <FiPlus className="mr-2" /> AND
      </button>
    </div>
    
    </div>
  );
}