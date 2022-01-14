import { PrismaClient } from "@prisma/client";

export interface IPrismaService {
    getPrisma(): PrismaClient;
}