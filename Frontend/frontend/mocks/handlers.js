// mocks/handlers.js
import { rest } from 'msw';

export const handlers = [
    rest.post(`${process.env.REACT_APP_API_URL}/register`, (req, res, ctx) => {
        return res(ctx.json({ data: {} }));
    }),
];