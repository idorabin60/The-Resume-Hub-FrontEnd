import { useEffect } from "react";
import { useParams } from "react-router-dom"
import FormSection from "../../componnents/FormSection";

function EditResume() {
    const params = useParams();
    useEffect(()=>{
    console.log(params.resumeId);
    },[])
  return (
    <div className=" grid grid-cols-1 md:grid-cols-2 p-10 gap-10">
        <div><FormSection/></div>
        <div>are</div>
       

    </div>
  )
}

export default EditResume