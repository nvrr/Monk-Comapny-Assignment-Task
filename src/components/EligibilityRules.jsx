import { React, useCallback, useEffect, useMemo, useReducer, useRef, useState } from "react";
import { VscClose } from "react-icons/vsc";
import { FiPlus } from "react-icons/fi";
import { OptionsInput, SelectCurrencyRangeAmountInput, SelectMultiOptionsInput, TextField } from "../utils/FormInputFields";
import { EligibilityRulesData } from "../data/EligibilityRulesData";

export default function EligibilityRules() {

  

   const initialState = [
    {
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
    }
  ];

       // creates rules priority object
       const rulePriorityMap = useMemo(() => {
            const map = {};
        for (const rule of EligibilityRulesData) {
          map[rule.value] = rule.priority;
        }
        return map;  // {k:v, k:v,...}
      }); 
      
       // Function to sort rows based on rule priority
       const sortRowsByPriority = (rows) => {
        return [...rows].sort((a, b) => {
          const priorityA = rulePriorityMap[a.rule];
          const priorityB = rulePriorityMap[b.rule];
          return priorityA - priorityB;
        });
      };
      
  
  function rowsReducer(state, action) {
    switch (action.type) {
      case "ADD_ROW":
  // Get list of rule values already in use
const usedRuleValues = state.map((row) => row.rule);

// Find the first rule that hasn't been used yet
const availableRule = EligibilityRulesData.find((rule) => {
  return !usedRuleValues.includes(rule.value);
});
  if (!availableRule) return state;

  const newRow = {
    id: Date.now(),
    rule: availableRule.value,
    specificCollectionOperator: "contains any",
    specificProductOperator: "equals anything",
    productTagOperator: "contains any",
    subscribed: "yes",
    textCode: "",
    collections: [],
    productTags: [], 
    products: [],
    currency: "USD",
    minValue: "",
    maxValue: "",
    cartRangeOperator: "is between"
  };
  return sortRowsByPriority([...state, newRow]);
  
      case "REMOVE_ROW":
        return sortRowsByPriority(state.filter(row => row.id !== action.id));
  
      case "UPDATE_ROW":
        const updated = state.map(row =>
          row.id === action.id
            ? { ...row, [action.field]: action.value }
            : row
        );
        return action.field === "rule" ? sortRowsByPriority(updated) : updated;
  
      default:
        return state;
    }
  }

  const [rows, dispatch] = useReducer(rowsReducer, initialState);


     // Get all selected rules
     const selectedRules = useMemo(() => rows.map(row => row.rule), [rows]);


// Function to add a new rule row
const addRow = () => {
  dispatch({ type: "ADD_ROW" });
}

// Remove rule row 
const removeRow =(id) => {
  dispatch({ type: "REMOVE_ROW", id });
}

// update rule row
const updateRow = (id, field, value) => {
  dispatch({ type: "UPDATE_ROW", id, field, value });
}

//all operators
  const getOperators = useCallback((ruleId) => {
    const rule = EligibilityRulesData.find((rule) => rule.value === ruleId);
    return rule?.operators || [];
  }, []);

  console.log('rrrrr',rows);
  return (
    <div className=" pl-12 pr-4 p-2 overflow-y-auto">
      
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
             
              className="absolute -left-12"
              style={{ height: "50px", top: "-25px" }}
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
      <div data-testId='collection-items' className="flex flex-wrap gap-2 items-center mt-2 mb-5 pl-2">
  {(row.rule === "specificCollection" && row.collections.length > 0) &&
    row.collections.map((item) => (
      <div key={item.value} className="bg-[#E3E3E3] rounded text-[#303030] justify-center px-2 py-[2px] items-center flex space-x-1">
        <span>{item.value}</span>
        <VscClose 
          onClick={() => updateRow(row.id, "collections", row.collections.filter((i) => i.value !== item.value))} 
          className="cursor-pointer" 
          size={16} 
        />
      </div>
    ))
  }

  {(row.rule === "specificProduct" && row.products.length > 0) &&
    row.products.map((item) => (
      <div key={item.value} className="bg-[#E3E3E3] rounded text-[#303030] justify-center px-2 py-[2px] items-center flex space-x-1">
        <span>{item.value}</span>
        <VscClose 
          onClick={() => updateRow(row.id, "products", row.products.filter((i) => i.value !== item.value))} 
          className="cursor-pointer" 
          size={16} 
        />
      </div>
    ))
  }

  {(row.rule === "productTags" && row?.productTags?.length > 0) &&
    row.productTags.map((item) => (
      <div key={item.value} className="bg-[#E3E3E3] rounded text-[#303030] justify-center px-2 py-[2px] items-center flex space-x-1">
        <span>{item.value}</span>
        <VscClose 
          onClick={() => updateRow(row.id, "productTags", row.productTags.filter((i) => i.value !== item.value))} 
          className="cursor-pointer" 
          size={16} 
        />
      </div>
    ))
  }
</div>
      {/* display selected collections, products, product tags  --end */}
     </div>
      )})}
   
    <div className="grid justify-center">
    <button
        onClick={addRow}
        disabled={EligibilityRulesData.length === rows.length}
        className={`${EligibilityRulesData.length === rows.length && 'bg-[#8A8A8A] text-white' } cursor-pointer border border-[#8A8A8A] my-6 justify-center px-4 py-2 text-[#303030] rounded flex items-center`}
      >
        <FiPlus className="mr-2" /> AND
      </button>
    </div>
    
    </div>
  );
}