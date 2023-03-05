import React = require("react");


interface Props {
    loggedInUserEmail: string
    user_id: string
}

interface GroupCreationParameter {
    groupName?: string,
    requestSender: string,
    user_id: string,
    users: {[_id: string]: string}
}

const GroupChatCreationgForm: React.FC<Props> = ({loggedInUserEmail, user_id}: Props) => {

    const [groupCreationParams, setGroupCreationParams] = React.useState<GroupCreationParameter>({
        groupName: "",
        requestSender: loggedInUserEmail,
        user_id: user_id,
        users: {}
    })
    console.log("this is: ", user_id)


    // setGroupCreationParams({groupName: "", requestSender: loggedInUserEmail, user_id: user_id})
    const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e: React.FormEvent<HTMLFormElement>) =>{
        
        e.preventDefault();

        const group = await fetch("http://localhost:4000/api/group", {
            method: "POST",
            body: JSON.stringify(groupCreationParams),
            headers: {
                "Content-Type": "application/json"
            }
        })
    }

    return (
        <div>
            
            <form onSubmit = {handleSubmit}>
            <label> Group Name</label>
            <input placeholder="Enter a group name" onChange={e => setGroupCreationParams({
                groupName: e.target.value,
                requestSender: loggedInUserEmail,
                user_id: user_id,
                users: {"63c3aa3cf23cfc29b8270401": "brandon@xyz.com", "63d4553868587458d1bae036": "jayson@xyz.com"}
            })}></input>
            <button type= "submit">Create Group</button>
            </form>
        </div>
    )
}

export default GroupChatCreationgForm;

// users: {"63c3aa3cf23cfc29b8270401": "brandon@xyz.com", "63d4553868587458d1bae036": "jayson@xyz.com"}