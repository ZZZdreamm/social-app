
export const removeItemFromState = async (itemToRemoveIndex: number, setItems: any) => {
  setItems((prevItems: any) => {
    if(prevItems.length > 1){
      return prevItems.filter((item: any) => item !== prevItems[itemToRemoveIndex-1]);
    }else{
      return prevItems
    }
  });
};

export const addItemToState = async (itemToAdd:any, setItems:any) => {
  setItems((prevItems:any) => [itemToAdd, ...prevItems])
}
