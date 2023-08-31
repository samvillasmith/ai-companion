const { PrismaClient } = require("@prisma/client");

const db = new PrismaClient();

async function main() {
    try {
        await db.category.createMany({
           data: [
            { "name": "Life Coaches" },
            { "name": "Emotional Support" },
            { "name": "Fitness and Wellness" },
            { "name": "Educational Advisors" },
            { "name": "Career Guidance" },
            { "name": "Financial Advisors" },
            { "name": "Relationship Coaches" },
            { "name": "Travel Companions" },
            { "name": "Hobby Enthusiasts" },
            { "name": "Entertainment and Games" },
            { "name": "Spiritual Guides" },
            { "name": "Healthcare Assistants" },
            { "name": "Local Guides" },
            { "name": "Friends and Partners" },
            { "name": "Versatile Companions" },
            { "name": "Elderly Companions" },
            ]
        })
    } catch (err) {
        console.error("Error seeding default categories")
    } finally {
        await db.$disconnect();
    }
};

main();