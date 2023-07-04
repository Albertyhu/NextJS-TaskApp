import axios from 'axios'; 

type generateTasksForUser = {
    userId: string, 
    num: string, 
}

const GenerateHooks = () => {
    const generateTasksForUser = async (userId, num ) => {
        const fetchURL = `api/generate/generate_tasks_for_user/${userId}`; 
        const data = {
            num, 
        }
        try {
            const response = await axios.put(fetchURL, data);
            const result = response.data;
            if (response.status === 200) {
                console.log("success!")
            }
            else {
                console.log("error: ", result.error)
            }
        } catch (error) {
            console.log("generateTasksForUser error : ", error)
        }
    }

    return { generateTasksForUser}
}

export { GenerateHooks }