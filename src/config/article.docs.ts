/**
 * @swagger
 * tags:
 *   name: Articles
 *   description: User article reading APIs
 */

/**
 * @swagger
 * /api/articles:
 *   get:
 *     summary: Get the current user's articles (today & in-progress)
 *     tags: [Articles]
 *     operationId: getUserArticles
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successful response with the user's articles
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Article'
 *       401:
 *         description: Unauthorized - Missing or invalid token
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Article:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: "b6e0aaf7-7e54-4a48-95c7-3b2dd3f1c4d2"
 *         channel:
 *           type: string
 *           example: "Al Jazeera"
 *         url:
 *           type: string
 *           example: "#"
 *         cimage:
 *           type: string
 *           example: "/jazeera.png"
 *         time:
 *           type: string
 *           example: "• 7 min read"
 *         category:
 *           type: string
 *           example: "🏛️ Politics"
 *         catImage:
 *           type: string
 *           example: ""
 *         level:
 *           type: string
 *           example: "ILR Level: 2-Moderate"
 *         levImage:
 *           type: string
 *           example: ""
 *         title:
 *           type: string
 *           example: "جدعون ليفي: إسرائيل ليست أسدا صاعدا وإنما هي أسد مريض"
 *         content:
 *           type: string
 *           example: "يرى ليفي أن مصير الحرب مرهون بنزوات رئيس أميركي “متقلب المزاج” و “ثرثار”، فإذا قرر أن يقصف إيران فقد يتحقق انتصار..."
 *         progress:
 *           type: integer
 *           example: 47
 *         userId:
 *           type: string
 *           example: "a34d4e5b-1c11-4e12-95b2-24a2cd4f97e4"
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */
