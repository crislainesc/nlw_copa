import { FastifyInstance, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { prisma } from '@/lib'
import { authenticate } from '@/plugins/authenticate'

export async function gameRoutes(fastify: FastifyInstance) {
  fastify.get(
    '/polls/:id/games',
    { onRequest: [authenticate] },
    async (request: FastifyRequest) => {
      const gerPollParams = z.object({
        id: z.string(),
      })

      const { id } = gerPollParams.parse(request.body)

      const games = await prisma.game.findMany({
        orderBy: { date: 'desc' },
        include: {
          guesses: {
            where: { participant: { userId: request.user.sub, pollId: id } },
          },
        },
      })

      return {
        games: games.map((game) => ({
          ...game,
          guess: game.guesses.length > 0 ? game.guesses[0] : null,
          guesses: undefined,
        })),
      }
    }
  )
}