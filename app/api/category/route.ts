import connectToDatabase from "@/utils/database"
import Category from "@/models/category"
import { NextRequest} from "next/server"

//get
export const GET = async (req: NextRequest, { params }: { params: { id: string } }) => {
const id = params.id;
try {
await connectToDatabase();
    const category = await Category.findById(id);
    if (!category) {
    throw new Error('Category not found');
    }
    return { status: 200, body: { categoryName: category.name } };
} catch (error) {
    return { status: 500, body: { error: error.message } };
}
};

//delete
export const DELETE = async (req: NextRequest, { params }: { params: { id: string } }) => {
const id = params.id;
try {
    await connectToDatabase();
    const category = await Category.findByIdAndDelete(id);
    if (!category) {
    throw new Error('Category not found');
    }
    return { status: 200, body: { message: 'Category deleted successfully' } };
} catch (error) {
    return { status: 500, body: { error: error.message } };
}
};

//patch--not sure
export const PATCH = async (req: NextRequest, { params, body }: { params: { id: string }, body: { name: string } }) => {
const id = params.id;
const newName = body.name;
try {
    await connectToDatabase();
    const category = await Category.findByIdAndUpdate(id, { name: newName }, { new: true });
    if (!category) {
    throw new Error('Category not found');
    }
    return { status: 200, body: { category } };
} catch (error) {
    return { status: 500, body: { error: error.message } };
}
};