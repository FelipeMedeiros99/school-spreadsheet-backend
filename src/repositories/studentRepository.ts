import prisma from "../config";

export async function countStudentRepository() {
  try {
    const qtStudents = await prisma.student.count();
    return qtStudents;

  } catch (e) {
    throw { message: "Error counting students.", status: 500 }
  }
}

export async function findStudentsRepository(page: number) {
  try {
    const results = 10;
    const students = await prisma.student.findMany({
      skip: results * (page),
      take: results
    });
    return students;

  } catch (e) {
    throw { message: "error searching for students.", status: 500 }
  }
}