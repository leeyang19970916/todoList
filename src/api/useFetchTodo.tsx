
import { useEffect, useState } from "react"
import cong from "./configuration"
import { getDatabase,ref,onValue} from "firebase/database"
function useFetchTodo() {
    const [data,setData]=useState(null)

    useEffect(()=>{
        const database = getDatabase(cong);
        const collectionRef = ref(database, "side-project");
    // Function to fetch data from the database
    const fetchData = () => {
        // Listen for changes in the collection
        onValue(collectionRef, (snapshot) => {
          const dataItem = snapshot.val();
  
          // Check if dataItem exists
          if (dataItem) {
            // Convert the object values into an array
            const displayItem = Object.values(dataItem);
            console.log(displayItem,setData)
            // setData(displayItem);
          }
        });
      };
  
      // Fetch data when the component mounts
      fetchData();
    },[])



    return [data]
    
}




export default useFetchTodo