/**
 * @swagger
 * tags:
 *   name: Streak
 *   description: User streak related APIs (returns only a count)
 */

/**
 * @swagger
 * /api/streaks:
 *   get:
 *     summary: Get the current user's streak count
 *     tags: [Streak]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Returns the user's current streak count as a number
 *         content:
 *           application/json:
 *             schema:
 *               type: integer
 *               example: 7
 *       401:
 *         description: Unauthorized (missing or invalid token)
 *       500:
 *         description: Server error
 */
