import { useEffect } from "react";

export const TicketCreationForm = () => {

    const getCategoryOptions = async() =>{
        const response = await fetch("http://localhost:1913/api/category/getall");
        const json = await response.json();
        const categorySelect = document.querySelector("#ticket-creation-form-category-selection")
        if (json){
            const defaultOption = document.createElement("option");
            defaultOption.value = "Select a category";
            defaultOption.innerHTML = "Select a category";
            if(categorySelect){

                categorySelect.appendChild(defaultOption)
                for (const k in json){
                    const tempOption = document.createElement("option");
                    tempOption.value = json[k]["category"]
                    tempOption.innerHTML = json[k]["category"]
                    categorySelect.appendChild(tempOption)
                }
            }
        }
    }

    const getAdminOptions = async() => {

        const admins = await fetch("http://localhost:1913/api/user/getadmins");
        const adminJson = await admins.json();
        const adminSelector = document.querySelector("#ticket-creation-form-assign-selection");
        const defaultOption = document.createElement("option");
        defaultOption.value = "Select an operator";
        defaultOption.innerHTML =  "Select an operator";
        if(adminSelector){
            adminSelector.appendChild(defaultOption)
            if (adminJson){ 

                for (const  index in adminJson){
                    const tempOption = document.createElement("option");
                    tempOption.value = adminJson[index]["fullName"];
                    tempOption.innerHTML = adminJson[index]["fullName"];
                    adminSelector.appendChild(tempOption);
                }
            }
            const noneOption = document.createElement("option");
            noneOption.value = "None";
            noneOption.innerHTML = "None";
            adminSelector.appendChild(noneOption)
        }
    }

    useEffect(() => {
        getAdminOptions();
        getCategoryOptions();
    }, [])



    return (
        <div className = "ticket-creation-form-main drop-shadow-2xl rounded-xl bg-white p-5">
            <form>
                <div className="flex gap-4 p-2">
    
                    <div className="ticket-creation-client-name flex flex-col w-[50%]">
                        <label className="text-gray-400 mr-auto">Client Name</label>
                        <input placeholder="Enter client's name" className="border border-yellow-700 bg-amber-50 rounded-md placeholder:pl-2"></input>
                    </div>
    
                    <div className="ticket-creation-email w-[50%] flex flex-col">
                        <label className="text-gray-400 mr-auto">Email</label>
                        <input placeholder="Enter client's email" className="border border-yellow-700 bg-amber-50 rounded-md placeholder:pl-2"></input>
                    </div>
                </div>
                <div className="ticket-creation-subject flex flex-col p-1.5">
                    <label className="text-gray-400  pl-1 mr-auto">Subject</label>
                    <input placeholder="Enter Subject" className="border border-yellow-700 bg-amber-50 rounded-md w-full placeholder:pl-2"></input>
                </div>
                <div className="ticket-creation-issue">
                    <label className="text-gray-400 w-full max-w-xs">Describe the issue:</label>
                    
                    {/* <input placeholder="Describe the issue" className="border border-yellow-700 bg-amber-50"></input> */}
                    <input className="block w-full p-4 text-gray-900 border border-yellow-700 rounded-xl bg-amber-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 "></input>
                </div>
                <div className="ticket-creation-category p-3 mt-1">
                <label className="text-gray-400 pr-2">Category</label>
                    <select id="ticket-creation-form-category-selection" className="border border-yellow-700 bg-amber-50 rounded-md placeholder:pl-2">
                    </select>
                </div>
    
              
    
                <div className="ticket-creation-assign mt-1">
                    <label className="text-gray-400 pr-2">Assigned operator</label>
                    <select id= "ticket-creation-form-assign-selection" className = "border border-yellow-700 bg-amber-50 rounded-md placeholder:pl-2">
                    </select></div>
                <button id = "ticket-create-btn" className="bg-[#3091b2] text-[#fff] p-1.5 rounded-lg mt-6">Create Ticket</button>
    
            </form>
        </div>
        
        
    )

    // return(
    //     <form id = "client-create-form" onSubmit = {handleSubmit}>
    //         <h3>Create a new ticket</h3>
    //         <label>Client name</label>
            
    //         <input id = "fullName-field" type ="text" onChange={(e) => {
    //             if (e.nativeEvent.data === null){
    //                 e.target.value  = (e.target.value).substring(0, e.target.value.length-1);
    //             }
    //             // console.log(e.target.value);
    //             // setClientName(e.target.value)
    //             fetchSearch("fullName", e.target.value)
    //             console.log("fullname: " + clientName + " email: " + email);
    //         }}
    //         ></input>

    //         <label>email address</label>
    //         <input id = "email-field" type ="text" onChange={(e) => {
    //             if (e.nativeEvent.data === null){
    //                 e.target.value  = (e.target.value).substring(0, e.target.value.length-1);
    //             }
    //             // setEmail(e.target.value)
    //             fetchSearch("email", e.target.value);
    //             console.log(email);
    //             }}></input>
            
    //         <label>subject</label>
    //         <input id = "subject-field" type ="text" onChange={(e) => setSubject(e.target.value)}></input>

    //         <label>Category</label>
    //         <input id = "category-field" type ="text" onChange={(e) => setCategory(e.target.value)}></input>

    //         <label>body</label>
    //         <input id = "body-field" type ="text" onChange={(e) => setBody(e.target.value)}></input>

    //         <label>Assign this to:</label>
    //         <input id = "assignment-field" type ="text" onChange={(e) => setAssignedTo(e.target.value)}></input>

    //         <button id = "ticket-create-btn">Create a new ticket</button>
    //     </form>

   
    // )
}