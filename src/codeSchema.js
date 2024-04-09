import { z} from 'zod'

export const codeschema = z.object({

    title: z.string().min(3),
    code:  z.string().min(3),

})