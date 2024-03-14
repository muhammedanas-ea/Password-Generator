import axios from "axios";

const passwordApi = axios.create({
  baseURL:`http://localhost:8000`
})

export const PasswordGenerate = async (data) =>{
  try {
    console.log(data,'aaaaa');
    return await passwordApi.post('/',data)
  } catch (error) {
    console.log(error)
  }
}