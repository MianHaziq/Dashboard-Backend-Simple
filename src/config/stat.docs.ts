
/**
 * @swagger
 * tags:
 *   name: Stats
 *   description: User statistics APIs
 */

/**
 * @swagger
 * /api/stats:
 *   get:
 *     summary: Get user statistics
 *     tags: [Stats]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Returns a list of user stats
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */