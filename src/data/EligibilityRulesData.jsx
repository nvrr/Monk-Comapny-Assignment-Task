export const EligibilityRulesData = [
    {
      id: 1,
      label: "Specific Collection",
      value:'specificCollection',
      operators: [{
        id: 1,
        label:"contains any",
        value:"contains any"
      },
      {
        id: 2,
        label:"is not",
        value:"is not"
      },
        ],

      type: "multi-select",
      mutuallyExclusive: "specificProduct",
      data: [
        {
          id:1,
          label:"Collection 1",
          value:"collection1"
        },
        {
          id:2,
          label:"Collection 2",
          value:"collection2"
        },
        {
          id:3,
          label:"Collection 3",
          value:"collection3"
        },
      ],
      priority:1,
    },
    
    {
        id: 2,
        label: "Product Tags",
        value:'productTags',
        operators: [{
          id: 1,
          label:"contains any",
          value:"contains any"
        },
        {
          id: 2,
          label:"is not",
          value:"is not"
        },
          ],
        type: "multi-select",
        data: [
          {
            id:1,
            label:"ProductTag 1",
            value:"productTag1"
          },
          {
            id:2,
            label:"ProductTag 2",
            value:"productTag2"
          },
          {
            id:3,
            label:"ProductTag 3",
            value:"productTag3"
          },
        ],
        priority:2,
        },
    {
      id: 3,
      label: "Specific Product",
      value:'specificProduct',
      operators: [
        {
          id: 1,
          label:"equals anything",
          value:"equals anything"
        },
        {
        id: 2,
        label:"contains any",
        value:"contains any"
      },
      {
        id: 3,
        label:"is not",
        value:"is not"
      }],
      type: "multi-select",
      mutuallyExclusive: "specificCollection",
      data: [
        {
          id:1,
          label:"Product 1",
          value:"product1"
        },
        {
          id:2,
          label:"Product 2",
          value:"product2"
        },
        {
          id:3,
          label:"Product 3",
          value:"product3"
        },
      ],
      priority:3,
    },
    {
        id: 4,
        label: "Product subscribed",
        value:'productSubscribed',
        operators: [],
        type: "text",
        subscribed: [
          {
            id:1,
            label:"Yes",
            value:'yes'
          },
          {
            id:2,
            label:"No",
            value:'no'
          },
        ],
        priority:4,
      },
    {
        id: 5,
        label: "Specific Discount Codes",
        value:'specificDiscountCodes',
        operators: [],
        type: "text",
        priority:5,
      },
    {
      id: 6,
      label: "Cart Value Range",
      value:'cartValueRange',
      operators: [
        {
          id: 1,
          label:"is equal or greater than",
          value: 'is equal or greater than'
        },
        {
        id: 2,
        label:"is between",
        value:'is between'
      },
      {
        id: 3,
        label:"is less than",
        value:'is less than'
      }],
      type: "number-range",
      currencyOptions:[
        { id:1,value: 'USD', label: 'USD' },
{ id:2,value: 'EUR', label: 'EUR' },
      ],
      priority:6,
    },
    
  ];