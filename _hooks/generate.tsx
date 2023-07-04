import axios from 'axios'; 

const GenerateHooks = () => {
    const generateTasksForUser = async (userId: string, num: number) => {
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