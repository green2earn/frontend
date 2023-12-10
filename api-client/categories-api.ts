
import axiosClient from './axios-client';
import { CategoryResponse } from "@/models/category"


export const categoryApi = {
    getAllCategories() {
       return axiosClient.get<CategoryResponse[]>('/categories')
    }
}