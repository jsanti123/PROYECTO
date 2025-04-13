import { Category } from "../models/Category";
import { Prisma } from "@prisma/client";
import ResponseModel from "../utils/share/responseUtil";
import { RESPONSE_CODES } from "../utils/share/responseCodes";
import { StatusCodes } from "http-status-codes";

export class CategoryService {
    public static async create(data: Prisma.CategoryCreateInput) {
        try {
            if(!data.description) data.description = null;
            const category = await Category.createCategory(data);
            return ResponseModel.successResponse(
                "Category created successfully",
                category,
            )
        } catch (error){
            return ResponseModel.errorResponse(
                "Error creating category",
                StatusCodes.INTERNAL_SERVER_ERROR,
                null,
                RESPONSE_CODES.INTERNAL_SERVER_ERROR,
            );
        }
    }
    public static async getById(id: string) {
        try {
            const category = await Category.getCategoryById(id);
            if (!category) {
                return ResponseModel.errorResponse(
                    "Category not found",
                    StatusCodes.NOT_FOUND,
                    null,
                    RESPONSE_CODES.NOT_FOUND,
                );
            }
            return ResponseModel.successResponse(
                "Category retrieved successfully",
                category,
            );
        } catch (error) {
            return ResponseModel.errorResponse(
                "Error retrieving category",
                StatusCodes.INTERNAL_SERVER_ERROR,
                null,
                RESPONSE_CODES.INTERNAL_SERVER_ERROR,
            );
        }
    }
    public static async getAll() {
        try {
            const categories = await Category.getAllCategories();
            if (!categories) {
                return ResponseModel.errorResponse(
                    "No categories found",
                    StatusCodes.NOT_FOUND,
                    null,
                    RESPONSE_CODES.NOT_FOUND,
                );
            }
            return ResponseModel.successResponse(
                "Categories retrieved successfully",
                categories,
            );
        } catch (error) {
            return ResponseModel.errorResponse(
                "Error retrieving categories",
                StatusCodes.INTERNAL_SERVER_ERROR,
                null,
                RESPONSE_CODES.INTERNAL_SERVER_ERROR,
            );
        }
    }
    public static async update(id: string, data: any) {
        try {
            if(!data.description) data.description = null;
            const updatedCategory = await Category.updateCategory(id, data);
            if (!updatedCategory) {
                return ResponseModel.errorResponse(
                    "Category not found",
                    StatusCodes.NOT_FOUND,
                    null,
                    RESPONSE_CODES.NOT_FOUND,
                );
            }
            return ResponseModel.successResponse(
                "Category updated successfully",
                updatedCategory,
            );
        } catch (error){
            return ResponseModel.errorResponse(
                "Error updating category",
                StatusCodes.INTERNAL_SERVER_ERROR,
                null,
                RESPONSE_CODES.INTERNAL_SERVER_ERROR,
            );
        }
    }
    public static async delete(id: string) {
        try {
            const category = await Category.deleteCategory(id);
            if (!category) {
                return ResponseModel.errorResponse(
                    "Category not found",
                    StatusCodes.NOT_FOUND,
                    null,
                    RESPONSE_CODES.NOT_FOUND,
                );
            }
            return ResponseModel.successResponse(
                "Category deleted successfully",
                category,
            );
        } catch (error) {
            return ResponseModel.errorResponse(
                "Error deleting category",
                StatusCodes.INTERNAL_SERVER_ERROR,
                null,
                RESPONSE_CODES.INTERNAL_SERVER_ERROR,
            );
        }
    }
}