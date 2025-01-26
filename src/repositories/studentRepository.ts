import prisma from "../config";

export async function countStudentRepository() {
  try {
    const qtStudents = await prisma.student.count();
    return qtStudents;

  } catch (e) {
    throw { message: "Error saving user.", status: 500 }
  }
}