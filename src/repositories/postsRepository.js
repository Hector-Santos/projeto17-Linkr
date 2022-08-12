import postgres from '../databases/pgsql.js';

async function getTimelinePosts(){

    const { rows: posts } = await postgres.query(`
        SELECT 
            posts.id,
            posts.content,
            posts.likes,
            posts.link,
            JSON_BUILD_OBJECT(
                'username', users.username,
                'pictureUrl', users."pictureUrl"
            ) AS author,
            ARRAY_AGG(
                hashtags.name
            ) AS "hashtags"
        FROM posts
        JOIN users
        ON users.id = posts."userId"
        JOIN "hashtagPosts"
        ON posts.id = "hashtagPosts"."postId"
        JOIN hashtags
        ON hashtags.id = "hashtagPosts"."hashtagId"
        GROUP BY posts.id, users.username, users."pictureUrl"
        ORDER BY posts."createdAt" DESC
        LIMIT 20
    `);

    return posts;

};

async function getPost(postId){

    const { rows: posts } = await postgres.query(`
        SELECT * FROM posts
        WHERE id = $1
        LIMIT 1
    `, [
        postId
    ]);

    return (posts.length > 0) ? posts.at(0) : null;

}

export {
    getTimelinePosts,
    getPost
}