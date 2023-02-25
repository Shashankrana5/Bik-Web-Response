import { useState } from "react"

const UserSearchBar = () => {

    const [email, setEmail] = useState("");
    const [clientName, setClientName] = useState("");
    const fetchSearch = async (k, v) =>{
        if (!v) return;
        let valueToPass;
        if (k === "fullName"){
            valueToPass = {"fullName": v}
        }
        else if (k === "email"){
            valueToPass = {"email": v}
        }
        const response = await fetch("http://localhost:4000/api/users/search/", {
            method: "POST",
            body: JSON.stringify(valueToPass),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              }
        })
        const json = await response.json();

        if (json.length > 0){
            const result = json[0];
            let fieldMap = new Object({"email": result.email, "fullName": result.fullName});

        setEmail(fieldMap["email"]);
        setClientName(fieldMap["fullName"])
        updateCurrentField(k, fieldMap[k], v);

        delete fieldMap[k];

        for (let key of Object.keys(fieldMap)){
            changeField(key, fieldMap[key]);
        }
        
    }

    }

    const changeField = (fieldName, fieldValue) => {

        let field = document.querySelector(`#${fieldName}-field-search`);
        field.value = fieldValue;
        
    }

    const updateCurrentField = (fieldName, feildValue, typed) =>{
        let field = document.querySelector(`#${fieldName}-field-search`);
        field.value = feildValue;
        field.setSelectionRange(typed.length, feildValue.length)

    }
    return (
        <div>
            <h3>User Search</h3>
            <label>Client's name</label>
            <input placeholder="name" id = "fullName-field-search"onChange={(e) => {
                if (e.nativeEvent.data === null){
                    e.target.value  = (e.target.value).substring(0, e.target.value.length-1);
                }
                fetchSearch("fullName", e.target.value)
                // console.log("fullname: " + clientName + " email: " + email);
            }}></input>
            <label>Email</label>
            <input id= "email-field-search"placeholder="email" onChange = {(e) => {
                if (e.nativeEvent.data === null){
                    e.target.value  = (e.target.value).substring(0, e.target.value.length-1);
                }
                fetchSearch("email", e.target.value);
                // console.log(email);
                }}></input>
        </div>
    )
}

export default UserSearchBar