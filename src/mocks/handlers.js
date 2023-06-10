import { rest } from 'msw'

export const handlers = [
    // Handles a POST /login request
    rest.post('/report/register', (req, res, ctx)=>{
        console.log(req.body)
        return res(
            ctx.status(201),
        )
    }),
  
    // Handles a GET /user request
    rest.get('/admin/report', (req, res, ctx)=>{
        return res(
            ctx.status(200),
            ctx.json([
                {
                    userId : 'elice1',
                    attackerId : '펭수',
                    content : '멍청이',
                    violenceAt : 'Sat Jun 10 2023 21:15:00 GMT+0900 (한국 표준시)',
                },
                {
                    userId : 'elice2',
                    attackerId : '빼어날수',
                    content : '바보',
                    violenceAt : 'Sat Jun 11 2023 20:15:00 GMT+0900 (한국 표준시)'
                }
            ])
        )
    }),
  ]