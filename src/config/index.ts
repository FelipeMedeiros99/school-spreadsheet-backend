import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const corsOptions = {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], 
  allowedHeaders: ['Content-Type', 'Authorization'],
};

export default prisma