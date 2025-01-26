import { faker } from '@faker-js/faker';

import prisma from "../src/config";
import { Student, User } from '@prisma/client';
import { encryptPassword } from '../src/services/authenticationServices';
import { randonInt } from '../src/tools';


async function addUsers(){
  const users: Omit<User, 'id'>[] = [];
  for(let i=0; i<20; i++){
    const password = await encryptPassword(faker.internet.password())
    users.push({
      email: faker.internet.email(),
      password: password
    })
  }

  await prisma.user.createMany({
    data: users,
    skipDuplicates: true
  })
}

async function addStudents(){
  const students: Omit<Student, 'id' | "createdAt">[] = [];
  const letters = ["A", "B", "C", "D", "E", "F"]

  for(let i=0; i<200; i++){
   
    students.push({
      name: faker.person.fullName().toUpperCase(),
      class: `${randonInt(1, 5)}${letters[randonInt(0, 5)]}`,
      age: randonInt(5, 17),
      userId: randonInt(1, 20)
    })
  }

  await prisma.student.createMany({
    data: students,
    skipDuplicates: true
  })
}

async function main(){
  await addUsers()
  await addStudents()

}

main()