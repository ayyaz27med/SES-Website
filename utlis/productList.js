export const initialState = {
    price: [20, 100000],
    availability: "All",
    activeFilterOnSale: false,
    selectedBrands: [],
    selectedSubCategories: [],
    selectedSuitable: [],
    selectedConcerns: [],
    selectedIngredients: [],
    selectedCategory: [],
    sortingOption: "Sort by (Default)",
};

export const reducer = (state, action) => {
    switch (action.type) {
        case "SET_PRICE":
            return { ...state, price: action.payload };
        case "SET_AVAILABILITY":
            return { ...state, availability: action.payload };
        case "SET_BRANDS":
            return { ...state, selectedBrands: action.payload };
        case "SET_SUB_CATEGORIES":
            return { ...state, selectedSubCategories: action.payload };
        case "SET_SUITABLE":
            return { ...state, selectedSuitable: action.payload };
        case "SET_CONCERNS":
            return { ...state, selectedConcerns: action.payload };
        case "SET_INGREDIENTS":
            return { ...state, selectedIngredients: action.payload };
        case "SET_CATEGORY":
            return { ...state, selectedCategory: action.payload };
        case "SET_SORTING_OPTION":
            return { ...state, sortingOption: action.payload };
        case "SET_CURRENT_PAGE":
            return { ...state, currentPage: action.payload };
        case "FILTER_ON_SALE":
            return { ...state, activeFilterOnSale: true };
        case "TOGGLE_FILTER_ON_SALE":
            return { ...state, activeFilterOnSale: !state.activeFilterOnSale };
        case "SET_ITEM_PER_PAGE":
            return { ...state, itemPerPage: action.payload };
        case "CLEAR_FILTER":
            return {
                price: [20, 100000],
                availability: "All",
                activeFilterOnSale: false,
                selectedBrands: [],
                selectedSubCategories: [],
                selectedSuitable: [],
                selectedConcerns: [],
                selectedIngredients: [],
                selectedCategory: [],
                sortingOption: "Sort by (Default)",
            }
        default:
            return state;
    }
}

export const productFilterOptions = {
    "Sort by (Default)": { key: "default", dir: "ASC" },
    "Product Price Ascending": { key: "price", dir: "ASC" },
    "Product Price Descending": { key: "price", dir: "DESC" },
    "Product Name Ascending": { key: "pname", dir: "ASC" },
    "Product Name Descending": { key: "pname", dir: "DESC" },
};