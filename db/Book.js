import { z } from 'zod';

// Book Schema using Zod
const bookSchema = z.object({
    title: z.string(),
    author: z.object({
        name: z.string(),
        birth_year: z.number(),
        death_year: z.number().nullable(), // Allow null for death_year
    }),
    summary: z.array(z.string()),
    subjects: z.array(z.string()),
    epub: z.string(),
    download_count: z.number(),
    id: z.number(),
});

export default bookSchema;