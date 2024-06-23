import {useEffect, useState} from "react";
import {Idepartment} from "@/declarations/deptartment";
import api from '@/lib/ApiClient'

const useDepartments= () =>{
    const [departments, setDepartments] = useState<Idepartment[]>([])
    const [loading, setLoading] = useState<boolean>(true);
    const [isDataUpdated, setIsDataUpdated] = useState(false)

    useEffect(()=>{
        const getData = () =>{
           const res =  api.get<Idepartment[]>('/api/departments/list')

        }
        if(!isDataUpdated){
            getData()
        }
    }, [isDataUpdated])

    return {isDataUpdated, setIsDataUpdated, departments, loading, setLoading}
}