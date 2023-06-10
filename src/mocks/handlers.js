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
                    attackerId : '갑수',
                    content : '멍청이',
                    violenceAt : '20020306',
                },
                {
                    userId : 'elice2',
                    attackerId : '종수',
                    content : '바보',
                    violenceAt : '20020305'
                }
            ])
        )
    }),
  ]